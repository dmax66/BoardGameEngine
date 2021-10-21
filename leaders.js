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
  { action: "Flip direction",        func: function(aLeader) { aLeader.flipDirection(); }},
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
    if (this.mode == "l") 
    {
      switch (this.orientation)
      {
        case "N":
          this.orientation = "E";
          break;
          
        case "S":
          this.orientation = "W";
          break;
          
        case "NE":
          this.orientation = "SE";
          break;
          
        case "NW":
          this.orientation = "NE";
          break;
          
        case "SW":
          this.orientation = "NW";
          break;
          
        case "SE":
          this.orientation = "SW";
          break;
          
        default:
          throw ("Invalid orientation of leader: " + this.orientation);
      }
      
      this.mode = "c";
    }
    else if (this.mode == "c")
    {
      switch (this.orientation)
      {
        case "W":
          this.facing = "S";
          break;
          
        case "E":
          this.orientation = "N";
          break;
          
        case "NE":
          this.orientation = "NW";
          break;
          
        case "NW":
          this.orientation = "SW";
          break;
          
        case "SW":
          this.orientation = "SE";
          break;
          
        case "SE":
          this.orientation = "NE";
          break;
          
        default:
          throw ("Invalid orientation of column stack: " + this.orientation);
      }
      
      this.mode = "l";
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
  }

  moveFL () {
    this.move (-1);
  }

  moveF () {
    this.move (0);
  }

  moveFR () {
    this.move (1);
  }


// Move a stack one hex
// orientation:
//  0: move ahead
// -1: move forward left
// +1: move forward right
  move (orientation) {
    switch (this.mode)
    {
      case "l":
        this.moveAsLine (orientation);
        break;
        
      case "c":
        this.moveAsColumn (orientation);
        break;
        
      default:
        throw ("Invalid stack mode: " + this.mode);
    }
  }

  moveAsLine (orientation) {
    var i=0;
    for (i=0; i<6; i++)
      if (this.orientation == lineMovementInfo[i].facing) break;
  
    if (i==6) throw ("Invalid orientation of line stack: " + this.orientation);
     
    // A little hack to convert orientation to either 0 (forward left) or 1 (forward right) to use the elements of the array xOffsetYEven / xOffsetYOdd
    switch (orientation)
    {
      case -1:
        orientation = 0;
        break;
        
      case 1:
        break;
        
      default:
        throw ("Invalid value for 'orientation'");
    }    
      
    // Calculate the new coordinates (grid units)
    this.x += (this.y % 2 == 0) ? lineMovementInfo[i].xOffsetYEven[orientation] : lineMovementInfo[i].xOffsetYOdd[orientation];
    this.y += lineMovementInfo[i].yOffset[orientation];
    
    // Set the zOrder so that the leader is at the top of the stack
    this.zOrder = numOfLeadersInHex (this.x, this.y) - 1;
  }

  moveAsColumn (orientation) {
    // Find the current orientation in the RotationInfo array
    var i=0;
    while (i < 6 && this.orientation != columnMovementInfo[i].facing) i++;
    if (i == 6) throw ("Incorrect column facing");
  
    // Calc the new orientation by adding 'orientation' to the current index. 
    // Treat the array as circular, managing the overflow
    i += orientation;
    if (i < 0) i += 6;
    if (i >= 6) i -= 6;
    this.orientation = columnMovementInfo[i].facing;      
      
    // Advance one hex
    this.x += (this.y % 2 == 0) ? columnMovementInfo[i].movement.xMoveWhenYEven : columnMovementInfo[i].movement.xMoveWhenYOdd;
    this.y += columnMovementInfo[i].movement.yMove;
  
    // Set the zOrder so that the leader is at the top of the stack
    this.zOrder = numOfLeadersInHex (this.x, this.y) - 1;
  }

  flipDirection (orientation) {
    var i;
    
    switch (this.mode)
    {
      case "l":
        for (i=0; i<6; i++)
        {
          if (this.orientation == lineDrawInfo[i].facing)
          {
            this.orientation = lineDrawInfo[i].flip.newFacing;
            this.x += (this.y % 2 ==0) ? lineDrawInfo[i].flip.xOffsetEven : lineDrawInfo[i].flip.xOffsetOdd;
            this.y += lineDrawInfo[i].flip.yOffset;
            return;
          }
        }
        throw ("Error");
        
      case "c":
        for (i=0; i<6; i++)
        {
          if (this.orientation == columnMovementInfo[i].facing)
          {
            this.orientation = columnMovementInfo[i].flip.newFacing;
            this.x += (this.y % 2 ==0) ? columnMovementInfo[i].flip.xOffsetEven : columnMovementInfo[i].flip.xOffsetOdd;
            this.y += columnMovementInfo[i].flip.yOffset;
            return;
          }
        }
        throw ("Error");
        
      default:
        throw ("Invalid stack mode");
    }
  }
  
  rotateCW () {
    this.rotate (1);
  }
  
  rotateCCW () {
    this.rotate (-1);
  }

  // Rotate a stack (line) one hex
  // orientation:
  // -1: rotate anticlockwise
  // +1: rotate clockwise
  rotate (orientation) {
    var i=0;
    
    switch (orientation) 
    {
      case 1:
        for (i=0; i<6; i++)
        {
          if (this.orientation == lineDrawInfo[i].facing) break;
        }
        if (i==6)
          throw ("Invalid stack (line) orientation: " + this.orientation);
          
        i += orientation;
        if (i < 0) i += 6;
        if (i >= 6) i -= 6;
  
        this.orientation = lineDrawInfo[i].facing;
        break;
              
      case -1:
        switch (this.orientation)
        {
          case "N":
            this.orientation="NW";
            if (this.y % 2 == 0) this.x--;
            this.y--;
            break;
  
          case "NW":
            this.orientation="SW";
            this.x--;
            break;
  
          case "SW":
            this.orientation="S";
            if (this.y % 2 == 0) this.x--;
            this.y++;
            break;
  
          case "S":
            this.orientation="SE";
            if (this.y % 2 == 1) this.x++;
            this.y++;
            break;
  
          case "SE":
            this.orientation="NE";
            this.x++;
            break;
  
          case "NE":
            this.orientation="N";
            if (this.y % 2 == 1) this.x++;
            this.y--;
            break;
        }
        break;  
        
      default:
        throw ("Invalid orientation when rotating line");
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



