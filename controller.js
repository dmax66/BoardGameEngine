class Controller {
  static rollOneDie () 
  {
    return Math.floor ((Math.random() * 6) + 1);  
  }


  static showWeatherDialog ()
  {
    weatherDialogBox.open ();
  }
  
  
  static onCloseWeatherDialog ()
  {
    weatherDialogBox.close ();
    theGame.weather = weatherDialogBox.getWeather ();
    theGame.gameWidget.updateWeather (theGame.weather);  
  }



  
  static modifyUnitStrength () {
  }
  

  static makeMajGen () {
  }


  static transferUnitToLeader (event) {
    // find the unit
    const unitId = event.target.id.slice(2);

    // find the current commander  
  
  
    // ask for the new commander betweem those in the same hex
    
    // and do the transfer
    theUnit.transferToLeader (newLeader);
  }
  
  

  static transferReplacementToUnit () {
  } 
  
  
  static updatePlayerWidget (player) 
  {
    player.moraleWidget.setValue (player.morale);
  
    for (let entry of player.nations.entries())
    {
      const n = entry[1];
      
      n.infReplPointWidget.setValue (n.infReplacementPoints);
      n.cavReplPointWidget.setValue (n.cavReplacementPoints);
      n.artReplPointWidget.setValue (n.artReplacementPoints);
    }
    
    for (let entry of player.armies.entries())
    {
      const a = entry[1];
      
      a.APwidget.setValue (a.adminPoints);
    }
  }


  static openReceiveAPDialog (armies)
  {
    getAPDialogBox.open (armies, theGame.calendar[theGame.currentTurn].season);
  }
  
  
  static onCloseReceiveAPDialog ()
  {
    getAPDialogBox.close();
    
    for (let entry of theGame.players[theGame.currentPlayer].armies.entries())
    {
      const a = entry[1];
            
      const ap = getAPDialogBox.getAP (a.armyId);
      a.receiveAP (ap);
      a.draw ();
    }
    
    alert ("AP received");
    
    theGame.advanceGame ();
  }



  static openAllocateAPDialog ()
  {
    allocateAPDialogBox.open (theGame.players[theGame.currentPlayer].armies);
  }
  
  
  static allocateAP ()
  {
    for (let entry of theGame.players[theGame.currentPlayer].armies.entries())
    {
      const a = entry[1];
      const ap = allocateAPDialogBox.getAllocatedAP (a.armyId);
      a.allocateAP (ap);
      a.draw ();
    }
    
    alert ("AP allocated");
    
    theGame.advanceGame ();
  }

}