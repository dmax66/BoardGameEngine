
class Unit {
  constructor (json_data) {
    this.unitId      = json_data.unitId;
    this.name        = json_data.name;
    this.nation      = json_data.nation;
    this.commander   = json_data.commander;
    this.type        = json_data.type;
    this.size        = json_data.size;
    this.commandedBy = json_data.commandedBy;
    this.strength    = json_data.strength;
    this.playerId    = json_data.playerId;
    this.parent      = null;
    this.player      = null;
    
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

  setPlayer (player) {
    this.player = player;
  }

  iconFileName () {
    return this.unitIconName;
  }


  // parentLeader is an object of class Leader
  setParent (parentLeader) 
  {
    this.commandedBy = parentLeader.leaderId;
    this.parent = parentLeader; 
  }
  
  
  unsetParent () 
  {
    this.commandedBy = (-1);
    this.parent = null; 
  }


  modifyStrength () {
    alert ("modifyStrength");
  }
  
  
  makeMajGen () {
    alert ("makeMajGen");
  }
  
  
  transferToLeader () {
    alert ("transferToLeader");
  }


  static possibleActions = [
    { entry: "Modify Strength",        func: Controller.modifyUnitStrength },
    { entry: "Make Maj General",       func: Controller.makeMajGen },
    { entry: "Transfer to other Corp", func: Controller.transferUnitToLeader }, 
    { entry: "Use replacements",       func: Controller.transferReplacementToUnit }    
  ];


  transferToLeader (newLeader)
  {
    var oldLeader = this.parent;
  
    oldLeader.removeUnit (this);
    newLeader.addUnit (this);
  
    // Move to the controller
    // Close the unit window menu  
    var unitMenu = document.getElementById ("MU:" + unitId);
    if (unitMenu)
      unitMenu.remove();
    
    // Close the previous leader info window, 
    var leaderInfoWidget = document.getElementById ("LIW:" + leaders[iOldLeader].id);
    if (leaderInfoWidget != null)
      hideLeaderInfo (leaderInfoWidget.id);
  }

}; // End of class



