
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


    this.widget = document.createElement ("DIV");  
    this.widget.id = id;
    this.widget.setAttribute ("class", markerClass);
    this.widget.addEventListener ("mouseover", Marker.mouseOver);
    this.widget.addEventListener ("mouseout" , Marker.mouseOut);
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
    
//    m.hideHoverInfo ();
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

  
  draw ()
  {
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
    this.widget.style.display = "block";
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
}







class COPMarker extends Marker
{
  constructor (armyId)
  {
    super ("map-counter", "COP-" + armyId);
    this.armyId = armyId;    
    this.icon.src = ("img/cop-" + armyId + ".png");
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



