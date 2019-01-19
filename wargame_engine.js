
var leaders = [];
  
leaders[0] = {
  nationality: "Prussia",
  commander: "Bluecher",
  type: "Leader",    // "Leader", "Infantry", "Cavalry", "Artillery", "COP"
  strength: 0,
  attackValue: 0,
  defenseValue: 0,
  movAllowance: 0,
  initiative: 4,
  bonus: "*",
  commandCapacity: 0,
  subordinationValue: 0,
  formation: "line", // either "column" or "line"
  facing: "N", // N, NW, SW, S, SE, NE, E, W
  commandingUnit: undefined,
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.png", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}

  
leaders[1] = {
  nationality: "Austria",
  commander: "Schwarzenberg",
  type: "Leader",    // "Infantry", "Cavalry", "Artillery", "COP"
  strength: 0,
  attackValue: 0,
  defenseValue: 0,
  movAllowance: 0,
  initiative: 0,
  bonus: "",
  commandCapacity: 0,
  subordinationValue: 0,
  formation: "line", // either "column" or "line"
  facing: "NE", // N, NW, SW, S, SE, NE, E, W
  commandingUnit: undefined,
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.png", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}

leaders[2] = {
  nationality: "Prussia",
  commander: "Yorck",
  type: "Leader",    // "Infantry", "Cavalry", "Artillery", "COP"
  strength: 0,
  attackValue: 0,
  defenseValue: 0,
  movAllowance: 0,
  initiative: 3,
  bonus: "",
  commandCapacity: 6,
  subordinationValue: 1,
  formation: "line", // either "column" or "line"
  facing: "NE", // N, NW, SW, S, SE, NE, E, W
  commandingUnit: undefined,
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.png", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}

var troops = [];

troops[0] = {
  nationality: "Prussia",
  commander: "Losthin",
  type: "Infantry",    // "Infantry", "Cavalry", "Artillery", "COP"
  strength: 7,
  attackValue: 0,
  defenseValue: 0,
  movAllowance: 5,
  initiative: 0,
  subordinationValue: 1,
  commandingUnit: "Bluecher",
  image: "images/Losthin.png"
}

troops[1] = {
  nationality: "Prussia",
  commander: "Warburg",
  type: "Infantry",    // "Infantry", "Cavalry", "Artillery", "COP"
  strength: 5,
  attackValue: 0,
  defenseValue: 0,
  movAllowance: 5,
  initiative: 0,
  subordinationValue: 1,
  commandingUnit: "Bluecher",
  image: "images/Losthin.png"
}
 

var stacks = [];


stacks[0] = {
  x: 5,
  y: 6,
  units: [leaders[0], leaders[2]],
  formation: "line", // either "column" or "line"
  facing: "N", // N, NW, SW, S, SE, NE, E, W
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.png", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}

stacks[1] = {
  x: 2,
  y: 3,
  units: [leaders[1]],
  formation: "line", // either "column" or "line"
  facing: "NE", // N, NW, SW, S, SE, NE, E, W
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.png", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}


  
  


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

  
  // Draw all the units on the map
  stacks.forEach (createStackWidget);
  stacks.forEach (drawStack);
}

function createStackWidget(theStack)
{
  var stackWidget = document.createElement ("IMG");
  
  stackWidget.id = "stack" + theStack.x + "-" + theStack.y;
  stackWidget.setAttribute ("class", "unit-widget");
  stackWidget.innerHTML = theStack.units.length == 1 ? theStack.units[0].commander : "Stack";
//  unitWidget.draggable = true;
//  unitWidget.ondragstart = startDrag; 
  
  document.getElementById("mapContainer").appendChild(stackWidget);
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


function moveUnit (aUnit, direction)
{
  switch (aUnit.formation)
  {
    case "line":
      moveLine (aUnit, direction);
      break;
      
    case "column":
      moveColumn (aUnit, direction);
      break;
      
    default:
      throw ("Invalid unit formation");
  }
}
  
  
function moveLine (aUnit, direction)
{
  switch (aUnit.facing)
  {
    case "N":
      aUnit.y--;
      switch (direction) 
      {
        case "FL":
          if (aUnit.y % 2 == 1) aUnit.x -= 1;
          break;

        case "FR":
          if (aUnit.y % 2 == 0) aUnit.x += 1;
          break;

        default:
           throw ("Movement not allowed");
      }
      break;

    case "NE":
      switch (direction)
      {

        case "FR":
          aUnit.x++;
          break;

        case "FL":
          if (aUnit.y % 2 == 1) aUnit.x++;
          aUnit.y--;
          break;

        default:
           throw ("Movement not allowed");
      }
      break;

    case "SE":
      switch (direction)
      {
        case "FL":
          aUnit.x += 1;
          break;

        case "FR":
          if (aUnit.y % 2 == 1) aUnit.x++;
          aUnit.y++;
          break;

        default:
           throw ("Movement not allowed");
      }
      break;

    case "S":
      switch (direction)
      {
        case "FL":
          if (aUnit.y % 2 == 1) aUnit.x++;
          aUnit.y++;
          break;

        case "FR":
          if (aUnit.y % 2 == 0) aUnit.x--;
          aUnit.y++;
          break;

        default:
           throw ("Movement not allowed");
      }
      break;

    case "SW":
      switch (direction)
      {
        case "FL":
          if (aUnit.y % 2 == 0) aUnit.x--;
          aUnit.y++;
          break;

        case "FR":
          aUnit.x--;
          break;

        default:
           throw ("Movement not allowed");
      }
      break;

    case "NW":
      switch (direction)
      {
        case "FL":
          aUnit.x--;
          break;

        case "FR":
          if (aUnit.y % 2 == 0) aUnit.x--;
          aUnit.y--;
          break;

        default:
           throw ("Movement not allowed");
      }
      break;
      
    default:
      throw ("Incorrect unit facing");
  }
  
  drawStack (aUnit);
}
      
 
  
  
function rotateUnit (aUnit, direction) 
{
  switch (direction) 
  {
    case "clockwise":
      switch (aUnit.facing)
      {
        case "N":
          aUnit.facing="NE";
          break;

        case "NE":
          aUnit.facing="SE";
          break;

        case "SE":
          aUnit.facing="S";
          break;

        case "S":
          aUnit.facing="SW";
          break;

        case "SW":
          aUnit.facing="NW";
          break;

        case "NW":
          aUnit.facing="N";
          break;
      }
      break;
      
    case "anti-clockwise":
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
  }
  drawStack (aUnit);
}

function drawStack(theStack)
{
  x = 0;
  y = 0;
  
  var unitWidget = document.getElementById ("stack" + theStack.x + "-" + theStack.y);
  
  switch (theStack.facing) 
  {
      case "N": // North
        unitWidget.style.width = "60px";
        unitWidget.style.height = "30px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-N.png')";
        unitWidget.style.paddingTop = "8px";
        unitWidget.style.paddingBottom = "0px";
        x = -29; 
        y = 7;
        break;
        
      case "NW":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-NW.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = -17;
        y = 3;
        break;
        
      case "SW":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-SW.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = -3;   
        break;

      case "S":
        unitWidget.style.width = "60px";
        unitWidget.style.height = "30px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-S.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "8px";
        x = 4;
        y = 7;
        break;
        
      case "SE":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-SE.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = 0; 
        y = -27;
        break;
        
      case "NE":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-NE.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = -18;
        y = -27;
        break;      
    } 


  unitWidget.style.top = (y + yMapCoordFromUnitCoord (theStack.x, theStack.y)) + "px";
  unitWidget.style.left = (x + xMapCoordFromUnitCoord (theStack.x, theStack.y)) + "px";  
//  unitWidget.draggable = true;
  unitWidget.onclick = function() { showStackInfo (theStack); }
  unitWidget.onmousedown =  function(event) { if (event.button==2) showStackContextMenu (theStack); }
}

  
function showStackInfo (theStack)
{
  var stackInfoWidget; 
  var unitInfoContent = undefined;
  
  // Check if the info widget already exists - if so, returns
  stackInfoWidget = document.getElementById ("stackInfoWidget" + theStack.x + "-" + theStack.y );
  if (stackInfoWidget != null)
      return;
  
  // Widget does not exist - create it!
  stackInfoWidget= document.createElement ("DIV");
  stackInfoWidget.id = "stackInfoWidget" + theStack.x + "-" + theStack.y;
  stackInfoWidget.setAttribute ("class", "leader-info");   // TODO: rename class
  
  document.getElementById("mapContainer").appendChild(stackInfoWidget);
  
  stackInfoWidget.style.left = (xMapCoordFromUnitCoord (theStack.x, theStack.y) + 51) + "px";
  stackInfoWidget.style.top  = (yMapCoordFromUnitCoord (theStack.x, theStack.y) - 10) + "px";

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
  closeButton.onclick = function() { stackInfoWidget.remove(); }
  stackInfoWidget.appendChild (closeButton);
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
  
  for (i=0; i<troops.length; i++) {
    if (troops[i].commandingUnit == leaderName) {
      tableRow = document.createElement ("tr");
      unitTable.appendChild (tableRow);

      tableCell = document.createElement ("td");
      tableRow.appendChild (tableCell);    

      unitIcon = document.createElement ("IMG");
      unitIcon.src = "images/Infantry.png";
      unitIcon.style.width = "30px";
      unitIcon.style.height = "15px";
      tableCell.appendChild (unitIcon);

      tableCell = document.createElement ("td");
      tableCell.innerHTML = troops[i].commander;
      tableRow.appendChild (tableCell);    

      tableCell = document.createElement ("td");
      tableCell.innerHTML = troops[i].strength;
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
  menuContent.innerHTML = "Line to Column";
  if (aUnit.formation == "column") menuContent.style.color = "#323232";
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Column to Line";
  if (aUnit.formation == "line") menuContent.style.color = "#323232";
  unitContextMenu.appendChild (menuContent);
  
  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Rotate clockwise";
  if (aUnit.formation == "column") 
    menuContent.style.color = "#323232";
  else
    menuContent.onclick = function() { rotateUnit (aUnit, "clockwise"); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Rotate anti-clockwise";
  if (aUnit.formation == "column") 
    menuContent.style.color = "#323232";
  else
    menuContent.onclick = function() { rotateUnit (aUnit, "anti-clockwise"); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward-left";
  menuContent.onclick = function() { moveUnit (aUnit, "FL"); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward";
  if (aUnit.formation == "line") 
    menuContent.style.color = "#323232";
  else  
    menuContent.onclick = function() { moveUnit (aUnit, "F"); }
  unitContextMenu.appendChild (menuContent);

  menuContent = document.createElement ("P");
  menuContent.innerHTML = "Move forward-right";
  menuContent.onclick = function() { moveUnit (aUnit, "FR"); }
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

