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
  phasingPlayer: "French",
  
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
  document.getElementById ("turnIndicator").innerHTML = "Turn: " + gameTurn;
  document.getElementById ("playerIndicator").innerHTML = "Player: " + sequenceOfPlay[gameSequenceTracker][0];  
  document.getElementById ("phaseIndicator").innerHTML = "Phase: " + sequenceOfPlay[gameSequenceTracker][1];
  document.getElementById ("segmentIndicator").innerHTML  = " Segment: " + sequenceOfPlay[gameSequenceTracker][2];
  document.getElementById ("weatherIndicator").innerHTML = "Weather: " + turnInfo.weather;  
  document.getElementById ("moraleLevel").innerHTML = "Morale";
 
  document.getElementById ("adminPoints").innerHTML = "Admin Points"  + "<br>" ;
  document.getElementById ("reinforcementPoints").innerHTML = "Reinforcement Points" + "<br>";

  var i;
  var player = sequenceOfPlay[gameSequenceTracker][0];
  for (i = 0; i < supplyInfo.length; i++)
  {
    if (supplyInfo[i].player == player)
    {
      document.getElementById ("adminPoints").innerHTML += supplyInfo[i].nationality + ":&nbsp;" + supplyInfo[i].AP + "<br>";
      document.getElementById ("reinforcementPoints").innerHTML += supplyInfo[i].nationality + ":&nbsp;" + supplyInfo[i].accumulatedReinforcementPoints + "<br>";
    }
  }
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
  

  var leaderImgWidget = document.createElement ("IMG");
  leaderImgWidget.src = "images/" + aLeader.name + ".png";
  leaderImgWidget.height = "100";
  leaderInfoWidget.appendChild (leaderImgWidget);

/* Why doesn't this work? 
  leaderInfoWidget.appendChild (aLeader.picture());
*/
  
  var leaderNumbers = document.createElement ("P");
  leaderNumbers.innerHTML = "<b>"
  leaderNumbers.innerHTML += aLeader.name + "&nbsp;"
  leaderNumbers.innerHTML += aLeader.initiative;
  leaderNumbers.innerHTML += (aLeader.bonus ? " * " : " " );
  leaderNumbers.innerHTML += aLeader.commandCapacity + "&nbsp;"
  leaderNumbers.innerHTML += aLeader.subordinationValue;
  leaderNumbers.innerHTML += "</b>";
  leaderInfoWidget.appendChild (leaderNumbers);

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
    tableRow.id = "UIW:" + i;
    tableRow.onclick =  function (event) { createUnitMenu (aLeader.id, event) } 
    unitTable.appendChild (tableRow);

    tableCell = document.createElement ("td");
    tableRow.appendChild (tableCell);    

    tableCell.appendChild (aLeader.units[i].picture());

    tableCell = document.createElement ("td");
    tableCell.innerHTML = aLeader.units[i].name;
    tableRow.appendChild (tableCell);    

    tableCell = document.createElement ("td");
    tableCell.innerHTML = aLeader.units[i].strength;
    tableRow.appendChild (tableCell);    
  }

  // Close icon
  var closeIcon = document.createElement ("IMG");
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.src = "images/close.png";
  closeIcon.onclick = function() { document.getElementById (leaderWidgetId).onmouseout = function() { hideLeaderInfo (this.id); }; leaderInfoWidget.remove(); }
  leaderInfoWidget.appendChild (closeIcon);
}


function hideLeaderInfo (leaderWidgetId)
{
  var leaderInfoWidget; 
  var aLeader = leaders[ findLeaderFromWidgetId (leaderWidgetId) ];

  // Check if the info widget already exists - if so, remove it
  leaderInfoWidget = document.getElementById ("LIW:" + aLeader.id);
  if (leaderInfoWidget != null)
      leaderInfoWidget.remove();
}  


function changeCombatUnitStrength (leaderId, unitId)
{
  var l = indexOfLeaderById (leaderId);
  var u = leaders[l].findUnit (unitId);
  var strengthBox = document.createElement ("INPUT");
  var s = leaders[l].units[u].strength;
  
  var dlgWidget = document.createElement ("DIV");
  dlgWidget.setAttribute ("class", "modal-box");
  dlgWidget.style.left = "500px";
  dlgWidget.style.top = "200px";
  document.getElementById ("mapContainer").appendChild (dlgWidget);

  // Close icon
  var closeIcon = document.createElement ("IMG");
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.src = "images/close.png";
  closeIcon.onclick = function () { dlgWidget.remove() }
  dlgWidget.appendChild (closeIcon);
  
  var unitName = document.createElement ("P");
  unitName.innerHTML = leaders[l].units[u].name;
  dlgWidget.appendChild (unitName);
  
  var btnMinus = document.createElement ("BUTTON");
  btnMinus.setAttribute ("class", "btn-minus");
  btnMinus.innerHTML = "-";
  btnMinus.onclick = function () { if (s > 0) s--; strengthBox.value = s; }
  dlgWidget.appendChild (btnMinus);
  
  strengthBox.setAttribute ("class", "strength-box");
  strengthBox.id = "SB";
  strengthBox.value = leaders[l].units[u].strength;
  dlgWidget.appendChild  (strengthBox);
  
  var btnPlus = document.createElement ("BUTTON");
  btnPlus.setAttribute ("class", "btn-plus");
  btnPlus.innerHTML = "+";
  btnPlus.onclick = function () { s++; strengthBox.value = s; }
  dlgWidget.appendChild (btnPlus);

  var okButton = document.createElement ("BUTTON");
  okButton.innerHTML = "OK";
  okButton.onclick = function () { leaders[l].units[u].strength = s; dlgWidget.remove() }
  dlgWidget.appendChild (okButton);
  
}


function doCreateUnitMenu (leaderId, unitId, unitName, x, y, menuEntries)
{
  var menuWidget = document.createElement ("DIV");
  menuWidget.setAttribute ("class", "context-menu");
  menuWidget.style.left = x + "px";
  menuWidget.style.top = y + "px";
  menuWidget.id = ("MU:" + unitId);
  document.getElementById ("mapContainer").appendChild (menuWidget);
 
  // Menu title
  var menuTitle = document.createElement ("P");
  menuTitle.innerHTML = unitName;
  menuTitle.setAttribute ("class", "context-menu-title");
  menuWidget.appendChild (menuTitle);
  
  // Close icon
  var closeIcon = document.createElement ("IMG");
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.src = "images/close.png";
  closeIcon.onclick = function () { menuWidget.remove() }
  menuWidget.appendChild (closeIcon);
  
  // A horizontal divider
  var hr = document.createElement ("HR");
  hr.setAttribute ("class", "context-menu-hr");
  menuWidget.appendChild (hr);
    
  var i;
  for (i=0; i < menuEntries.length; i++)
  {
    var menuEntry = document.createElement ("P");
    menuEntry.id = "L:" + leaderId + ".U:" + unitId + ".A:" + menuEntries[i][1];
    menuEntry.setAttribute ("class", "context-menu-entry");
    menuEntry.onclick = function (event) { menuDoAction (event) }
    menuEntry.innerHTML = menuEntries[i][0];
    
    menuWidget.appendChild (menuEntry);
  }
  
  return menuWidget;
}

function menuDoAction (event)
{
  var tokens = event.currentTarget.id.split (".");
  var leaderId = tokens[0].slice(2);
  var unitId = tokens[1].slice(2);
  var actionId = tokens[2].slice(2);
    
  switch (actionId)
  {
    case "ChStr":
      changeCombatUnitStrength (leaderId, unitId);
      break;
      
    case "MkMajGen":
      createMajGen (leaderId, unitId);
      alert ("Maj. General created: " + leaders[leaders.length-1].name);
      break;
      
    case "Transfer":
      transferUnit (leaderId, unitId);
//      alert ("Unit transferred");
      break;
      
    default:
      throw ("menuDoAction: invalid action " + actionId);
  }
}
  

function createMajGen (leaderId, unitId)
{
  var l = indexOfLeaderById (leaderId);
  var u = leaders[l].units [ leaders[l].findUnit (unitId)] ;
  var newLeader;

  // Create a new leader
  switch (u.type)
  {
    case "infantry":
      newLeader = new Leader (leaders.length+1, undefined, u.name, u.nationality, "infantry", 0, false, 1.5, 2, leaders[l].formation, leaders[l].x, leaders[l].y, leaders[l].zOrder+1, leaders[l].direction);
      break;
      
    case "cavalry":
      newLeader = new Leader (leaders.length+1, undefined, u.name, u.nationality, "cavalry", 4, false, 1, 1, leaders[l].formation, leaders[l].x, leaders[l].y, leaders[l].zOrder+1, leaders[l].direction);
      break;
      
    default:
      alert ("Cannot create a leader from a unit of type " + leaders[l].units[u].type);
      return;
  }

  // Remove the unit from the old leader and put it under the new Maj Gen.
  leaders[l].removeUnit (unitId);
  newLeader.addUnit (u);
  leaders.push (newLeader);

  // Close the unit window menu  
  var unitMenu = document.getElementById ("MU:" + unitId);
  if (unitMenu)
    unitMenu.remove();
  
  // Close the previous leader info window, 
  var leaderInfoWidget = document.getElementById ("LIW:" + leaders[l].id);
  if (leaderInfoWidget != null)
    hideLeaderInfo (leaderInfoWidget.id);
  
  // Force a redraw of the new leader counter, 
  newLeader.drawOnMap();
}

function transferUnit (leaderId, unitId)
{
  var iOldLeader = indexOfLeaderById (leaderId);
  var theUnit = leaders[iOldLeader].units [ leaders[iOldLeader].findUnit (unitId)] ;
  var candidateLeaderIndexes = [];

  // Find the candidate leaders (must be in the same hex as leaderId)
  var i;
  for (i=0; i < leaders.length; i++)
    if (i != iOldLeader)
      if (leaders[i].x == leaders[iOldLeader].x && leaders[i].y == leaders[iOldLeader].y)
        candidateLeaderIndexes.push (i);
  
  // Create a new DIV in front of the map to prevent events going to the map, and dim it
  var menuDiv = document.createElement ("DIV");
  menuDiv.style.position = "absolute";
  menuDiv.style.top = 0;
  menuDiv.style.left = 0;
  menuDiv.style.height = "2791px";
  menuDiv.style.width = "4474px";
  menuDiv.style.zIndex = 100;
  menuDiv.style.backgroundColor = "grey";
  menuDiv.style.opacity = 0.5;
  document.body.appendChild (menuDiv);
  
  // Create the main widget
  var menuWidget = document.createElement ("DIV");
  menuWidget.setAttribute ("class", "modal-box");
  menuWidget.id = ("TU:" + unitId);
  menuWidget.style.opacity = 1;
  menuWidget.style.zIndex = 101;
  document.body.appendChild (menuWidget);

  // Explanation
  var para = document.createElement ("P");
  para.innerHTML = "Transfer unit " + theUnit.name + " to:"
  menuWidget.appendChild (para);


  // Create the form
  var form = document.createElement ("FORM");
  menuWidget.appendChild (form);
  
  // Create the list of candidate leaders
  for (i=0; i < candidateLeaderIndexes.length; i++)
  {
    var dest = document.createElement ("INPUT");
//    dest.setAttribute ("class", "xfer-2-list");
    dest.type = "radio";
    dest.name = "leader";
    dest.value = leaders[ candidateLeaderIndexes[i]].id;
    form.appendChild (dest);
    
    form.innerHTML += "&nbsp;" + leaders[ candidateLeaderIndexes[i]].name + "<br>";
  }
  
  // OK button
  var okButton = document.createElement ("BUTTON");
  okButton.innerHTML = "OK";
  okButton.onclick = function () { doTransferUnit (leaderId, unitId, dest.value); menuWidget.remove(); menuDiv.remove(); }
  menuWidget.appendChild (okButton);
  
  
  // Close icon
  var closeIcon = document.createElement ("IMG");
  closeIcon.src = "images/close.png";
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.onclick = function () { menuWidget.remove(); menuDiv.remove(); }
  menuWidget.appendChild (closeIcon);
}

                           

function doTransferUnit (oldLeaderId, unitId, newLeaderId)
{
  var iOldLeader = indexOfLeaderById (oldLeaderId);
  var iNewLeader = indexOfLeaderById (newLeaderId);
  var theUnit = leaders[iOldLeader].units [ leaders[iOldLeader].findUnit (unitId)] ;

  leaders[iOldLeader].removeUnit (unitId);
  leaders[iNewLeader].addUnit (theUnit);

  // Close the unit window menu  
  var unitMenu = document.getElementById ("MU:" + unitId);
  if (unitMenu)
    unitMenu.remove();
  
  // Close the previous leader info window, 
  var leaderInfoWidget = document.getElementById ("LIW:" + leaders[iOldLeader].id);
  if (leaderInfoWidget != null)
    hideLeaderInfo (leaderInfoWidget.id);
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

function advanceGame()
{
  var okToProceed = confirm ("Are you sure you want to advance the game?");
  if (!okToProceed)
    return;
  
  gameSequenceTracker++;
    
  if (gameSequenceTracker == sequenceOfPlay.length)
  {
     gameTurn++;
     gameSequenceTracker = 0;
  }
  
  updateAdminBoard();
}



