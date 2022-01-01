class Controller {
  static rollOneDie () 
  {
    return Math.floor ((Math.random() * 6) + 1);  
  }


  static showWeatherDialog ()
  {
    document.getElementById("weather_box").style.display = "initial";
    document.getElementById ("weather_text").value = "";
  }
  
  
  static rollDieForWeather ()
  {
    document.getElementById ("weather_text").value = "";
    document.getElementById ("weather_ok_button").disabled = true;  
    
    dieRollDialogBox.open ();
    
    const i = dieRollDialogBox.getDieRoll();  
    const season = theGame.calendar[theGame.currentTurn].season;
   
    for (let k of theGame.weatherTable)
    {
      if (k.Season == season && k.DieRoll == i)
      {
        theGame.weather = k.Weather;
        break; 
      }
    }

    document.getElementById ("weather_text").style.visibility = "visible";
    document.getElementById ("weather_text").value = theGame.weather;
    document.getElementById ("weather_ok_button").disabled = false;  

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
  
  
  static updatePlayerWidget (player) {
    player.moraleWidget.setValue (player.morale);
  
    for (let i = 0; i < player.nations.length; i++)
    {
      player.nations[i].infReplPointWidget.setValue (player.nations[i].infReplacementPoints);
      player.nations[i].cavReplPointWidget.setValue (player.nations[i].cavReplacementPoints);
      player.nations[i].artReplPointWidget.setValue (player.nations[i].artReplacementPoints);
    }
    
    for (let i = 0; i < player.armies.length; i++)
    {
      player.armies[i].APwidget.setValue (player.armies[i].adminPoints);
    }
  }


  static openReceiveAPDialog (armies)
  {
    getAPDialogBox.open (armies, theGame.calendar[theGame.currentTurn].season);
  }
  
  
  static onCloseReceiveAPDialog ()
  {
    for (let a of theGame.players[theGame.currentPlayer].armies)
    {
      const ap = allocateAPDialogBox.getAllocatedAP (a.armyId);
      a.allocateAP (ap);
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
    for (let a of theGame.players[theGame.currentPlayer].armies)
    {
      const ap = allocateAPDialogBox.getAllocatedAP (a.armyId);
      a.allocateAP (ap);
      a.draw ();
    }
    
    alert ("AP allocated");
    
    theGame.advanceGame ();
  }

}