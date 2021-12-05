'use strict';

// Used to load data from the DB
let json_data = [];



class Game {
  static sequenceOfPlay = [   
    { phase:"Command Phase",  segment:"Weather Determination",             action: Game.determineWeather },
    { phase:"Command Phase",  segment:"Move Supply Source",                action: Game.moveSS           },
    { phase:"Command Phase",  segment:"Disband COP",                       action: Game.disbandCOP       },
    { phase:"Command Phase",  segment:"Activate Supply Source",            action: Game.activateSS       },
    { phase:"Command Phase",  segment:"Get AP",                            action: Game.getAP            },
    { phase:"Command Phase",  segment:"Allocate AP",                       action: Game.allocateAP       },
    { phase:"Command Phase",  segment:"Organization Segment",              action: Game.doNothing        },
    { phase:"Movement Phase", segment:"Movement Commands",                 action: Game.doNothing        },
    { phase:"Movement Phase", segment:"Move COP",                          action: Game.moveCOP          },
    { phase:"Movement Phase", segment:"Individual Initiative Segment",     action: Game.doNothing        },
    { phase:"Movement Phase", segment:"Bridge Segment",                    action: Game.doNothing        },
    { phase:"Combat Phase",   segment:"Forced March Segment",              action: Game.doNothing        },
    { phase:"Combat Phase",   segment:"Battle Resolution Segment",         action: Game.doNothing        },
    { phase:"Combat Phase",   segment:"Disorganization and Rally Segment", action: Game.doNothing        }
  ];

  constructor (id,  name, scenarioId, currentTurn, endTurn, currentPlayer, currentSegment, weather) {
    this.id               = id;
    this.name             = "";
    this.scenarioId       = "";
    this.currentPlayer    = currentPlayer;      
    this.currentTurn      = currentTurn;
    this.endTurn          = endTurn;
    this.currentSegment   = currentSegment;
    this.weather          = weather; 
    this.players          = [];
    this.nations          = [];
    this.armies           = [];
    this.leaders          = [];
    this.units            = [];
    
    this.calendar = [];
    this.weatherTable = [];

    this.gameWidget = null;
  }

  static responseFromDB = "";

  static getid_callback (xhttp_obj) {
    responseFromDB = xhttp_obj.responseText;
  }
  

  initFromScenario (scenario_id) {
    // Get scenario data from DB and populate internal structures
    //  const url = "app/get_scenario_data.php?scenario_id=" + scenario_id;
    //  call_server_api_get (url, get_scenario_data);
    
    // Create the new game in the database, get the new game ID
    call_server_api_get ("app/create_game_from_scenario.php?scenario_id=" + scenario_id + "&game_name=" + this.name, Game.getid_callback);
    this.id = responseFromDB;
    loadDataFromDB (this.id);
  
    // Close the create game modal box
    // @TODO: move to the UI modules
    document.getElementById("newgame_box").style.display="none";

    // Players must choose position of COPs and supply sources
    
    // And get the game begin
    this.play();
  }


  // Returns the index of the units array whose id == unitId
  findUnit (unitId) {
    for (let i = 0; i < this.units.length; i++)
      if (this.units[i].unitId == unitId)
        return i;
  
    return (-1);
  }
  

  // Returns an instance of class Unit whose id == unitId
  getUnit (unitId) {
    for (let i = 0; i < this.units.length; i++)
      if (this.units[i].unitId == unitId)
        return this.units[i];
  
    return null;
  }
  

  // Returns the index of the leaders array whose Id == leadertId
  findLeader (leaderId) {
    for (let i = 0; i < this.leaders.length; i++)
      if (this.leaders[i].leaderId == leaderId)
        return i;
  
    return (-1);
  }
  

  // Returns an instance of class Leader whose id == unitId
  getLeader (leaderId) {
    for (let i = 0; i < this.leaders.length; i++)
      if (this.leaders[i].leaderId == leaderId)
        return this.leaders[i];
  
    return null;
  }
  

  numOfLeadersInHex (x, y)
  {
    let n = 0;
    
    for (let i = 0; i < this.leaders.length; i++) {
      if (this.leaders[i].x == x && this.leaders[i].y == y) { 
        n++;
      }
    }
        
    return n;
  }
  
  
  // Move to the controller?

  create_UI_elements () {
    const statusBar = document.getElementById ("StatusBar");
    this.gameWidget = new UI_Game_Widget (statusBar);
    
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].create_UI_widgets (statusBar);

      for (let j = 0; j < this.players[i].armies.length; j++) {
        this.players[i].armies[j].create_UI_widgets (this.players[i].playerWidget.armyTable);
      }

      for (let j = 0; j < this.players[i].nations.length; j++) {
        this.players[i].nations[j].create_UI_widgets (this.players[i].playerWidget.nationTable);
      }
    }
  }

  
  resume () 
  {
    this.create_UI_elements ();
    this.loadCalendar ();
    this.loadWeatherTable ();    
    
    // Update weather, turn, phase, segment widgets
    this.gameWidget.updateTurn ("Turn " + this.currentTurn);
    this.gameWidget.updateDate (this.calendar[this.currentTurn].days);      
    
    if (this.currentSegment == -1)
    {
      // Begin of a scenario
      // Start with currentSegment == -1
      // Move to state 0, triggering all actions
      this.advanceGame ();
    }
    // Draw the player status
    this.players[this.currentPlayer].show ();
    this.players[this.currentPlayer].draw ();
    
    // Draw own the units
    for (let l of this.players[this.currentPlayer].leaders) 
    { 
      if (l.parentId == null) 
      {
        l.draw();
      }
    }

    // Draw enemy leaders within visibility range
    const otherPlayer = this.otherPlayer ();
    for (let l of this.players[otherPlayer].leaders)
    { 
      if (l.parentId == null && l.nearEnemy ()) 
      {
          l.draw();
      }
    }
    
    // Draw the COP (if active)
    for (let a of this.players[this.currentPlayer].armies)
    {
      if (a.COP.isActive)
      {
        a.COP.draw ();      
      }    
    }    
  }

  // Return the index of the othger player
  // Should be scalable to n players
  otherPlayer () {
    return this.currentPlayer == 0 ? 1 : 0;
  }
  
    
  advanceGame () {
    this.currentSegment++;

    if (this.currentSegment >= Game.sequenceOfPlay.length) 
    {
      this.currentPlayer++;
      if (this.currentPlayer >= this.players.length) 
      {
        // New turn
        this.currentPlayer = 0;            
        this.currentSegment = 0;
        this.currenTurn++;
      }

      if (this.currenTurn > this.endTurn ) {
        // Game ended
      }
    }
    
    // Update the phase/sgment widget
    this.gameWidget.updatePhaseAndSegment (Game.sequenceOfPlay[this.currentSegment].phase + ":" + Game.sequenceOfPlay[this.currentSegment].segment);      
    
    // And execute the actions for the current state
    Game.sequenceOfPlay[this.currentSegment].action();     
  }
  
  loadWeatherTable ()
  {
    GameFactory.LoadTable ("Weather_Static_Data");
    this.weatherTable = json_data;     
  }

  loadCalendar ()
  {
    GameFactory.LoadTable ("Calendar");
    this.calendar = json_data;     
  }
 
  //
  //
  // ACTIONS TRIGGERED WHEN GAME ADVANCES
  //
  // 
 
  
  static determineWeather ()
  {
    Controller.showWeatherDialog ();
  }


  static moveSS ()
  {
    alert ("You can move your supply source now. Rules apply");
  }
  
  static disbandCOP ()
  {
    alert ("You can disband your Center of Operations now. Rules apply");
    
    // Move to the controller
    document.getElementById("disband_cop_dialog").style.display="initial";
  }
  
  static activateSS ()
  {
    alert ("You can activate a new Supply Source now. Rules apply");
  }
  
  static getAP ()
  {
    alert ("You roll a die to get Admin Points. Rules apply");
  }
  
  static allocateAP () 
  {
    alert ("You now have to decide how manu Admin Points to allocate to each army. Rules apply");
  }
  
  static doNothing ()
  {
  }
}





