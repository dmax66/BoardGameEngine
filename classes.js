function CombatUnit (id, name, size, strength)
{
  this.id = id;
  this.name = name;
  this.strength = strength;
  this.size = size;
}
  

function InfantryUnit (id, name, size, strength)
{
  CombatUnit.call (this, id, name, size, strength);
}
InfantryUnit.prototype.constructor = InfantryUnit;
InfantryUnit.prototype = Object.create (CombatUnit.prototype);
InfantryUnit.prototype.type = "infantry";
InfantryUnit.prototype.movAllowance = 5;
InfantryUnit.prototype.subordValue = 1;

  
  
  
function CavalryUnit (id, name, size, strength)
{
  CombatUnit.call (this, id, name, size, strength);
}
CavalryUnit.prototype.constructor = CavalryUnit;
CavalryUnit.prototype = Object.create (CombatUnit.prototype);
CavalryUnit.prototype.type = "cavalry";
CavalryUnit.prototype.movAllowance = 9;
CavalryUnit.prototype.subordValue = 0.5;

function Leader (id, name, initiative, bonus, commandSpan, subordValue)
{
  CombatUnit.call (this, id, name, "corps", 0);
  this.initiative = initiative;
  this.bonus = bonus;
  this.commandSpan = commandSpan;
  this.subordValue = subordValue;
  this.usedCommandSpan = 0;
  this.units = [];
}
Leader.prototype.constructor = Leader;
Leader.prototype = Object.create (CombatUnit.prototype);
Leader.prototype.type = "leader";
Leader.prototype.movAllowance = 9;

Leader.prototype.addUnit = function (aUnit)
{
  this.units.push (aUnit);
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


Leader.prototype.removeUnit = function (unitId)
{
  var i;

  if (!this.units) throw ("Cannot remove unit from a leader with no units");
  
  for (i=0; i < this.units.length; i++)
    if (this.units[i].id == unitId)
      this.units = this.units.slice (i, 1);
  
  throw ("Removing unit from leader: unit not found");
}
  
  
  
  
function Stack (x, y, name, direction, mode) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.mode = mode;
  this.name = name
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
  

var myStack = new Stack (0, 0, "xxx", "N", "line");

var myLeader1 = new Leader (1, "Napoleon", 4, true, 10, 6);
var myLeader2 = new Leader (2, "Druout", 3, true, 6, 3);
var myLeader3 = new Leader (3, "Bertrand", 3, true, 6, 2);  


  
myLeader1.addUnit (new InfantryUnit (1, "Roguet", "division", 12));

myLeader2.addUnit (new InfantryUnit (2, "Marchand", "division", 8));
myLeader2.addUnit (new InfantryUnit (3, "Morand", "division", 7));

myLeader1.addUnit (myLeader2);

myLeader3.addUnit (new InfantryUnit (4, "Desmoulin", "division", 8));
myLeader3.addUnit (new CavalryUnit (5, "Subervie", "division", 3));
  
myStack.addLeader (myLeader1);
myStack.addLeader (myLeader3);
  
console.log (myStack.infantryStrength());  
console.log (myStack.cavalryStrength());  
console.log (myStack.artilleryStrength());  

  
