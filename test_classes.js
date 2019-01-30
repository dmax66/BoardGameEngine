
var myStack = new Stack (0, 0, "xxx", "N", "line");

var myLeader1 = new Leader (1, "Napoleon", 4, true, 10, 6);
var myLeader2 = new Leader (2, "Drouot", 3, true, 6, 3);
var myLeader3 = new Leader (3, "Bertrand", 3, true, 6, 2);  


  
myLeader1.addUnit (new InfantryUnit (1, "Roguet", "division", 12));

myLeader2.addUnit (new InfantryUnit (2, "Marchand", "division", 8));
myLeader2.addUnit (new InfantryUnit (3, "Morand", "division", 7));

// myLeader1.addUnit (myLeader2);

myLeader3.addUnit (new InfantryUnit (4, "Desmoulin", "division", 8));
myLeader3.addUnit (new CavalryUnit (5, "Subervie", "division", 3));
  
myStack.addLeader (myLeader1);
myStack.addLeader (myLeader2);
myStack.addLeader (myLeader3);
  
console.log (myStack.infantryStrength());  
console.log (myStack.cavalryStrength());  
console.log (myStack.artilleryStrength());  

var i;


// Test moveLeaderUp
console.log ("=== Test moveLeaderUp ===");
console.log ("Step 0");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 1");
myStack.moveLeaderUp ("Napoleon");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 2");
myStack.moveLeaderUp ("Drouot");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 3");
myStack.moveLeaderUp ("Bertrand");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("=== Test moveLeaderDown ===");
console.log ("Step 0");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 1");
myStack.moveLeaderDown ("Napoleon");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 2");
myStack.moveLeaderDown ("Bertrand");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 3");
myStack.moveLeaderDown ("Drouot");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );


console.log ("=== Test moveLeaderToTop ===");
console.log ("Step 0");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 1");
myStack.moveLeaderToTop ("Napoleon");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 2");
myStack.moveLeaderToTop ("Bertrand");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 3");
myStack.moveLeaderToTop ("Drouot");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("=== Test moveLeaderToBottom ===");
console.log ("Step 0");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 1");
myStack.moveLeaderToBottom ("Napoleon");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 2");
myStack.moveLeaderToBottom ("Bertrand");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

console.log ("Step 3");
myStack.moveLeaderToBottom ("Drouot");
for (i=0; i < myStack.leaders.length; i++)
  console.log ("leaders[" + i + "]: " + myStack.leaders[i].name );

z