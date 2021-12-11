'use strict';

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
  static ss_data      = null;

  constructor () {}
  
  
  static LoadGame (id) {
    call_server_api_get ("app/load_table_for_game.php?table=Games&gameId="   + id, GameFactory.Game_callback);

    call_server_api_get ("app/load_table_for_game.php?table=Players&gameId=" + id, GameFactory.Players_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Nations&gameId=" + id, GameFactory.Nations_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Armies&gameId="  + id, GameFactory.Armies_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Leaders&gameId=" + id, GameFactory.Leaders_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Units&gameId="   + id, GameFactory.Units_callback);
    call_server_api_get ("app/load_table_for_game.php?table=SupplySources&gameId="   + id, GameFactory.SupplySource_callback);

    const newGame = new Game (
      id, 
      GameFactory.gameData.name, 
      GameFactory.gameData.scenarioId, 
      GameFactory.gameData.currentTurn, 
      GameFactory.gameData.endTurn, 
      GameFactory.gameData.currentPlayer, 
      GameFactory.gameData.currentSegment, 
      GameFactory.gameData.weather
    );
    
    for (let i = 0; i < GameFactory.players_data.length; i++) {
      const newPlayer = new Player (GameFactory.players_data[i]);
      newGame.players.push (newPlayer);    
    }

    for (let i = 0; i < GameFactory.nations_data.length; i++) {
      const newNation = new Nation (GameFactory.nations_data[i]);
      newGame.nations.push (newNation);    
    }

    for (let i = 0; i < GameFactory.armies_data.length; i++) {
      const newArmy = new Army (GameFactory.armies_data[i]);
      newGame.armies.push (newArmy);    
    }
    
    for (let i = 0; i < GameFactory.leaders_data.length; i++) {
      const newLeader = new Leader (GameFactory.leaders_data[i]);
      newGame.leaders.push (newLeader);    
    }

    for (let i = 0; i < GameFactory.units_data.length; i++) {
      const newUnit = new Unit (GameFactory.units_data[i]);
      newGame.units.push (newUnit);    
    }


    // Build the hierarchy
    // Assign objects to the players
    for (let i = 0; i < newGame.players.length; i++) {
      const thePlayer = newGame.players[i];

      // Add Nations 
      for (let j = 0; j < newGame.nations.length; j++) {
        if (thePlayer.playerId == newGame.nations[j].playerId) {
          thePlayer.addNation (newGame.nations[j]);
        }      
      }
    
      // Add Armies 
      for (let j = 0; j < newGame.armies.length; j++) {
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
    for (let i = 0; i < newGame.leaders.length; i++) {
    
      // Add units
      for (let j = 0; j < newGame.units.length; j++) {
        if (newGame.units[j].commandedBy == newGame.leaders[i].leaderId) {
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

    // Add Supply Sources to Armies
    for (let a of newGame.armies) {
      for (let ss of this.ss_data) {
        if (ss.armyId == a.armyId) {
          a.addSS (ss)        
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

  static SupplySource_callback (xhttp_obj) {
    if (xhttp_obj.responseText.substring (1,5) == "ERROR") {
      throw ("Unable to load Table: " + xhttp_obj.responseText);
      return;
    }
    
    GameFactory.ss_data = JSON.parse (xhttp_obj.responseText);     
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


