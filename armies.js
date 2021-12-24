class COP
{
  constructor (playerId, armyId, json_data)
  {
    this.playerId         = playerId;
    this.armyId           = armyId;
    this.name             = "Center of Ops";
    this.x                = 1 * json_data.COP_x;
    this.y                = 1 * json_data.COP_y;
    this.orientation      = 0;
    this.isActive         = (1 * json_data.COP_isActive) == 1;
    this.turnToReactivate = 1 * json_data.COP_turnToReactivate;     // meaningless if isActive == true
    this.hasMoved         = false;   // must be taken from the DB
    
    this.marker = new COPMarker (armyId);
    this.marker.setPosition (this.x, this.y);
    this.marker.setZOrder (2);
    this.marker.setOrientation (this.orientation);
    this.marker.enable (this.isActive);
    this.updateBalloonInfo ();
    
    unitMap.set ( "COP-" + armyId, this);
  }


  static _possibleActions = [
    { action: "Rotate clockwise",      segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.rotateCW(); }},
    { action: "Rotate anti-clockwise", segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.rotateCCW(); }},
    { action: "Move forward-left",     segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.moveFL(); }},
    { action: "Move forward-right",    segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.moveFR(); }},
    { action: "Disband",               segmentFilter: ["dCOP"], func: function(aCOP) { aCOP.disband(); }}
  ];

  possibleActions ()
  {
    let result = [];
    
    for (let a of COP._possibleActions)
    {
      if (a.segmentFilter.includes (Game.sequenceOfPlay[theGame.currentSegment].id))
      {
        result.push (a);      
      }    
    }  
  
    return result;
  }

  disband ()
  {
    this.isActive = false;
    this.turnToReactivate = theGame.currentTurn + 2;  
    this.updateBalloonInfo ();  
    this.marker.enable (false);
  }
  
  
  reactivate ()
  {
    this.isActive = true;
    this.turnToReactivate = -1; 
    this.updateBalloonInfo ();
    this.marker.enable (true);
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
    this.hasMoved = true;
     

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    
    this.draw();
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
    this.hasMoved = true;
     

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    
    this.draw();
  }


  rotateCW () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    this.orientation = orientationNext (curOrientation);
    this.hasMoved = true;
        
    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    
    this.draw();
  }
  
  
  rotateCCW () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    this.orientation = orientationPrev (curOrientation);
    this.x += xOffset (this.orientation, isOddRow);
    this.y += yOffset (this.orientation, isOddRow);
    this.moveFL();

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    
    this.draw();
  }  
  
}


class SupplySource
{
  constructor (playerId, armyId, name, x, y)
  {
    this.playerId = playerId;
    this.armyId   = armyId;
    this.id       = name;
    this.name     = name;
    this.x        = 1 * x;
    this.y        = 1 * y;
    
    this.marker = new SSMarker (armyId, name);
    this.marker.setPosition (this.x, this.y);
    this.marker.setZOrder (1);
    
    this.updateBalloonInfo ();    
    
    unitMap.set ("SS-" + name, this);
  }


  static _possibleActions = 
  [
    { action: "Switch to another SS",      segmentFilter:["mSS"],  func:function(aSS) { aSS.deactivate(); }}
  ];


  possibleActions ()
  {
    let result = [];
    
    for (let a of SupplySource._possibleActions)
    {
      if (a.segmentFilter.includes (Game.sequenceOfPlay[theGame.currentSegment].id))
      {
        result.push (a);      
      }    
    }  
  
    return result;
  }
  
  
  updateBalloonInfo ()
  {
    this.marker.updateBalloonInfo ("Supply Source - army " + this.name);
  }
  
  
  draw () 
  {
    this.marker.draw ();
  }
  

  activate ()
  {
    this.marker.enable (true);
    this.draw ();
  }


  deactivate () 
  {
    alert ("Are you sure?");
    
    for (let a of theGame.armies)
    {
      if (a.armyId == this.armyId)
      {
        a.deactivateSS (this.name);
        this.marker.enable (false);
      }    
    }
  }

} // Class



class Army 
{
  constructor (json_data) 
  {
    this.armyId      = json_data.armyId;
    this.name        = json_data.name;
    this.playerId    = json_data.playerId;
    this.adminPoints = json_data.adminPoints;  
    this.player      = null;
    this.armyPanel   = null;
    
    this.COP = new COP (this.playerId, this.armyId, json_data);
    this.supplySources = new Map ();
    this.activeSSName = (json_data.activeSSId != "" ? json_data.activeSSId : null); 
  }

  addSS (json_data) 
  {
    this.supplySources.set (json_data.name, new SupplySource (this.playerId, this.armyId, json_data.name, json_data.x, json_data.y));
  }


  setPlayer (player) 
  {
    this.player = player;
  }

  create_UI_widgets (parentWidget) 
  {
    // Creates the UI elements
    this.armyPanel = new UI_ArmyPanel (this.symbol, this.name, parentWidget);
  }


  deactivateSS (ssName)
  {
    this.activeSSName = null;  
  }


  activateSS (ssName)
  {
    this.activeSSName = ssName;
    
    const newSS = this.supplySources.get (ssName);
    newSS.activate ();
  }


  draw () 
  {
    this.armyPanel.setAP        (this.adminPoints);
    this.armyPanel.setCOPStatus (this.COP.isActive);
    this.armyPanel.setSSStatus  (this.activeSSName, this.activeSSName != null);
  }

}      

