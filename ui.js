
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


const markerTarget = document.createElement ("IMG");
markerTarget.setAttribute ("class", "hex-shade");
markerTarget.src = "img/infantry-line.png";
markerTarget.style.backgroundColor = "red";
markerTarget.style.display = "none";
markerTarget.style.left    = "-20px"; 
markerTarget.style.top     = "-20px";


const hexShade = document.createElement ("IMG");
hexShade.setAttribute ("class", "hex-shade");
hexShade.src = "img/hex.png";
hexShade.style.display = "none";
hexShade.style.left    = "-20px"; 
hexShade.style.top     = "-20px";

function UIShadeHex (pointer, hex) 
{
  pointer.style.left    = (xMapCoordFromUnitCoord (hex.x, hex.y) - hexWidth/2 - 1) + "px";  // -1 to account for the hex border (1 px)  
  pointer.style.top     = (yMapCoordFromUnitCoord (hex.x, hex.y) + 1 ) + "px";              // +1 to account for the hex border (1 px)
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


class UI_createNationWidget 
{
  constructor (nationId, name, parentWidget) {
    // Add a column in the parent widget (table) 
    const td = document.createElement("TD");
    parentWidget.appendChild (td);
    td.style.verticalAlign = "middle"
    td.style.fontWeight = "bold";
    td.innerHTML = name + "<br>";


    // The nation flag
    const flag = document.createElement("IMG");
    flag.src = "img/" + name + "Flag.png";
    flag.style.height = "75px";
    td.appendChild (flag);

    // and a table to contain the reinforcement points for each type
    const reinfTable = document.createElement ("TABLE");
    parentWidget.appendChild (reinfTable);
    
    return reinfTable;            
  }
  
  setValue (value) {
    this.widget.value = value;
  } 
}



class UI_ReinforcementPointWidget 
{
  constructor (nationId, name, type, parentWidget) 
  {
    const rpWidgetId = nationId + "-reinf"; 

    // Add a row in the table 
    const tr = document.createElement("TR");
    parentWidget.appendChild (tr);
    
    const td1 = document.createElement("TD");
    tr.appendChild (td1);
        
    // The label
    let l = document.createElement ("LABEL");
    l.htmlFor = rpWidgetId;
    l.innerHTML = "&nbsp;&nbsp;" + type;
    td1.appendChild (l);

    // Simple approach : just a box with a label 
    const td2 = document.createElement("TD");
    tr.appendChild(td2);
        
    this.widget = document.createElement("INPUT");
    this.widget.id = rpWidgetId
    this.widget.type = "TEXT";
    this.widget.readOnly = true;
    this.widget.setAttribute ("class", "rp-widget");
    td2.appendChild (this.widget);
  }
  
  setValue (value) 
  {
    this.widget.value = value;
  } 
}


class UI_MoraleWidget {
  constructor (symbol, name, parentWidget) {
    const moraleWidgetId = symbol + "-morale";

    // Add a row in the table 
    const tr = document.createElement("TR");
    parentWidget.appendChild (tr);
    
    this.widget = document.createElement("TD");
    this.widget.id = moraleWidgetId;
    this.widget.setAttribute ("class", "morale-widget");
    tr.appendChild (this.widget);
  }
  
  setValue (value) {
    this.widget.innerHTML = value;
  } 
}


class UI_ArmyPanel 
{
  constructor (army, armyTable) 
  {
    this.army = army;

    const apWidgetId = this.army.symbol + "-at";

    // Add a row in the table 
    const tr = armyTable.insertRow (-1);
    
    const td0 = tr.insertCell (0);
        
    const armyIcon = document.createElement("IMG");
    armyIcon.src = "img/ArmyIcon.png";
    armyIcon.style.height = "25px";
    armyIcon.style.paddingRight = "5px";
    td0.appendChild (armyIcon);

    // 2nd column: 
    const td1 = tr.insertCell (1);
    td1.innerHTML = this.army.name + "&nbsp;&nbsp;";

    // 3rd column: Admin points, Supply sources
    const td2 = tr.insertCell (2); 
    
    // Total Admin Points 
    this.AP = document.createElement ("P");
  	this.AP.setAttribute ("style", "margin-top:0px; margin-bottom:0px;");
    td2.appendChild (this.AP);

    // Allocated Admin Points
    this.aAP = document.createElement ("P");
  	this.aAP.setAttribute ("style", "margin-top:0px; margin-bottom:0px;");
    td2.appendChild (this.aAP);

    // Status of COP
    this.COPStatus = document.createElement ("P");
  	this.COPStatus.setAttribute ("style", "margin-top: 0px; margin-bottom: 0px;");
    td2.appendChild (this.COPStatus);

    // Supply Source
    this.SSStatus = document.createElement ("P");
  	this.SSStatus.setAttribute ("style", "margin-top: 0px; margin-bottom: 0px;");
    td2.appendChild (this.SSStatus);
    
    // Depots
    this.depotCell = tr.insertCell (-1);
  }

    
  draw () 
  {
    this.AP.innerHTML        = "AP:" + this.army.adminPoints;
    this.aAP.innerHTML       = "Allocated: " + this.army.allocatedAP;
    this.COPStatus.innerHTML = "COP: " + (this.army.COP.isActive ? "active" : "inactive (reactivatable from turn " + this.army.COP.turnToReactivate + ")");
    this.SSStatus.innerHTML  = "Supply Source" + (this.army.isSSActive() ? ": active (" + this.army.activeSSName + ")" : ": inactive");
    
    if (!this.army.isSSActive ())
    {
      this.SSStatus.innerHTML += "<br>Reactivation from turn " + this.army.reactivateSSTurn;
    }
  }
  
}


class UI_PlayerWidget {
  constructor (symbol, name, parentWidget) {
    // Create the HTML block
    this.divWidget = document.createElement("DIV");
    this.divWidget.id = "PW" + symbol;
    this.divWidget.setAttribute ("class", "player-widget");
    this.divWidget.onclick = function () { UI_PlayerWidget.hideShow (); }
    parentWidget.appendChild (this.divWidget);
    
    // Add a table to separate the entries
    const t = document.createElement("TABLE");
    this.divWidget.appendChild (t);
    

    const headerRow = t.insertRow (0);
    
    // Column 1: player info
    const pInfo = headerRow.insertCell (0);
    pInfo.style.verticalAlign = "top";
    pInfo.innerHTML = "<b style='font-size: 15px'>Player:&nbsp;" + name + "</b>";

    // Column 2: Armies    
    const aInfo = headerRow.insertCell (1);
    aInfo.style.verticalAlign = "top";
    aInfo.innerHTML = "<b style='font-size: 15px'>Armies</b>";
    
    // Column 3: Reinforcement points
    const rpInfo = headerRow.insertCell (2);
    rpInfo.innerHTML = "<b style='font-size: 15px'>Reinforcement Points</b>";
    rpInfo.style.verticalAlign = "top";
    
    // Data Row
    const dataRow = t.insertRow (1);

    // Column 1: morale
    this.moraleWidgetContainer = dataRow.insertCell (0);   
    this.moraleWidgetContainer.innerHTML = "<b>Morale</b>";
    this.moraleWidgetContainer.style.verticalAlign = "top";

    // Column 2: army table
    this.armyTable = document.createElement("TABLE");
    const td2 = dataRow.insertCell (1).appendChild (this.armyTable);
    td2.style.verticalAlign = "top";

    // Column 3: Reinforcement points
    // Add a table for the nations
    this.nationTable = document.createElement("TABLE");
    const td3 = dataRow.insertCell (2).appendChild (this.nationTable);
    
    // And hide it
    this.divWidget.style.display = "none";  
  }
  
  show () {
    this.divWidget.style.display = "initial";
  }

  hide () {
    this.divWidget.style.display = "none";  
  }
  
  static hideShow () 
  { 
    const widget = event.currentTarget;
    
    if (widget.style.height != "32px") 
    {
      widget.style.height = "32px";
      widget.style.overflow = "hidden";
    }
    else 
    {
      widget.style.height = "auto";
      widget.style.overflow = "auto";
    }
  }
  
}


class UI_Game_Widget {
  constructor (parentWidget) {
    this.container = document.createElement ("DIV");
    this.container.id = "gameWidget";
    this.container.setAttribute ("class", "game");
    parentWidget.appendChild (this.container);

    this.turnWidget = document.createElement ("DIV");
    this.turnWidget.id = "turn-widget";
    this.turnWidget.setAttribute ("class", "turn-widget");
    this.turnWidget.style.position = "relative";
    this.turnWidget.style.left = "0px";
    this.turnWidget.style.top = "0px";
    this.container.appendChild (this.turnWidget);

    this.dateWidget = document.createElement ("DIV");
    this.dateWidget.id = "date-widget";
    this.dateWidget.setAttribute ("class", "date-widget");
    this.container.appendChild (this.dateWidget);

    this.gameProgressContainer = document.createElement ("DIV");
    this.gameProgressContainer.id = "game-progress";
    this.gameProgressContainer.setAttribute ("class", "game-progress");
    this.container.appendChild (this.gameProgressContainer);

    this.phaseAndSegmentWidget = document.createElement ("P");
    this.phaseAndSegmentWidget.setAttribute ("class", "phase-and-segment-widget");
    this.gameProgressContainer.appendChild (this.phaseAndSegmentWidget);
  }
  
  updateWeather (weather) {
    const iconFileName = "img/" + weather + ".png";
    this.container.style.backgroundImage = "url(" + iconFileName + ")";  
  }
  
  updateTurn (turn) {
    this.turnWidget.innerHTML = turn;
  }

  updateDate (d) {
    this.dateWidget.innerHTML = d;
  }
  
  updatePhaseAndSegment (pAndS) {
    this.phaseAndSegmentWidget.innerHTML = pAndS;
  }
}


