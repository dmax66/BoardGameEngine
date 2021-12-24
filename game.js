'use strict';

// Used to load data from the DB
let json_data = [];


class Game {
  static sequenceOfPlay = [   
    { id: "WD",   phase:"Command Phase",  segment:"Weather Determination",             action: Game.determineWeather },
    { id: "mSS",  phase:"Command Phase",  segment:"Move Supply Source",                action: Game.moveSS           },
    { id: "dCOP", phase:"Command Phase",  segment:"Disband COP",                       action: Game.doNothing        },
    { id: "aSS",  phase:"Command Phase",  segment:"Activate Supply Source",            action: Game.activateSS       },
    { id: "gAP",  phase:"Command Phase",  segment:"Get AP",                            action: Game.getAP            },
    { id: "aAP",  phase:"Command Phase",  segment:"Allocate AP",                       action: Game.allocateAP       },
    { id: "OS",   phase:"Command Phase",  segment:"Organization Segment",              action: Game.doNothing        },
    { id: "MC",   phase:"Movement Phase", segment:"Movement Commands",                 action: Game.doNothing        },
    { id: "mCOP", phase:"Movement Phase", segment:"Move COP",                          action: Game.moveCOP          },
    { id: "IIS",  phase:"Movement Phase", segment:"Individual Initiative Segment",     action: Game.doNothing        },
    { id: "BS",   phase:"Movement Phase", segment:"Bridge Segment",                    action: Game.doNothing        },
    { id: "FMS",  phase:"Combat Phase",   segment:"Forced March Segment",              action: Game.doNothing        },
    { id: "BRS",  phase:"Combat Phase",   segment:"Battle Resolution Segment",         action: Game.doNothing        },
    { id: "DRS",  phase:"Combat Phase",   segment:"Disorganization and Rally Segment", action: Game.doNothing        }
  ];

  constructor (id,  name, scenarioId, currentTurn, endTurn, currentPlayer, currentSegment, weather) {
    this.id               = id;
    this.name             = "";
    this.scenarioId       = "";
    this.currentPlayer    = 1 * currentPlayer;      
    this.currentTurn      = 1 * currentTurn;
    this.endTurn          = 1 * endTurn;
    this.currentSegment   = 1 * currentSegment;
    this.weather          = weather; 
    this.players          = [];
    this.nations          = [];
    this.armies           = [];
    this.leaders          = new Map ();
    this.units            = new Map ();
    
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
/*  findUnit (unitId) 
  {

    for (let i = 0; i < this.units.length; i++)
      if (this.units[i].unitId == unitId)
        return i;
  
    return (-1);
  }
  */

  // Returns an instance of class Unit whose id == unitId
  getUnit (unitId) 
  {
    return units.get (unitId);
  }
  

  // Returns the index of the leaders array whose Id == leadertId
/*
  findLeader (leaderId) {
    for (let i = 0; i < this.leaders.length; i++)
      if (this.leaders[i].leaderId == leaderId)
        return i;
  
    return (-1);
  }
*/  

  // Returns an instance of class Leader whose id == unitId
  getLeader (leaderId) 
  {
    return leaders.get (leaderId);
  }
  

/*
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
*/  
  
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
    for (let l of this.players[this.currentPlayer].leaders.entries()) 
    { 
      if (l[1].parentId == null) 
      {
        l[1].draw();
      }
    }

    // Draw enemy leaders within visibility range
    for (let p = 0; p < this.players.length; p++)
    { 
      if (p == this.currentPlayer)
      {
        continue;
      }

      for (let l of this.players[p].leaders.entries ())
      {
        if (l[1].parentId == null && l[1].nearEnemy ()) 
        {
            l[1].draw();
        }
      }
    }
    
    // Draw the COP (if active) and SS fpr each army
    for (let a of this.players[this.currentPlayer].armies)
    {
      if (a.COP.isActive)
      {
        a.COP.draw ();      
      }    
      
      if (a.activeSSName != null) 
      {
        const ss = a.supplySources.get (a.activeSSName);
        ss.draw ();        
      }
    }    
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
  }
  
  static activateSS ()
  {
    let isReactivationNeeded = false;
    
    for (let a of theGame.players[theGame.currentPlayer].armies)
    {
      if (a.activeSSName == null)
      {
        const dlgBox = new ActivateSSDialogBox ("activate_SS", true, theGame.currentPlayer);
        dlgBox.open ();
        return;      
      }    
    }
    
    // No armies need to reactivatre their supply source
    alert ("All your armies have active Supply Sources");
    
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
  
  numberOfMarkersInHex (x, y)
  {
    let result = 0;
    
    // Leaders
    for (let l of this.leaders)
    {
      if (l.x == x && l.y == y)
      {
        result++;      
      }
    }  
    
    // Supply sources
    
    // CoPs
    for (let a of this.armies)
    {
      if(a.COP.x == x && a.COP.y == y)
      {
        result++;      
      }    
      
      for (let ss of a.supplySources)
      {
        if (ss.x == x && ss.y == y)
        {
          result++;  
        }      
      }
    }
    
    return result;
  }
}





