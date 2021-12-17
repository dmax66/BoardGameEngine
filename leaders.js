'use strict';


// TODO
const numLeadersInSameHex=1;



class Leader {
  constructor (json_data) {
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
    this.zOrder             = 1 * json_data.zOrder;
    this.parentId           = json_data.parentId;
    this.parent             = null;
    this.units              = [];
    this.subordinates       = [];
    this.player             = null;
    this.widget = new UI_LeaderWidget (this.leaderId, this.name, this.type, this.nationId);
    
    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    this.widget.setMode (this.mode);
    this.widget.setZOrder (this.zOrder);
  }
    
  setPlayer (player) {
    this.player = player;
  }

    
  // Move to the controller
  //
  static possibleActions = [
    { action: "Flip Line-Column",      func: function(aLeader) { aLeader.flipMode(); }},
    { action: "Rotate clockwise",      func: function(aLeader) { aLeader.rotateCW(); }},
    { action: "Rotate anti-clockwise", func: function(aLeader) { aLeader.rotateCCW(); }},
    { action: "Flip direction",        func: function(aLeader) { aLeader.uTurn(); }},
    { action: "Move forward-left",     func: function(aLeader) { aLeader.moveFL(); }},
    { action: "Move forward",          func: function(aLeader) { aLeader.moveF(); }},
    { action: "Move forward-right",    func: function(aLeader) { aLeader.moveFR(); }},
    { action: "To bottom of stack",    func: function(aLeader) { aLeader.toBottomOfStack(); }},
    { action: "To top of stack",       func: function(aLeader) { aLeader.toTopOfStack(); }},
    { action: "Push down",             func: function(aLeader) { aLeader.pushDown(); }},
    { action: "Push up",               func: function(aLeader) { aLeader.pushUp(); }},
    { action: "Manage units",          func: function(aLeader) {  }}
  ];


  //
  // Returns i, where leaders[i].id == leaderId 
  //
  static findById (leaderId) 
  {
    for (let l of theGame.leaders) 
    {
      if (l.leaderId == leaderId) 
      {
        return l;
      }
    }

   return null;
  }


  // Returns an instance of class Unit whose id == unitId
  getUnit (unitId) 
  {
    for (let u of this.units)
    {
      if (u.unitId == unitId)
      {
        return u;
      }
    }
  
    return null;
  }

  
  // Returns the index of the units array whose id == unitId
  findUnit (unitId) {
    for (let i = 0; i < this.units.length; i++)
      if (this.units[i].unitId == unitId)
        return i;
  
    return (-1);
  }
  
  
  // aUnit is an instance of class Unit
  addUnit (aUnit) {
    aUnit.setParent (this);
    this.units.push (aUnit);
  }


  // Remove the unit identified by unitId. Returns the unit itself
  removeUnit (unitId) {
    if (this.units.length == 0) throw ("Cannot remove unit from a leader with no units");
    
    const unitIdx = this.findUnit (unitId);
    if (unitIdx != -1)
    {
      const removedUnits = this.units.splice (unitIndex, 1); 
      const removedUnit = removedUnits[0];                        // unitId is a unique id, so only one unit in the resultset
      
      removedUnit.unsetParent ();
      return removedUnit; 
    }
    else
    {
      console.log ("Warning: Leader.removeUnit: unit not found");
      return null;
    }
  }
  
  
  // subordinate is an instance of class Leader
  // Returns true if success, false if there's an error
  addSubordinate (subordinate) {
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
    
    this.subordinates.push (subordinate);
    subordinate.setParent (this);
    
    return true;
  }  
  

  // parent is an instance of class Leader
  // Returns true if success, false if there's an error
  setParent (parent) {
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
    for (let u of this.units) {
      if (u.type == t) 
      {
        s += 1 * u.strength; 
      }
    }

    // Subordinate Leaders
    for (let sl of this.subordinates) 
    {
      s += sl.strength (t);
    }

    return s;
  }


  draw () 
  {
    this.widget.draw ();
  }
  
  hide () 
  {
    this.widget.hide ();  
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
      
    this.widget.setMode (this.mode);
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

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
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

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
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

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
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

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
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

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
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

    this.widget.setPosition (this.x, this.y);
    this.widget.setOrientation (this.orientation);
    
    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }  
  
  
  pushDown ()
  {
  }  
  
  pushUp ()
  {
  }
  
  toBottomOfStack ()
  {
  }
  
  toTopOfStack ()
  {
  }
 
  // IS IT CORRECT???? 
  nearEnemy () 
  {
    const numOtherLeaders = theGame.players[theGame.currentPlayer].leaders.length; 

    for (let i = 0; i < numOtherLeaders; i++) {
      const distanceSquared = distanceSquareInUnitCoords (
        xMapCoordFromUnitCoord (theGame.players[theGame.currentPlayer].leaders[i].x, theGame.players[theGame.currentPlayer].leaders[i].y),
        yMapCoordFromUnitCoord (theGame.players[theGame.currentPlayer].leaders[i].x, theGame.players[theGame.currentPlayer].leaders[i].y),
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

} // End of Class


  




