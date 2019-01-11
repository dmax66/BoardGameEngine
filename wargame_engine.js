
var gameUnits = [];
  
  gameUnits[0] = {
  nationality: "Prussia",
  commander: "Bluecher",
  type: "",    // "Infantry", "Cavalry", "Artillery", "COP"
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
  x: 5, 
  y: 4, // position
  commandingUnit: undefined,
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.pgn", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}

  
gameUnits[1] = {
  nationality: "Austria",
  commander: "Schwarzenberg",
  type: "",    // "Infantry", "Cavalry", "Artillery", "COP"
  strength: 0,
  attackValue: 0,
  defenseValue: 0,
  movAllowance: 0,
  initiative: 0,
  bonus: 0,
  commandCapacity: 0,
  subordinationValue: 0,
  formation: "line", // either "column" or "line"
  facing: "NE", // N, NW, SW, S, SE, NE, E, W
  x: 7, 
  y: 8, // position
  commandingUnit: undefined,
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.pgn", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
}
  
function GameUnit (nationality, commander, type, strength, attackValue, defenseValue, movAllowance, initiative, bonus, commandCapacity, subordinationValue, formation, facing, x, y, commandingUnit, images)
{
  this.nationality = nationality;
  this.commander = commander;
  this.type = type;
  this.strength = strength;
  this.attackValue = attackValue;
  this.defenseValue = defenseValue;
  this.movAllowance = movAllowance;
  this.initiative = initiative;
  this.bonus = bonus;
  this.commandCapacity = commandCapacity;
  this.subordinationValue = subordinationValue;
  this.formation = formation;
  this.facing = facing;
  this.x = x;
  this.y = y;
  this.commandingUnit = commandingUnit;
  images: ["images/allied-MGen-East.png", "images/allied-MGen-NEast.pgn", "images/allied-MGen-NWest.png", "images/allied-MGen-West.png", "images/allied-MGen-SWest.png", "images/allied-MGen-SEast.png"]
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

  
//  createUnit();
  // Draw all the units on the map
  gameUnits.forEach (createUnitWidget);
  gameUnits.forEach (drawUnit);
  

//  createUnitWidget(gameUnit);
//  drawUnit(gameUnit);
}

function createUnit ()
{
  gameUnit.x = 6;
  gameUnit.y = 5;
  gameUnit.commander = "Bluecher";
  gameUnit.facing = "N";
  gameUnit.formation = "line";
  gameUnit.initiative = 4;
  gameUnit.commandCapacity = 10;
  gameUnit.subordinationValue = 5;
  gameUnit.bonus = "*";
}

function createUnitWidget(aUnit)
{
  var unitWidget = document.createElement ("IMG");
  
  unitWidget.id = aUnit.commander;
  unitWidget.setAttribute ("class", "unit-widget");
  unitWidget.innerHTML = aUnit.commander;
  unitWidget.draggable = true;
  unitWidget.ondragstart = startDrag; 
  
  document.getElementById("mapContainer").appendChild(unitWidget);
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
  return 35 + 30*(unitY);
}

function xUnitCoorfdFromMapCoord (mapX, mapY)
{
  y = floor((mapY-35)/30);
  if ((unitY % 2) == 1)
    return floor((mapX-17)/34);
  else
    return floor (mapX/34);
}

function yUnitCoorfdFromMapCoord (mapX, mapY)
{
  return floor((mapY-35)/30);
}

function drawUnit(aUnit)
{
  x = 0;
  y = 0;
  
  var unitWidget = document.getElementById (aUnit.commander);
  
  switch (aUnit.facing) 
  {
      case "N": // North
        unitWidget.style.width = "60px";
        unitWidget.style.height = "30px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-N.png')";
        unitWidget.style.paddingTop = "8px";
        unitWidget.style.paddingBottom = "0px";
        x = -13; 
        break;
        
      case "NW":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-NW.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = 4;
        break;
        
      case "SW":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-SW.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = 17;   
        break;

      case "S":
        unitWidget.style.width = "60px";
        unitWidget.style.height = "30px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-S.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "8px";
        x = 21;  
        break;
        
      case "SE":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-SE.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = 17; 
        y = -33;
        break;
        
      case "NE":
        unitWidget.style.width = "54px";
        unitWidget.style.height = "64px";
        unitWidget.style.backgroundImage = "url('images/allied-MGen-NE.png')";
        unitWidget.style.paddingTop = "0px";
        unitWidget.style.paddingBottom = "0px";
        x = 17;
        y = -33;
        break;      
    } 


  unitWidget.style.top = yMapCoordFromUnitCoord (aUnit.x + x/34, aUnit.y + (y/34)) + "px";
  unitWidget.style.left = xMapCoordFromUnitCoord (aUnit.x + x/34, aUnit.y + (y/34).toFixed(0)) + "px";  
  unitWidget.draggable = true;
  unitWidget.onclick = function() { showUnitInfoWidget (aUnit); }
  unitWidget.onmousedown =  function(event) { if (event.button==2) showUnitContextMenu (aUnit); }
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
  
  drawUnit (aUnit);
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
  drawUnit (aUnit);
}
  
function showUnitInfoWidget (aUnit)
{
  var unitInfoWidget; 
  var unitInfoContent = undefined;
  var parentWidget = document.getElementById("mapContainer");
  
  // Check if the info widget already exists - if so, returns
  unitInfoWidget = document.getElementById (aUnit.commander + "-info");
  if (unitInfoWidget != null)
      return;
  
  // Widget does not exist - create it!
  unitInfoWidget= document.createElement ("DIV");
  
  unitInfoWidget.id = aUnit.commander + "-info";
  unitInfoWidget.setAttribute ("class", "unit-info");
  
  parentWidget.appendChild(unitInfoWidget);
  
  unitInfoWidget.style.left = (xMapCoordFromUnitCoord (aUnit.x) + 51) + "px";
  unitInfoWidget.style.top = (xMapCoordFromUnitCoord (aUnit.y) - 10) + "px";
  unitInfoWidget.onclick = function() { this.remove(); }

  unitInfoContent = document.createElement ("IMG");
  unitInfoContent.src ="images/" + aUnit.commander + ".png";
  unitInfoContent.style.width = "100px";
  unitInfoWidget.appendChild (unitInfoContent);
  
  unitInfoContent = document.createElement ("P");
  unitInfoContent.innerHTML = "<b>" + aUnit.commander + "&nbsp" + aUnit.initiative + "&nbsp" + aUnit.bonus + "&nbsp" + aUnit.commandCapacity + "&nbsp" + aUnit.subordinationValue + "</b>"
  unitInfoWidget.appendChild (unitInfoContent);
}
  
function showUnitContextMenu (aUnit)  
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
    var jsonData = JSON.stringify (gameUnits);
    
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


