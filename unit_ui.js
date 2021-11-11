function createUnitMenu (event) {
  const unitWidget = event.currentTarget.id;
  const i = unitWidget.split(":")[1];
  const unit = theGame.players[theGame.currentPlayer].units[i];
  
  const menuWidget = document.createElement ("DIV"); 
  document.getElementById ("mapContainer").appendChild (menuWidget);

  menuWidget.id = ("MU:" + unit.id)
  menuWidget.setAttribute ("class", "popup-menu");
  menuWidget.style.backgroundColor = "Silver";  
  menuWidget.style.color = "black";
  menuWidget.style.position = "relative";
  menuWidget.style.left = event.clientX + "px";
  menuWidget.style.top = event.clientY + "px";
  menuWidget.style.height = "300px";
  menuWidget.style.width = "auto";
  menuWidget.style.zIndex = 3;
  
 
  // Close icon
  var closeIcon = document.createElement ("IMG");
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.src = "img/close.png";
  closeIcon.style.float = "right";
  closeIcon.onclick = function () { menuWidget.remove() }
  menuWidget.appendChild (closeIcon);
  
  // Unit icon
  const unitIcon = document.createElement ("IMG");
  unitIcon.src = "img/" + unit.iconFileName();
  unitIcon.setAttribute ("class", unit.nation);
  unitIcon.style.display = "block";  
  unitIcon.style.marginLeft = "auto";
  unitIcon.style.marginRight = "auto";
  menuWidget.appendChild (unitIcon);

  // Unit name
  var menuTitle = document.createElement ("P");
  menuTitle.innerHTML = "Unit: " + unit.name;
  menuTitle.setAttribute ("class", "popup-menu-title");
  menuTitle.style.margin = "auto";
  menuTitle.style.fontStyle = "bold";
  menuWidget.appendChild (menuTitle);

  // Commander name  
  const commanderName = document.createElement ("P");
  commanderName.innerHTML = "Commander: " + unit.commander;
  commanderName.setAttribute ("class", "popup-menu-title");
  commanderName.style.margin = "auto";
  menuWidget.appendChild (commanderName);
  
  // Strength
  const strengthInfo = document.createElement ("P");
  strengthInfo.innerHTML = "Strength: " + unit.strength * 1000;
  strengthInfo.setAttribute ("class", "popup-menu-title");
  strengthInfo.style.margin = "auto";
  menuWidget.appendChild (strengthInfo);
  

  // Corp and Commanding Leader
  k = Leader.findById (unit.commandedBy);
  const cmdLeaderWidget = document.createElement ("P");
  cmdLeaderWidget.innerHTML = "Corp Commander: " + theGame.players[theGame.currentPlayer].leaders[k].name;
  cmdLeaderWidget.setAttribute ("class", "popup-menu-title");
  cmdLeaderWidget.style.margin = "auto";
  menuWidget.appendChild (cmdLeaderWidget);
/*  
  const corpWidget = document.createElement ("P");
  corpWidget.innerHTML = "Corp: " + leaders[k].;
  corpWidget.setAttribute ("class", "popup-menu-title");
  menuWidget.appendChild (corpWidget);
*/  

  // A horizontal divider
  var hr = document.createElement ("HR");
  hr.setAttribute ("class", "popup-menu-hr");
  menuWidget.appendChild (hr);
    
  const menuChoices = Unit.possibleActions;
  
  const t = document.createElement ("TABLE");
  menuWidget.appendChild (t);
  

  for (let j = 0; j < menuChoices.length; j++) {
    const tr = document.createElement ("TR");
    t.appendChild (tr);
    
    td = document.createElement ("TD");
    tr.appendChild (td);
    
    const menuEntry = document.createElement ("INPUT");
    menuEntry.type = "BUTTON";
    menuEntry.id = "U:" + unit.id;
    menuEntry.setAttribute ("class", "popup-menu-entry");
    menuEntry.style.backgroundColor = "Silver";  
    menuEntry.style.color = "black";
    menuEntry.style.width = "160px";
    menuEntry.style.height = "20px";
    menuEntry.style.fontFamily = "Arial";
    menuEntry.style.fontSize = "12px";
    menuEntry.style.margin = "auto";
    menuEntry.value = Unit.possibleActions[j].entry;
    menuEntry.onclick = Unit.possibleActions[j].func;
    td.appendChild (menuEntry);
  }
  
  return menuWidget;
}






function menuDoAction (widget) {
  var tokens = widget.id.split (".");
  var unitId = tokens[0].slice(2);
  var actionId = tokens[1].slice(2);
    
  switch (actionId)
  {
    case "ChStr":
      changeCombatUnitStrength (unitId);
      break;
      
    case "MkMajGen":
      createMajGen (unitId);
 //     alert ("Maj. General created: " + leaders[leaders.length-1].name);
      break;
      
    case "Transfer":
      transferUnit (unitId);
//      alert ("Unit transferred");
      break;
      
    default:
      throw ("menuDoAction: invalid action " + actionId);
  }
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
  closeIcon.src = "img/close.png";
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
  closeIcon.src = "img/close.png";
  closeIcon.setAttribute ("class", "close-icon");
  closeIcon.onclick = function () { menuWidget.remove(); menuDiv.remove(); }
  menuWidget.appendChild (closeIcon);
}

                           




