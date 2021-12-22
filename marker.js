
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
    const u = unitMap.get (ev.currentTarget.id);
    
    if (u.playerId == theGame.players[theGame.currentPlayer].playerId)
    {
      const m = markerMap.get (ev.currentTarget.id);
      m.showActionMenu ();
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
    
    if (!this.isEnabled)
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
    // Check if the info widget already exists - if so, close the previous one
    let actionMenu = document.getElementById ("actionMenu");
    if (actionMenu != null) 
    {
      actionMenu.remove();
    }
    
    const owner = unitMap.get (this.id);
    
    // Now the menu does not exist - create it!
    actionMenu = document.createElement ("DIV");
    actionMenu.id = "actionMenu";
    actionMenu.setAttribute ("class", "popup-menu");
    actionMenu.style.left = xMapCoordFromUnitCoord (this.x, this.y) + 51 + "px";
    actionMenu.style.top  = yMapCoordFromUnitCoord (this.x, this.y) - 10 + "px";
    actionMenu.style.zIndex = 20;
    document.getElementById ("mapContainer").appendChild (actionMenu);
  
    let menuContent = undefined;
    
    // The close icon
    const closeIcon = document.createElement ("IMG");
    closeIcon.setAttribute ("class", "close-icon");
    closeIcon.src = "img/close.png";
    closeIcon.onclick = function() { actionMenu.remove(); }
    actionMenu.appendChild (closeIcon);
  
    menuContent = document.createElement ("P");
    menuContent.innerHTML = "<b>" + owner.name + "</b>";
    actionMenu.appendChild (menuContent);
  
    for (let a of owner.possibleActions()) 
    {
      menuContent = document.createElement ("INPUT");
      menuContent.type = "BUTTON";
      menuContent.value = a.action;
      menuContent.onclick = function () { a.func (owner); }
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
  constructor (armyId)
  {
    super ("map-counter", "SS-" + armyId);
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

}


