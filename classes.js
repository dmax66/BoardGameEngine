function CombatUnit (id, name, nationality, size, strength)
{
  this.id = id;
  this.name = name;
  this.nationality = nationality;
  this.strength = strength;
  this.size = size;
}
  

function InfantryUnit (id, name, nationality, size, strength)
{
  CombatUnit.call (this, id, name, nationality, size, strength);
}
InfantryUnit.prototype.constructor = InfantryUnit;
InfantryUnit.prototype = Object.create (CombatUnit.prototype);
InfantryUnit.prototype.type = "infantry";
InfantryUnit.prototype.movAllowance = 5;
InfantryUnit.prototype.subordinationValue = 1;

  
  
  
function CavalryUnit (id, name, nationality, size, strength)
{
  CombatUnit.call (this, id, name, nationality, size, strength);
}
CavalryUnit.prototype.constructor = CavalryUnit;
CavalryUnit.prototype = Object.create (CombatUnit.prototype);
CavalryUnit.prototype.type = "cavalry";
CavalryUnit.prototype.movAllowance = 9;
CavalryUnit.prototype.subordinationValue = 0.5;

function Leader (id, name, nationality, type, initiative, bonus, commandCapacity, subordinationValue)
{
  CombatUnit.call (this, id, name, nationality, "corps", 0);
  this.initiative = initiative;
  this.bonus = bonus;
  this.commandCapacity = commandCapacity;
  this.subordinationValue = subordinationValue;
  this.usedCommandSpan = 0;
  this.units = [];
  this.type = type;
}
Leader.prototype.constructor = Leader;
Leader.prototype = Object.create (CombatUnit.prototype);
Leader.prototype.type = "leader";
Leader.prototype.movAllowance = 9;

Leader.prototype.addUnit = function (aUnit)
{
  this.units.push (aUnit);
}


Leader.prototype.removeUnit = function (unitId)
{
  var i;

  if (!this.units) throw ("Cannot remove unit from a leader with no units");
  
  for (i=0; i < this.units.length; i++)
    if (this.units[i].id == unitId)
      this.units = this.units.slice (i, 1);
  
  throw ("Removing unit from leader: unit not found");
}
  
  
Leader.prototype.infantryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i = 0; i < this.units.length; i++)
    if (this.units[i].type == "infantry")
      s += this.units[i].strength;
    else if (this.units[i].type == "leader")
      s += this.units[i].infantryStrength();
    
    return s;
}


Leader.prototype.cavalryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i = 0; i < this.units.length; i++)
    if (this.units[i].type == "cavalry")
      s += this.units[i].strength;
    else if (this.units[i].type == "leader")
      s += this.units[i].cavalryStrength();

  return s;
}


Leader.prototype.artilleryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i = 0; i < this.units.length; i++)
    if (this.units[i].type == "artillery")
      s += this.units[i].strength;
    else if (this.units[i].type == "leader")
      s += this.units[i].artilleryStrength();

  return s;
}


  
  
function Stack (id, x, y, name, direction, formation) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.formation = formation;
  this.name = name;
  this.leaders = [];
}


Stack.prototype.addLeader = function (aLeader)
{
  this.leaders.push (aLeader);
}

Stack.prototype.removeLeader = function (leaderId)
{
  var i;

  if (!this.leaders) throw ("Cannot remove leader from a stack with no units");
  
  for (i=0; i < this.leaders.length; i++)
  {
    if (this.leaders[i].id == leaderId)
    {
      this.leaders = this.leaders.splice (i, 1);
      return;
    }
  }
  
  throw ("removeLeader: leader not found");
}

Stack.prototype.infantryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i=0; i < this.leaders.length; i++)
    s += this.leaders[i].infantryStrength();

  return s;
}
  
Stack.prototype.cavalryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i=0; i < this.leaders.length; i++)
    s += this.leaders[i].cavalryStrength();

  return s;
}
  
Stack.prototype.artilleryStrength = function ()
{
  var i;
  var s = 0;
  
  for (i=0; i < this.leaders.length; i++)
    s += this.leaders[i].artilleryStrength();

  return s;
}


Stack.prototype.display = function ()
{
}


Stack.prototype.moveLeaderToTop = function (leaderName)
{
  var i;
  
  for (i = 0; i < this.leaders.length; i++)
    if (this.leaders[i].name == leaderName)
    {
      if (i == 0) return;  // Leader already at the top
      
      var temp1 = this.leaders.slice (0, i);
      var temp2 = this.leaders.slice (i, i+1);
      var temp3 = this.leaders.slice (i+1, this.leaders.length);
      
      this.leaders = temp2;
      this.leaders = this.leaders.concat (temp1);
      this.leaders = this.leaders.concat (temp3);

      return;
    }
  
  throw ("moveLeaderToTop: leader " + leaderName + " not found");
}

Stack.prototype.moveLeaderToBottom = function (leaderName)
{
  var i;
  
  for (i = 0; i < this.leaders.length; i++)
    if (this.leaders[i].name == leaderName)
    {
      if (i == this.leaders.length-1) return;
      
      var temp1 = this.leaders.slice (0, i);
      var temp2 = this.leaders.slice (i, i+1);
      var temp3 = this.leaders.slice (i+1, this.leaders.length);
      
      this.leaders = temp1;
      this.leaders = this.leaders.concat (temp3);
      this.leaders = this.leaders.concat (temp2);

      return;
    }
  
  throw ("moveLeaderToBottom: leader " + leaderName + " not found");
}

Stack.prototype.moveLeaderUp = function (leaderName)
{
  var i;
  
  for (i = 0; i < this.leaders.length; i++)
    if (this.leaders[i].name == leaderName)
    {
      if (i == 0) return; // Leader already at the top
      
      var temp = this.leaders[i];
      this.leaders[i] = this.leaders[i-1];
      this.leaders[i-1] = temp;

      return;
    }
  
  throw ("moveLeaderUp: leader " + leaderName + " not found");
}

Stack.prototype.moveLeaderDown = function (leaderName)
{
  var i;
  
  for (i = 0; i < this.leaders.length; i++)
    if (this.leaders[i].name == leaderName)
    {
      if (i == this.leaders.length-1) return; // Leader already at the bottom
      
      var temp = this.leaders[i];
      this.leaders[i] = this.leaders[i+1];
      this.leaders[i+1] = temp;

      return;
    }
  
  throw ("moveLeaderDown: leader " + leaderName + " not found");
}




Stack.prototype.changeFormation = function ()
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
        throw ("Invalid direction of line stack: " + this.direction);
    }
    
    this.formation = "column";
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
  }
  else 
    throw ("Invalid stack formation: " + this.formation);
}

// Move a stack one hex
// direction:
//  0: move ahead
// -1: move forward left
// +1: move forward right
Stack.prototype.move = function (direction)
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

Stack.prototype.moveAsLine = function (direction)
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
}

Stack.prototype.moveAsColumn = function (direction)
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

  drawStack (this);
}


Stack.prototype.reverseDirection = function (direction)
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
//          drawStack (aUnit);
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
//          drawStack (aUnit);
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
Stack.prototype.rotate = function  (direction) 
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
      break;  
      
    default:
      throw ("Invalid direction when rotating line");
  }
//  drawStack (aUnit);
}

// Move a leader with name "leaderName" from this stack to another stack with name "stackName". If "stackName" does not exist, it creates a new stack
// The new stack (or the stack identified by "stackName" is returned
// 
//Stack.prototype.moveLeaderToNewStack (leaderName, stackName) = function ()
// {
// }


