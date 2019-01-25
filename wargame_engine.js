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



function drawBoard ()
{
  document.getElementById ("turnIndicator").innerHTML = turnInfo.turnNumber;
  document.getElementById ("weatherIndicator").innerHTML = turnInfo.weather;  
  document.getElementById ("playerIndicator").innerHTML = turnInfo.phasingPlayer;  
  document.getElementById ("phaseIndicator").innerHTML = turnInfo.phase + " Segment: " + turnInfo.segment;

  document.getElementById('fileinput').addEventListener('change', readScenarioFile, false);

  
  // Draw all the units on the map
//  stacks.forEach (createStackWidget);
//  stacks.forEach (drawStack);
}

function createStackWidget (theStack)
{
  var stackWidget = document.createElement ("DIV");
  
  stackWidget.id = "stack" + theStack.id;
  stackWidget.setAttribute ("class", "stack-widget");
  stackWidget.onmouseover = function() { showStackInfo (theStack); }
  stackWidget.onmouseout = function() { hideStackInfo (theStack); }
  stackWidget.onclick = function() { theStack.sticky = true; showStackInfo (theStack); }
  stackWidget.onmousedown =  function(event) { if (event.button==2) { event.cancelBubble=true; event.stopPropagation(); showStackContextMenu (theStack); }}

  document.getElementById("mapContainer").appendChild(stackWidget);
  
  var stackIcon = document.createElement ("img");
  stackIcon.setAttribute ("class", "stack-icon");
  stackIcon.setAttribute ("class", theStack.units[0].nationality);
  switch (theStack.formation)
  {
    case "line":
      stackIcon.src = "images/line.png";
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
  y = Math.floor (mapY / 30);
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
  switch (aStack.formation)
  {
    case "line":
      moveLine (aStack, direction);
      break;
      
    case "column":
      moveColumn (aStack, direction);
      break;
      
    default:
      throw ("Invalid stack formation");
  }
}
  

// Move a line one hex
// direction:
// -1: move forward left
// +1: move forward right
function moveLine (aStack, direction)
{
  // Find the index of stack facing for array "lineMovementInfo"

  var i=0;
  for (i=0; i<6; i++)
    if (aStack.facing == lineMovementInfo[i].facing) break;

  if (i==6) throw ("Invalid orientation of line stack");
   
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
    
  aStack.x += (aStack.y % 2 == 0) ? lineMovementInfo[i].xOffsetYEven[direction] : lineMovementInfo[i].xOffsetYOdd[direction];
  aStack.y += lineMovementInfo[i].yOffset[direction];
      
  drawStack (aStack);
}
   
// Rotate a stack (line) one hex
// direction:
// -1: rotate anticlockwise
// +1: rotate clockwise
function rotateStack (aUnit, direction) 
{
  var i=0;
  
  switch (direction) 
  {
    case 1:
      for (i=0; i<6; i++)
      {
        if (aUnit.facing == lineDrawInfo[i].facing) break;
      }
      if (i==6)
        throw ("Invalid stack (line) orientation");
        
      i += direction;
      if (i < 0) i += 6;
      if (i >= 6) i -= 6;

      aUnit.facing = lineDrawInfo[i].facing;
      break;
            
    case -1:
      switch (aUnit.facing)
      {
        case "N":
          aUnit.facing="NW";
          if (aUnit.y % 2 == 0) aUnit.x--;
          aUnit.y--;
          break;

        case "NW":
          aUnit.facing="SW";
          aUnit.x--;
          break;

        case "SW":
          aUnit.facing="S";
          if (aUnit.y % 2 == 0) aUnit.x--;
          aUnit.y++;
          break;

        case "S":
          aUnit.facing="SE";
          if (aUnit.y % 2 == 1) aUnit.x++;
          aUnit.y++;
          break;

        case "SE":
          aUnit.facing="NE";
          aUnit.x++;
          break;

        case "NE":
          aUnit.facing="N";
          if (aUnit.y % 2 == 1) aUnit.x++;
          aUnit.y--;
          break;
      }
      break;  
      
    default:
      throw ("Invalid direction when rotating line");
  }
  drawStack (aUnit);
}

function moveColumn (aStack, direction)
{
  // Find the current orientation in the RotationInfo array
  var i=0;
  while (i < 6 && aStack.facing != columnMovementInfo[i].facing) i++;
  if (i == 6) throw ("Incorrect column facing");

  // Calc the new direction by adding 'direction' to the current index. 
  // Treat the array as circular, managing the overflow
  i += direction;
  if (i < 0) i += 6;
  if (i >= 6) i -= 6;
  aStack.facing = columnMovementInfo[i].facing;      
    
  // Advance one hex
  aStack.x += (aStack.y % 2 == 0) ? columnMovementInfo[i].movement.xMoveWhenYEven : columnMovementInfo[i].movement.xMoveWhenYOdd;
  aStack.y += columnMovementInfo[i].movement.yMove;
  drawStack (aStack);
}

function flipStack (aUnit)
{
  var i;
  
  switch (aUnit.formation)
  {
    case "line":
      for (i=0; i<6; i++)
      {
        if (aUnit.facing == lineDrawInfo[i].facing)
        {
          aUnit.facing = lineDrawInfo[i].flip.newFacing;
          aUnit.x += (aUnit.y % 2 ==0) ? lineDrawInfo[i].flip.xOffsetEven : lineDrawInfo[i].flip.xOffsetOdd;
          aUnit.y += lineDrawInfo[i].flip.yOffset;
          drawStack (aUnit);
          return;
        }
      }
      throw ("Error - line 747");
      
    case "column":
      for (i=0; i<6; i++)
      {
        if (aUnit.facing == columnMovementInfo[i].facing)
        {
          aUnit.facing = columnMovementInfo[i].flip.newFacing;
          aUnit.x += (aUnit.y % 2 ==0) ? columnMovementInfo[i].flip.xOffsetEven : columnMovementInfo[i].flip.xOffsetOdd;
          aUnit.y += columnMovementInfo[i].flip.yOffset;
          drawStack (aUnit);
          return;
        }
      }
      throw ("Error - line 761");
      
    default:
      throw ("Invalid stack formation");
  }
}	

function flipLineColumn (theStack)
{
  if (theStack.formation == "line") 
  {
    switch (theStack.facing)
    {
      case "N":
        theStack.facing = "E";
        break;
        
      case "S":
        theStack.facing = "W";
        break;
        
      case "NE":
        theStack.facing = "SE";
        break;
        
      case "NW":
        theStack.facing = "NE";
        break;
        
      case "SW":
        theStack.facing = "NW";
        break;
        
      case "SE":
        theStack.facing = "SW";
        break;
        
      default:
        throw ("Invalid facing of line stack");
    }
    
    theStack.formation = "column";
  }
  else if (theStack.formation == "column")
  {
    switch (theStack.facing)
    {
      case "W":
        theStack.facing = "S";
        break;
        
      case "E":
        theStack.facing = "N";
        break;
        
      case "NE":
        theStack.facing = "NW";
        break;
        
      case "NW":
        theStack.facing = "SW";
        break;
        
      case "SW":
        theStack.facing = "SE";
        break;
        
      case "SE":
        theStack.facing = "NE";
        break;
        
      default:
        throw ("Invalid facing of column stack");
    }
    
    theStack.formation = "line";
  }
  else 
    throw ("Invalid stack formation");
  
  
  drawStack (theStack);
}

function drawStack (theStack)
{
  var stackWidget = document.getElementById ("stack" + theStack.id);
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
  
  switch (theStack.formation)
  {
    case "line":
      stackIcon.src = "images/line.png";
      stackName.style.visibility = "visible";
      for (i=0; i<6; i++)
      {
        if (theStack.facing == lineDrawInfo[i].facing)
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
        if (theStack.facing == columnMovementInfo[i].facing)
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


  
function showStackInfo (theStack)
{
  var stackInfoWidget; 
  var unitInfoContent = undefined;
  
  // Check if the info widget already exists - if so, returns
  stackInfoWidget = document.getElementById ("stackInfoWidget" + theStack.id);
  if (stackInfoWidget != null)
      return;
  
  // Widget does not exist - create it!
  stackInfoWidget= document.createElement ("DIV");
  stackInfoWidget.id = "stackInfoWidget" + theStack.id;
  stackInfoWidget.setAttribute ("class", "leader-info");   // TODO: rename class
  stackInfoWidget.style.left = (xMapCoordFromUnitCoord (theStack.x, theStack.y) + 10) + "px";
  stackInfoWidget.style.top  = (yMapCoordFromUnitCoord (theStack.x, theStack.y) ) + "px";
  document.getElementById("mapContainer").appendChild(stackInfoWidget);
  

  var leaderTable = document.createElement ("TABLE");
  leaderTable.setAttribute ("class", "leader-table");
  stackInfoWidget.appendChild (leaderTable);
  
  // Display all the leaders in the stack
  var j=0;
  for (j=0; j<theStack.units.length; j++)
  {
    var tableRow  = document.createElement ("tr");
    leaderTable.appendChild (tableRow);
    
    var tableCell = document.createElement ("td");
    tableRow.appendChild (tableCell);
   
    // First cell: add the leader's image
    unitInfoContent = document.createElement ("IMG");
    unitInfoContent.id = "img:" + theStack.units[j].commander;
    unitInfoContent.src ="images/" + theStack.units[j].commander + ".png";
    unitInfoContent.style.width = "50px";
    unitInfoContent.onmousedown = function(event) { displayLeaderUnits(event) };
    tableCell.appendChild (unitInfoContent);

    // Second cell: add the leader's characteristics
    tableCell = document.createElement ("TD");    
    tableCell.innerHTML = "<b>" + theStack.units[j].commander + "&nbsp" + theStack.units[j].initiative + "&nbsp" + theStack.units[j].bonus + "&nbsp" + theStack.units[j].commandCapacity + "&nbsp" + theStack.units[j].subordinationValue + "</b>"
    tableRow.appendChild (tableCell);
  }
  
  var closeButton = document.createElement ("BUTTON");
  closeButton.setAttribute ("class", "menu-button");  
  closeButton.innerHTML = "Close";
  closeButton.onclick = function() { theStack.sticky = false; stackInfoWidget.remove(); }
  stackInfoWidget.appendChild (closeButton);
}

function hideStackInfo (theStack)
{
  if (theStack.sticky) return;
    
  var stackInfoWidget; 
  
  // Check if the info widget already exists - if so, returns
  stackInfoWidget = document.getElementById ("stackInfoWidget" + theStack.id);
  if (stackInfoWidget != null)
      stackInfoWidget.remove();
}  
 
// Display the units (infantry, cavalry, artillery, pontoons) commanded by a leader
// Enable 
function displayLeaderUnits (event)
{
  var i=0;
  var tableRow;
  var tableCell;
  var unitIcon;
  var leaderName ;
  var leaderInfoWidget;
  var leaderInfoWidgetName;
  var leaderImgWidget;
  
  // Extract the name of the leader
  leaderName = event.currentTarget.id.slice(4);
  
  leaderInfoWidgetName = "leaderInfoWidget:" + leaderName;
  leaderImgWidget = document.getElementById ("img:" + leaderName);

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
  
  for (i=0; i<units.length; i++) {
    if (units[i].commandingUnit == leaderName) {
      tableRow = document.createElement ("tr");
      unitTable.appendChild (tableRow);

      tableCell = document.createElement ("td");
      tableRow.appendChild (tableCell);    

      unitIcon = document.createElement ("img");
      unitIcon.setAttribute ("class", "unit-icon");
      unitIcon.setAttribute ("class", units[i].nationality);
      unitIcon.src = "images/" + units[i].type + "-" + units[i].size + ".png";
      tableCell.appendChild (unitIcon);

      tableCell = document.createElement ("td");
      tableCell.innerHTML = units[i].commander;
      tableRow.appendChild (tableCell);    

      tableCell = document.createElement ("td");
      tableCell.innerHTML = units[i].strength;
      tableRow.appendChild (tableCell);    
    }
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
  
function allowDrop(ev) {
  ev.preventDefault();
}

function startDrag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var unitId = ev.dataTransfer.getData("text");

//  alert ("Target: " + unitId);
  var theUnit = document.getElementById ("gameMapImg");
  
  alert ("X=" + (ev.offsetX - theUnit.style.left.slice(0, -2)) + "  Y=" + (ev.offsetY - theUnit.style.top.slice (0, -2)));
//  alert ("X=" + theUnit.style.left.slice(0, -2) + "  Y=" + theUnit.style.top.slice (0, -2));
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
  var contents;
  var f = evt.target.files[0]; 

  if (f) 
  {
    var r = new FileReader();
    r.onload = function(e) 
    { 
      contents = e.target.result;
//      alert( "Got the file!" + "starts with: " + contents.substr(0, 20));  
      eval(contents);

      stacks.forEach (createStackWidget);
      stacks.forEach (drawStack);
      
      alert ("Leaders[0]=" + leaders[0].commander);
    
    }

    r.readAsText(f);
  } 
  else  
    alert("Failed to load file");
}






