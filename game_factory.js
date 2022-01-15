'use strict';

class GameFactory 
{
  static players_data = null;
  static nations_data = null;
  static armies_data  = null;
  static leaders_data = null;
  static units_data   = null;
  static gameData     = null;
  static ss_data      = null;

  constructor () {}
  
  
  static LoadGame (id) 
  {
    call_server_api_get ("app/load_table_for_game.php?table=Games&gameId="         + id, GameFactory.Game_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Players&gameId="       + id, GameFactory.Players_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Nations&gameId="       + id, GameFactory.Nations_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Armies&gameId="        + id, GameFactory.Armies_callback); 
    call_server_api_get ("app/load_table_for_game.php?table=Leaders&gameId="       + id, GameFactory.Leaders_callback);
    call_server_api_get ("app/load_table_for_game.php?table=Units&gameId="         + id, GameFactory.Units_callback);
    call_server_api_get ("app/load_table_for_game.php?table=SupplySources&gameId=" + id, GameFactory.SupplySource_callback);

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
    
    for (let d of GameFactory.players_data) 
    {
      const newPlayer = new Player (d);
      newGame.addPlayer (newPlayer);    
    }

    for (let d of GameFactory.nations_data) 
    {
      const newNation = new Nation (d);
      newGame.addNation (newNation);    
    }

    for (let d of GameFactory.armies_data) 
    {
      const newArmy = new Army (d);
      newGame.addArmy (newArmy);    
    }
    
    for (let d of GameFactory.leaders_data) 
    {
      const newLeader = new Leader (d);
      newGame.addLeader (newLeader);    
    }

    for (let d of GameFactory.units_data) 
    {
      const newUnit = new Unit (d);
      newGame.addUnit (newUnit);    
    }


    // Build the hierarchy
    // Assign objects to the players
    for (let thePlayer of newGame.players) 
    {
      // Add Nations 
      for (let n of newGame.nations.values ()) 
      {
        if (thePlayer.playerId == n.playerId) 
        {
          thePlayer.addNation (n);
        }      
      }
    
      // Add Armies 
      for (let a of newGame.armies.values ()) 
      {
        if (thePlayer.playerId == a.playerId) 
        {
          thePlayer.addArmy (a);
        }      
      }

      // Add leaders
      for (let l of newGame.leaders.values ())
      {
        if (thePlayer.playerId == l.playerId) 
        {
          thePlayer.addLeader (l);
        }
      }

      // Add units
      for (let u of newGame.units.values ()) 
      {
        if (thePlayer.playerId == u.playerId) 
        {
          thePlayer.addUnit (u);
        }
      }
    }
    
    // Add objects to leaders
    for (let l of newGame.leaders.values ()) 
    {
      // Add units
      for (let u of newGame.units.values ()) 
      {
        if (u.commandedBy == l.leaderId) 
        {
          l.addUnit (u);
        }
      }      

      // Assign subordinates to their leaders  
      for (let sl of newGame.leaders.values ()) 
      {
        if (sl.parentId == l.leaderId) 
        {
          l.addSubordinate (sl);
        }
      }      
    }

    // Add Supply Sources to Armies
    for (let a of newGame.armies.values ()) 
    {
      for (let ss of this.ss_data) 
      {
        if (ss.armyId == a.armyId) 
        {
          a.addSS (ss)        
        }      
      }    
    }

    // Add leaders to nations
    for (let n of newGame.nations.values ())
    {
      for (let l of newGame.leaders.values ())
      {
        if (l.nationId == n.nationId)
        {
          n.addLeader (l);        
        }      
      }
    }

    // Add leaders to armies
    for (let a of newGame.armies.values ())
    {
      for (let l of newGame.leaders.values ())
      {
        if (l.armyId == a.armyId)
        {
          a.addLeader (l);        
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


