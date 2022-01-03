
let markerMap = new Map ();


class Marker
{
  constructor (markerClass, id)
  {
    this.id = id;
    this.x = -1;
    this.y = -1;
    this.zOrder = 0;
    this.balloonInfo = "";
    this.isEnabled = true;


    this.widget = document.createElement ("DIV");  
    this.widget.id = id;
    this.widget.setAttribute ("class", markerClass);
    this.widget.addEventListener ("mouseover", Marker.mouseOver);
    this.widget.addEventListener ("mouseout" , Marker.mouseOut);
    this.widget.addEventListener ("click"    , Marker.mouseClick);
    this.widget.addEventListener ("dblclick" , Marker.mouseDoubleClick);
    this.widget.setAttribute ("data-owner", id);
    this.widget.display = "none";
    document.getElementById ("mapContainer").appendChild (this.widget);  

    const att = document.createAttribute ("data-owner");

    this.icon = document.createElement ("IMG");
    this.icon.setAttribute ("class", "counter-icon");
    this.widget.appendChild (this.icon);

    markerMap.set (id, this);    
  }
  
  static mouseOver (ev)
  {
    const u = unitMap.get (ev.currentTarget.id);
    
    if (u.playerId == theGame.players[theGame.currentPlayer].playerId)
    {
      const m = markerMap.get (ev.currentTarget.id);
      m.showHoverInfo ();
    }
  }
  
  
  static mouseOut (ev)
  {
    const m = markerMap.get (ev.currentTarget.id);
    
    m.hideHoverInfo ();
  }
  
  
  static mouseClick (ev)
  {
    // Get the unit that originated the event
    const u = unitMap.get (ev.currentTarget.id);
    
    // Check if it belongs to the current player
    if (u.playerId == theGame.currentPlayerObj.playerId)
    {
      // OK, get its marker object and show the Action Menu
      const m = markerMap.get (ev.currentTarget.id);

      m.showActionMenu ();
    }
  }  
  

  static mouseDoubleClick (ev)
  {
    // Get the unit that originated the event
    const u = unitMap.get (ev.currentTarget.id);
    
    // Check if it belongs to the current player
    if (u.playerId == theGame.currentPlayerObj.playerId)
    {
      // OK, get its marker object and show the Action Menu
      const m = markerMap.get (ev.currentTarget.id);

      m.showInfoMenu ();
    }
  }  
  

  updateBalloonInfo (info)
  {
    this.balloonInfo = info;
  }
  
  
  setPosition (x, y)
  {
    this.x = x;
    this.y = y;
  }

  
  setZOrder (zOrder)
  {
    this.zOrder = zOrder;
  }

  
  enable (flag)
  {
    this.isEnabled = flag;
    
    if (this.isEnabled)
    {
      this.show ();    
    }
    else
    {
      this.hide ();  
    }  
  }
  

  draw ()
  {
    if (!this.isEnabled)
    {
      return;    
    }

    if (this.x < 0 || this.y < 0) 
    {
      this.hide();
      return;
    }
    
    this.widget.style.left      = (lineDrawInfo[0].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 3*this.zOrder) + "px";  
    this.widget.style.top       = (lineDrawInfo[0].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 3*this.zOrder) + "px";
    this.widget.style.zIndex    = this.zOrder;
    
    this.show ();
  }


  show () 
  {
    if (this.isEnabled)
    {
      this.widget.style.display = "block";
    }
  }
  

  hide () 
  {
    this.widget.style.display = "none";
  }
 
  showHoverInfo ()
  {
    hoverBalloonWidget.innerHTML = this.balloonInfo;
    hoverBalloonWidget.style.left = this.widget.offsetLeft + 62 + "px";
    hoverBalloonWidget.style.top  = this.widget.offsetTop + "px"; 
    hoverBalloonWidget.style.display = "block";
  }

  hideHoverInfo (info)
  {
    hoverBalloonWidget.style.display = "none"; 
  }


  showActionMenu ()
  {
    const owner     = unitMap.get (this.id);
    let actionMenu  = document.getElementById ("actionMenu");
    let menuContent = null;
    let menuOwner   = null;

    // Check if the Action menu already exists
    if (actionMenu != null)
    {
      actionMenu.remove();
      actionMenu = null;    
    } 
    
    // The menu does not exist - create it!
    actionMenu = document.createElement ("DIV");
    actionMenu.id = "actionMenu";
    actionMenu.setAttribute ("class", "popup-menu");
    actionMenu.style.zIndex = 20;
    document.getElementById ("mapContainer").appendChild (actionMenu);
  
    // The close icon
    const closeIcon = document.createElement ("IMG");
    closeIcon.setAttribute ("class", "close-icon");
    closeIcon.src = "img/close.png";
    closeIcon.onclick = function() { actionMenu.remove(); }
    actionMenu.appendChild (closeIcon);
  
    // The leader name
    menuOwner = document.createElement ("P");
    menuOwner.id = "action-owner"; 
    actionMenu.appendChild (menuOwner);
  
    // The menu itself
    menuContent = document.createElement ("P");
    actionMenu.appendChild (menuContent);

    menuOwner.innerHTML = "<strong>" + owner.name + "</strong>";
    
    actionMenu.style.left = xMapCoordFromUnitCoord (this.x, this.y) + 51 + "px";
    actionMenu.style.top  = yMapCoordFromUnitCoord (this.x, this.y) - 10 + "px";

    for (let a of owner.possibleActions()) 
    {
      menuContent = document.createElement ("INPUT");
      menuContent.setAttribute ("class", "action-menu-button");
      menuContent.type = "BUTTON";
      menuContent.value = a.action;
      menuContent.onclick = function () { if (a.func (owner)) actionMenu.remove(); }
      actionMenu.appendChild (menuContent);
    }
  }

}





class COPMarker extends Marker
{
  constructor (armyId)
  {
    super ("map-counter", "COP-" + armyId);
    this.armyId = armyId;    
    this.icon.src = ("img/cop-" + armyId + ".png");
  }

  setOrientation (orientation)
  {
    this.orientation = orientation;
//    this.draw ();  
  }

}




class SSMarker extends Marker
{
  constructor (armyId, SSId)
  {
    super ("map-counter", "SS-" + SSId);
    this.armyId = armyId;    
    this.icon.src = ("img/SS-" + armyId + ".png");
  }
}





class LeaderMarker extends Marker 
{

  constructor (id, name, type, nation) 
  {
    super ("map-counter", id);
    
    this.id = id;
    this.name = name;
    this.type = type;
    this.nation = nation;
    this.orientation = 0; 

    this.icon.setAttribute ("class", "counter-icon " + nation);
    
    // Add the leader name
    this.leaderName = document.createElement ("P");
    this.leaderName.setAttribute ("class", "counter-name");
    this.leaderName.innerHTML = this.name;
    this.widget.appendChild (this.leaderName);

    // Move somewhere else - this is not for the counter 
    this.leaderImg = document.createElement ("IMG");
    this.leaderImg.id = "IMG:" + this.name;
    this.leaderImg.src ="img/" + this.name + ".png";
    this.leaderImg.style.width = "50px";
    this.leaderImg.display = "none";
  }  


  setOrientation (orientation)
  {
    this.orientation = orientation;
  }


  setMode (mode)
  {
    if (mode != "l" && mode != "c") 
    {
       throw ("Mode invalid: " + mode);
       return;
    }  
    
    this.mode = mode;
  }


  setZOrder (zOrder)
  {
    this.zOrder = zOrder;
  }

  
  draw () 
  {
    if (this.x < 0 || this.y < 0) 
    {
      this.hide ();
      return;
    }
    
    switch (this.mode) 
    {
      case "l":
        this.icon.src = (this.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png");
        this.leaderName.style.visibility = "visible";
        this.widget.style.transform = "rotate(" + lineDrawInfo[this.orientation].angle + "deg)";
        this.widget.style.left      = (lineDrawInfo[this.orientation].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 3*(this.zOrder - 1 - mapZOrder)) + "px";  
        this.widget.style.top       = (lineDrawInfo[this.orientation].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 3*(this.zOrder - 1 - mapZOrder)) + "px";
        this.widget.style.zIndex    = this.zOrder;
        break;
  
      case "c":
        this.icon.src = "img/column.png";
        this.leaderName.style.visibility = "hidden";
        this.widget.style.transform = "rotate(" + columnDrawInfo[this.orientation].angle + "deg)";
        this.widget.style.left      = (columnDrawInfo[this.orientation].xOffset + xMapCoordFromUnitCoord (this.x, this.y) + 3*(this.zOrder - 1 - mapZOrder)) + "px";  
        this.widget.style.top       = (columnDrawInfo[this.orientation].yOffset + yMapCoordFromUnitCoord (this.x, this.y) + 3*(this.zOrder - 1 - mapZOrder)) + "px";
        this.widget.style.zIndex    = this.zOrder;
        break;
    }

    this.show();
  }


  showInfoMenu ()
  {
    // Check if the menu is already displayed
    let infoMenu    = document.getElementById ("LIW:" + this.id);
    if (infoMenu != null)
    {
      // The menu already exists, return
      return;    
    }
    
    // OK, we need to create the menu

    // First of all, let's get the general's object
    const general = unitMap.get (this.id);
    
    // The menu does not exist - create it!
    infoMenu = document.createElement ("DIV");
    infoMenu.id = "LIW:" + general.leaderId;
    infoMenu.setAttribute ("class", "leader-info");   // TODO: rename class
    infoMenu.style.zIndex = 20;
    infoMenu.style.left = (xMapCoordFromUnitCoord (general.x, general.y) + 40) + "px";
    infoMenu.style.top  = (yMapCoordFromUnitCoord (general.x, general.y) ) + "px";
    document.getElementById ("mapContainer").appendChild (infoMenu);
  
    // The close icon
    const closeIcon = document.createElement ("IMG");
    closeIcon.setAttribute ("class", "close-icon");
    closeIcon.src = "img/close.png";
    closeIcon.onclick = function() { infoMenu.remove(); }
    infoMenu.appendChild (closeIcon);
  
    // The general's picture
    const leaderImgWidget = document.createElement ("IMG");
    leaderImgWidget.src = "img/" + general.name + ".png";
    leaderImgWidget.style.display = "block";  
    leaderImgWidget.style.marginLeft = "auto";
    leaderImgWidget.style.marginRight = "auto";
    leaderImgWidget.height = "100";
    infoMenu.appendChild (leaderImgWidget);
  

    // The leader data
    const leaderData = document.createElement ("P");
    leaderData.innerHTML = "<b>"
    leaderData.innerHTML += general.name + "&nbsp;"
    leaderData.innerHTML += general.initiative;
    leaderData.innerHTML += (general.bonus == 1 ? "-*-" : "-" );
    leaderData.innerHTML += general.commandCapacity + "-"
    leaderData.innerHTML += general.subordinationValue;
    leaderData.innerHTML += "</b>";
    infoMenu.appendChild (leaderData);
  
    // Total Strength
    const corpStrengthWidget = document.createElement ("P");
    corpStrengthWidget.innerHTML = 
      "Infantry: "  + general.strength("i")*1000 + "<br>" +
      "Cavalry: "   + general.strength("c")*1000 + "<br>" +
      "Artillery: " + general.strength("a")*1000;
    infoMenu.appendChild (corpStrengthWidget);
    
    
    // Table with units
    const unitTable = document.createElement ("TABLE");
    unitTable.setAttribute ("class", "unit-table");
    infoMenu.appendChild (unitTable);    
    
    for (let entry of general.units.entries()) 
    {
        const u = entry[1];
        
        let tableCell = null;
  
        const tableRow = unitTable.insertRow (-1);
        tableRow.id = "UIdxW:" + u.unitId;
        tableRow.onclick =  function (event) { createUnitMenu (event) } 
    
        tableCell = tableRow.insertCell (-1);
  
        const unitIcon = document.createElement("IMG");
        tableCell.appendChild (unitIcon);
        unitIcon.src = "img/" + u.iconFileName();        
        unitIcon.setAttribute ("class", u.nation); 
    
        tableCell = tableRow.insertCell (-1);
        tableCell.innerHTML = u.name + " (" + u.commander + ")";
  
        tableCell = tableRow.insertCell (-1);
        tableCell.innerHTML = u.strength * 1000;
    }
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

      


