
class Unit {
  constructor (json_data) {
    this.id          = json_data.id;
    this.name        = json_data.name;
    this.nation      = json_data.nation;
    this.commander   = json_data.commander;
    this.type        = json_data.type;
    this.size        = json_data.size;
    this.commandedBy = json_data.commandedBy;
    this.strength    = json_data.strength;
    this.playerId    = json_data.playerId;
    
    this.unitIconName = "";
    
    switch (this.type) {
      case 'i': 
        this.unitIconName += "infantry-";
        break;
        
      case 'c':
        this.unitIconName += "cavalry-";
        break;
      
      case 'a':
        this.unitIconName += "artillery-";
        break;
      
      default:
        throw ("Invalid unit type");
    }
    
    switch (this.size) {
      case 'd':
        this.unitIconName += "division";
        break;
        
      case 'b':
        this.unitIconName += "brigade";
        break;
        
      case 'r':
        this.unitIconName += "regiment";
        break;

      default:
        throw ("Invalid unit type");
    }
      
    this.unitIconName += ".png";
  }

  iconFileName () {
    return this.unitIconName;
  }

  static modifyStrength () {
    alert ("modifyStrength");
  }
  
  static makeMajGen () {
    alert ("makeMajGen");
  }
  
  static transferToLeader () {
    alert ("transferToLeader");
  }

  static possibleActions = [
    { entry: "Modify Strength",        func: Controller.modifyUnitStrength },
    { entry: "Make Maj General",       func: Controller.makeMajGen },
    { entry: "Transfer to other Corp", func: Controller.transferUnitToLeader }, 
    { entry: "Use replacements",       func: Controller.transferReplacementToUnit }    
  ];


  transferToLeader (newLeaderId)
  {
    var iOldLeader = indexOfLeaderById (oldLeaderId);
    var iNewLeader = indexOfLeaderById (newLeaderId);
    var theUnit = leaders[iOldLeader].units [ leaders[iOldLeader].findUnit (unitId)] ;
  
    leaders[iOldLeader].removeUnit (unitId);
    leaders[iNewLeader].addUnit (theUnit);
  
    // Close the unit window menu  
    var unitMenu = document.getElementById ("MU:" + unitId);
    if (unitMenu)
      unitMenu.remove();
    
    // Close the previous leader info window, 
    var leaderInfoWidget = document.getElementById ("LIW:" + leaders[iOldLeader].id);
    if (leaderInfoWidget != null)
      hideLeaderInfo (leaderInfoWidget.id);
  }



};



