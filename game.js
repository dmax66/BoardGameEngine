// 
// Helper functions to handle AJAX callbacks
//

//
// Possible improvement: theGame created when the data is loaded
//

'use strict';

function gameLoad (xhttp_obj) {

}


function gameGetID (xhttp_obj) {
  theGame.id = xhttp_obj.responseText;
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

  static weatherTable=[];

  constructor (id) {
    this.id               = id;
    this.name             = "";
    this.scenarioId       = "";
    this.currentPlayer    = 0;      
    this.currentTurn      = 0;
    this.endTurn          = 0;
    this.currentSegment   = 0;
    this.weather          = ""; 
    this.players          = [];
    this.leaders          = [];
    this.units            = [];
    this.armies           = [];
    this.nations          = [];
    
    this.gameWidget = null;
    
    this.calendar = [];
    this.weatherTable = [];
  }



  constructor_old (id, name, scenarioId, currentTurn, endTurn, currentPlayer, currentSegment, weather, players) {
    this.id               = id;
    this.name             = name;
    this.scenarioId       = scenarioId;
    this.currentPlayer    = 1 * currentPlayer;      
    this.currentTurn      = 1 * currentTurn;
    this.endTurn          = 1 * endTurn;
    this.currentSegment   = 1 * currentSegment;
    this.weather          = weather; 
    this.players          = players;
    
    this.gameWidget = null;
    
    this.calendar = [];
    this.weatherTable = [];
  }


  initFromScenario (scenario_id) {
    // Get scenario data from DB and populate internal structures
    //  const url = "app/get_scenario_data.php?scenario_id=" + scenario_id;
    //  call_server_api_get (url, get_scenario_data);
    
    // Create the new game in the database, get the new game ID
    call_server_api_get ("app/create_game_from_scenario.php?scenario_id=" + scenario_id + "&game_name=" + this.name, gameGetID);
    loadDataFromDB (this.id);
  
    // Close the create game modal box
    // @TODO: move to the UI modules
    document.getElementById("newgame_box").style.display="none";
    
    // And get the game begin
    this.play();
  }

  load () {
    this.loadDataFromDB ();
    
    this.play();
  }
  
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
  constructor () {}
  
  static Players = [];
  static Nations = [];
  static Armies = [];
  static leaders = [];
  static units = [];
  static gameData = null;
  
  
  static LoadGame (id) {
    call_server_api_get ("app/load_table_for_game.php?table=Games&gameId="   + id, GameFactory.Game_callback);

    call_server_api_get ("app/load_table_for_game.php?table=Players&gameId=" + id, GameFactory.Players_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Nations&gameId=" + id, GameFactory.Nations_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Armies&gameId="  + id, GameFactory.Armies_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Leaders&gameId=" + id, GameFactory.Leaders_callback);
    call_server_api_get ("app/load_table_for_game.php?table=units&gameId="   + id, GameFactory.units_callback);

    newGame = new Game (id);
    newGame.units = units;
    newGame.nations = nations;
    newGame.armies = armies;
    newgame.leaders = leaders; 

    for (let i = 0; i < GameFactory.Players.length; i++) {
      for (let j = 0; j < GameFactory.Nations.length; j++) {
        if (GameFactory.Players[i].symbol == GameFactory.Nations[j].playerId) {
          GameFactory.Players[i].nations.push (GameFactory.Nations[j]);
        }      
      }
    
      for (let j = 0; j < GameFactory.Armies.length; j++) {
        if (GameFactory.Players[i].symbol == GameFactory.Armies[j].playerId) {
          GameFactory.Players[i].armies.push (GameFactory.Armies[j]);
        }      
      }

      for (let j = 0; j < GameFactory.leaders.length; j++) {
        if (GameFactory.Players[i].symbol == GameFactory.leaders[j].player) {

          // Assign the unit to a leader
          for (let k = 0; k < GameFactory.units.length) {
            if (GameFactory.units[k].parentId == GameFactory.Players[i].symbol)
              GameFactory.leaders[i].units.push (GameFactory.units[k])
            }

          GameFactory.Players[i].leaders.push (GameFactory.leaders[j]);
        }      
      }

      for (let j = 0; j < GameFactory.units.length; j++) {
        if (GameFactory.Players[i].symbol == GameFactory.units[j].playerId) {
          GameFactory.Players[i].units.push (GameFactory.units[j]);
        }      
      }
    }

    return new Game (
      GameFactory.gameData.gameId, 
      GameFactory.gameData.name, 
      GameFactory.gameData.scenarioId, 
      GameFactory.gameData.currentTurn, 
      GameFactory.gameData.endTurn, 
      GameFactory.gameData.currentPlayer, 
      GameFactory.gameData.currentSegment, 
      GameFactory.gameData.weather, 
      GameFactory.Players
    );  
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
    
    json_data = JSON.parse (xhttp_obj.responseText);     

    for (let i = 0; i < json_data.length; i++) {
      const newPlayer = new Player (json_data[i]);
      GameFactory.Players.push (newPlayer);    
    }
  }  

  static Nations_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    json_data = JSON.parse (xhttp_obj.responseText);     

    for (let i = 0; i < json_data.length; i++) {
      const newNation = new Nation (json_data[i]);
      GameFactory.Nations.push (newNation);    
    }
  }  

  static Armies_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    const json_data = JSON.parse (xhttp_obj.responseText);     

    for (let i = 0; i < json_data.length; i++) {
      const newArmy = new Army (json_data[i]);
      GameFactory.Armies.push (newArmy);    
    }
  }  
  
  static units_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    json_data = JSON.parse (xhttp_obj.responseText);     

    for (let i = 0; i < json_data.length; i++) {
      const newUnit = new Unit (json_data[i]);
      GameFactory.units.push (newUnit);    
    }
  }  

  static Leaders_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    json_data = JSON.parse (xhttp_obj.responseText);     

    for (let i = 0; i < json_data.length; i++) {
      const newLeader = new Leader (json_data[i]);
      GameFactory.leaders.push (newLeader);    
    }
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





