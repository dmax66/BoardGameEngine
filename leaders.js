'use strict';


let leaders = [];
const numLeadersInSameHex=1;

class Leader {
  constructor (id, name, nation, army, unitName, type, initiative, hasBonus, commandCapacity, subordinationValue, parent, mode, x, y, zOrder, orientation) {
    this.id = id;
    this.parent = parent;
    this.name = name;
    this.nation = nation;
    this.initiative = initiative;
    this.hasBonus = hasBonus;
    this.commandCapacity = commandCapacity;
    this.subordinationValue = subordinationValue;
    this.units = [];
    this.type = type;
    this.mode = mode;
    this.x = x;
    this.y = y;
    this.zOrder = zOrder;
    this.orientation = orientation;
  }


  indexOfLeaderById (leaderId)
  {
    var k;
  
    /* This part of code has to be moved out. Replace with "findLeaderById" */
    for (k=0; k<leaders.length; k++)
      if (leaders[k].id == leaderId)
        break;
  
    if (k == leaders.length) 
      throw ("Leader not found");
  
    return k;
  }

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
  
  
  infantryStrength () {
    var i;
    var s = 0;
    
    for (i = 0; i < this.units.length; i++)
      switch (this.units[i].type)
      {
        case "i":
          s += this.units[i].strength;
          break;
          
        case "infantry-leader":
        case "cavalry-leader":
          s += this.units[i].infantryStrength();
          break;
          
        default:
          throw ("Invalid unit type: " + this.units[i].type);
      }
    
    return s;
  }


  cavalryStrength () {
    var i;
    var s = 0;
    
    for (i = 0; i < this.units.length; i++)
      switch (this.units[i].type)
      {
        case "cavalry":
          s += this.units[i].strength;
          break;
          
        case "infantry-leader":
        case "cavalry-leader":
          s += this.units[i].cavalryStrength();
          break;
          
        default:
          throw ("Invalid unit type: " + this.units[i].type);
      }
  
    return s;
  }


  artilleryStrength () {
    var i;
    var s = 0;
  
      for (i = 0; i < this.units.length; i++)
        switch (this.units[i].type)
        {
          case "artillery":
            s += this.units[i].strength;
            break;
  
          case "infantry-leader":
          case "cavalry-leader":
            s += this.units[i].artilleryStrength();
            break;
  
          default:
            throw ("Invalid unit type: " + this.units[i].type);
        }
  
    return s;
  }


  createWidgetForMap () {
    var leaderWidget = document.createElement ("div");  
    leaderWidget.id = "L:" + this.id;
    leaderWidget.setAttribute ("class", "counter-widget");
    leaderWidget.style.height = "26px";
    leaderWidget.style.width = "60px";  
    leaderWidget.onmouseover = function() { showLeaderInfo (this.id); }
    leaderWidget.onmouseout = function() { hideLeaderInfo (this.id, false); }
    leaderWidget.onclick = function() { this.onmouseout = function () {}; showLeaderInfo (this.id); }
    leaderWidget.onmousedown =  function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showStackContextMenu (this.id); }}
  
    
    var leaderIcon = document.createElement ("img");
    leaderIcon.setAttribute ("class", "counter-icon");
    leaderIcon.setAttribute ("class", this.nation);
 
 /*   
    switch (this.mode)
    {
      case "l":
        leaderIcon.src = this.type == "cavalry" ? "img/cavalry-line.png" : "img/infantry-line.png";
        break;
        
      case "c":
        leaderIcon.src = "img/column.png";    
        break;
        
      default:
        throw ("Invalid mode value");
    }
    leaderIcon.style.height = "26px";
    leaderIcon.style.width = "60px";
*/
  
    leaderWidget.appendChild (leaderIcon);
    
    // Add the leader name (if in line mode)
    var leaderName = document.createElement ("p");
    leaderName.setAttribute ("class", "counter-name");
    leaderName.innerHTML = this.name;
    leaderName.style.visibility = (this.mode == "l") ? "visible" : "hidden";
    leaderWidget.appendChild (leaderName);
    
    return leaderWidget;
  }


  drawSelf () {
    var leaderWidget = document.getElementById ("L:" + this.id);
    if (!leaderWidget) {
        leaderWidget = this.createWidgetForMap();
        document.getElementById ("mapContainer").appendChild (leaderWidget);  
    }
  
    var leaderIcon = undefined;
    var leaderName = undefined;
    var i=0;
  
    // Find the icon object in the list of child nodes of the leader div block
    for (i = 0; i < leaderWidget.childNodes.length; i++)
      if (leaderWidget.childNodes[i].nodeName == "IMG")
      {
        leaderIcon = leaderWidget.childNodes[i];
        break;
      }
  
    // Find the Leader name object
    for (i = 0; i < leaderWidget.childNodes.length; i++)
      if (leaderWidget.childNodes[i].nodeName == "P")
      {
        leaderName = leaderWidget.childNodes[i];
        break;
      }
  
    if (!leaderIcon) throw ("Leader icon element not found");
    if (!leaderName) throw ("Leader name element not found");
   
      
    switch (this.mode)
    {
      case "l":
        leaderIcon.src = this.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png";
        leaderName.style.visibility = "visible";
  
        for (i=0; i<6; i++)
        {
          if (this.orientation == lineDrawInfo[i].facing)
          {
            leaderWidget.style.transform = "rotate(" + lineDrawInfo[i].angle + "deg)";
            leaderWidget.style.left = (lineDrawInfo[i].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 3*this.zOrder) + "px";  
            leaderWidget.style.top = (lineDrawInfo[i].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 3*this.zOrder) + "px";

            return;
          }
        } 
        console.log ("Cannot find match for orientation in line mode");
        break;
  
      case "c":
        leaderIcon.src = "img/column.png";
        leaderName.style.visibility = "hidden";
        for (i=0; i<6; i++)
        {
          if (this.orientation == columnMovementInfo[i].facing)
          {
            leaderWidget.style.transform = "rotate(" + columnMovementInfo[i].angle + "deg)";
            leaderWidget.style.left = (columnMovementInfo[i].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 2*numLeadersInSameHex) + "px";  
            leaderWidget.style.top = (columnMovementInfo[i].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 2*numLeadersInSameHex) + "px";
            return;
          }
        } 
        throw ("Leader orientation (column mode) invalid");
  
      default:
        throw ("mode invalid");
    }
  }
  
  flipMode () {
    if (this.mode == "l") 
    {
      this.orientation = lineMovementInfo[this.orientation].flipOrientation;
      this.mode = "c";
    }
    else if (this.mode == "c")
    {
      this.orientation = columnMovementInfo[this.orientation].flipOrientation;  
      this.mode = "l";
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
  }

// Move a stack one hex
// orientation:
//  "ahead": move ahead (only for columns)
// "FL": move forward left
// "FR: move forward right
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

  moveAsLine (direction) {
// "FL": move forward left
// "FR: move forward right

    switch (direction) {
      case "FL":
        this.x += lineMovementInfo [this.direction].moveForwardLeft[ this.y % 2].x;
        this.y += lineMovementInfo [this.direction].moveForwardLeft[ this.y % 2].y;
        break;
        
      case "FR":
        this.x += lineMovementInfo [this.direction].moveForwardRight[ this.y % 2].x;
        this.y += lineMovementInfo [this.direction].moveForwardRight[ this.y % 2].y;
        break;
    
      default:
        throw ("moveAsLine: incorrect direction: " + direction ;
    } 
 
    // Set the zOrder so that the leader is at the top of the stack
    this.zOrder = numOfLeadersInHex (this.x, this.y) - 1;
  }

  moveAsColumn (deltaDir) {
    // Calc the new orientation by adding 'orientation' to the current index. 
    // Treat the array as circular, managing the overflow
    switch (deltaDir) {
      case "CCW":
        this.orientation = columnMovementInfo[this.orientation].nextCCW;
        break;
        
      case "CW":
        this.orientation = columnMovementInfo[this.orientation].nextCW;
        break;
        
      case "ahead":
        break;
        
      default:
        throw ("Incorrect value in this.orientation @ moveAsColumn: " + deltaDir)   
    }
        
    // Advance one hex
    this.x += columnMovementInfo[this.orientation].movement[y % 2].x;
    this.y += columnMovementInfo[this.orientation].movement[y % 2].y;
  
    // Set the zOrder so that the leader is at the top of the stack
    this.zOrder = numOfLeadersInHex (this.x, this.y) - 1;
  }


  uTurn () {
    switch (this.mode)
    {
      case "l":
        this.orientation = lineMovementInfo [this.orientation].uTurn.newOrientation;
        this.x += lineMovementInfo[this.orientation].uTurn.offset [this.y % 2].x;
        this.y += lineMovementInfo[this.orientation].uTurn.offset [this.y % 2].y;
        return;
                    
      case "c":
        this.orientation = columnMovementInfo [this.orientation].flip.newOrientation;
        this.x += (this.y % 2 ==0) ? columnMovementInfo[this.orientation].flip.xOffsetEven : columnMovementInfo[this.orientation].flip.xOffsetOdd;
        this.y += columnMovementInfo[this.orientation].flip.yOffset;
        return;
        
      default:
        throw ("Invalid stack mode");
    }
  }
  
  // Rotate a stack (line) one hex
  // orientation:
  // "CCW": rotate anticlockwise
  // "CW: rotate clockwise
  rotate (deltaDir) {
    switch (deltaDir) 
    {
      case "CW":
        this.orientation = lineMovementInfo[this.orientation].nextCW;
        break;
              
      case "CCW":
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
        this.drawOnMap();
        break;  
        
      default:
        throw ("Invalid orientation when rotating line");
    }
  }
  
}


  
function numOfLeadersInHex (x, y)
{
  var i;
  var n=0;
  
  for (i = 0; i < leaders.length; i++)
    if (leaders[i].x == x && leaders[i].y == y) 
      n++;
      
  return n;
}


function createLeaders (xhttp)
{
  const leaderJSONdata = JSON.parse (xhttp.responseText);

  for (var i=0; i<leaderJSONdata.length; i++)
  {
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



