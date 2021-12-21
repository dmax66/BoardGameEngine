class COP
{
  constructor (playerId, armyId, json_data)
  {
    this.playerId = playerId;
    this.armyId   = armyId;
    this.x        = 1 * json_data.COP_x;
    this.y        = 1 * json_data.COP_y;
    this.isActive = (1 * json_data.COP_isActive) == 1;
    this.turnToReactivate = 1 * json_data.COP_turnToReactivate;     // meaningless if isActive == true
    
    this.marker = new COPMarker (armyId);
    this.marker.setPosition (this.x, this.y);
    this.marker.setZOrder (2);
    this.updateBalloonInfo ();
    
    unitMap.set ( "COP-" + armyId, this);
  }


  static possibleActions = [
    { action: "Rotate clockwise",      func: function (aCOP) { aCOP.rotateCW(); }},
    { action: "Rotate anti-clockwise", func: function (aCOP) { aCOP.rotateCCW(); }},
    { action: "Move forward-left",     func: function (aCOP) { aCOP.moveFL(); }},
    { action: "Move forward-right",    func: function (aCOP) { aCOP.moveFR(); }},
    { action: "Disband",               func: function (aCOP) { aCOP.disband(); }}
  ];


  disband ()
  {
    this.isActive = false;
    this.turnToReactivate = theGame.currentTurn + 2;  
    this.updateBalloonInfo ();  
  }
  
  
  reactivate ()
  {
    this.isActive = true;
    this.turnToReactivate = -1; 
    this.updateBalloonInfo ();
  }


  updateBalloonInfo ()
  {
    if (this.isActive) 
    {
      this.marker.updateBalloonInfo ("COP - army " + this.armyId + "<br>Active");
    }
    else 
    {
      this.marker.updateBalloonInfo ("COP - army " + this.armyId + "<br>Inactive<br>Reactivated at turn" + this.turntoReactivate);
    }
  }
  
  
  draw ()
  {
    this.marker.draw ();
  }
  
  
  move (x, y)
  {
    this.x = x;
    this.y = y;  
    this.marker.setPosition (x, y);
  }
  
  
  moveFL () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    // Orientation remains the same
    // The correct offsets are those corresponding to ( current orientation - 2)
    const newOrientation = orientationPrev (orientationPrev (curOrientation)); 
    this.x += xOffset (newOrientation, isOddRow);
    this.y += yOffset (newOrientation, isOddRow);
     

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  

  moveFR () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    // Orientation remains the same
    // The correct offsets are those corresponding to (current orientation - 1)
    const newOrientation = orientationPrev (curOrientation); 
    this.x += xOffset (newOrientation, isOddRow);
    this.y += yOffset (newOrientation, isOddRow);
     

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }


  rotateCW () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    this.orientation = orientationNext (curOrientation);
        
    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  
  
  rotateCCW () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    this.orientation = orientationPrev (curOrientation);
    this.x += xOffset (this.orientation, isOddRow);
    this.y += yOffset (this.orientation, isOddRow);
    this.moveFL();

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }  
  
}


class SupplySource
{
  constructor (playerId, armyId, json_data)
  {
    this.playerId = playerId;
    this.armyId   = armyId;
    this.x        = 1 * json_data.SS_x;
    this.y        = 1 * json_data.SS_y;
    this.isActive = (1 * json_data.SS_isActive) == 1;
    
    this.marker = new SSMarker (armyId);
    this.marker.setPosition (this.x, this.y);
    this.marker.setZOrder (1);
    
    this.updateBalloonInfo ();    
    
    unitMap.set ( "SS-" + armyId, this);
  }


  static possibleActions = [
    { action: "Move",      func: function (aSS) { aSS.move(); }}
  ];


  move ()
  {
    this.isActive = false;
    this.updateBalloonInfo ();
  }
  
  
  reactivate ()
  {
    if (this.isActive) 
    {
      return;
    }

    // Roll die to reactivate - 1 or 2 means the SS reactivation is successful
    this.updateBalloonInfo ();
  }


  updateBalloonInfo ()
  {
    if (this.isActive) 
    {
      this.marker.updateBalloonInfo ("Supply Source - army " + this.armyId + "<br>Active");
    }
    else 
    {
      this.marker.updateBalloonInfo = ("Supply Source - army " + this.armyId + "<br>Inactive");
    }
  }
  
  
  draw () 
  {
    this.marker.draw ();
  }
  

  move (x, y) 
  {
    this.x = x;
    this.y = y;  
    this.marker.setPosition (x, y);
  }
}



class Army {

  constructor (json_data) 
  {
    this.armyId      = json_data.armyId;
    this.name        = json_data.name;
    this.playerId    = json_data.playerId;
    this.adminPoints = json_data.adminPoints;  
    this.copX        = json_data.COP_X;
    this.copY        = json_data.COP_Y;
    this.isActive    = true;
    this.player      = null;
    this.armyPanel   = null;
    
    this.COP = new COP (this.playerId, this.armyId, json_data);
    this.supplySources = [];
    this.activeSS = new SupplySource (this.playerId, this.armyId, json_data);
 }

  addSS (json_data) 
  {
    this.supplySources.push (json_data);
  }

  setPlayer (player) {
    this.player = player;
  }

  create_UI_widgets (parentWidget) {
    // Creates the UI elements
    this.armyPanel = new UI_ArmyPanel (this.symbol, this.name, parentWidget);
  }


  draw () 
  {
    this.armyPanel.setAP (this.adminPoints);
    this.armyPanel.setCOPStatus (this.COP.isActive, this.COP.x, this.COP.y, );

    for (let ss of this.supplySources)
    {
      if (ss.isActive) 
      {
        this.armyPanel.setSSStatus (true, ss.x, ss.y, ss.name);
        break;      
      }
    }
  }

}      

