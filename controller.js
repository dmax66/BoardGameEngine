class Controller 
{
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

  
  static makeMajGen (unit) 
  {
    // Find a "free" Maj General
    for (let l of theGame.currentPlayerObj.leaders.values())
    {
      if 
      (
        l.units.size == 0                       // Free 
        && l.leaderId.slice (1, 3) == "MG"      // is a Maj General
        && l.nationId == unit.nationId          // same nation as the unit 
        && ((unit.type == "i" && l.type == "i") // if the unit is an infantry brigade/division, only an infantry general can command id 
            || unit.type == "c"))               // or if the unit is a cavalry unit, then any general is OK
      {
        // Found
        // Copy the position, mode and orientation from the previous leader
        l.x = unit.leader.x;
        l.y = unit.leader.y;
        l.orientation = unit.leader.orientation;
        l.mode = unit.leader.mode;
        
        const oldLeader = unit.leader;
        
        unit.transferToLeader (l);
        l.updateBalloonInfo ();
        l.recalcZOrder ();
        l.draw ();

        // Close the unit popup menu
        unit.actionMenu.close ();
        unit.actionMenu = null;
    
        // Update the leader info menu
        oldLeader.marker.updateInfoMenu ();    
        
        return;
      }    
    }
    
    // No Maj Gen free
    alert ("No Maj General available!");
  }


  static disbandUnit (unit)
  {
    if (unit.strength != 0)
    {
      alert ("You can't disband a unit with non-zero strength");
      return;    
    }  
    
    if (confirm ("Are you sure? This action cannot be reversed"))
    {
      unit.isActive = false;    
    }
    
    unit.parent.removeUnit (unit);
    
    // Close the unit popup menu
    unit.actionMenu.close ();
    unit.actionMenu = null;
  }


  static reinforceUnit (unit)
  {
    let wantedReinforcements = 0;
        
    // Check if reinforcement of the same nation are available
    const nation = theGame.nations.get (unit.nationId);
    const availReinforcements = nation.availableReinforcements (unit.type);
    
    if (availReinforcements == 0)
    {
      alert ("No reinforcements available for " + nation.adjective + " " + unit.unitType())
      return;      
    }

    // Quick solution: prompt box - replace with a nice modal box
    do 
    {
      wantedReinforcements = 1 * prompt ("How many 1,000 of men?");
      
 
    } while (wantedReinforcements > availReinforcements || wantedReinforcements < 0);
    

    unit.addStrength (wantedReinforcements);
    nation.addReinforcements (unit.type, -wantedReinforcements);

    // Update the unit popup menu
    unit.actionMenu.refresh ();

    // Update the leader info menu
    unit.leader.marker.updateInfoMenu ();    
    
    // Update the player panel
    updatePlayerWidget (unit.leader.player);
  }


  static transferUnitStrength (unit)
  {
  }

  static transferUnitToLeader (unit) 
  {
    // Check if there are other friendly units in the same hex
    const leadersInSameHex = unit.leader.getFriendlyLeadersInSameHex ();
    
    if (leadersInSameHex.length == 0)
    {
      alert ("No friendly General to transfer unit to");
      return;    
    }
  
    selectFriendlyLeaderDialogBox.open (unit, leadersInSameHex);
  }
  
  
  static onSubmitTransferUnitToLeader ()
  {
    const oldLeader = selectFriendlyLeaderDialogBox.unit.leader;
    const newLeader = selectFriendlyLeaderDialogBox.result;
    
    // and do the transfer
    unit.transferToLeader (newLeader);
    
    selectFriendlyLeaderDialogBox.close ();
    
    // Update the info windows
    oldLeader.marker.updateInfoWindow ();
    newLeader.marker.updateInfoWindow ();
    
    // Close the unit popup menu
    unit.actionMenu.close ();
    unit.actionMenu = null;
  }  
    


  static updatePlayerWidget (player) 
  {
    player.moraleWidget.setValue (player.morale);
  
    for (let n of player.nations.values())
    {
      n.infReplPointWidget.setValue (n.infReplacementPoints);
      n.cavReplPointWidget.setValue (n.cavReplacementPoints);
      n.artReplPointWidget.setValue (n.artReplacementPoints);
    }
    
    for (let a of player.armies.values())
    {
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
    
    for (let a of theGame.players[theGame.currentPlayer].armies.values())
    {
      const ap = getAPDialogBox.getAP (a.armyId);
      a.receiveAP (ap);
      a.draw ();
    }
    
    theGame.advanceGame ();
  }



  static openAllocateAPDialog ()
  {
    allocateAPDialogBox.open (theGame.currentPlayerObj.armies);
  }
  
  
  static allocateAP ()
  {
    for (let a of theGame.currentPlayerObj.armies.values())
    {
      const ap = allocateAPDialogBox.getAllocatedAP (a.armyId);
      a.allocateAP (ap);
      a.draw ();
    }
    
    alert ("AP allocated");
    
    theGame.advanceGame ();
  }


  static openPositionUnitPopup (unitsToPlace)
  {
    unitPicker.open (unitsToPlace);
  }

  
  
}

