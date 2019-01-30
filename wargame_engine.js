'use strict';


var stacks = [];
var timeTrack = [];
var leaders = [];
var currentTurn = 0;


    
    
var lineMovementInfo = [
  {
    facing: "N",      // Facing of unit when starting the movement
    xOffsetYEven: [-1, 0],    // index 0 = increment when moving forward left
    xOffsetYOdd: [0, 1],    // index 0 = increment when moving forward left
    yOffset: [-1, -1]     // index 1 = increment when moving forward right
  }, 
  {
    facing: "NW",      // Facing of unit when starting the movement
    xOffsetYEven: [-1, -1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [-1,0],    // index 0 = increment when moving forward left
    yOffset: [0, -1]     // index 1 = increment when moving forward right
  },
  {
    facing: "SW",      // Facing of unit when starting the movement
    xOffsetYEven: [-1,-1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [0,-1],    // index 0 = increment when moving forward left
    yOffset: [1, 0]     // index 1 = increment when moving forward right
  },
  {
    facing: "S",      // Facing of unit when starting the movement
    xOffsetYEven: [0,-1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [1,0],    // index 0 = increment when moving forward left
    yOffset: [1, 1]     // index 1 = increment when moving forward right
  },
  {
    facing: "SE",      // Facing of unit when starting the movement
    xOffsetYEven: [1,0],    // index 0 = increment when moving forward left
    xOffsetYOdd: [1,1],    // index 0 = increment when moving forward left
    yOffset: [0,1]     // index 1 = increment when moving forward right
  },
  {
    facing: "NE",      // Facing of unit when starting the movement
    xOffsetYEven: [0,1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [1,1],    // index 0 = increment when moving forward left
    yOffset: [-1,0]     // index 1 = increment when moving forward right
  }
]

var lineDrawInfo = 
[
  {
    facing: "N",
    angle: 0,
    xOffset: -29,
    yOffset: 7,
    flip: {
      newFacing: "S",
      xOffsetEven: -1,
      xOffsetOdd: -1,
      yOffset: 0
    }
  },
  {
    facing: "NE",
    angle: -300,
    xOffset: -22,
    yOffset: -3,
    flip: {
      newFacing: "SW",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: -1
    }
  },
  {
    facing: "SE",
    angle: -240,
    xOffset: -5,
    yOffset: -7,
    flip: {
      newFacing: "NW",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: -1
    }
  },
  {
    facing: "S",
    angle: -180,
    xOffset: 2,
    yOffset: 3,
    flip: {
      newFacing: "N",
      xOffsetEven: 1,
      xOffsetOdd: 1,
      yOffset: 0
    }
  },
  {
    facing: "SW",
    angle: -120,
    xOffset: -3,
    yOffset: 18,
    flip: {
      newFacing: "NE",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: 1
    }
  },
  {
    facing: "NW",
    angle: -60,
    xOffset: -19,
    yOffset: 21,
    flip: {
      newFacing: "SE",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: 1
    }
  }
];



var columnMovementInfo = 
[
  {
    facing: "NE",
    angle: -60,
    xOffset: -23, 
    yOffset: 22,
    flip: {
      newFacing: "SW",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: 1
    },
    movement: {
      xMoveWhenYEven: 0,
      xMoveWhenYOdd: 1,
      yMove: -1
    }
  },
  {
    facing: "E",
    angle: 0,
    xOffset: -29,
    yOffset: 6,
    flip: {
      newFacing: "W",
      xOffsetEven: -1,
      xOffsetOdd: -1,
      yOffset: 0
    },
    movement: {
      xMoveWhenYEven: 1,
      xMoveWhenYOdd: 1,
      yMove: 0
    }
  },
  {
    facing: "SE",
    angle: 60,
    xOffset: -21, 
    yOffset: -8,
    flip: {
      newFacing: "NW",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: -1
    },
    movement: {
      xMoveWhenYEven: 0,
      xMoveWhenYOdd: 1,
      yMove: 1
    }

  },
  {     
    facing: "SW",
    angle: 120,
    xOffset: 0,
    yOffset: -10,
    flip: {
      newFacing: "NE",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: -1
    },
    movement: {
      xMoveWhenYEven: -1,
      xMoveWhenYOdd: 0,
      yMove: 1
    }
  },
  {        
    facing: "W",
    angle: 180,
    xOffset: 4,   
    yOffset: 4,
    flip: {
      newFacing: "E",
      xOffsetEven: 1,
      xOffsetOdd: 1,
      yOffset: 0
    },
    movement: {
      xMoveWhenYEven: -1,
      xMoveWhenYOdd: -1,
      yMove: 0
    }
  },
  {
    facing: "NW",
    angle: 240,
    xOffset: -4,
    yOffset: 20,
    flip: {
      newFacing: "SE",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: 1
    },
    movement: {
      xMoveWhenYEven: -1,
      xMoveWhenYOdd: 0,
      yMove: -1
    }

  }        
]
  




var turnInfo = 
{
  turnNumber: 0,
  phasingPlayer: "French",
  phase: "",
  segment: "",  
  weather: "",

  
  frenchInfo : 
  {
    moraleLevel: 0,
    accumulatedAdminPoints: 0,
    accumulatedReplacements: 0,
    minMoraleLevel: -1,
    maxMoraleLevel: 2 },
  
  alliedInfo: 
  { 
    moraleLevel: -1,
    accumulatedAdminPoints: 0,
    accumulatedReplacements: 0,
    minMoraleLevel: -2,
    maxMoraleLevel: 1
  }
}



function updateAdminBoard ()
{
  document.getElementById ("turnIndicator").innerHTML = turnInfo.turnNumber;
  document.getElementById ("weatherIndicator").innerHTML = turnInfo.weather;  
  document.getElementById ("playerIndicator").innerHTML = turnInfo.phasingPlayer;  
  document.getElementById ("phaseIndicator").innerHTML = turnInfo.phase + " Segment: " + turnInfo.segment;

  document.getElementById('fileinput').addEventListener('change', readScenarioFile, false);
}



function createStackWidget (theStack)
{
  var stackWidget = document.createElement ("DIV");
  
  stackWidget.id = "stack" + theStack.id;
  stackWidget.setAttribute ("class", "stack-widget");
  stackWidget.onmouseover = function() { showStackInfo (theStack); }
  stackWidget.onmouseout = function() { hideStackInfo (theStack, false); }
  stackWidget.onclick = function() { theStack.sticky = true; showStackInfo (theStack); }
  stackWidget.onmousedown =  function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showStackContextMenu (theStack); }}

  document.getElementById("mapContainer").appendChild(stackWidget);
  
  var stackIcon = document.createElement ("img");
  stackIcon.setAttribute ("class", "stack-icon");
  stackIcon.setAttribute ("class", theStack.units[0].nationality);
  
  // This code should be removed as already present in drawStack() 
  switch (theStack.formation)
  {
    case "line":
      stackIcon.src = theStack.units[0].type == "cavalry" ? "images/cavalry-line.png" : "images/infantry-line.png";
//      stackIcon.src = "images/infantry-line.png";
      break;
      
    case "column":
      stackIcon.src = "images/column.png";    
      break;
      
    default:
      throw ("Invalid formation value");
  }
  stackIcon.style.height = "26px";
  stackIcon.style.width = "60px";  
  stackWidget.appendChild (stackIcon);
  
  // If the stack is in line formation, show leader name to stack - or if multiple leader, add the first leader's name
  var stackName = document.createElement ("P");
  stackName.setAttribute ("class", "stack-name");
  stackName.innerHTML = theStack.units[0].commander;
  if (theStack.units.length > 1) stackName.innerHTML += "+";
  stackName.style.visibility = (theStack.formation == "line") ? "visible" : "hidden";
  stackWidget.appendChild (stackName);
}

function xMapCoordFromUnitCoord (unitX, unitY)
{
  if ((unitY % 2) == 0)
    return 34*unitX;
  else
    return 17+34*unitX;
}

function yMapCoordFromUnitCoord (unitX, unitY)
{
  return 30*unitY;
}

function xUnitCoordFromMapCoord (mapX, mapY)
{
  var y = Math.floor (mapY / 30);
  if ((y % 2) == 1)
    return Math.floor((mapX-17)/34);
  else
    return Math.floor (mapX / 34);
}

function yUnitCoordFromMapCoord (mapX, mapY)
{
  return Math.floor (mapY / 30);
}


// Move a stack one hex
// direction:
//  0: move ahead
// -1: move forward left
// +1: move forward right
function moveStack (aStack, direction)
{
  aStack.move (direction);
}
  

// Move a line one hex
// direction:
// -1: move forward left
// +1: move forward right
// function moveLine (aStack, direction)
// {
//
//  aStack.moveAsLine (direction)
// }
   
// Rotate a stack (line) one hex
// direction:
// -1: rotate anticlockwise
// +1: rotate clockwise
function rotateStack (aStack, direction) 
{
  aStack.rotate (direction);

  drawStack (aStack);
}

// function moveColumn (aStack, direction)
//{
//  aStack.moveAsLine (direction);
//  
//  drawStack (aStack);
//}

function flipStack (aStack)
{
  aStack.reverseDirection();
  
  drawStack (aStack);
}	

function flipLineColumn (aStack)
{
  aStack.changeFormation();
  
  drawStack (aStack);
}


// Detach the checked units from the stack and move them to a new stack; then move the stack
function detachUnitsAndMove (theStack, direction)
{
  // Create a new stack...
  var newStack;
  stacks.push (newStack);
  
  // Checked units are copied new stack  
  for (i=0; i<theStack.length; i++)
  {
    var stackWidget = document.getElementById ("SIW:" + theStack.id + ":" + i);
    if (stackWidget.value == "*")
      newStack[newStack.length] = theStack.units[i];
  }
  
  // Now remove the units from theStack
  for (i=0; i<theStack.length; i++)
  {
    var stackWidget = document.getElementById ("SIW:" + theStack.id + ":" + i);
    if (stackWidget.value = "*")
      theStack.units.splice (i, 1);
  }
  
  // ... and move it
  moveStack (newStack, direction);
}


function drawStack (theStack)
{
  var stackWidget = document.getElementById ("stack" + theStack.id);
  if (!stackWidget)
  {
    // Creates the DIV element
    stackWidget = document.createElement ("div");
    stackWidget.id = "stack" + theStack.id;
    stackWidget.setAttribute ("class", "stack-widget");
    stackWidget.onmouseover = function() { showStackInfo (theStack); }
    stackWidget.onmouseout = function() { hideStackInfo (theStack, false); }
    stackWidget.onclick = function() { theStack.sticky = true; showStackInfo (theStack); }
    stackWidget.onmousedown =  function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showStackContextMenu (theStack); }}
    document.getElementById("mapContainer").appendChild(stackWidget);
  
    // Set the icon
    var stackIcon = document.createElement ("IMG");
    stackIcon.setAttribute ("class", "stack-icon");
    stackIcon.setAttribute ("class", theStack.leaders[0].nationality);
    stackIcon.style.height = "26px";
    stackIcon.style.width = "60px";  
    stackWidget.appendChild (stackIcon);
  
    // If the stack is in line formation, show leaders[0] name to stack
    var stackName = document.createElement ("P");
    stackName.setAttribute ("class", "stack-name");
//    stackName.style.visibility = (theStack.formation == "line") ? "visible" : "hidden";
    stackWidget.appendChild (stackName);
  }
  else
  {
    var stackIcon = undefined;
    var stackName = undefined;
    var i=0;

    // Find the stack icon object
    for (i = 0; i < stackWidget.childNodes.length; i++)
      if (stackWidget.childNodes[i].nodeName == "IMG")
      {
        stackIcon = stackWidget.childNodes[i];
        break;
      }

    // Find the stack name object
    for (i = 0; i < stackWidget.childNodes.length; i++)
      if (stackWidget.childNodes[i].nodeName == "P")
      {
        stackName = stackWidget.childNodes[i];
        break;
      }

    if (!stackIcon) throw ("Stack icon not found");
    if (!stackName) throw ("Stack name not found");
  }
  
  stackName.innerHTML = theStack.leaders[0].name + ((theStack.leaders.length > 1) ? "+" : "");

  switch (theStack.formation)
  {
    case "line":
      stackIcon.src = theStack.leaders[0].type == "cavalry" ? "images/cavalry-line.png" : "images/infantry-line.png";
      stackName.style.visibility = "visible";

      for (i=0; i<6; i++)
      {
        if (theStack.direction == lineDrawInfo[i].facing)
        {
          stackWidget.style.transform = "rotate(" + lineDrawInfo[i].angle + "deg)";
          stackWidget.style.left = (lineDrawInfo[i].xOffset + xMapCoordFromUnitCoord (theStack.x, theStack.y)) + "px";  
          stackWidget.style.top = (lineDrawInfo[i].yOffset + yMapCoordFromUnitCoord (theStack.x, theStack.y)) + "px";
          return;
        }
      } 
      throw ("Stack orientation (line mode) invalid");

    case "column":
      stackIcon.src = "images/column.png";
      stackName.style.visibility = "hidden";
      for (i=0; i<6; i++)
      {
        if (theStack.direction == columnMovementInfo[i].facing)
        {
          stackWidget.style.transform = "rotate(" + columnMovementInfo[i].angle + "deg)";
          stackWidget.style.left = (columnMovementInfo[i].xOffset + xMapCoordFromUnitCoord (theStack.x, theStack.y)) + "px";  
          stackWidget.style.top = (columnMovementInfo[i].yOffset + yMapCoordFromUnitCoord (theStack.x, theStack.y)) + "px";
          return;
        }
      } 
      throw ("Stack orientation (column mode) invalid");

    default:
      throw ("Formation invalid");
  }
}

function showStackContextMenu (aUnit)  
{
  var unitContextMenu; 
  var menuContent = undefined;
  var parentWidget = document.getElementById("mapContainer");
  
  // Check if the info widget already exists - if so, close the previous one
  unitContextMenu = document.getElementById ("unitContextMenu");
  if (unitContextMenu != null) 
    unitContextMenu.remove();
  
  // Now the menu does not exist - create it!
  unitContextMenu= document.createElement ("DIV");
  unitContextMenu.id = "unitContextMenu";
  unitContextMenu.setAttribute ("class", "context-menu");
  
  parentWidget.appendChild(unitContextMenu);
  
  unitContextMenu.style.left = (xMapCoordFromUnitCoord (aUnit.x) + 51) + "px";
  unitContextMenu.style.top = (xMapCoordFromUnitCoord (aUnit.y) - 10) + "px";
  unitContextMenu.onclick = function() { this.remove(); }

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "<b>Context Menu</b>"
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("HR");
  unitContextMenu.appendChild (menuContent);
  
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Flip Line-Column";
  menuContent.onclick = function() { flipLineColumn (aUnit); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Rotate clockwise";
  if (aUnit.formation == "column") 
    menuContent.style.color = "#323232";
  else
    menuContent.onclick = function() { rotateStack (aUnit, 1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Rotate anti-clockwise";
  if (aUnit.formation == "column") 
    menuContent.style.color = "#323232";
  else
    menuContent.onclick = function() { rotateStack (aUnit, -1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Flip direction";
  menuContent.onclick = function() { flipStack (aUnit); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward-left";
  menuContent.onclick = function() { moveStack (aUnit, -1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward";
  if (aUnit.formation == "line") 
    menuContent.style.color = "#323232";
  else  
    menuContent.onclick = function() { moveStack (aUnit, 0); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward-right";
  menuContent.onclick = function() { moveStack (aUnit, 1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Manage unit";
  unitContextMenu.appendChild (menuContent);
}

 
function showLeaderContextMenu (event)
{
  var tokens = event.currentTarget.id.split(":");
  
  var stackId = tokens[1];
  var leaderIndex = tokens[2];
  
  // find the stack
  var stackIndex = 0;
  while (stacks[stackIndex].id != stackId) stackIndex++;
  if (stackIndex == stacks.length) throw ("Stack with id: " + stackId + " not found");

  // find the leader name
  var leaderName = stacks[stackIndex].leaders[leaderIndex].name;
  
  // Check if the leaderContextMenu for the current stack/leader exists
  var leaderContextMenu = document.getElementById ("LIW:" + stackId + ":" + leaderIndex);
  if (leaderContextMenu != null)
      return;

  // leaderInfoWidget does not exist, create it!
  // Widget does not exist - create it!
  leaderContextMenu = document.createElement ("DIV");
  leaderContextMenu.id = "LIW:" + stackId + ":" + leaderIndex;
  leaderContextMenu.setAttribute ("class", "context-menu");   
  leaderContextMenu.style.left = (event.pageX + 10) + "px";
  leaderContextMenu.style.top  = (event.pageY + 0 ) + "px";
  document.getElementById("mapContainer").appendChild (leaderContextMenu);

  // Create menu header
  var menuContent;
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "<b>" + leaderName + "</b>";
  menuContent.onclick = function () { leaderContextMenu.remove(); }
  leaderContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("HR");
  leaderContextMenu.appendChild (menuContent);
  
  
  // Move up
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move Leader up";
  menuContent.onclick = function() { stacks[stackIndex].moveLeaderUp (leaderName); leaderContextMenu.remove(); hideStackInfo (stacks[stackIndex], true); drawStack (stacks[stackIndex]); showStackInfo (stacks[stackIndex]); }
  leaderContextMenu.appendChild (menuContent);

  // Move down
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move leader down";
  menuContent.onclick = function() { stacks[stackIndex].moveLeaderDown (leaderName); leaderContextMenu.remove(); hideStackInfo (stacks[stackIndex], true); drawStack (stacks[stackIndex]); showStackInfo (stacks[stackIndex]); }
  leaderContextMenu.appendChild (menuContent);
  
  // Move top
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move leader to top";
  menuContent.onclick = function() { stacks[stackIndex].moveLeaderToTop (leaderName); leaderContextMenu.remove();hideStackInfo (stacks[stackIndex], true); drawStack (stacks[stackIndex]); showStackInfo (stacks[stackIndex]); }
  leaderContextMenu.appendChild (menuContent);

  // Move bottom
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move leader to bottom";
  menuContent.onclick = function() { stacks[stackIndex].moveLeaderToBottom (leaderName); leaderContextMenu.remove(); hideStackInfo (stacks[stackIndex], true); drawStack (stacks[stackIndex]); showStackInfo (stacks[stackIndex]); }
  leaderContextMenu.appendChild (menuContent);
}



function showStackInfo (theStack)
{
  var stackInfoWidget; 
  var unitInfoContent = undefined;
  
  // Check if the info widget already exists - if so, returns
  stackInfoWidget = document.getElementById ("SIW:" + theStack.id);
  if (stackInfoWidget != null)
      return;
  
  // Widget does not exist - create it!
  stackInfoWidget= document.createElement ("DIV");
  stackInfoWidget.id = "SIW:" + theStack.id;
  stackInfoWidget.setAttribute ("class", "leader-info");   // TODO: rename class
  stackInfoWidget.style.left = (xMapCoordFromUnitCoord (theStack.x, theStack.y) + 40) + "px";
  stackInfoWidget.style.top  = (yMapCoordFromUnitCoord (theStack.x, theStack.y) ) + "px";
  document.getElementById("mapContainer").appendChild(stackInfoWidget);
  

  var tableOfLeaders = document.createElement ("TABLE");
  tableOfLeaders.setAttribute ("class", "leader-table");
  stackInfoWidget.appendChild (tableOfLeaders);
  
  // Display all the leaders in the stack
  var j=0;
  for (j = 0; j < theStack.leaders.length; j++)
  {
    var tableRow  = document.createElement ("tr");
    tableRow.id = "SIW:" + theStack.id + ":" + j;
    tableRow.onclick = function(event) { displayLeaderUnits(event) };
    tableRow.onmousedown = function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showLeaderContextMenu (event); }}
    tableOfLeaders.appendChild (tableRow);
    
    var tableCell = document.createElement ("td");
    tableRow.appendChild (tableCell);
    unitInfoContent = document.createElement ("input");
    unitInfoContent.type = "checkbox";
    unitInfoContent.value = "*";
    tableCell.appendChild (unitInfoContent);
    
    // Second cell: add the leader's image
    tableCell = document.createElement ("td");
    tableRow.appendChild (tableCell);
   
    unitInfoContent = document.createElement ("img");
    unitInfoContent.id = "img:" + theStack.leaders[j].name;
    unitInfoContent.src ="images/" + theStack.leaders[j].name + ".png";
    unitInfoContent.style.width = "50px";
    tableCell.appendChild (unitInfoContent);

    // Third cell: add the leader's characteristics
    tableCell = document.createElement ("td");    
    tableCell.innerHTML = "<b>" + theStack.leaders[j].name + "&nbsp" + theStack.leaders[j].initiative +  
      (theStack.leaders[j].bonus ? "&nbsp;*&nbsp;" : "&nbsp;") + theStack.leaders[j].commandCapacity + "&nbsp" + theStack.leaders[j].subordinationValue + "</b>"
    tableRow.appendChild (tableCell);
  }
  
  var closeButton = document.createElement ("BUTTON");
  closeButton.setAttribute ("class", "menu-button");  
  closeButton.innerHTML = "Close";
  closeButton.onclick = function() { theStack.sticky = false; stackInfoWidget.remove(); }
  stackInfoWidget.appendChild (closeButton);
}

function hideStackInfo (theStack, forceClose)
{
  var stackInfoWidget; 

  if (forceClose)
  {
    theStack.sticky = false;
    stackInfoWidget = document.getElementById ("SIW:" + theStack.id);
    if (stackInfoWidget != null)
        stackInfoWidget.remove();
  }
  else if (theStack.sticky) return;
    
  
  // Check if the info widget already exists - if so, returns
  stackInfoWidget = document.getElementById ("SIW:" + theStack.id);
  if (stackInfoWidget != null)
      stackInfoWidget.remove();
}  



// Display the units (infantry, cavalry, artillery, pontoons) commanded by a leader
function displayLeaderUnits (event)
{
  var i=0;
  var tableRow;
  var tableCell;
  var unitIcon;
  var leaderInfoWidget;
  var leaderInfoWidgetName;
  var leaderImgWidget;
  
  // Extract the stack and and the leader
  // currentTarget.id contains the stack id and leader position within the stack  in the following format: "SIW:<stackid>:<leaderIndex>"
  var tokens = event.currentTarget.id.split (":");
  var stackId = tokens[1];
  var leaderIndex = tokens[2];
  
  leaderInfoWidgetName = "LIW:" + myStack.leaders[leaderIndex].name;
  leaderImgWidget = document.getElementById ("img:" + myStack.leaders[leaderIndex].name);

  // Check the widget doesn't exist already
  leaderInfoWidget = document.getElementById (leaderInfoWidgetName);
  if (leaderInfoWidget != null)
      return;
  
  // Widget does not exist - create it!
  leaderInfoWidget= document.createElement ("DIV");
  leaderInfoWidget.id = leaderInfoWidgetName;
  leaderInfoWidget.setAttribute ("class", "unit-info");   
  leaderInfoWidget.style.left = Number (leaderImgWidget.parentNode.parentNode.parentNode.parentNode.style.left.slice(0, -2)) + Number (leaderImgWidget.style.width.slice (0, -2)) + 100 + "px";
  leaderInfoWidget.style.top  = Number (leaderImgWidget.parentNode.parentNode.parentNode.parentNode.style.top.slice(0, -2))  + Number (leaderImgWidget.style.height.slice (0, -2)) / 2 +"px";
  document.getElementById ("mapContainer").appendChild(leaderInfoWidget);


  var unitTable = document.createElement ("TABLE");
  unitTable.setAttribute ("class", "unit-table");
  leaderInfoWidget.appendChild (unitTable);    
  
  // Retrieve the stack
  var stackIndex;
  for (stackIndex = 0; stackIndex < stacks.length; stackIndex++)
    if (stacks[stackIndex].id == stackId) break;
  
  if (stackIndex == stacks.length) throw ("Stack " + stackId + "not found");
  
  for (i=0; i < stacks[stackIndex].leaders[leaderIndex].units.length; i++) 
  {
    tableRow = document.createElement ("tr");
    unitTable.appendChild (tableRow);

    tableCell = document.createElement ("td");
    tableRow.appendChild (tableCell);    


    unitIcon = document.createElement ("img");
    unitIcon.setAttribute ("class", "unit-icon");
    unitIcon.setAttribute ("class", stacks[stackIndex].leaders[leaderIndex].units[i].nationality);
    unitIcon.src = "images/" + stacks[stackIndex].leaders[leaderIndex].units[i].type + "-" + stacks[stackIndex].leaders[leaderIndex].units[i].size + ".png";
    tableCell.appendChild (unitIcon);

    tableCell = document.createElement ("td");
    tableCell.innerHTML = stacks[stackIndex].leaders[leaderIndex].units[i].name;
    tableRow.appendChild (tableCell);    

    tableCell = document.createElement ("td");
    tableCell.innerHTML = stacks[stackIndex].leaders[leaderIndex].units[i].strength;
    tableRow.appendChild (tableCell);    
  }
  
  var closeButton = document.createElement ("BUTTON");
  closeButton.setAttribute ("class", "menu-button");  
  closeButton.style.left = "10px";
  closeButton.innerHTML = "Close";
  closeButton.onclick = function() { leaderInfoWidget.remove(); }
  leaderInfoWidget.appendChild (closeButton);

  var manageButton = document.createElement ("BUTTON");
  manageButton.setAttribute ("class", "menu-button");  
  manageButton.style.left = "20px";
  manageButton.innerHTML = "Manage";
//  manageButton.onclick = function() { do something }
  leaderInfoWidget.appendChild (manageButton);

}


  
function saveData()
{
  var jsonData = JSON.stringify (leaders);

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  var textFileAsBlob = new Blob([jsonData], {type:'text/plain'});
  var fileNameToSaveAs = "test.json";
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null)
  {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else
  {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      // downloadLink.onclick = remove(this);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
  }
  downloadLink.click();
  alert ("Game data saved");
}
  

function showMousePosition (ev)
{
  var x, y;
  
  x = xUnitCoordFromMapCoord (ev.offsetX, ev.offsetY);
  y = yUnitCoordFromMapCoord (ev.offsetX, ev.offsetY);
  
  document.getElementById ("position-tracker").innerHTML = ev.offsetX + "," + ev.offsetY + "<br>" + x + ", " + y;
}


 

function readScenarioFile(evt) 
{
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0]; 

  if (f) 
  {
    var r = new FileReader();
    r.onload = function(e) 
    { 
      var contents = e.target.result;
      eval(contents);

      processTimeTrackInfo();
    }

    r.readAsText(f);
  } 
  else  
    alert("Failed to load file");
}


function processTimeTrackInfo()
{
  // Add new stacks
  var i = 0;
  for (i=0; i < timeTrack[currentTurn].stacks.length; i++)
    stacks.push (timeTrack[currentTurn].stacks[i]);      

  // @TODO: add replacements
  
  // Creates the stacks on the map
//  stacks.forEach (createStackWidget);
  stacks.forEach (drawStack);
}

function endTurn()
{
  var r = confirm ("Are you sure?");
  if (r == true)
  {
    currentTurn++;
    processTimeTrackInfo();
  }
}




