class Marker
{
  constructor (markerClass)
  {
    this.x = -1;
    this.y = -1;
    this.zOrder = 0;

    this.widget = document.createElement ("DIV");  
    document.getElementById ("mapContainer").appendChild (this.widget);  
    this.widget.setAttribute ("class", markerClass);

    this.icon = document.createElement ("IMG");
    this.icon.setAttribute ("class", "counter-icon");
    this.widget.appendChild (this.icon);
    
    this.widget.display = "none";
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
    this.widget.style.zOrder    = this.zOrder;
    
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
 

}