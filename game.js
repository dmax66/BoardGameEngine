'use strict';

// Used to load data from the DB
let json_data = [];


class Game {
  static sequenceOfPlay = [   
    { id: "WD",   phase:"Command Phase",  segment:"Weather Determination",             action: Game.determineWeather },
    { id: "aAP",  phase:"Command Phase",  segment:"Allocate AP",                       action: Game.allocateAP       },
    { id: "mSS",  phase:"Command Phase",  segment:"Move Supply Source",                action: Game.moveSS           },
    { id: "dCOP", phase:"Command Phase",  segment:"Disband COP",                       action: Game.doNothing        },
    { id: "aSS",  phase:"Command Phase",  segment:"Activate Supply Source",            action: Game.activateSS       },
    { id: "gAP",  phase:"Command Phase",  segment:"Get AP",                            action: Game.getAP            },
    { id: "OS",   phase:"Command Phase",  segment:"Organization Segment",              action: Game.doNothing        },
    { id: "MC",   phase:"Movement Phase", segment:"Issue Movement Commands",           action: Game.doNothing        },
    { id: "mCOP", phase:"Movement Phase", segment:"Move COP",                          action: Game.moveCOP          },
    { id: "IIS",  phase:"Movement Phase", segment:"Individual Initiative Segment",     action: Game.doNothing        },
    { id: "BS",   phase:"Movement Phase", segment:"Bridge Segment",                    action: Game.doNothing        },
    { id: "FMS",  phase:"Combat Phase",   segment:"Forced March Segment",              action: Game.doNothing        },
    { id: "BRS",  phase:"Combat Phase",   segment:"Battle Resolution Segment",         action: Game.doNothing        },
    { id: "DRS",  phase:"Combat Phase",   segment:"Disorganization and Rally Segment", action: Game.doNothing        }
  ];

  constructor (id,  name, scenarioId, currentTurn, endTurn, currentPlayer, currentSegment, weather) 
  {
    this.id               = id;
    this.name             = "";
    this.scenarioId       = "";
    this.currentPlayer    = 1 * currentPlayer;      
    this.currentTurn      = 1 * currentTurn;
    this.endTurn          = 1 * endTurn;
    this.currentSegment   = 1 * currentSegment;
    this.weather          = weather; 

    // Hierarchy
    this.currentPlayerObj = null;
    this.players          = [];
    this.nations          = new Map;
    this.armies           = new Map;
    this.leaders          = new Map ();
    this.units            = new Map ();
    
    // Tables
    this.calendar = [];
    this.weatherTable = [];
    this.aPPTable = new APPTable (); 

    // GUI objects
    this.gameWidget = null;
  }

  static responseFromDB = "";

  static getid_callback (xhttp_obj) {
    responseFromDB = xhttp_obj.responseText;
  }
  
  
  addPlayer (p)
  {
    this.players.push (p);  
  }

  
  addLeader (l)
  {
    this.leaders.set (l.leaderId, l);
  }

  
  addNation (n)
  {
    this.nations.set (n.nationId, n);
  }
  
  
  addArmy (a)
  {
    this.armies.set (a.armyId, a);
  }
  
  
  addUnit (u)
  {
    this.units.set (u.unitId, u);
  }


  initFromScenario (scenario_id) 
  {
    // Get scenario data from DB and populate internal structures
    // const url = "app/get_scenario_data.php?scenario_id=" + scenario_id;
    // call_server_api_get (url, get_scenario_data);
    
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



  // Returns an instance of class Unit whose id == unitId
  getUnit (unitId) 
  {
    return this.units.get (unitId);
  }
  


  // Returns an instance of class Leader whose id == unitId
  getLeader (leaderId) 
  {
    return this.leaders.get (leaderId);
  }
  

  getArmy (armyId)
  {
    return this.armies.get (armyId);
  }
  
  
  // Move to the controller?

  create_UI_elements () 
  {
    const statusBar = document.getElementById ("StatusBar");
    this.gameWidget = new UI_Game_Widget (statusBar);
    
    for (let i = 0; i < this.players.length; i++) 
    {
      const p = this.players[i];
      
      p.create_UI_widgets (statusBar);

      for (let entry of p.armies.entries()) 
      {
        const a = entry[1];
                
        a.create_UI_widgets (p.playerWidget.armyTable);
      }

      for (let entry of p.nations.entries()) 
      {
        const n = entry[1];
        
        n.create_UI_widgets (p.playerWidget.nationTable);
      }
    }
  }

  
  resume () 
  {
    this.create_UI_elements ();
    this.loadCalendar ();
    this.loadWeatherTable (); 
    this.loadAPPTable ();   
    
    // Update weather, turn, phase, segment widgets
    this.gameWidget.updateTurn ("Turn " + this.currentTurn);
    this.gameWidget.updateDate (this.calendar[this.currentTurn].days);      
    
    this.currentPlayerObj = this.players[this.currentPlayer];    
    
    // Draw the player status
    this.players[this.currentPlayer].show ();
    this.players[this.currentPlayer].draw ();
    
    // Draw own the units
    for (let l of this.currentPlayerObj.leaders.values()) 
    { 
      if (l.parentId == null) 
      {
        l.draw();
      }
    }

    // Draw enemy leaders within visibility range
    for (let i = 0; i < this.players.length; i++)
    { 
      if (i == this.currentPlayer)
      {
        continue;
      }

      const p = this.players[i];
      
      for (let l of p.leaders.values())
      {
        if (l.parentId == null && l.nearEnemy ()) 
        {
            l.draw();
        }
      }
    }
    
    if (this.currentSegment == -1)
    {
      // Begin of a scenario
      // Start with currentSegment == -1
      // Move to state 0, triggering all actions
      
      this.positionFloatingUnits ();
//      this.chooseSS ();
    }
    
    // Draw the COP (if active) and SS fpr each army
    for (let a of this.currentPlayerObj.armies.values())
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


  positionFloatingUnits ()
  {
    let floatingUnits = [];
    
    // Get list of floating units
	  for (let l of theGame.currentPlayerObj.leaders.values())
		{
	    if (l.x == "" || l.y == "")
	    {
	      // Add leader to list of units to be placed
	      floatingUnits.push (l);
	    }
		}

	  // COP
	  for (let a of theGame.currentPlayerObj.armies.values())
	  {
	    floatingUnits.push (a.COP);
	  }
	  
	  Controller.openPositionUnitPopup (floatingUnits);
  }
  
  
  advanceGame () 
  {
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

      if (this.currenTurn > this.endTurn ) 
      {
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
  
  loadAPPTable ()
  {
    GameFactory.LoadTable ("APPTable");
    this.aPPTable.init (json_data);     
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


  static allocateAP ()
  {
    Controller.openAllocateAPDialog ();
  }


  static moveSS ()
  {
  }
  
  static disbandCOP ()
  {
  }
  
  static activateSS ()
  {
    for (let a of theGame.currentPlayerObj.armies.values())
    {
      if (a.activeSSName == null && theGame.currentTurn >= a.reactivateSSTurn)
      {
        const dlgBox = new ActivateSSDialogBox ("activate_SS", theGame.currentPlayerObj);
        dlgBox.open ();
      }    
    }

    theGame.advanceGame ();
  }
  
  
  static getAP ()
  {
    for (let entry of theGame.currentPlayerObj.armies.entries())
    {
      const a = entry[1];
      
      if (! a.COP.isActive)
      {
        alert ("Army " + a.name + ": COP not active - cannot receive AP");
        continue;
      }
      
      if (! a.isSSActive())
      {
        alert ("Army " + a.name + ": Supply Source not active - cannot receive AP");
        continue;
      }
      
      // Assert: both COP and SS active
      Controller.openReceiveAPDialog (theGame.currentPlayerObj.armies, theGame.calendar[theGame.currentSegment].season); 
    }
  }
  
  
  static doNothing ()
  {
  }
  
  
  numberOfMarkersInHex (x, y)
  {
    let result = 0;
    
    // Leaders
    for (let entry of this.leaders.entries())
    {
      const l = entry[1];
      
      if (l.x == x && l.y == y && l.parent == null)
      {
        result++;      
      }
    }  
    
    // Supply sources
    
    // CoPs
    for (let entry of this.armies.entries())
    {
      const a = entry[1];
      
      if (a.COP.x == x && a.COP.y == y)
      {
        result++;      
      }    
      
      for (let entry of a.supplySources.entries())
      {
        const ss = entry[1];
        
        if (ss.x == x && ss.y == y)
        {
          result++;  
        }      
      }
    }
    
    return result;
  }
}





