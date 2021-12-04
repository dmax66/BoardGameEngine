class Controller {
  static rollOneDie () 
  {
    return Math.floor ((Math.random() * 6) + 1);  
  }


  static showWeatherDialog ()
  {
    document.getElementById("weather_box").style.display = "initial";
  }
  
  static rollDieForWeather ()
  {
    const i = Controller.rollOneDie();  
    
    const season = theGame.calendar[theGame.currentTurn].season;
   
    for (let k of theGame.weatherTable)
    {
      if (k.Season == season && k.DieRoll == i)
      {
        theGame.weather = k.Weather;
        break; 
      }
    }

    document.getElementById ("weather_die_roll").value = i;    
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

}