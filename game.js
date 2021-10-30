// 
// Helper functions to handle AJAX callbacks
//

//
// Possible improvement: theGame created when the data is loaded
//

'use strict';

function gameLoad (xhttp_obj) {
  const game_data = JSON.parse(xhttp_obj.responseText)[0];

  theGame.scenarioId       = game_data.Scenario_ID;
  theGame.currentTurn      = game_data.CurrentTurn;
  theGame.endTurn          = game_data.EndTurn;
  theGame.currentPlayer    = game_data.CurrentPlayer;
  theGame.currentPhase     = game_data.CurrentPhase;
  theGame.weather          = game_data.Weather;
  theGame.frenchAP         = game_data.FrenchAdminPoints;
  theGame.armyOfSilesiaAP  = game_data.ArmyOfSilesiaAdminPoints;
  theGame.armyOfBohemiaAP  = game_data.ArmyOfBohemiaAdminPoints;
  theGame.armyOfTheNorthAP = game_data.ArmyOfTheNorthAdminPoints;
  theGame.frenchRP         = game_data.FrenchReinforcementPoints;
  theGame.guardRP          = game_data.FrenchGuardReinforcementPoints;
  theGame.russianRP        = game_data.RussianReinforcementPoints;
  theGame.prussianRP       = game_data.PrussianReinforcementPoints;
  theGame.austrianRP       = game_data.AustrianReinforcementPoints
  theGame.swedishRP        = game_data.SwedishReinforcementPoints;
  theGame.frenchMorale     = game_data.FrenchMorale;
  theGame.alliedMorale     = game_data.AlliedMorale;
}


function gameGetID (xhttp_obj) {
  theGame.id = xhttp_obj.responseText;
}


let game_mode = "Null";
let scenario_data = null;




class game {
  static sequenceOfPlay = [
    [ "French", "Command Phase", "Administrative Segment" ],
    [ "French", "Command Phase", "Organization Segment" ],
    [ "French", "Movement Phase", "Movement Command Segment" ],
    [ "French", "Movement Phase", "Individual Initiative Segment" ],
    [ "French", "Movement Phase", "Bridge Segment" ],
    [ "French", "Combat Phase", "Forced March Segment" ],
    [ "French", "Combat Phase", "Battle Resolution Segment" ],
    [ "French", "Combat Phase", "Disorganization and Rally Segment" ],
  
    [ "Allied", "Command Phase", "Administrative Segment" ],
    [ "Allied", "Command Phase", "Organization Segment" ],
    [ "Allied", "Movement Phase", "Movement Command Segment" ],
    [ "Allied", "Movement Phase", "Individual Initiative Segment" ],
    [ "Allied", "Movement Phase", "Bridge Segment" ],
    [ "Allied", "Combat Phase", "Forced March Segment" ],
    [ "Allied", "Combat Phase", "Battle Resolution Segment" ],
    [ "Allied", "Combat Phase", "Disorganization and Rally Segment" ],
  ];



  constructor() {
    this.name             = "";
    this.id               = "";
    this.scenarioId       = "";
    this.currentTurn      = 0;
    this.endTurn          = 0;
    this.currentPhase     = 0;
    this.weather          = "";
    this.frenchAP         = 0;
    this.armyOfSilesiaAP  = 0;
    this.armyOfBohemiaAP  = 0;
    this.armyOfTheNorthAP = 0;
    this.frenchRP         = 0;
    this.guardRP          = 0;
    this.russianRP        = 0;
    this.prussianRP       = 0;
    this.austrianRP       = 0;
    this.swedishRP        = 0;
    this.frenchMorale     = 0;
    this.alliedMorale     = 0;
    
    this.frenchPlayer = new player ("French", ['f', 'pl']);
    this.alliedPlayer = new player ("Allied", ['a', 'p', 'r', 's']);
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
    
    // Close the load game modal box
     // @TODO: move to the UI modules
    document.getElementById("loadgame_box").style.display="none";
    
    // Close the main menu
    // @TODO: move to the UI modules
    document.getElementById("main_menu_id").style.display="none";
    
    // And get the game begin
    // Initialise admin points, morale, reinforcement points
    this.frenchPlayer.setAdminPoints         (game.frenchAP);
    this.frenchPlayer.setMorale              (game.frenchMorale);
    this.frenchPlayer.setReinforcementPoints (game.frenchRP);
  
    this.alliedPlayer.setAdminPoints         (game.armyOfSilesiaAP);
    this.alliedPlayer.setMorale              (game.alliedMorale);
    this.alliedPlayer.setReinforcementPoints (game.prussianRP);
    
    this.play();
  }
  
  loadDataFromDB () {
    call_server_api_get ("app/load_game.php?game_id=" + this.id, gameLoad);
    call_server_api_get ("app/load_leaders.php?game_id=" + this.id, createLeaders);
    call_server_api_get ("app/load_units.php?game_id=" + this.id, createUnits);
  }
   

  play () {
    //
    // To be parameterised
    //
    if (game.sequenceOfPlay[this.currentTurn][0] == "French") {
      // Draw the player status
      this.frenchPlayer.drawSelf();
      
      for (var i=0; i < leaders.length; i++) { 
        if (leaders[i].player() == "French" || leaders[i].nearEnemy()) {
          leaders[i].drawSelf();
        }
      }
    }
    else { 
      // Draw the player status
      this.alliedPlayer.drawSelf();
      
      for (var i=0; i < leaders.length; i++) {
        if (leaders[i].player() == "Allied" || leaders[i].nearEnemy()) {
          leaders[i].drawSelf();
        }
      }
    }
  }

  
  advanceGame () {
    this.currentPhase++;
    if (this.currentPhase > this.length) {
      this.currenTurn++;
      this.currentPhase = 0;
    }

    if (this.currenTurn > this.endTurn ) {
      // Game ended
    }  
  }
}



let theGame = new game();


