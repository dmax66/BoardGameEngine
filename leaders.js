

let leaders = [];

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
    leaderWidget.onmouseover = function() { showLeaderInfo (this.id); }
    leaderWidget.onmouseout = function() { hideLeaderInfo (this.id, false); }
    leaderWidget.onclick = function() { this.onmouseout = function () {}; showLeaderInfo (this.id); }
    leaderWidget.onmousedown =  function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showStackContextMenu (this.id); }}
  
    
    var leaderIcon = document.createElement ("img");
    leaderIcon.setAttribute ("class", "counter-icon");
    leaderIcon.setAttribute ("class", this.nation);
    
    switch (this.mode)
    {
      case "line":
        leaderIcon.src = this.type == "cavalry" ? "img/cavalry-line.png" : "img/infantry-line.png";
        break;
        
      case "column":
        leaderIcon.src = "img/column.png";    
        break;
        
      default:
        throw ("Invalid mode value");
    }
    leaderIcon.style.height = "26px";
    leaderIcon.style.width = "60px";  
    leaderWidget.appendChild (leaderIcon);
    
    // Add the leader name (if in line mode)
    var leaderName = document.createElement ("p");
    leaderName.setAttribute ("class", "counter-name");
    leaderName.innerHTML = this.name;
    leaderName.style.visibility = (this.mode == "line") ? "visible" : "hidden";
    leaderWidget.appendChild (leaderName);
    
    return leaderWidget;
  }

  drawOnMap () {
    var leaderWidget = document.getElementById ("L:" + this.id);
    if (!leaderWidget)
    {
        leaderWidget = this.createWidgetForMap();
        document.getElementById ("mapContainer").appendChild (leaderWidget);  
    }
  
    var leaderIcon = undefined;
    var leaderName = undefined;
    var i=0;
  
    // Find the stack icon object
    for (i = 0; i < leaderWidget.childNodes.length; i++)
      if (leaderWidget.childNodes[i].nodeName == "IMG")
      {
        leaderIcon = leaderWidget.childNodes[i];
        break;
      }
  
    // Find the stack name object
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
        leaderIcon.src = this.type == "cavalry" ? "img/cavalry-line.png" : "img/infantry-line.png";
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
      this.drawOnMap();
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
      this.drawOnMap();
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
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
    
    this.drawOnMap();
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
  
    this.drawOnMap();
  }


  flipOrientation (orientation) {
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
            this.drawOnMap();
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
            this.drawOnMap();
            return;
          }
        }
        throw ("Error");
        
      default:
        throw ("Invalid stack mode");
    }
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
        this.drawOnMap();
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


function createLeaders(xhttp)
{
  const leaderJSONdata = JSON.parse (xhttp.responseText);
  leaderJSONdata.forEach (createSingleLeader);
}


function createSingleLeader (v, index, array) {
  var newLeader = new Leader (v.id, v.name, v.nation, v.army, v.unitName, v.type, v.initiative, v.hasBonus, v.commandCapacity, v.subordinationValue, v.parent, v.mode, v.x, v.y, v.zOrder, v.orientation);
  array.push (newLeader);
}

