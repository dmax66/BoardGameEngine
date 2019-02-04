'use strict';


// var stacks = [];
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





function showStackContextMenu (leaderWidgetId)  
{
  var aLeader = leaders[ findLeaderFromWidgetId (leaderWidgetId) ];

  
  
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
  
  unitContextMenu.style.left = (xMapCoordFromUnitCoord (aLeader.x) + 51) + "px";
  unitContextMenu.style.top = (xMapCoordFromUnitCoord (aLeader.y) - 10) + "px";
  unitContextMenu.onclick = function() { this.remove(); }

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "<b>Context Menu</b>"
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("HR");
  unitContextMenu.appendChild (menuContent);
  
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Flip Line-Column";
  menuContent.onclick = function() { aLeader.changeFormation (); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Rotate clockwise";
  if (aLeader.formation == "column") 
    menuContent.style.color = "#323232";
  else
    menuContent.onclick = function() { aLeader.rotate (1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Rotate anti-clockwise";
  if (aLeader.formation == "column") 
    menuContent.style.color = "#323232";
  else
    menuContent.onclick = function() { aLeader.rotate (-1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Flip direction";
  menuContent.onclick = function() { aLeader.flipDirection (); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward-left";
  menuContent.onclick = function() { aLeader.move (-1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward";
  if (aLeader.formation == "line") 
    menuContent.style.color = "#323232";
  else  
    menuContent.onclick = function() { aLeader.move (0); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward-right";
  menuContent.onclick = function() { aLeader.move (1); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Manage unit";
  unitContextMenu.appendChild (menuContent);
}

 
function findLeaderFromWidgetId (leaderWidgetId)
{
  var tokens = leaderWidgetId.split(":");
  
  var i;
  for (i=0; i<leaders.length; i++)
    if (leaders[i].id == tokens[1]) break;
  if (i == leaders.length) throw ("Leader not found: " + leaderWidgetId);
  
  return i;
}


function showLeaderInfo (leaderWidgetId)
{
  var aLeader = leaders[ findLeaderFromWidgetId (leaderWidgetId) ];
  
  
  // Check if the info widget already exists - if so, returns
  var leaderInfoWidget = document.getElementById ("LIW:" + aLeader.id);
  if (leaderInfoWidget != null)
      return;
  
  // Widget does not exist - create it!
  leaderInfoWidget= document.createElement ("DIV");
  leaderInfoWidget.id = "LIW:" + aLeader.id;
  leaderInfoWidget.setAttribute ("class", "leader-info");   // TODO: rename class
  leaderInfoWidget.style.left = (xMapCoordFromUnitCoord (aLeader.x, aLeader.y) + 40) + "px";
  leaderInfoWidget.style.top  = (yMapCoordFromUnitCoord (aLeader.x, aLeader.y) ) + "px";
  document.getElementById("mapContainer").appendChild(leaderInfoWidget);
  

  var leaderImgWidget = document.getElementById ("img:" + aLeader.name);

  // Table with units
  var unitTable = document.createElement ("TABLE");
  unitTable.setAttribute ("class", "unit-table");
  leaderInfoWidget.appendChild (unitTable);    
  
  var tableRow;
  var tableCell;
  var i;
  for (i=0; i < aLeader.units.length; i++) 
  {
    tableRow = document.createElement ("tr");
    unitTable.appendChild (tableRow);

    tableCell = document.createElement ("td");
    tableRow.appendChild (tableCell);    


//    unitIcon = document.createElement ("img");
//    unitIcon.setAttribute ("class", "unit-icon");
//    unitIcon.setAttribute ("class", stacks[stackIndex].leaders[leaderIndex].units[i].nationality);
//    unitIcon.src = "images/" + stacks[stackIndex].leaders[leaderIndex].units[i].type + "-" + stacks[stackIndex].leaders[leaderIndex].units[i].size + ".png";
    tableCell.appendChild (aLeader.units[i].picture());

    tableCell = document.createElement ("td");
    tableCell.innerHTML = aLeader.units[i].name;
    tableRow.appendChild (tableCell);    

    tableCell = document.createElement ("td");
    tableCell.innerHTML = aLeader.units[i].strength;
    tableRow.appendChild (tableCell);    
  }
   
  var closeButton = document.createElement ("BUTTON");
  closeButton.setAttribute ("class", "menu-button");  
  closeButton.innerHTML = "Close";
  closeButton.onclick = function() { document.getElementById (leaderWidgetId).onmouseout = function() { hideLeaderInfo (this.id, false); }; leaderInfoWidget.remove(); }
  leaderInfoWidget.appendChild (closeButton);
}


function hideLeaderInfo (leaderWidgetId, forceClose)
{
  var leaderInfoWidget; 
  var aLeader = leaders[ findLeaderFromWidgetId (leaderWidgetId) ];

  if (forceClose)
  {
    aLeader.sticky = false;
    leaderInfoWidget = document.getElementById ("LIW:" + aLeader.id);
    if (leaderInfoWidget != null)
        leaderInfoWidget.remove();
  }
  else if (aLeader.sticky) return;
    
  
  // Check if the info widget already exists - if so, returns
  leaderInfoWidget = document.getElementById ("LIW:" + aLeader.id);
  if (leaderInfoWidget != null)
      leaderInfoWidget.remove();
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


//    unitIcon = document.createElement ("img");
//    unitIcon.setAttribute ("class", "unit-icon");
//    unitIcon.setAttribute ("class", stacks[stackIndex].leaders[leaderIndex].units[i].nationality);
//    unitIcon.src = "images/" + stacks[stackIndex].leaders[leaderIndex].units[i].type + "-" + stacks[stackIndex].leaders[leaderIndex].units[i].size + ".png";
    tableCell.appendChild (stacks[stackIndex].leaders[leaderIndex].units[i].picture());

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




