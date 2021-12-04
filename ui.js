

function hideShow () { 
  const widget = event.currentTarget;
  
  if (widget.style.height != "32px") {
    widget.style.height = "32px";
    widget.style.overflow = "hidden";
  }
  else {
    widget.style.height = "auto";
    widget.style.overflow = "auto";
  }
}






class UI_LeaderWidget {

  constructor (id, name, type, nation) {
    this.name = name;
    this.type = type;
    this.nation = nation;
    this.id = id;

    this.leaderWidget = document.createElement ("DIV");  
    document.getElementById ("mapContainer").appendChild (this.leaderWidget);  
    this.leaderWidget.setAttribute ("class", "leader-counter");
    this.leaderWidget.id = "L:" + id;
    this.leaderWidget.display = "none";

    this.leaderWidget.onclick = function() { 
//      this.leaderWidget.onmouseout = function () {}; 
      if (event.shiftKey) 
        showLeaderActionMenu (id);
      else 
        showLeaderInfo (id); 
    }
  
    this.leaderIcon = document.createElement ("IMG");
    this.leaderIcon.setAttribute ("class", "counter-icon " + nation);
    this.leaderWidget.appendChild (this.leaderIcon);
    
    // Add the leader name (if in line mode)
    this.leaderName = document.createElement ("P");
    this.leaderName.setAttribute ("class", "counter-name");
    this.leaderName.innerHTML = this.name;
    this.leaderWidget.appendChild (this.leaderName);

    // Move somewhere else - this is not for the counter 
    this.leaderImg = document.createElement ("IMG");
    this.leaderImg.id = "IMG:" + this.name;
    this.leaderImg.src ="img/" + this.name + ".png";
    this.leaderImg.style.width = "50px";
    this.leaderImg.display = "none";
  }  


  draw (mode, orientation, x, y, zOrder) {
    if (x < 0 || y < 0) {
      this.hide();
      return;
    }
    
    this.show();
    
    switch (mode) {
      case "l":
        this.leaderIcon.src = (this.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png");
        this.leaderName.style.visibility = "visible";
        this.leaderWidget.style.transform = "rotate(" + lineDrawInfo[orientation].angle + "deg)";
        this.leaderWidget.style.left      = (lineDrawInfo[orientation].xOffset + xMapCoordFromUnitCoord (x, y) + 3*zOrder) + "px";  
        this.leaderWidget.style.top       = (lineDrawInfo[orientation].yOffset + yMapCoordFromUnitCoord (x, y) + 3*zOrder) + "px";
        this.leaderWidget.style.zOrder    = zOrder;
        break;
  
      case "c":
        this.leaderIcon.src = "img/column.png";
        this.leaderName.style.visibility = "hidden";
        this.leaderWidget.style.transform = "rotate(" + columnDrawInfo[orientation].angle + "deg)";
        this.leaderWidget.style.left      = (columnDrawInfo[orientation].xOffset + xMapCoordFromUnitCoord (x, y) + 2*numLeadersInSameHex) + "px";  
        this.leaderWidget.style.top       = (columnDrawInfo[orientation].yOffset + yMapCoordFromUnitCoord (x, y) + 2*numLeadersInSameHex) + "px";
        this.leaderWidget.style.zOrder    = zOrder;
        break;
        
      default:
        throw ("mode invalid");
    }
  }


  show () {
    this.leaderWidget.display = "initial";
  }
  

  hide () {
    this.leaderWidget.display = "none";
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
    this.widget.readonly = true;
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
    
    const td1 = document.createElement("TD");
    tr.appendChild(td1);
        
    // Simple approach : just a box with a label 
    this.widget = document.createElement ("INPUT");
    this.widget.id = moraleWidgetId;
    this.widget.type = "TEXT";
    this.widget.readonly = true;
    this.widget.setAttribute ("class", "morale-widget");
    td1.appendChild (this.widget);
  }
  
  setValue (value) {
    this.widget.value = value;
  } 
}


class UI_APwidget {
  constructor (symbol, name, parentWidget) {
    const apWidgetId = symbol + "-ap";

    // Add a row in the table 
    const tr = document.createElement("TR");
    parentWidget.appendChild (tr);
    
    const td1 = document.createElement("TD");
    tr.appendChild(td1);
        
    const armyIcon = document.createElement("IMG");
    armyIcon.src = "img/ArmyIcon.png";
    armyIcon.style.height = "25px";
    armyIcon.style.paddingRight = "5px";
    td1.appendChild (armyIcon);

    const l = document.createElement ("LABEL");
    l.setAttribute ("class", symbol);
    l.htmlFor = apWidgetId;
    l.innerHTML = name;
    td1.appendChild (l);

    const td2 = document.createElement("TD");
    tr.appendChild (td2);
        
    this.widget = document.createElement ("INPUT");
    this.widget.id = apWidgetId;
    this.widget.type = "TEXT";
    this.widget.readonly = true;
    this.widget.setAttribute ("class", "ap-widget " + symbol);
    td2.appendChild (this.widget);
  }
  
  setValue (value) {
    this.widget.value = value;
  } 
}


class UI_PlayerWidget {
  constructor (symbol, name, parentWidget) {
    // Create the HTML block
    this.divWidget = document.createElement("DIV");
    this.divWidget.id = "PW" + symbol;
    this.divWidget.setAttribute ("class", "player-widget");
    this.divWidget.onclick = function () { hideShow (); }
    parentWidget.appendChild (this.divWidget);
    
    // Add a table to separate the entries
    const t = document.createElement("TABLE");
    this.divWidget.appendChild (t);
    
    const headerRow = document.createElement("TR");
    t.appendChild(headerRow);
    
    // Column 1: player info
    const td1 = document.createElement("TD");
    headerRow.appendChild (td1);
    td1.style.verticalAlign = "top";
    td1.innerHTML = "<b style='font-size: 15px'>Player:&nbsp;" + name + "</b>";

    this.moraleWidgetContainer = document.createElement("TD");
    td1.appendChild (this.moraleWidgetContainer);
    this.moraleWidgetContainer.innerHTML = "<b>Morale</b>";
    this.moraleWidgetContainer.style.verticalAlign = "top";

    
    // Column 2: Administrative Points    
    const td2 = document.createElement("TD");
    headerRow.appendChild (td2);
    td2.innerHTML = "<b style='font-size:15px'>Administrative Points</b>";

    // Add a table for the armies 
    this.armyTable = document.createElement("TABLE");
    td2.appendChild (this.armyTable);
    td2.style.verticalAlign = "top";

    
    // Column 3: Reinforcement points
    const td3 = document.createElement("TD");
    headerRow.appendChild (td3);
    td3.innerHTML = "<b style='font-size: 15px'>Reinforcement Points</b>";
    td3.style.verticalAlign = "top";
    
    // Add a table for the nations
    this.nationTable = document.createElement("TABLE");
    td3.appendChild (this.nationTable);
    
    // And hide it
    this.divWidget.style.display = "none";  
  }
  
  show () {
    this.divWidget.style.display = "initial";
  }

  hide () {
    this.divWidget.style.display = "none";  
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




class ModalDialog 
{
  constructor (parentWidget, widgetClass, title, id)
  {
    this.distance = undefined;
    this.id = id;
    this.dieRoll = -1;
    
    const dBox = document.createElement("DIV");
    parentWidget.appendChild (dBox);
    dBox.setAttribute("class", widgetClass + " modal");
    dBox.innerHTML = title;
    dBox.id = id;
    
    const iBox = document.createElement("DIV");
    iBox.setAttribute("class", widgetClass + " modal-content");
    iBox.style.zIndex = 100;
    dBox.appendChild (iBox);        
    
    // Close icon
    const closeIcon = document.createElement ("IMG");
    closeIcon.setAttribute ("class", "close-icon");
    closeIcon.src = "img/close.png";
    closeIcon.onclick = function () { document.getElementById (id).remove(); }
    iBox.appendChild (closeIcon);

    this.distanceWidget = document.createElement ("INPUT");
    this.distanceWidget.setAttribute ("class", "modal-box-input");
    this.distanceWidget.type = "TEXT";
    iBox.appendChild (this.distanceWidget);
    
    const l = document.createElement("LABEL");
    l.setAttribute ("class", "modal-box-text");
    l.innerHTML = "Distance Supply Source to CoP?";
    l.htmlFor = this.distanceWidget;
    iBox.appendChild (l);
    
    // Throw die button
    const btn = document.createElement ("INPUT");
    btn.type = "BTN";
    btn.setAttribute ("class", "game-button");    
    btn.innerHTML = "Roll die for AP!";
    btn.value = "Roll die for AP!";
    btn.onclick = this.rollDie; 
    iBox.appendChild (btn);    

    // Result
    this.dieRollWidget = document.createElement ("INPUT");
    this.dieRollWidget.setAttribute ("class", "modal-box-result");
    this.dieRollWidget.id = "APMBDieRoll";
    this.dieRollWidget.readonly = true;
    this.dieRollWidget.style.visibility = "hidden";
    iBox.appendChild (this.dieRollWidget);
  }

  show ()
  {
    document.getElementById (this.id).style.display = "initial";  
  }  

  rollDie ()
  {
    const dieRollWidget = document.getElementById ("APMBDieRoll");
    dieRollWidget.value = Game.rollDie();
    dieRollWidget.style.visibility = "initial";
  }
  
  close () 
  {
     document.getElementById (this.id).remove(); 
  }
}
