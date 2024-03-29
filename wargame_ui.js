'use strict';




/* 
function getLeaderFromWidgetId (leaderWidgetId)
{
  const tokens = leaderWidgetId.split(":");
  const leaderId = tokens[1];
  
  return theGame.getLeader (leaderId);
}
*/



//
// Returns an array of indices for friendly leaders who occupy hex (x,y) 
//

/*
function getLeadersInHex (x, y) {
  let result = [];
  
  if (theGame != null) { 
    for (let i = 0; i < theGame.players[theGame.currentPlayer].leaders.length; i++) {
      if (theGame.players[theGame.currentPlayer].leaders[i].x == x && theGame.players[theGame.currentPlayer].leaders[i].y == y) {
        result.push (i);
      }
    }
  }

  // TODO: each leader occupies two hexes!
  
  return result;
}

*/

function showStackContent (x, y) {
  const stackInfoXOffset = 40;
  const stackInfoYOffset = 0;


  let stackInfoWidget = document.getElementById("stackInfoWidget");
  if (stackInfoWidget != null)
    stackInfoWidget.remove();
    
  const setOfLeaders = getLeadersInHex (x, y);
  if (setOfLeaders.length == 0)
    return;
  
  const mapContainer = document.getElementById("mapContainer");  
  
 
  stackInfoWidget = document.createElement("DIV");
  stackInfoWidget.id = "stackInfoWidget";
  stackInfoWidget.setAttribute("class", "stack_info");
  stackInfoWidget.style.left = (xMapCoordFromUnitCoord (x, y) + stackInfoXOffset) + "px";
  stackInfoWidget.style.top  = (yMapCoordFromUnitCoord (x, y) + stackInfoYOffset) + "px";
  mapContainer.appendChild (stackInfoWidget);
    
  if (setOfLeaders.length > 0) {
    let lineWidget = document.createElement("P");
    stackInfoWidget.appendChild(lineWidget);

    for (let i = 0; i < setOfLeaders.length; i++) {
      lineWidget.innerHTML += 
                          theGame.players[theGame.currentPlayer].leaders [setOfLeaders[i]].name + "&nbsp;" 
                        + theGame.players[theGame.currentPlayer].leaders [setOfLeaders[i]].strength('i') + "I&nbsp;" 
                        + theGame.players[theGame.currentPlayer].leaders [setOfLeaders[i]].strength('c') + "C&nbsp;" 
                        + theGame.players[theGame.currentPlayer].leaders [setOfLeaders[i]].strength('a') + "A"; 
    }
  }
}



function showLeaderInfo (leaderId) {
  // Check if the info pop-up window already exists - if so, returns
  var leaderInfoWindow = document.getElementById ("LIW:" + leaderId);
  if (leaderInfoWindow != null) {
    return;
  }
  
  const aLeader = Leader.findById (leaderId);
  if (aLeader == null) {
    return;
  }
  // Widget does not exist - create it!
  leaderInfoWindow= document.createElement ("DIV");
  leaderInfoWindow.id = "LIW:" + leaderId;
  leaderInfoWindow.setAttribute ("class", "leader-info");   // TODO: rename class
  leaderInfoWindow.style.left = (xMapCoordFromUnitCoord (aLeader.x, aLeader.y) + 40) + "px";
  leaderInfoWindow.style.top  = (yMapCoordFromUnitCoord (aLeader.x, aLeader.y) ) + "px";
  document.getElementById("mapContainer").appendChild(leaderInfoWindow);
  
  // The close icon
  const closeIcon = document.createElement ("IMG");
  leaderInfoWindow.appendChild (closeIcon);
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.src = "img/close.png";
  closeIcon.onclick = function() { leaderInfoWindow.remove(); }

 
  var leaderImgWidget = document.createElement ("IMG");
  leaderInfoWindow.appendChild (leaderImgWidget);
  leaderImgWidget.src = "img/" + aLeader.name + ".png";
  leaderImgWidget.style.display = "block";  
  leaderImgWidget.style.marginLeft = "auto";
  leaderImgWidget.style.marginRight = "auto";
  leaderImgWidget.height = "100";

  
  var leaderData = document.createElement ("P");
  leaderData.innerHTML = "<b>"
  leaderData.innerHTML += aLeader.name + "&nbsp;"
  leaderData.innerHTML += aLeader.initiative;
  leaderData.innerHTML += (aLeader.bonus == 1 ? "-*-" : "-" );
  leaderData.innerHTML += aLeader.commandCapacity + "-"
  leaderData.innerHTML += aLeader.subordinationValue;
  leaderData.innerHTML += "</b>";
  leaderInfoWindow.appendChild (leaderData);

  // Strength
  var corpStrengthWidget = document.createElement ("P");
  corpStrengthWidget.innerHTML = 
    "Infantry: " + aLeader.strength("i")*1000 + "<br>" +
    "Cavalry: " + aLeader.strength("c")*1000 + "<br>" +
    "Artillery: " + aLeader.strength("a")*1000;
  leaderInfoWindow.appendChild (corpStrengthWidget);
  
  

  // Table with units
  var unitTable = document.createElement ("TABLE");
  unitTable.setAttribute ("class", "unit-table");
  leaderInfoWindow.appendChild (unitTable);    
  
  for (let i=0; i < aLeader.units.length; i++) {
      let tableCell = null;

      const tableRow = document.createElement ("TR");
      tableRow.id = "UIdxW:" + aLeader.units[i].unitId;
      tableRow.onclick =  function (event) { createUnitMenu (event) } 
      unitTable.appendChild (tableRow);
  
      tableCell = document.createElement ("TD");
      tableRow.appendChild (tableCell);    

      const unitIcon = document.createElement("IMG");
      tableCell.appendChild (unitIcon);
      unitIcon.src = "img/" + aLeader.units[i].iconFileName();        
      unitIcon.setAttribute ("class", aLeader.units[i].nation); 
  
      tableCell = document.createElement ("TD");
      tableCell.innerHTML = aLeader.units[i].name + " (" + aLeader.units[i].commander + ")";
      tableRow.appendChild (tableCell);    

      tableCell = document.createElement ("TD");
      tableCell.innerHTML = aLeader.units[i].strength * 1000;
      tableRow.appendChild (tableCell);    
  }
}


function hideLeaderInfo (leaderWidgetId)
{
  var leaderInfoWindow; 
  var aLeader = leaders[ findLeaderFromWidgetId (leaderWidgetId) ];

  // Check if the info widget already exists - if so, remove it
  leaderInfoWindow = document.getElementById ("LIW:" + aLeader.leaderId);
  if (leaderInfoWindow != null)
    leaderInfoWindow.remove();
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
  var leaderInfoWindow = document.getElementById ("LIW:" + leaders[l].id);
  if (leaderInfoWindow != null)
    hideLeaderInfo (leaderInfoWindow.id);
  
  // Force a redraw of the new leader counter, 
//  newLeader.drawOnMap();
}




