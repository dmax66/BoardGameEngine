'use strict';


let leaders = [];
const numLeadersInSameHex=1;







class Leader {
  constructor (id, name, nation, army, unitName, type, initiative, hasBonus, commandCapacity, subordinationValue, parent, mode, x, y, zOrder, orientation) {
    this.id = id;
    this.parent = parent;
    this.name = name;
    this.nation = nation;
    this.initiative = 1 * initiative;
    this.hasBonus = hasBonus;
    this.commandCapacity = 1 * commandCapacity;
    this.subordinationValue = 1 * subordinationValue;
    this.units = [];
    this.type = type;
    this.mode = mode;
    this.x = 1 * x;
    this.y = 1 * y;
    this.zOrder = 1 * zOrder;
    this.orientation = orientation;
  }
    
static possibleActions = [
  { action: "Flip Line-Column",      func: function(aLeader) { aLeader.flipMode(); }},
  { action: "Rotate clockwise",      func: function(aLeader) { aLeader.rotateCW(); }},
  { action: "Rotate anti-clockwise", func: function(aLeader) { aLeader.rotateCCW(); }},
  { action: "Flip direction",        func: function(aLeader) { aLeader.uTurn(); }},
  { action: "Move forward-left",     func: function(aLeader) { aLeader.moveFL(); }},
  { action: "Move forward",          func: function(aLeader) { aLeader.moveF(); }},
  { action: "Move forward-right",    func: function(aLeader) { aLeader.moveFR(); }},
  { action: "Manage units",          func: function(aLeader) {  }}
];




  // Not correct here - mixing data model and UI
  picture () {
    let leaderImg = document.createElement ("img");
    leaderImg.id = "img:" + this. name;
    leaderImg.src ="img/" + this.name + ".png";
    leaderImg.style.width = "50px";
  
    return leaderImg;
  }  

  findUnit (unitId) {
    var i;
  
    for (i=0; i < this.units.length; i++)
      if (this.units[i].id == unitId)
        return i;
  
    return undefined;
  }

  addUnit (aUnit) {
    aUnit.parent = this;
    this.units.push (aUnit);
  }

  // Remove the unit identified by unitId. Returns the unit itself
  removeUnit (unitId) {
    if (this.units.length == 0) throw ("Cannot remove unit from a leader with no units");
    
    var unitIndex = this.findUnit (unitId);
    if (unitIndex != undefined)
    {
      var unit = this.units.splice (unitIndex, 1);
      unit.parent = undefined;
      return unit;
    }
    else
    {
      console.log ("Warning: Leader.prototype.removeUnit: unit not found");
      return undefined;
    }
  }
  
  
  // Return the strength of all controlled units (both directly and indirectly) of type t
  strength (t) {
    var i;
    let s = 0;
    
    // Units directly commanded
    for (i = 0; i < units.length; i++)
      if (units[i].commandedBy == this.id && units[i].type == t)
          s += 1 * units[i].strength;  // Force conversion to number

    // Subordinate Leaders
    for (i = 0; i < leaders.length; i++)
      if (leaders[i].parent == this.id)
          s += leaders[i].strength(t);

    return s;
  }


  drawSelf () {
    UIRenderLeader (this);
  }
  
  flipMode () {
    if (this.mode == "l") { 
      this.mode = "c";
    }
    else if (this.mode == "c")
    {
      this.mode = "l";
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
  }

  moveFL () {
    const curOrientation = 1*this.orientation;
    const i = this.y % 2;
    
    switch (this.mode) {
      case "l": 
//        this.x += xOffset (this.orientation, i);
//        this.y += yOffset (this.orientation. i);
        break;
         
      case "c":
        this.orientation = orientationPrev (curOrientation);
        this.x += xOffset (this.orientation, i);
        this.y += yOffset (this.orientation, i);
        break;
         
        default:
          throw ("Invalid orientation in moveFL:" + this.mode);
    }
  }

  moveF () {
    const i = this.y % 2;
    
    switch (this.mode) {
      case "l":
        // Not applicable to line mode 
        break;
         
      case "c":
        this.x += xOffset (this.orientation, i);
        this.y += yOffset (this.orientation, i);
        break;
         
        default:
          throw ("Invalid orientation in moveFL:" + this.mode);
    }
  }

  moveFR () {
    const curOrientation = 1*this.orientation;
    const i = this.y % 2;
    
    switch (this.mode) {
      case "l": 
//        this.x += hexOffset[this.orientation][i].x;;
//        this.y += lineMovementInfo[curOrientation].moveForwardRight[i].y;
        break;
         
      case "c":
        this.orientation = orientationNext (curOrientation);
        this.x += xOffset (this.orientation, i);
        this.y += yOffset (this.orientation, i);
        break;
         
      default:
        throw ("Invalid stack mode in moveFL:" + this.mode);
    }
  }

  uTurn () {
    const curOrientation = 1*this.orientation;
    const i = this.y % 2;
    

    switch (this.mode)
    {
      case "l":
//        this.orientation = lineMovementInfo[curOrientation].uTurn.newOrientation;
//        this.x += hexOffset[this.orientation][i].x;
 //       this.y += hexOffset[this.orientation][i].y;
        break;
        
      case "c":
        this.orientation = orientationOpposite (curOrientation);
        this.x += xOffset (this.orientation, i);
        this.y += yOffset (this.orientation, i);
        break;
        
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }
    this.drawSelf();
  }
  
  rotateCW () {
    const curOrientation = 1*this.orientation;
    const i = this.y % 2;
    

    switch (this.mode)
    {
      case "l":
//        this.orientation = lineMovementInfo[curOrientation].rotateCW.newOrientation;
//       this.x += lineMovementInfo[curOrientation].rotateCW.offset[i].x;
//        this.y += lineMovementInfo[curOrientation].rotateCW.offset[i].y;
        break;
        
      case "c":
        break;
        
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }
  }
  
  rotateCCW () {
    const curOrientation = 1*this.orientation;
    const i = this.y % 2;
    

    switch (this.mode)
    {
      case "l":
//        this.orientation = lineMovementInfo[curOrientation].rotateCCW.newOrientation;
//        this.x += lineMovementInfo[curOrientation].rotateCCW.offset[i].x;
//        this.y += lineMovementInfo[curOrientation].rotateCCW.offset[i].y;
        break;
        
      case "c":
        break;
        
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }
  }  
} // End of Class


  


function createLeaders (xhttp)
{
  const leaderJSONdata = JSON.parse (xhttp.responseText);

  for (var i=0; i<leaderJSONdata.length; i++) {
    var newLeader = new Leader (
      leaderJSONdata[i].id, 
      leaderJSONdata[i].name, 
      leaderJSONdata[i].nation, 
      leaderJSONdata[i].army, 
      leaderJSONdata[i].unitName, 
      leaderJSONdata[i].type, 
      leaderJSONdata[i].initiative, 
      leaderJSONdata[i].hasBonus, 
      leaderJSONdata[i].commandCapacity, 
      leaderJSONdata[i].subordinationValue, 
      leaderJSONdata[i].parent, 
      leaderJSONdata[i].mode, 
      leaderJSONdata[i].x, 
      leaderJSONdata[i].y, 
      leaderJSONdata[i].zOrder, 
      leaderJSONdata[i].orientation);
    leaders.push (newLeader);
  }
}


//
// Returns i, where leaders[i].id == leaderId 
//
function findLeaderById (leaderId) {
  var k;

  /* This part of code has to be moved out. Replace with "findLeaderById" */
  for (k = 0; k < leaders.length; k++)
    if (leaders[k].id == leaderId)
      break;

  if (k == leaders.length) 
    throw ("Leader not found");

  return k;
}



