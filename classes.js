
function CombatUnit (id, name, nationality, size, strength)
{
  this.id = id;
  this.name = name;
  this.nationality = nationality;
  this.strength = strength;
  this.size = size;
}
 
CombatUnit.prototype.picture = function ()
{
  var unitIcon = document.createElement ("img");
  unitIcon.setAttribute ("class", "unit-icon");
  unitIcon.setAttribute ("class", this.nationality);
  unitIcon.src = "images/" + this.type + "-" + this.size + ".png";

  return unitIcon;
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
