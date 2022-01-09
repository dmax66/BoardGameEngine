class COP
{
  constructor (playerId, army, json_data)
  {
    this.id               = "COP" + army.armyId;
    this.playerId         = playerId;
    this.army             = army;
    this.name             = "Center of Ops";
    this.x                = 1 * json_data.COP_x;
    this.y                = 1 * json_data.COP_y;
    this.zOrder           = 2;
    this.orientation      = 0;
    this.isActive         = (1 * json_data.COP_isActive) == 1;
    this.turnToReactivate = 1 * json_data.COP_turnToReactivate;     // meaningless if isActive == true
    this.hasMoved         = false;   // must be taken from the DB
    
    this.marker = new COPMarker (this);
    this.marker.enable (this.isActive);
    this.updateBalloonInfo ();
    
    unitMap.set (this.id, this);
  }


  static _possibleActions = [
    { action: "Rotate clockwise",      segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.rotateCW(); }},
    { action: "Rotate anti-clockwise", segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.rotateCCW(); }},
    { action: "Move forward-left",     segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.moveFL(); }},
    { action: "Move forward-right",    segmentFilter: ["mCOP"], func: function(aCOP) { aCOP.moveFR(); }},
    { action: "Disband",               segmentFilter: ["dCOP"], func: function(aCOP) { aCOP.disband(); }}
  ];


  isActionPossible (actionName)
  {
    for (let a of COP._possibleActions)
    {
      if (actionName == a.action)
      {
        const result = a.segmentFilter.includes (Game.sequenceOfPlay[theGame.currentSegment].id) && this.isActive;

        return result;
      }
    }

    throw ("Unknown action");
    return false;
  }


  possibleActions ()
  {
    let result = [];
    
    for (let a of COP._possibleActions)
    {
      const active = this.isActionPossible (a.action);
      const entry = { action: a.action, enabled: active, func: a.func };

      result.push (entry);
    }  
  
    return result;
  }


  disband ()
  {
    if (confirm ("Are you sure you want to disband the Center of Operations?"))
    {
      this.isActive = false;
      this.turnToReactivate = theGame.currentTurn + 2;  
      this.marker.enable (false);
      this.updateBalloonInfo ();  
      
      // update the army's panel
      this.army.draw ();
  
      alert ("Center of Operations disbanded");
    }
    
    this.army.draw ();
    return true;
  }
  
  
  reactivate ()
  {
    this.isActive = true;
    this.turnToReactivate = -1; 
    this.updateBalloonInfo ();
    this.marker.enable (true);
    this.army.draw ();
  }


  updateBalloonInfo ()
  {
    if (this.isActive) 
    {
      this.marker.updateBalloonInfo ("COP - " + this.army.name + "<br>Active");
    }
    else 
    {
      this.marker.updateBalloonInfo ("COP - " + this.army.name + "<br>Inactive<br>Reactivated at turn" + this.turntoReactivate);
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
     
    this.draw();
  }


  rotateCW () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    this.orientation = orientationNext (curOrientation);
    this.hasMoved = true;
        
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

    this.draw();
  }  
  
}


class SupplySource
{
  constructor (playerId, army, name, x, y)
  {
    this.id       = "SS-" + name;
    this.playerId = playerId;
    this.army     = army;
    this.id       = name;
    this.name     = name;
    this.x        = 1 * x;
    this.y        = 1 * y;
    this.zOrder   = 1;
    this.isActive = true;   // Get from caller
    
    this.marker = new SSMarker (this);
    
    this.updateBalloonInfo ();    
    
    unitMap.set (this.id, this);
  }


  static _possibleActions = 
  [
    { action: "Switch to another SS",      segmentFilter:["mSS"],  func:function(aSS) { aSS.deactivate(); }}
  ];


  isActionPossible (actionName)
  {
    for (let a of SupplySource._possibleActions)
    {
      if (actionName == a.action)
      {
        const result = a.segmentFilter.includes (Game.sequenceOfPlay[theGame.currentSegment].id) && this.isActive;

        return result;
      }
    }

    throw ("Unknown action");
    return false;
  }


  possibleActions ()
  {
    let result = [];
    
    for (let a of SupplySource._possibleActions)
    {
      const active = this.isActionPossible (a.action);
      const entry = { action: a.action, enabled: active, func: a.func };

      result.push (entry);
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
    this.isActive = true;
    this.marker.enable (true);
    this.draw ();
  }


  deactivate () 
  {
    if (confirm ("Are you sure you want to switch to another Supply source?"))
    {
      this.isActive = false;
      this.army.deactivateSS (this.name);
      this.army.draw ();
      this.marker.enable (false);
  
      alert ("Supply Source deactivated");
    }
    
    return true;
  }

} // Class



class Army 
{
  constructor (json_data) 
  {
    this.armyId      = json_data.armyId;
    this.name        = json_data.name;
    this.playerId    = json_data.playerId;
    this.adminPoints = 1 * json_data.adminPoints;  
    this.allocatedAP = 1 * json_data.allocatedAP; 

    // Hierarchy
    this.player        = null;
    this.leaders       = new Map ();
    this.supplySources = new Map ();
    this.COP           = new COP (this.playerId, this, json_data);

    this.armyPanel   = null;
    
    this.activeSSName = json_data.SS_activeId != "" ? json_data.SS_activeId : null; 
    this.reactivateSSTurn = json_data.SS_reactivateTurn != "" ? json_data.SS_reactivateTurn * 1 : -1;
  }


  setPlayer (player) 
  {
    this.player = player;
  }


  addLeader (l)
  {
    this.leaders.set (l.id, l);  
    l.setArmy (this);
  }


  addSS (json_data) 
  {
    this.supplySources.set (json_data.name, new SupplySource (this.playerId, this, json_data.name, json_data.x, json_data.y));
  }


  create_UI_widgets (parentWidget) 
  {
    // Creates the UI elements
    this.armyPanel = new UI_ArmyPanel (this, parentWidget);
  }


  deactivateSS (ssName)
  {
    this.activeSSName = null;

    /* to be parameterised */
    /* French Supply Sources can be reactivated 1 turn later */
    this.reactivateSSTurn = theGame.currentTurn + (this.armyId == "FA" ? 1 : 0);
    this.armyPanel.draw ();
  }


  activateSS (ssName)
  {
    this.activeSSName = ssName;
    
    const newSS = this.supplySources.get (ssName);
    newSS.activate ();

    this.armyPanel.draw ();
  }
  
  
  isSSActive ()
  {
    return (this.activeSSName != null);
  }


  allocateAP (ap)
  {
    this.allocatedAP = ap;  
  }


  receiveAP (ap)
  {
    this.adminPoints += (ap >= this.allocatedAP ? ap - this.allocatedAP : 0);
  }

  
  issueMovementCommand ()
  {
    if (!this.COP.isActive)
    {
      alert ("Army " + this.name + " COP is not active\nCannot issue Movement Commands");
      return 0;    
    }      
    
    if (this.activeSSName == null)
    {
      alert ("Army " + this.name + " has no active Supply Source\nCannot issue Movement Commands");
      return 0;    
    }      
    
    if (this.adminPoints <= 0)
    {
      alert ("Army " + this.name + " has no Administration Points\nCannot issue Movement Commands");
      return 0;    
    }      
    
    // All checks OK
    this.adminPoints--;

    return 1;    
  }


  draw () 
  {
    this.armyPanel.draw ();
  }

}      

