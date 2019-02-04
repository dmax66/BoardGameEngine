
// Leader.prototype = Object.create (CombatUnit.prototype);
Leader.prototype.type = "leader";
Leader.prototype.movAllowance = 9;
// Leader.prototype.parent = undefined;

function Leader (id, name, nationality, type, initiative, bonus, commandCapacity, subordinationValue, formation, x, y, direction)
{
//  CombatUnit.call (id, name, "corps", nationality, 0);
  this.id = id;
//  this.parentId
  this.name = name;
  this.nationality = nationality;
  this.initiative = initiative;
  this.bonus = bonus;
  this.commandCapacity = commandCapacity;
  this.subordinationValue = subordinationValue;
  this.usedCommandSpan = 0;
  this.units = [];
//  this.type = type;
  this.formation = formation;
  this.x = x;
  this.y = y;
  this.direction = direction;
}
Leader.prototype.constructor = Leader;


// Returns an "img" HTML element containing the image of the leader
Leader.prototype.picture = function ()
{
  var leaderImg = document.createElement ("img");
  leaderImg.id = "img:" + this. name;
  leaderImg.src ="images/" + this.name + ".png";
  leaderImg.style.width = "50px";

  return leaderImg;
}

Leader.prototype.findUnit = function (unitId)
{
  var i;

  for (i=0; i < this.units.length; i++)
    if (this.units[i].id == unitId)
      return i;

  return undefined;
}


Leader.prototype.addUnit = function (aUnit)
{
//  aUnit.parent = this;
  this.units.push (aUnit);
}

// Remove the unit identified by unitId. Returns the unit itself
Leader.prototype.removeUnit = function (unitId)
{
  if (units.length == 0) throw ("Cannot remove unit from a leader with no units");
  
  var unitIndex = this.findUnit (unitId);
  if (unitIndex)
  {
    var unit = this.units.splice (i, 1);
//    unit.parent = undefined;
    return unit;
  }
  else
  {
    console.log ("Warning: Leader.prototype.removeUnit: unit not found");
    return undefined;
  }
}
  
  
Leader.prototype.infantryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i = 0; i < this.units.length; i++)
    switch (this.units[i].type)
    {
      case "infantry":
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


Leader.prototype.cavalryStrength = function ()
{
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


Leader.prototype.artilleryStrength = function ()
{
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

// Leader.prototype.moveToStack (newStack)
// {
//   var i = this.parent.leaders.indexOf (this);
//  
//  this.parent.leaders.splice (i, 1) 
//  newStack.leaders.push (this);
//  this.parent = newStack;
//}


Leader.prototype.createWidgetForMap = function ()
{
  var leaderWidget = document.createElement ("div");
  
  leaderWidget.id = "L:" + this.id;
  leaderWidget.setAttribute ("class", "counter-widget");
  leaderWidget.onmouseover = function() { showLeaderInfo (this.id); }
  leaderWidget.onmouseout = function() { hideLeaderInfo (this.id, false); }
  leaderWidget.onclick = function() { this.onmouseout = function () {}; showLeaderInfo (this.id); }
  leaderWidget.onmousedown =  function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showStackContextMenu (this.id); }}

  
  var leaderIcon = document.createElement ("img");
  leaderIcon.setAttribute ("class", "counter-icon");
  leaderIcon.setAttribute ("class", this.nationality);
  
  switch (this.formation)
  {
    case "line":
      leaderIcon.src = this.type == "cavalry" ? "images/cavalry-line.png" : "images/infantry-line.png";
      break;
      
    case "column":
      leaderIcon.src = "images/column.png";    
      break;
      
    default:
      throw ("Invalid formation value");
  }
  leaderIcon.style.height = "26px";
  leaderIcon.style.width = "60px";  
  leaderWidget.appendChild (leaderIcon);
  
  // Add the leader name (if in line formation)
  var leaderName = document.createElement ("p");
  leaderName.setAttribute ("class", "counter-name");
  leaderName.innerHTML = this.name;
  leaderName.style.visibility = (this.formation == "line") ? "visible" : "hidden";
  leaderWidget.appendChild (leaderName);
  
  return leaderWidget;
}


Leader.prototype.drawOnMap = function ()
{
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
  
  // Count how many other leaders are in the same hex and the highest z-Order value
  var j=0;
  var numLeadersInSameHex = 0;

/*
  while (j < leaders.length)
    if (leaders[j].parent == undefined &&  leaders[j].x == this.x && leaders[j].y == this.y)
      numLeadersInSameHex++;  
*/  
  switch (this.formation)
  {
    case "line":
      leaderIcon.src = this.type == "cavalry" ? "images/cavalry-line.png" : "images/infantry-line.png";
      leaderName.style.visibility = "visible";

      for (i=0; i<6; i++)
      {
        if (this.direction == lineDrawInfo[i].facing)
        {
          leaderWidget.style.transform = "rotate(" + lineDrawInfo[i].angle + "deg)";
          leaderWidget.style.left = (lineDrawInfo[i].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 2*numLeadersInSameHex) + "px";  
          leaderWidget.style.top = (lineDrawInfo[i].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 2*numLeadersInSameHex) + "px";
//          leaderWidget.style.zOrder = numLeadersInSameHex;
          return;
        }
      } 
      break;

    case "column":
      leaderIcon.src = "images/column.png";
      leaderName.style.visibility = "hidden";
      for (i=0; i<6; i++)
      {
        if (this.direction == columnMovementInfo[i].facing)
        {
          leaderWidget.style.transform = "rotate(" + columnMovementInfo[i].angle + "deg)";
          leaderWidget.style.left = (columnMovementInfo[i].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 2*numLeadersInSameHex) + "px";  
          leaderWidget.style.top = (columnMovementInfo[i].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 2*numLeadersInSameHex) + "px";
//          leaderWidget.style.zOrder = numLeadersInSameHex;
          return;
        }
      } 
      throw ("Leader orientation (column mode) invalid");

    default:
      throw ("Formation invalid");
  }
}



Leader.prototype.changeFormation = function ()
{
  if (this.formation == "line") 
  {
    switch (this.direction)
    {
      case "N":
        this.direction = "E";
        break;
        
      case "S":
        this.direction = "W";
        break;
        
      case "NE":
        this.direction = "SE";
        break;
        
      case "NW":
        this.direction = "NE";
        break;
        
      case "SW":
        this.direction = "NW";
        break;
        
      case "SE":
        this.direction = "SW";
        break;
        
      default:
        throw ("Invalid direction of leader: " + this.direction);
    }
    
    this.formation = "column";
    this.drawOnMap();
  }
  else if (this.formation == "column")
  {
    switch (this.direction)
    {
      case "W":
        this.facing = "S";
        break;
        
      case "E":
        this.direction = "N";
        break;
        
      case "NE":
        this.direction = "NW";
        break;
        
      case "NW":
        this.direction = "SW";
        break;
        
      case "SW":
        this.direction = "SE";
        break;
        
      case "SE":
        this.direction = "NE";
        break;
        
      default:
        throw ("Invalid direction of column stack: " + this.direction);
    }
    
    this.formation = "line";
    this.drawOnMap();
  }
  else 
    throw ("Invalid stack formation: " + this.formation);
}

// Move a stack one hex
// direction:
//  0: move ahead
// -1: move forward left
// +1: move forward right
Leader.prototype.move = function (direction)
{
  switch (this.formation)
  {
    case "line":
      this.moveAsLine (direction);
      break;
      
    case "column":
      this.moveAsColumn (direction);
      break;
      
    default:
      throw ("Invalid stack formation: " + this.formation);
  }
}

Leader.prototype.moveAsLine = function (direction)
{
  var i=0;
  for (i=0; i<6; i++)
    if (this.direction == lineMovementInfo[i].facing) break;

  if (i==6) throw ("Invalid orientation of line stack: " + this.direction);
   
  // A little hack to convert direction to either 0 (forward left) or 1 (forward right) to use the elements of the array xOffsetYEven / xOffsetYOdd
  switch (direction)
  {
    case -1:
      direction = 0;
      break;
      
    case 1:
      break;
      
    default:
      throw ("Invalid value for 'direction'");
  }    
    
  this.x += (this.y % 2 == 0) ? lineMovementInfo[i].xOffsetYEven[direction] : lineMovementInfo[i].xOffsetYOdd[direction];
  this.y += lineMovementInfo[i].yOffset[direction];
  
  this.drawOnMap();
}

Leader.prototype.moveAsColumn = function (direction)
{
  // Find the current orientation in the RotationInfo array
  var i=0;
  while (i < 6 && this.direction != columnMovementInfo[i].facing) i++;
  if (i == 6) throw ("Incorrect column facing");

  // Calc the new direction by adding 'direction' to the current index. 
  // Treat the array as circular, managing the overflow
  i += direction;
  if (i < 0) i += 6;
  if (i >= 6) i -= 6;
  this.direction = columnMovementInfo[i].facing;      
    
  // Advance one hex
  this.x += (this.y % 2 == 0) ? columnMovementInfo[i].movement.xMoveWhenYEven : columnMovementInfo[i].movement.xMoveWhenYOdd;
  this.y += columnMovementInfo[i].movement.yMove;

  this.drawOnMap();
}


Leader.prototype.flipDirection = function (direction)
{
  var i;
  
  switch (this.formation)
  {
    case "line":
      for (i=0; i<6; i++)
      {
        if (this.direction == lineDrawInfo[i].facing)
        {
          this.direction = lineDrawInfo[i].flip.newFacing;
          this.x += (this.y % 2 ==0) ? lineDrawInfo[i].flip.xOffsetEven : lineDrawInfo[i].flip.xOffsetOdd;
          this.y += lineDrawInfo[i].flip.yOffset;
          this.drawOnMap();
          return;
        }
      }
      throw ("Error");
      
    case "column":
      for (i=0; i<6; i++)
      {
        if (this.direction == columnMovementInfo[i].facing)
        {
          this.direction = columnMovementInfo[i].flip.newFacing;
          this.x += (this.y % 2 ==0) ? columnMovementInfo[i].flip.xOffsetEven : columnMovementInfo[i].flip.xOffsetOdd;
          this.y += columnMovementInfo[i].flip.yOffset;
          this.drawOnMap();
          return;
        }
      }
      throw ("Error");
      
    default:
      throw ("Invalid stack formation");
  }
}

// Rotate a stack (line) one hex
// direction:
// -1: rotate anticlockwise
// +1: rotate clockwise
Leader.prototype.rotate = function  (direction) 
{
  var i=0;
  
  switch (direction) 
  {
    case 1:
      for (i=0; i<6; i++)
      {
        if (this.direction == lineDrawInfo[i].facing) break;
      }
      if (i==6)
        throw ("Invalid stack (line) orientation: " + this.direction);
        
      i += direction;
      if (i < 0) i += 6;
      if (i >= 6) i -= 6;

      this.direction = lineDrawInfo[i].facing;
      this.drawOnMap();
      break;
            
    case -1:
      switch (this.direction)
      {
        case "N":
          this.direction="NW";
          if (this.y % 2 == 0) this.x--;
          this.y--;
          break;

        case "NW":
          this.direction="SW";
          this.x--;
          break;

        case "SW":
          this.direction="S";
          if (this.y % 2 == 0) this.x--;
          this.y++;
          break;

        case "S":
          this.direction="SE";
          if (this.y % 2 == 1) this.x++;
          this.y++;
          break;

        case "SE":
          this.direction="NE";
          this.x++;
          break;

        case "NE":
          this.direction="N";
          if (this.y % 2 == 1) this.x++;
          this.y--;
          break;
      }
      this.drawOnMap();
      break;  
      
    default:
      throw ("Invalid direction when rotating line");
  }
}

// Move a leader with name "leaderName" from this stack to another stack with name "stackName". If "stackName" does not exist, it creates a new stack
// The new stack (or the stack identified by "stackName" is returned
// 
//Stack.prototype.moveLeaderToNewStack (leaderName, stackName) = function ()
// {
// }


