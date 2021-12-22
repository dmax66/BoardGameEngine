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
    this.armyName           = json_data.armyName;
    this.initiative         = 1 * json_data.initiative;
    this.hasBonus           = (json_data.hasBonus == 1 ? true : false);
    this.commandCapacity    = 1 * json_data.commandCapacity;
    this.subordinationValue = 1 * json_data.subordinationValue;
    this.type               = json_data.type;
    this.orientation        = 1 * json_data.orientation;
    this.mode               = json_data.mode;
    this.x                  = 1 * json_data.X;
    this.y                  = 1 * json_data.Y;
    this.parentId           = json_data.parentId;
    this.parent             = null;
    this.units              = new Map ();
    this.subordinates       = new Map ();
    this.player             = null;
    this.marker = new LeaderMarker (this.leaderId, this.name, this.type, this.nationId);
    
    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    this.marker.setMode (this.mode);
    this.marker.setZOrder (this.zOrder);

    unitMap.set (this.leaderId, this);
    
    this.setZOrder (1 * json_data.zOrder);
    this.updateBalloonInfo();
  }
    
  setPlayer (player) {
    this.player = player;
  }

    
  static _possibleActions = [
    { action: "Flip Line-Column",      filter: ['c', 'l'],   func: function(aLeader) { aLeader.flipMode(); }},
    { action: "Rotate clockwise",      filter: ['l'],        func: function(aLeader) { aLeader.rotateCW(); }},
    { action: "Rotate anti-clockwise", filter: ['l'],        func: function(aLeader) { aLeader.rotateCCW(); }},
    { action: "Flip direction",        filter: ['c', 'l'],   func: function(aLeader) { aLeader.uTurn(); }},
    { action: "Move forward-left",     filter: ['c', 'l'],   func: function(aLeader) { aLeader.moveFL(); }},
    { action: "Move forward",          filter: ['c'],        func: function(aLeader) { aLeader.moveF(); }},
    { action: "Move forward-right",    filter: ['c', 'l'],   func: function(aLeader) { aLeader.moveFR(); }},
    { action: "To bottom of stack",    filter: ['c', 'l'],   func: function(aLeader) { aLeader.toBottomOfStack(); }},
    { action: "To top of stack",       filter: ['c', 'l'],   func: function(aLeader) { aLeader.toTopOfStack(); }},
    { action: "Push down",             filter: ['c', 'l'],   func: function(aLeader) { aLeader.pushDown(); }},
    { action: "Push up",               filter: ['c', 'l'],   func: function(aLeader) { aLeader.pushUp(); }},
    { action: "Manage units",          filter: ['c', 'l'],   func: function(aLeader) {  }}
  ];


  possibleActions ()
  {
    let result = [];
    
    for (let a of Leader._possibleActions)
    {
      if (a.filter.includes (this.mode))
      {
        result.push (a);      
      }    
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
    this.marker.setZOrder (this.zOrder);
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
    this.units.delete (unitId)
 
    this.updateBalloonInfo ();
  }
  
  
  // subordinate is an instance of class Leader
  // Returns true if success, false if there's an error
  addSubordinate (subordinate) 
  {
    // Sanity check #1: check that it is not referencing itself
    if (this.leaderId == subordinate.leaderId) {
      throw ("Unit.addSubordinate: trying to add leader to itself");
      return false;
    }
    
    // Sanity check #2: they must be of the same playerId
    if (this.playerId != subordinate.playerId) {
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
    if (this.leaderId == parent.leaderId) {
      throw ("Unit.addSubordinate: trying to add leader to itself");
      return false;
    }
    
    // Sanity check #2: they must be of the same playerId
    if (this.playerId != parent.playerId) {
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

  
  flipMode () 
  {
    if (this.mode == "l") { 
      this.mode = "c";
    }
    else if (this.mode == "c")
    {
      this.mode = "l";
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
      
    this.marker.setMode (this.mode);
    this.draw();
  }
  

  moveFL () {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    switch (this.mode) {
      case "l": 
        // Orientation remains the same
        // The correct offsets are those corresponding to ( current orientation - 2)
        const newOrientation = orientationPrev (orientationPrev (curOrientation)); 
        this.x += xOffset (newOrientation, isOddRow);
        this.y += yOffset (newOrientation, isOddRow);
        break;
         
      case "c":
        this.orientation = orientationPrev (curOrientation);
        this.x += xOffset (this.orientation, isOddRow);
        this.y += yOffset (this.orientation, isOddRow);
        break;
         
        default:
          throw ("Invalid orientation in moveFL:" + this.mode);
    }

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    this.recalcZOrder ();
        
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  

  moveF () {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    switch (this.mode) {
      case "l":
        // Not applicable to line mode 
        break;
         
      case "c":
        this.x += xOffset (this.orientation, isOddRow);
        this.y += yOffset (this.orientation, isOddRow);
        break;
         
        default:
          throw ("Invalid orientation in moveFL:" + this.mode);
    }

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    this.recalcZOrder ();
        
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  

  moveFR () {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    
    switch (this.mode) {
      case "l": 
        // Orientation remains the same
        // The correct offsets are those corresponding to (current orientation - 1)
        const newOrientation = orientationPrev (curOrientation); 
        this.x += xOffset (newOrientation, isOddRow);
        this.y += yOffset (newOrientation, isOddRow);
        break;
         
      case "c":
        this.orientation = orientationNext (curOrientation);
        this.x += xOffset (this.orientation, isOddRow);
        this.y += yOffset (this.orientation, isOddRow);
        break;
         
      default:
        throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    this.recalcZOrder ();
        
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  

  uTurn () {
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

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    this.recalcZOrder ();
        
    this.draw();
  }
  
  
  rotateCW () {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    

    switch (this.mode)
    {
      case "l":
        this.orientation = orientationNext (curOrientation);
        break;
        
      case "c":
        break;
        
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
    this.recalcZOrder ();
        
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  
  
  rotateCCW () {
    const curOrientation = this.orientation;
    const isOddRow = this.y % 2;
    

    switch (this.mode)
    {
      case "l":
        this.orientation = orientationPrev (curOrientation);
        this.x += xOffset (this.orientation, isOddRow);
        this.y += yOffset (this.orientation, isOddRow);
        this.moveFL();
        break;
        
      case "c":
        break;
        
      default:
          throw ("Invalid stack mode in moveFL:" + this.mode);
    }

    this.marker.setPosition (this.x, this.y);
    this.marker.setOrientation (this.orientation);
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
 
 
  // IS IT CORRECT???? 
  nearEnemy () 
  {
    const numOtherLeaders = theGame.players[theGame.currentPlayer].leaders.length; 

    for (let l of theGame.players[theGame.currentPlayer].leaders) 
    {
      const distanceSquared = distanceSquareInUnitCoords (
        xMapCoordFromUnitCoord (l.x, l.y),
        yMapCoordFromUnitCoord (l.x, l.y),
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
  

  // Returns an array of Leader
  enemiesWithinVisibilityRange () 
  {
    let result = [];

    for (let l of theGame.leaders) 
    {
      if (l.player.playerId == this.player.playerId)
      {
        continue;      
      }
      
      const distanceSquared = distanceSquareInUnitCoords (
        xMapCoordFromUnitCoord (l.x, l.y),
        yMapCoordFromUnitCoord (l.x, l.y),
        yMapCoordFromUnitCoord (this.x, this.y), 
        xMapCoordFromUnitCoord (this.x, this.y)
      );
        
      if (distanceSquared < visibilityRadiusSquared) 
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
    
    for (let l of unitMap.entries ())
    {
      if (l[1].x == x && l[1].y == y && this.playerId == l[1].playerId) 
      {
        result++;      
      }   
    }    
    
    return result;
  }


  enemyUnitsInHex (x, y)
  {
    let result = false;
    
    for (let l of unitMap.entries ())
    {
      if (l[1].x == x && l[1].y == y && this.playerId != l[1].playerId) 
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
    this.marker.setZOrder (this.zOrder);
  }
  
  
} // End of Class


  




