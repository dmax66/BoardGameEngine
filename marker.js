
let markerMap = new Map ();


class Marker
{
  constructor (markerClass, markerId, ownerObj)
  {
    this.ownerObj = ownerObj;
    this.balloonInfo = "";
    this.isEnabled = true;


    this.widget = document.createElement ("DIV");  
    this.widget.id = markerId;
    this.widget.setAttribute ("class", markerClass);
    this.widget.addEventListener ("mouseover"  , Marker.mouseOver);
    this.widget.addEventListener ("mouseout"   , Marker.mouseOut);
    this.widget.addEventListener ("click"      , Marker.mouseLeftClick);
    this.widget.addEventListener ("contextmenu", Marker.mouseRightClick);
    this.widget.setAttribute ("data-owner", this.ownerObj.id);
    this.widget.display = "none";
    document.getElementById ("mapContainer").appendChild (this.widget);  

    
    this.icon = document.createElement ("IMG");
    this.icon.setAttribute ("class", "counter-icon");
    this.widget.appendChild (this.icon);

    markerMap.set (markerId, this);    
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
  
  
  static mouseLeftClick (ev)
  {
    // Get the unit that originated the event
    const u = unitMap.get (ev.currentTarget.id);
    
    // Check if it belongs to the current player
    if (u.playerId == theGame.currentPlayerObj.playerId)
    {
      // OK, get its marker object display the menu
      const m = u.marker;

      m.showInfoMenu ();
    }
  }  


  static mouseRightClick (ev)
  {
    // Get the unit that originated the event
    const u = unitMap.get (ev.currentTarget.id);
    
    // Check if it belongs to the current player
    if (u.playerId == theGame.currentPlayerObj.playerId)
    {
      // OK, get its marker object
      const m = u.marker;
      
      ev.preventDefault ();
      m.showActionMenu ();
    }
  }  
  

  updateBalloonInfo (info)
  {
    this.balloonInfo = info;
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

    if (this.ownerObj.x < 0 || this.ownerObj.y < 0) 
    {
      this.hide();
      return;
    }
    
    this.widget.style.left      = (lineDrawInfo[0].xOffset + xMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 3*this.ownerObj.zOrder) + "px";  
    this.widget.style.top       = (lineDrawInfo[0].yOffset + yMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 3*this.ownerObj.zOrder) + "px";
    this.widget.style.zIndex    = this.ownerObj.zOrder;
    
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

    // Hide also the action menu
    this.hideActionMenu ();
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


  hideActionMenu ()
  {
    const actionMenu  = document.getElementById ("actionMenu");

    if (actionMenu != null)
    {
      actionMenu.remove();
    }
  }


  showActionMenu ()
  {
    const owner     = this.ownerObj;
    let actionMenu  = document.getElementById ("actionMenu");
    let menuActions = null;
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
    menuActions = document.createElement ("P");
    menuActions.id = "AM-MC";
    actionMenu.appendChild (menuActions);

    menuOwner.innerHTML = "<strong>" + this.ownerObj.name + "</strong>";
    
    actionMenu.style.left = xMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 51 + "px";
    actionMenu.style.top  = yMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) - 10 + "px";

    for (let entry of this.ownerObj.possibleActions()) 
    {
      const button = document.createElement ("INPUT");
      button.type     = "BUTTON";
      button.setAttribute ("class", "action-menu-button");
      button.value    = entry.action;
      button.onclick  = function () { entry.func (owner) };
      button.disabled = ! entry.enabled;
      menuActions.appendChild (button);
    }
  }


  updateActionMenu ()
  {
    const owner       = this.ownerObj;
    const menuActions = document.getElementById ("AM-MC");

    // Check if the Action menu already exists
    if (menuActions == null)
    {
      return;
    } 
    
    // Iterate over the buttons to enable/disable them
    // The order of buttons and possible actions has remained the same
    const buttons = menuActions.childNodes;
    const actions = this.ownerObj.possibleActions();

    for (let i = 0; i < buttons.length; i++) 
    {
      if (buttons[i] == null)
      {
        throw ("Internal error");
      }
      buttons[i].disabled = !actions[i].enabled;
    }
  }

}





class COPMarker extends Marker
{
  constructor (cop)
  {
    super ("map-counter", cop.id, cop);
    this.icon.src = ("img/cop-" + cop.army.armyId + ".png");
  }
}




class SSMarker extends Marker
{
  constructor (supplySource)
  {
    super ("map-counter", supplySource.id, supplySource);
    this.icon.src = ("img/SS-" + supplySource.army.armyId + ".png");
  }
}





class LeaderMarker extends Marker 
{

  constructor (leader) 
  {
    super ("map-counter", leader.leaderId, leader);

    this.icon.setAttribute ("class", "counter-icon " + this.ownerObj.nationId);
    
    // Add the leader name
    this.leaderName = document.createElement ("P");
    this.leaderName.setAttribute ("class", "counter-name");
    this.leaderName.innerHTML = this.ownerObj.name;
    this.widget.appendChild (this.leaderName);

    // Move somewhere else - this is not for the counter 
    this.leaderImg = document.createElement ("IMG");
    this.leaderImg.id = "IMG:" + this.ownerObj.name;
    this.leaderImg.src ="img/" + this.ownerObj.name + ".png";
    this.leaderImg.style.width = "50px";
    this.leaderImg.display = "none";
  }  


  updateMovementStatus ()
  {
    // Update the border to reflect the moving status
    switch (this.ownerObj.movementStatus)
    {
      case 'idle':
        this.widget.classList.remove ("leader-hasMoved");
        this.widget.classList.remove ("leader-activationKO");
        break;

      case 'hasMC':
        this.widget.classList.remove ("leader-idle");
        this.widget.classList.add    ("leader-hasMC");
        break;

      case 'hasProvisionalMC':
        this.widget.classList.remove ("leader-idle");
        this.widget.classList.add    ("leader-provisional-MC");
        break;

      case 'activationOK':
        this.widget.classList.remove ("leader-hasProvisionalMC");
        this.widget.classList.add    ("leader-activationOK");
        break;

      case 'isMoving':
        this.widget.classList.remove ("leader-hasMC");
        this.widget.classList.remove ("leader-activationOK");
        this.widget.classList.add    ("leader-isMoving");
        break;

      case 'activationKO':
        this.widget.classList.remove ("leader-provisional-MC");
        this.widget.classList.add    ("leader-activation-KO");
        break;

      case 'hasMoved':
        this.widget.classList.remove ("leader-isMoving");
        this.widget.classList.add    ("leader-hasMoved");
        break;
    }

  }




  draw () 
  {
    if (this.ownerObj.x < 0 || this.ownerObj.y < 0) 
    {
      this.hide ();
      return;
    }
    
    switch (this.ownerObj.mode) 
    {
      case "l":
        this.icon.src = (this.ownerObj.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png");
        this.leaderName.style.visibility = "visible";
        this.widget.style.transform = "rotate(" + lineDrawInfo[this.ownerObj.orientation].angle + "deg)";
        this.widget.style.left      = (lineDrawInfo[this.ownerObj.orientation].xOffset + xMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 3*(this.ownerObj.zOrder - 1 - mapZOrder)) + "px";  
        this.widget.style.top       = (lineDrawInfo[this.ownerObj.orientation].yOffset + yMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 3*(this.ownerObj.zOrder - 1 - mapZOrder)) + "px";
        this.widget.style.zIndex    = this.ownerObj.zOrder;
        break;
  
      case "c":
        this.icon.src = "img/column.png";
        this.leaderName.style.visibility = "hidden";
        this.widget.style.transform = "rotate(" + columnDrawInfo[this.ownerObj.orientation].angle + "deg)";
        this.widget.style.left      = (columnDrawInfo[this.ownerObj.orientation].xOffset + xMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 3*(this.ownerObj.zOrder - 1 - mapZOrder)) + "px";  
        this.widget.style.top       = (columnDrawInfo[this.ownerObj.orientation].yOffset + yMapCoordFromUnitCoord (this.ownerObj.x, this.ownerObj.y) + 3*(this.ownerObj.zOrder - 1 - mapZOrder)) + "px";
        this.widget.style.zIndex    = this.ownerObj.zOrder;
        break;
    }

    this.show();
  }


  showInfoMenu ()
  {
    // Check if the menu is already displayed
    let infoMenu    = document.getElementById ("LIW:" + this.ownerObj.leaderId);
    if (infoMenu != null)
    {
      // The menu already exists, return
      return;    
    }
    
    // OK, we need to create the menu

    // First of all, let's get the general's object
    const general = this.ownerObj;
    
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
    leaderData.style.textAlign = "center";
    leaderData.innerHTML = "<strong>";
    leaderData.innerHTML += general.name + "&nbsp;(";
    leaderData.innerHTML += general.initiative;
    leaderData.innerHTML += (general.hasBonus == 1 ? "*" : "-");
    leaderData.innerHTML += general.commandCapacity + "-";
    leaderData.innerHTML += general.subordinationValue;
    leaderData.innerHTML += ")</strong><br>";
    leaderData.innerHTML += general.army.name + "<br>";
    leaderData.innerHTML += general.unitName;
    infoMenu.appendChild (leaderData);
  
    // Total Strength
    const corpStrengthWidget = document.createElement ("P");
    corpStrengthWidget.style.fontWeight = "normal";
    corpStrengthWidget.innerHTML = 
      "Infantry: "  + general.strength("i")*1000 + "<br>" +
      "Cavalry: "   + general.strength("c")*1000 + "<br>" +
      "Artillery: " + general.strength("a")*1000;
    infoMenu.appendChild (corpStrengthWidget);
    
    
    // Table with units
    const unitTable = document.createElement ("TABLE");
    unitTable.setAttribute ("class", "unit-table");
    infoMenu.appendChild (unitTable);    
    
    for (let u of general.units.values()) 
    {
      if (! u.isActive)
      {
        continue;      
      }
      
      let tableCell = null;

      const tableRow = unitTable.insertRow (-1);
      tableRow.id = "UIdxW:" + u.unitId;
      tableRow.onclick =  function (event) { LeaderMarker.onUnitClicked (event) } 
      tableRow.setAttribute ("data-owner", u.unitId);
  
      tableCell = tableRow.insertCell (-1);

      const unitIcon = document.createElement("IMG");
      tableCell.appendChild (unitIcon);
      unitIcon.src = "img/" + u.iconFileName();        
      unitIcon.setAttribute ("class", u.nationId); 
  
      tableCell = tableRow.insertCell (-1);
      tableCell.innerHTML = u.name + " (" + u.commander + ")";

      tableCell = tableRow.insertCell (-1);
      tableCell.innerHTML = u.strength * 1000;
    }
  }


  updateInfoMenu ()
  {
    let infoMenu = document.getElementById ("LIW:" + this.ownerObj.leaderId);
    if (infoMenu != null)
    {
      // The menu already exists, remove it and redraw it (can be optimised to avoid destroying it)
      infoMenu.remove ();    
      this.showInfoMenu ();
    }
  }


  static onUnitClicked (ev)
  {
    const evSource = theGame.getUnit (ev.target);
    const unitId = ev.currentTarget.getAttribute ("data-owner");
    const unit = theGame.getUnit (unitId);
    
    unit.openActionMenu (ev.x, ev.y);
  }  

}


function hideLeaderInfo (leaderWidgetId)
{
  var leaderInfoWindow; 
  var aLeader = leaders[ findLeaderFromWidgetId (leaderWidgetId) ];

  // Check if the info widget already exists - if so, remove it
  leaderInfoWindow = document.getElementById ("LIW:" + aLeader.leaderId);
  if (leaderInfoWindow != null)
  {
    leaderInfoWindow.remove();
  }
}  

      


class PositionPicker 
{
  constructor ()
  {
    this.mode = "l";
    this.orientation = 0;
    this.type = "i";
    this.className = "";
    this.x = 0;
    this.y = 0;
    this.isActive = false;
    this.id = null;
    
    this.widget = document.createElement ("DIV");  
    this.widget.setAttribute ("class", "counter-icon");
    this.widget.id           = "PositionPicker";
    this.widget.display      = "none";
    this.widget.style.zIndex = 39;
    this.widget.onclick = function () { unitPicker.confirmSelection (); }
    document.getElementById ("mapContainer").appendChild (this.widget);  

    this.icon = document.createElement ("IMG");
    this.icon.setAttribute ("class", "counter-icon");
 	  this.icon.src = "";
    this.icon.style.opacity = 0.5;
    this.widget.appendChild (this.icon);

    this.label = document.createElement ("SPAN");
    this.label.setAttribute ("class", "counter-name");
    this.label.style.position = "absolute";
    this.label.style.width    = "60px";
    this.label.style.height   = "10px";
    this.label.style.left     = "0px";
    this.label.style.top      = "8px";
    this.widget.appendChild (this.label);
  }

  moveTo (x, y)
  {
    this.x = x;
    this.y = y;
	
    this.draw ();
  }

  
  flipToLine ()
  {
    if (this.className == "Leader")
    {
      this.mode = "l";
      this.icon.src = (this.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png");
      this.label.style.display = "initial";
    }
  }
  
  
  flipToColumn ()
  {
    if (this.className == "Leader")
    {
      this.mode = "c";
      this.icon.src = "img/column.png";
      this.label.style.display = "none";
    }
  }
  
  
  rotateCW ()
  {
    if (this.className == "Leader")
    {
      this.orientation = orientationNext (this.orientation);
      this.draw ();
    }
  }
  
  
  rotateCCW ()
  {
    if (this.className == "Leader")
    {
      this.orientation = orientationPrev (this.orientation);
      this.draw ();
    }
  }
  

  draw ()
  {
    this.widget.style.transform = "rotate(" + lineDrawInfo[this.orientation].angle + "deg)";

    this.widget.style.left      = (this.xOffset() + xMapCoordFromUnitCoord (this.x, this.y)) + "px";  
    this.widget.style.top       = (this.yOffset() + yMapCoordFromUnitCoord (this.x, this.y)) + "px";
  }
  
  
  xOffset ()
  {
	switch (this.orientation)
	{
	  case 0:
		  return -47;
		  
	  case 1:
		  return -47 + 34;
		  
	  case 2:
		  return -48 + 32 + 32 + 20;
		  
	  case 3:
		  return -48 + 32 + 32 + 32;
		  
	  case 4:
		  return -48 + 32 + 28;
		  
	  case 5:
		  return -48 + 14;
	}
	
	return -48;
  }
  
  
  yOffset ()
  {
	  switch (this.orientation)
	  {
	  	case 0:
	  		return 8;
	  		
	  	case 1:
	  		return 8 - 37;
	  		
	  	case 2:
	  		return 8 - 22;
	  		
	  	case 3:
	  		return 8+26;
	  		
	  	case 4:
	  		return 8 + 32 + 26;
	  		
	  	case 5:
	  		return 8 + 47;
	  }
	  return 8;
  }
  
  
  show (className, id, name, otherId) 
  {
    this.id = id;
    this.className = className;
    
    this.widget.setAttribute ("class", "counter-icon");

    switch (className)
    {
      case "Leader":
        this.icon.src = "img/infantry-line.png";
        this.icon.classList.add (otherId);
        this.label.innerHTML = name;

        break;
        
      case "COP":
        this.icon.src = "img/cop-" + otherId + ".png";
        this.label.innerHTML = "";
        break;
        
      default:
        throw ("Unknown class name");
        return;
    }
    
    this.widget.style.display = "block";
    this.isActive = true;
  }
  

  hide () 
  {
    this.widget.style.display = "none";
    this.isActive = false;
    this.mode = "l";
    this.orientation = 0;
    this.type = "i";
    this.x = 0;
    this.y = 0;
  }
  
}