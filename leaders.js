'use strict';


// TODO
const numLeadersInSameHex=1;



class Leader 
{
  constructor (json_data) 
  {
    this.leaderId           = json_data.leaderId;
    this.name               = json_data.name;
    this.nationId           = json_data.nationId;
    this.playerId           = json_data.playerId;
//    this.armyName           = json_data.armyName;
    this.armyId             = json_data.armyId;
    this.initiative         = 1 * json_data.initiative;
    this.hasBonus           = (json_data.hasBonus == 1 ? true : false);
    this.commandCapacity    = 1 * json_data.commandCapacity;
    this.subordinationValue = 1 * json_data.subordinationValue;
    this.type               = json_data.type;

    // Dynamic data
    this.orientation        = 1 * json_data.orientation;
    this.mode               = json_data.mode;
    this.x                  = 1 * json_data.X;
    this.y                  = 1 * json_data.Y;
    this.parentId           = json_data.parentId;
    this.parent             = null;
    this.totalMC            = 0;   // Get from DB
    this.provisionalMCs     = 0;
    this.expendedMC         = 0;
    this.movementStatus     = 'idle';

    // Non persistent data
    this.x2 = Leader.calcX2 (this.x, this.y, this.orientation);
    this.y2 = Leader.calcY2 (this.x, this.y, this.orientation);

    // Hierarchy
    this.player             = null;
    this.nation             = null;
    this.army               = null;
    this.units              = new Map ();
    this.subordinates       = new Map ();

    // GUI objects
    this.marker = new LeaderMarker (this);

    unitMap.set (this.leaderId, this);
    
    this.setZOrder (1 * json_data.zOrder);
    this.updateBalloonInfo();
  }

  static movingLeader = null;
  static movementStatuses = ['idle', 'hasMC', 'hasProvisionalMC', 'activationOK','isMoving', 'hasMoved', 'activationKO'];
    
  setPlayer (player) 
  {
    this.player = player;
  }


  setNation (nation)
  {
    this.nation = nation;
  }
  
  
  setArmy (army)
  {
    this.army = army;  
  }
  
    
  static _possibleActions = [
    { action: "Get MC",                modeFilter: ['c', 'l'],   segmentFilter: ["MC"],               inLOCFilter: true,  movStatusFilter: ['idle'],                  func: function(aLeader) { aLeader.getMC(); }},
    { action: "Get Provisional MC",    modeFilter: ['c', 'l'],   segmentFilter: ["MC"],               inLOCFilter: true,  movStatusFilter: ['idle'],                  func: function(aLeader) { aLeader.getProvisionalMC(); }},
    { action: "Try to activate",       modeFilter: ['c', 'l'],   segmentFilter: ["IIS"],              inLOCFilter: false, movStatusFilter: ['idle'],                  func: function(aLeader) { aLeader.tryToActivate(); }},
    { action: "Flip Line-Column",      modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.flipMode(); }},
    { action: "Rotate clockwise",      modeFilter: ['l'],        segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.rotateCW(); }},
    { action: "Rotate anti-clockwise", modeFilter: ['l'],        segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.rotateCCW(); }},
    { action: "Flip direction",        modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.uTurn(); }},
    { action: "Move forward-left",     modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.moveFL(); }},
    { action: "Move forward",          modeFilter: ['c'],        segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.moveF(); }},
    { action: "Move forward-right",    modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['hasMC', 'activationOK'], func: function(aLeader) { aLeader.moveFR(); }},
    { action: "To bottom of stack",    modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['any'],                   func: function(aLeader) { aLeader.toBottomOfStack(); }},
    { action: "To top of stack",       modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['any'],                   func: function(aLeader) { aLeader.toTopOfStack(); }},
    { action: "Push down",             modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['any'],                   func: function(aLeader) { aLeader.pushDown(); }},
    { action: "Push up",               modeFilter: ['c', 'l'],   segmentFilter: ["MC", "IIS", "FMS"], inLOCFilter: false, movStatusFilter: ['any'],                   func: function(aLeader) { aLeader.pushUp(); }},
    { action: "Manage units",          modeFilter: ['c', 'l'],   segmentFilter: ["OS"],               inLOCFilter: false, movStatusFilter: ['any'],                   func: function(aLeader) {  }}
  ];


  isActionPossible (actionName)
  {
    let result = false;
    const segm = Game.sequenceOfPlay[theGame.currentSegment].id;

    switch (actionName)
    {
      case "Get MC":
        if (segm != "MC") return false;           // Only during Issue Movement Command Segment
        if (! this.army.COP.isActive || ! this.army.isSSActive()) return false;             // LOC broken
        if (this.totalMC >= 2) return false;                                                // Already reached max number of MCs
        if (this.movementStatus != "idle" && this.movementStatus != "hasMC") return false;  // Not in the right status
        return true;

      case "Get Provisional MC":
        if (segm != "MC") return false;           // Only during Issue Movement Command Segment
        if (! this.army.COP.isActive || ! this.army.isSSActive()) return false;             // LOC broken
        if (this.totalMC >= 1) return false;                                                // Already reached max number of MCs (1 for Provisional MC - no forced March)
        if (this.movementStatus != "idle") return false;                                    // Can get Provisional MC only if has not moved or got MC
        return true;

      case "Try to activate":
        if (segm != "IIS") return false;          // Only during Independent Initiative Segment
        if (this.totalMC > 0) return false;                                                 // If it has MCs, no need to try to move
        if (this.movementStatus != "idle" 
            && this.movementStatus != "hasProvisional") return false;                       // Not in the right status
        return true;

      case "Flip Line-Column":
      case "Rotate clockwise":
      case "Rotate anti-clockwise":
      case "Flip direction":
      case "Move forward-left":
      case "Move forward":
      case "Move forward-right":
        if (segm != "MC"  && segm != "IIS" && segm != "FMS") return false;

        if (segm == "MC"  && this.movementStatus != "hasMC" && this.movementStatus != "isMoving") return false;
        if (segm == "IIS" && this.movementStatus != "activationOK") return false;
        if (segm == "FMS" && this.movementStatus != "hasMC") return false;
        if (this.mode == "c" && actionName == "Rotate clockwise" || actionName == "Rotate anti-clockwise") return false;
        if (this.mode == "l" && actionName == "Move forward") return false;

        return true;

      case "To bottom of stack":
      case "To top of stack":
      case "Push down":
      case "Push up":
        if (segm != "MC"  && segm != "IIS" && segm != "FMS") return false;
        return true;

      case "Manage units":
        if (segm != "OS") return false;
        return true;

      default:
        throw ("Invalid action");
        return false;
    }
  }


  possibleActions ()
  {
    let result = [];
    
    for (let a of Leader._possibleActions)
    {
      const active = this.isActionPossible (a.action);
      const entry  = { action: a.action, enabled: active, func: a.func };

      result.push (entry);
    }  
  
    return result;
  }


  updateBalloonInfo ()
  {
    this.marker.updateBalloonInfo (this.name + "<br>Infantry: " + this.strength ("i")*1000 + "<br>Cavalry: " + this.strength ("c")*1000 + "<br>Artillery: " + this.strength ("a")*1000);
  }


  setZOrder (z)
  {
    this.zOrder = z;
  }

  //
  // Returns i, where leaders[i].id == leaderId 
  //
  static findById (leaderId) 
  {
   return unitMap.get (leaderId);
  }


  // Returns an instance of class Unit whose id == unitId
  getUnit (unitId) 
  {
    this.units.get (unitId);
  }

  
  // Returns the index of the units array whose id == unitId
/*
  findUnit (unitId) 
  {
    for (let i = 0; i < this.units.length; i++)
      if (this.units[i].unitId == unitId)
        return i;
  
    return (-1);
  }
*/  
  
  // aUnit is an instance of class Unit
  addUnit (aUnit) 
  {
    aUnit.setParent (this);
    this.units.set (aUnit.unitId, aUnit);
    
    this.updateBalloonInfo ();
  }


  // Remove the unit identified by unitId. 
  removeUnit (unitId) 
  {
    const unit = this.units.get (unitId);
    
    this.units.delete (unitId);
    unit.unsetParent ();
 
    this.updateBalloonInfo ();
  }
  
  
  // subordinate is an instance of class Leader
  // Returns true if success, false if there's an error
  addSubordinate (subordinate) 
  {
    // Sanity check #1: check that it is not referencing itself
    if (this.leaderId == subordinate.leaderId) 
    {
      throw ("Unit.addSubordinate: trying to add leader to itself");
      return false;
    }
    
    // Sanity check #2: they must be of the same playerId
    if (this.playerId != subordinate.playerId) 
    {
      throw ("Unit.addSubordinate: trying to add leader to other playerId");
      return false;
    }
    
    subordinate.setParent (this);
    this.subordinates.set (subordinate.leaderId, subordinate);
    
    this.updateBalloonInfo ();
    return true;
  }  
  

  // parent is an instance of class Leader
  // Returns true if success, false if there's an error
  setParent (parent) 
  {
    // Sanity check #1: check that it is not referencing itself
    if (this.leaderId == parent.leaderId) 
    {
      throw ("Unit.addSubordinate: trying to add leader to itself");
      return false;
    }
    
    // Sanity check #2: they must be of the same playerId
    if (this.playerId != parent.playerId) 
    {
      throw ("Unit.addSubordinate: trying to add leader to other playerId");
      return false;
    }

    this.parent = parent;
  }    
    
  
  // Return the strength of all controlled units (both directly and indirectly) of type t
  strength (t) 
  {
    let s = 0;
    
    // Units directly commanded
    for (let u of this.units.entries ()) 
    {
      if (u[1].type == t) 
      {
        s += 1 * u[1].strength; 
      }
    }

    // Subordinate Leaders
    for (let sl of this.subordinates.entries ()) 
    {
      s += sl[1].strength (t);
    }

    return s;
  }


  draw () 
  {
    this.marker.draw ();
  }

  
  hide () 
  {
    this.marker.hide ();  
  }

  
  resetTurnData ()
  {
    this.totalMC             = 0;   
    this.expendedMC          = 0;
    this.updateMovementStatus ('idle');
  }


  updateMovementStatus (newStatus)
  {
    this.movementStatus = newStatus;
    this.marker.updateMovementStatus ();
  }



  changeMovingLeader ()
  {
    if (Leader.movingLeader !== null)
    {
      if (Leader.movingLeader != this)
      {
        Leader.movingLeader.updateMovementStatus ('hasMoved');
        Leader.movingLeader.draw ();
      }
    }

    Leader.movingLeader = this;
  }


  static calcX2 (x, y, orientation)
  {
    const isOddRow = y % 2;

    return x - xOffset (orientation, isOddRow);
  }


  static calcY2 (x, y, orientation)
  {
    const isOddRow = y % 2;

    return y - yOffset (orientation, isOddRow);
  }


  flipMode () 
  {
    if (this.mode == "l") 
    { 
      this.mode = "c";
    }
    else if (this.mode == "c")
    {
      this.mode = "l";
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
      
    this.doPostMovementActions();
  }
  

  moveFL () {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    let newX1 = 0;
    let newY1 = 0;
    let newX2 = 0;
    let newY2 = 0;
    let newOrientation = 0;
    
    
    switch (this.mode) {
      case "l": 
        // Orientation remains the same
        // The correct offsets are those corresponding to ( current orientation - 2)
        newOrientation = curOrientation; 
        const tempOrientation = orientationPrev (orientationPrev (curOrientation));
        newX1 = this.x + xOffset (tempOrientation, isOddRow);
        newY1 = this.y + yOffset (tempOrientation, isOddRow);
        break;
         
      case "c":
        newOrientation = orientationPrev (curOrientation);
        newX1 = this.x + xOffset (newOrientation, isOddRow);
        newY1 = this.y + yOffset (newOrientation, isOddRow);
        break;
         
        default:
          throw ("Invalid orientation in moveFL:" + this.mode);
    }


    newX2 = Leader.calcX2 (newX1, newY1, newOrientation);
    newY2 = Leader.calcY2 (newX1, newY1, newOrientation);
    if (this.canEnterHex (newX1, newY1, newX2, newY2))
    {
      this.x = newX1;
      this.y = newY1;   
      this.x2 = newX2;
      this.y2 = newY2;     
      this.orientation = newOrientation;
      this.doPostMovementActions ()  
    }
  }
  

  moveF () {
    const isOddRow = this.y % 2;
    let newX1 = 0;
    let newY1 = 0;
    let newX2 = 0;
    let newY2 = 0;
    let newOrientation = 0;
    
    switch (this.mode) 
    {
      case "l":
        // Not applicable to line mode 
        break;
         
      case "c":
        newOrientation = this.orientation;
        newX1 = this.x + xOffset (this.orientation, isOddRow);
        newY1 = this.y + yOffset (this.orientation, isOddRow);
        break;
         
        default:
          throw ("Invalid orientation in moveFL:" + this.mode);
    }

    newX2 = Leader.calcX2 (newX1, newY1, newOrientation);
    newY2 = Leader.calcY2 (newX1, newY1, newOrientation);
  
    if (this.canEnterHex (newX1, newY1, newX2, newY2))
    {
      this.x  = newX1;
      this.y  = newY1;        
      this.x2 = newX2;
      this.y2 = newY2;     
      this.orientation = newOrientation;
      this.doPostMovementActions ()  
    }
  }
  

  moveFR () 
  {
    const isOddRow = this.y % 2;
    let newX1 = 0;
    let newY1 = 0;
    let newX2 = 0;
    let newY2 = 0;
    let newOrientation = 0;
    
    switch (this.mode) {
      case "l": 
        // Orientation remains the same
        // The correct offsets are those corresponding to (current orientation - 1)
        newOrientation = this.orientation;
        newX1 = this.x + xOffset (orientationPrev (newOrientation), isOddRow);
        newY1 = this.y + yOffset (orientationPrev (newOrientation), isOddRow);
        break;
         
      case "c":
        newOrientation = orientationNext (this.orientation);
        newX1 = this.x + xOffset (newOrientation, isOddRow);
        newY1 = this.y + yOffset (newOrientation, isOddRow);
        break;
         
      default:
        throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    newX2 = Leader.calcX2 (newX1, newY1, newOrientation);
    newY2 = Leader.calcY2 (newX1, newY1, newOrientation);

    if (this.canEnterHex (newX1, newY1, newX2, newY2))
    {
      this.x  = newX1;
      this.y  = newY1;        
      this.x2 = newX2;
      this.y2 = newY2;     
      this.orientation = newOrientation;
      this.doPostMovementActions ()  
    }
  }
  

  uTurn () 
  {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    

    switch (this.mode)
    {
      case "l":
        this.orientation = orientationOpposite (curOrientation);
        this.x += xOffset (this.orientation, isOddRow);
        this.y += yOffset (this.orientation, isOddRow);
        break;
        
      case "c":
        this.orientation = orientationOpposite (curOrientation);
        this.x += xOffset (this.orientation, isOddRow);
        this.y += yOffset (this.orientation, isOddRow);
        break;
        
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    this.x2 = Leader.calcX2 (this.x, this.y, this.orientation);
    this.y2 = Leader.calcY2 (this.x, this.y, this.orientation);

    this.doPostMovementActions ()  
  }
  
  
  rotateCW () 
  {
    const isOddRow = this.y % 2;
    let newOrientation = 0;
    let newX1 = this.x;
    let newY1 = this.y;
    let newX2 = 0;
    let newY2 = 0;
    

    switch (this.mode)
    {
      case "l":
        newOrientation = orientationNext (this.orientation);
        break;
        
      case "c":
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    newX2 = Leader.calcX2 (newX1, newY1, newOrientation);
    newY2 = Leader.calcY2 (newX1, newY1, newOrientation);

    if (this.canEnterHex (newX1, newY1, newX2, newY2))
    {
      this.x  = newX1;
      this.y  = newY1;        
      this.x2 = newX2;
      this.y2 = newY2;     
      this.orientation = newOrientation;
      this.doPostMovementActions ()  
    }
  }
  
  
  rotateCCW () 
  {
    const isOddRow = this.y % 2;
    let newOrientation = 0;
    let newX1 = 0;
    let newY1 = 0;
    let newX2 = 0;
    let newY2 = 0;

    switch (this.mode)
    {
      case "l":
        newOrientation = orientationPrev (this.orientation);
        newX1 = this.x + xOffset (this.orientation, isOddRow);
        newY1 = this.y + yOffset (this.orientation, isOddRow);
        break;
        
      case "c":
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    newX2 = Leader.calcX2 (newX1, newY1, newOrientation);
    newY2 = Leader.calcY2 (newX1, newY1, newOrientation);

    if (this.canEnterHex (newX1, newY1, newX2, newY2))
    {
      this.x  = newX1;
      this.y  = newY1;        
      this.x2 = newX2;
      this.y2 = newY2;     
      this.orientation = newOrientation;
      this.moveFL();
      this.doPostMovementActions ()  
    }
  }  
  

  canEnterHex (x1, y1, x2, y2)
  {
    if (this.enemyUnitsInHex (x1 ,y1) || this.enemyUnitsInHex (x2, y2))
    {
      return false;    
    }  
    else 
    {
      return true;
    }
  }
  

  doPostMovementActions ()
  {
    this.updateMovementStatus ("isMoving");
    this.marker.updateActionMenu ();

    this.changeMovingLeader ();

    this.recalcZOrder ();
    
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }  
  
  
  pushDown ()
  {
    // if already at bottom of the stack, do nothing
    if (this.zOrder == mapZOrder + 1)
    {
      return;    
    }    
         
    const z = this.zOrder;
    
    // Find the leader l with l.zOrder == this.zOrder - 1;
    for (let l of unitMap.entries ())
    {
      if (l[1].x == this.x && l[1].y == this.y && this.playerId == l[1].playerId && this.leaderId != l[1].leaderId && l[1].zOrder == (this.zOrder - 1)) 
      {
        l[1].setZOrder (z);
        this.setZOrder (z - 1);
        
        return;
      }
    }
  }  
  

  pushUp ()
  {
    const z = this.zOrder;
    
    // Find the leader l with l.zOrder == this.zOrder + 1;
    for (let l of unitMap.entries ())
    {
      if (l[1].x == this.x && l[1].y == this.y && this.playerId == l[1].playerId && this.leaderId != l[1].leaderId && l[1].zOrder == (this.zOrder + 1)) 
      {
        l[1].setZOrder (z);
        this.setZOrder (z + 1);
        
        return;
      }
    }
  }
  
  
  toBottomOfStack ()
  {
    let z = mapZOrder + 1;

    this.setZOrder (z);
    z++;    
    
    for (let l of unitMap.entries ())
    {
      if (l[1].x == this.x && l[1].y == this.y && this.playerId == l[1].playerId && this.leaderId != l[1].leaderId) 
      {
        l[1].setZOrder (z);
        z++;           
      }   
    }
  }
 
  
  toTopOfStack ()
  {
    let z = mapZOrder + 1;
    
    for (let l of unitMap.entries ())
    {
      if (l[1].x == this.x && l[1].y == this.y && this.playerId == l[1].playerId && this.leaderId != l[1].leaderId) 
      {
        l[1].setZOrder (z);
        z++;           
      }   
    }
    
    this.setZOrder (z);    
  }
 

  // Returns true if this leader is near an enemy unit
  nearEnemy () 
  {
    for (let l of theGame.players[theGame.currentPlayer].leaders.entries ()) 
    {
      const distanceSquared = distanceSquareInUnitCoords (
        xMapCoordFromUnitCoord (l[1].x, l[1].y),
        yMapCoordFromUnitCoord (l[1].x, l[1].y),
        yMapCoordFromUnitCoord (this.x, this.y), 
        xMapCoordFromUnitCoord (this.x, this.y)
      );
        
      if (distanceSquared < visibilityRadiusSquared) 
      {
        return true;
      }
    }
    
    return false;  
  }  
  

  // Returns an array of enemy leaders within visibility range
  enemiesWithinVisibilityRange () 
  {
    let result = [];

    for (let l of theGame.leaders.values ()) 
    {
      if (l.playerId == this.playerId)
      {
        continue;      
      }
      
      let d = [];

      d[0] = distanceSquareInUnitCoords 
      (
        xMapCoordFromUnitCoord (l.x, l.y),
        yMapCoordFromUnitCoord (l.x, l.y),
        xMapCoordFromUnitCoord (this.x, this.y), 
        yMapCoordFromUnitCoord (this.x, this.y)
      );

      d[1] = distanceSquareInUnitCoords 
      (
        xMapCoordFromUnitCoord (l.x2, l.y2),
        yMapCoordFromUnitCoord (l.x2, l.y2),
        xMapCoordFromUnitCoord (this.x, this.y), 
        yMapCoordFromUnitCoord (this.x, this.y)
      );

      d[2] = distanceSquareInUnitCoords 
      (
        xMapCoordFromUnitCoord (l.x, l.y),
        yMapCoordFromUnitCoord (l.x, l.y),
        xMapCoordFromUnitCoord (this.x2, this.y2), 
        yMapCoordFromUnitCoord (this.x2, this.y2)
      );

      d[3] = distanceSquareInUnitCoords 
      (
        xMapCoordFromUnitCoord (l.x2, l.y2),
        yMapCoordFromUnitCoord (l.x2, l.y2),
        xMapCoordFromUnitCoord (this.x2, this.y2), 
        yMapCoordFromUnitCoord (this.x2, this.y2)
      );


      // Find the minimum distance
      let minDistance = 10000;
      for (let i = 0; i < d.length; i++)
      {
        if (d[i] < minDistance)
        {
          minDistance = d[i];
        }
      }
        
      if (minDistance < visibilityRadiusSquared) 
      {
        result.push (l);
      }
    }
    
    return result;  
  }


  drawEnemiesWithinVisibilityRange () 
  {
    const enemyLeaders = this.enemiesWithinVisibilityRange ();
    
    for (let el of enemyLeaders) 
    {
      el.draw ();
    }
  }



  numberOfFriendlyUnitsInHex (x, y)
  {
    let result = 0;
    
    for (let l of unitMap.values ())
    {
      if (l.x == x && l.y == y && this.playerId == l.playerId) 
      {
        result++;      
      }   
    }    
    
    return result;
  }


  enemyUnitsInHex (x, y)
  {
    let result = false;
    
    for (let l of unitMap.values ())
    {
      if (this.playerId != l.playerId && ((l.x == x && l.y == y) || (l.x2 == x && l.y2 == y)))
      {
        result = true;
        break;      
      }   
    }    
    
    return result;
  }


  // The leader that has just entered a hex gets the higher zOrder
  recalcZOrder ()
  {
    const n = this.numberOfFriendlyUnitsInHex (this.x, this.y)
    
    this.zOrder = mapZOrder + n + 1;
  }
  

  getMC ()
  {
    if (this.totalMC >= 2)
    {
      alert ("General " + this.name + " has already received 2 Movement Commands\nCannot receive more MCs");
      return;    
    }
    
    this.numOfMovCommands = this.army.issueMovementCommand ();
    this.army.draw ();
    this.updateMovementStatus ('hasMC');
    this.marker.updateActionMenu ();
  }  
  
  
  getProvisionalMC ()
  {
    if (this.numOfProvisionalMC >= 0)
    {
      alert ("General " + this.name + " has already received a Provisional Movement Command\nCannot receive any more Provisional MC");
      return;    
    }
    
    this.provisionalMCs = this.army.issueMovementCommand ();
    this.army.draw ();
    this.updateMovementStatus ("hasProvisionalMC");
    this.marker.updateActionMenu ();
  }  


  tryToActivate ()
  {
    const maxDieRoll = this.initiative + (this.numOfProvisionalMC > 0 ? 2 : 0);

    const dieRoll = Controller.getDieRoll();

    if (dieRoll < maxDieRoll)
    {
      this.updateMovementStatus ("activationOK");
      alert ("Activation successful (die roll=" + dieRoll + ")");
    }
    else
    {
      this.updateMovementStatus ("activationKO");
      alert ("Activation failed (die roll=" + dieRoll + ")");
    }

    this.marker.updateActionMenu ();
  }  
} // End of Class


  




