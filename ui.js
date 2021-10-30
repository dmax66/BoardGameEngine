
function UIRenderLeader (aLeader) {
  var leaderWidget = document.getElementById ("L:" + aLeader.id);
  if (leaderWidget != null)
    leaderWidget.remove();
    
  leaderWidget = document.createElement ("div");  
  leaderWidget.id = "L:" + aLeader.id;
  leaderWidget.setAttribute ("class", "leader-counter");
//    leaderWidget.onmouseover = function() { showLeaderInfo (aLeader.id); }
//    leaderWidget.onmouseout = function() { hideLeaderInfo (aLeader.id, false); }
  leaderWidget.onclick = function() { 
    aLeader.onmouseout = function () {}; 
    if (event.shiftKey) 
      showLeaderActionMenu (aLeader);
    else 
      showLeaderInfo (aLeader); 
  }
  document.getElementById ("mapContainer").appendChild (leaderWidget);  

  
  var leaderIcon = document.createElement ("img");
  leaderIcon.setAttribute ("class", "counter-icon");
  leaderIcon.setAttribute ("class", aLeader.nation); 
  leaderWidget.appendChild (leaderIcon);
  
  // Add the leader name (if in line mode)
  var leaderName = document.createElement ("p");
  leaderName.setAttribute ("class", "counter-name");
  leaderName.innerHTML = aLeader.name;
  leaderName.style.visibility = (aLeader.mode == "l") ? "visible" : "hidden";
  leaderWidget.appendChild (leaderName);
  
  switch (aLeader.mode) {
    case "l":
      leaderIcon.src = aLeader.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png";
      leaderName.style.visibility = "visible";
      leaderWidget.style.transform = "rotate(" + lineDrawInfo[aLeader.orientation].angle + "deg)";
      leaderWidget.style.left      = (lineDrawInfo[aLeader.orientation].xOffset + xMapCoordFromUnitCoord (aLeader.x, aLeader.y) + 3*aLeader.zOrder) + "px";  
      leaderWidget.style.top       = (lineDrawInfo[aLeader.orientation].yOffset + yMapCoordFromUnitCoord (aLeader.x, aLeader.y) + 3*aLeader.zOrder) + "px";
      break;

    case "c":
      leaderIcon.src = "img/column.png";
      leaderName.style.visibility = "hidden";
      leaderWidget.style.transform = "rotate(" + columnDrawInfo[aLeader.orientation].angle + "deg)";
      leaderWidget.style.left      = (columnDrawInfo[aLeader.orientation].xOffset + xMapCoordFromUnitCoord (aLeader.x, aLeader.y) + 2*numLeadersInSameHex) + "px";  
      leaderWidget.style.top       = (columnDrawInfo[aLeader.orientation].yOffset + yMapCoordFromUnitCoord (aLeader.x, aLeader.y) + 2*numLeadersInSameHex) + "px";
      break;
      
    default:
      throw ("mode invalid");
  }
}


function UIDrawPointAtCenterOfHex (hex) {
  const thePoint = document.createElement ("DIV");  

  thePoint.setAttribute ("class", "center-of-hex");
  thePoint.style.left    = (xMapCoordFromUnitCoord (hex.x, hex.y) - 7) + "px";  
  thePoint.style.top     = (yMapCoordFromUnitCoord (hex.x, hex.y) - 7) + "px";
  document.getElementById ("mapContainer").appendChild (thePoint);  
  
  const theX = document.createElement ("P");
  theX.setAttribute ("class", "center-of-hex");
  theX.innerHTML = "X";
  theX.style.visibility = "visible";
  thePoint.appendChild (theX);

}


function UIShadeHex (hex) {
  const theShade = document.createElement ("IMG");
  theShade.setAttribute ("class", "hex-shade");
  theShade.src = "img/hex.png";
  theShade.style.left    = (xMapCoordFromUnitCoord (hex.x, hex.y) - hexWidth/2 - 1) + "px";  // -1 to account for the hex border (1 px)  
  theShade.style.top     = (yMapCoordFromUnitCoord (hex.x, hex.y) + 1 ) + "px";              // +1 to account for the hex border (1 px)
  theShade.style.visibility = "visible";
  document.getElementById ("mapContainer").appendChild (theShade);  
}


function UIDrawSetOfHexes (setOfHexes)
{
  for (let i=0; i<setOfHexes.length; i++)
    UIDrawPointAtCenterOfHex (setOfHexes[i]);  
}


function UIShadeSetOfHexes (setOfHexes)
{
  for (let i=0; i<setOfHexes.length; i++)
    UIShadeHex (setOfHexes[i]);  
}

