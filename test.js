

var myStack = new Stack (1, 5, 6, "xxx", "N", "line");

var stacks = [ myStack ];

var myLeader1 = new Leader (1, "Napoleon", "french", "infantry-leader", 4, true, 10, 6);
var myLeader2 = new Leader (2, "Drouot", "french", "leader", 3, false, 6, 3);
var myLeader3 = new Leader (3, "Bessieres", "french", "cavalry-leader", 3, true, 6, 2);  


  
myLeader1.addUnit (new InfantryUnit (1, "Roguet", "french", "division", 12));
myLeader2.addUnit (new InfantryUnit (2, "Marchand", "french", "division", 8));
myLeader2.addUnit (new InfantryUnit (3, "Morand", "french", "division", 7));

myLeader1.addUnit (myLeader2);

myLeader3.addUnit (new InfantryUnit (4, "Desmoulin", "french", "division", 8));
myLeader3.addUnit (new CavalryUnit (5, "Subervie", "french", "division", 3));
  
myStack.addLeader (myLeader1);
//myStack.addLeader (myLeader2);
myStack.addLeader (myLeader3);
  
drawStack (stacks[0]);