
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

  possibleActions () {
    const choices = [
      { entry: "Modify Strength",        func: modifyStrength },
      { entry: "Make Maj General",       func: makeMajGen },
      { entry: "Transfer to other Corp", func: transferToLeader }    
    ] 
    
    return choices;
  }
};


function modifyStrength () {
  alert ("modifyStrength");
}

function makeMajGen () {
  alert ("makeMajGen");
}

function transferToLeader () {
  alert ("transferToLeader");
}

