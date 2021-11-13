// 
// Helper functions to handle AJAX callbacks
//

//
// Possible improvement: theGame created when the data is loaded
//

'use strict';

function gameLoad (xhttp_obj) {

}


let game_mode = "Null";
let scenario_data = null;

const frPlayerIndex = 0;
const alPlayerIndex = 1;


class Game {
  static sequenceOfPlay = [   
    [ "Command Phase", "Administrative Segment" ],
    [ "Command Phase", "Organization Segment" ],
    [ "Movement Phase", "Movement Command Segment" ],
    [ "Movement Phase", "Individual Initiative Segment" ],
    [ "Movement Phase", "Bridge Segment" ],
    [ "Combat Phase", "Forced March Segment" ],
    [ "Combat Phase", "Battle Resolution Segment" ],
    [ "Combat Phase", "Disorganization and Rally Segment" ]
  ];

  constructor (id,  name, scenarioId, currentTurn, endTurn, currentPlayer, currentSegment, weather) {
    this.id               = id;
    this.name             = "";
    this.scenarioId       = "";
    this.currentPlayer    = 0;      
    this.currentTurn      = 0;
    this.endTurn          = 0;
    this.currentSegment   = 0;
    this.weather          = ""; 
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
    
    // And get the game begin
    this.play();
  }

/*
  load () {
    this.loadDataFromDB ();
    
    this.play();
  }
*/  
  create_UI_elements () {
    this.gameWidget = new UI_Game_Widget (document.getElementById ("StatusBar"));
    
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].create_UI_widgets (document.getElementById ("StatusBar"));

      for (let j = 0; j < this.players[i].nations.length; j++) {
        this.players[i].nations[j].create_UI_widgets (this.players[i].playerWidget.nationTable);
      }

      for (let j = 0; j < this.players[i].armies.length; j++) {
        this.players[i].armies[j].create_UI_widgets (this.players[i].playerWidget.armyTable);
      }
    }
  }
  
  play () {
    // Close the load game modal box
     // @TODO: move to the UI modules
    document.getElementById("loadgame_box").style.display="none";
    
    // Close the main menu
    // @TODO: move to the UI modules
    document.getElementById("main_menu_id").style.display="none";
    
    this.create_UI_elements ();
    this.loadCalendar ();
    this.loadWeatherTable ();    
    
    // Update weather, turn, phase, segment widgets
    this.gameWidget.updateWeather ("fair");
    this.gameWidget.updateTurn ("Turn " + this.currentTurn);
    this.gameWidget.updateDate ("16 Apr");      
    this.gameWidget.updatePhaseAndSegment (Game.sequenceOfPlay[this.currentSegment][0] + ":" + Game.sequenceOfPlay[this.currentSegment][1]);      
    
    // Draw the player status
    this.players[this.currentPlayer].show ();
    
    // Draw own the units
    const numLeaders = this.players[this.currentPlayer].leaders.length;
    for (let i =0; i < numLeaders; i++) { 
      if (this.players[this.currentPlayer].leaders[i].parentId == null) {
        this.players[this.currentPlayer].leaders[i].draw();
      }
    }

    // Draw enemy leaders within visibility range
    const otherPlayer = this.otherPlayer ();
    for (let i =0; i < this.players[otherPlayer].leaders.length; i++) { 
      if (this.players[otherPlayer].leaders[i].parentId == null) {
        if (this.players[otherPlayer].leaders[i].nearEnemy()) {
          this.players[otherPlayer].leaders[i].draw();
        }
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

    if (this.currentSegment >= game.sequencePlay.length) {
      this.currentPlayer++;
      if (this.currentPlayer >= this.players.length) {
        // New turn
        this.currentPlayer = 0;            
        this.currentSegment = 0;
        this.currenTurn++;
      
      // Update the weather
      }

      if (this.currenTurn > this.endTurn ) {
        // Game ended
      }
    }  
  }
  
  rollDieForWeather () {
    const i = Math.floor ((Math.random() * 6) + 1);  
    
    const season = this.calendar.season (currentTurn);
    weather = weatherTable [season][i]; 
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

}


// Used to load data from the DB
let json_data = [];




class GameFactory {
  static Players = [];
  static Nations = [];
  static Armies = [];
  static leaders = [];
  static units = [];
  // static gameData = null;
  
  static players_data = null;
  static nations_data = null;
  static armies_data  = null;
  static leaders_data = null;
  static units_data   = null;
  static gameData     = null;

  constructor () {}
  
  
  static LoadGame (id) {
    call_server_api_get ("app/load_table_for_game.php?table=Games&gameId="   + id, GameFactory.Game_callback);

    call_server_api_get ("app/load_table_for_game.php?table=Players&gameId=" + id, GameFactory.Players_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Nations&gameId=" + id, GameFactory.Nations_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Armies&gameId="  + id, GameFactory.Armies_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Leaders&gameId=" + id, GameFactory.Leaders_callback);
    call_server_api_get ("app/load_table_for_game.php?table=units&gameId="   + id, GameFactory.Units_callback);

    newGame = new Game (
      id, 
      GameFactory.gameData.name, 
      GameFactory.gameData.scenarioId, 
      GameFactory.gameData.currentTurn, 
      GameFactory.gameData.endTurn, 
      GameFactory.gameData.currentPlayer, 
      GameFactory.gameData.currentSegment, 
      GameFactory.gameData.weather,
      GameFactory.players,
      GameFactory.nations,
      GameFactory.armies,
      GameFactory.leaders,
      GameFactory.units
    );
    
    for (let i = 0; i < players_data.length; i++) {
      const newPlayer = new Player (players_data[i]);
      newGame.Players.push (newPlayer);    
    }

    for (let i = 0; i < nations_data.length; i++) {
      const newNation = new Nation (nations_data[i]);
      newGame.Nations.push (newNation);    
    }

    for (let i = 0; i < armies_data.length; i++) {
      const newArmy = new Army (armies_data[i]);
      newGame.Armies.push (newArmy);    
    }
    
    for (let i = 0; i < leaders_data.length; i++) {
      const newLeader = new Leader (leaders_data[i]);
      newGame.leaders.push (newLeader);    
    }

    for (let i = 0; i < units_data.length; i++) {
      const newUnit = new Unit (units_data[i]);
      newGame.units.push (newUnit);    
    }


    // Build the hierarchy
    // Assign objects to the players
    for (let i = 0; i < newGame.players.length; i++) {
      thePlayer = newGame.players[i];

      // Add Nations 
      for (let j = 0; j < newGame.nations.length; j++) {
        if (thePlayer.playerId == newGame.nations[j].playerId) {
          thePlayer.addNation (newGame.nations[j]);
        }      
      }
    
      // Add Armies 
      for (let j = 0; j < this.armies.length; j++) {
        if (thePlayer.playerId == newGame.armies[j].playerId) {
          thePlayer.addArmy (newGame.armies[j]);
        }      
      }

      // Add leaders
      for (let j = 0; j < newGame.leaders.length; j++) {
        if (thePlayer.playerId == newGame.leaders[j].playerId) {
          thePlayer.addLeader (newGame.leaders[j]);
        }
      }

      // Add units
      for (let j = 0; j < newGame.units.length; j++) {
        if (thePlayer.playerId == newGame.units[j].playerId) {
          thePlayer.addUnit (newGame.units[j]);
        }
      }
    }
    
    // Add objects to leaders
    for (let i = 0; i < newGame.leaders.length, i++) {
    
      // Add units
      for (let j = 0; j < newGame.units.length; j++) {
        if (newGame.units[j].parentId == newGame.leaders[i].leaderId) {
          newGame.leaders[i].addUnit (newGame.units[j]);
        }
      }      

      // Assign subordinates to their leaders  
      for (let j = 0; j < newGame.leaders.length; j++) {
        if (newGame.leaders[j].parentId == newGame.leaders[i].leaderId) {
          newGame.leaders[i].addSubordinate (newGame.leaders[j]);
        }
      }      
    }

    return newGame;
  }
  
  static Game_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.gameData = JSON.parse(xhttp_obj.responseText)[0];
  }


  static Players_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.players_data = JSON.parse (xhttp_obj.responseText);     
  }  

  static Nations_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.nations_data = JSON.parse (xhttp_obj.responseText);     
  }  

  static Armies_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.armies_data = JSON.parse (xhttp_obj.responseText);     
  }  
  
  static Units_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.units_data = JSON.parse (xhttp_obj.responseText);     
  }  

  static Leaders_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.leaders_data = JSON.parse (xhttp_obj.responseText);     
  }  

  static generic_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load table: " + xhttp_obj.responseText);
      return;
    }
    
    json_data = JSON.parse (xhttp_obj.responseText);     
  }  
  
  static LoadTable (tableName) {
    call_server_api_get ("app/load_table.php?table=" + tableName, GameFactory.generic_callback); 
  }

}





