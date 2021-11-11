'use strict';


let leaders = [];
const numLeadersInSameHex=1;







class Leader {
  constructor (json_data) {
    this.id                 = json_data.id;
    this.parentId           = json_data.parentId;
    this.name               = json_data.name;
    this.nation             = json_data.nation;
    this.player             = json_data.player;
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
    
    this.widget = new UI_LeaderWidget (this.id, this.name, this.type, this.nation)
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
    { action: "Manage units",          func: function(aLeader) {  }}
  ];




  //
  // Returns i, where leaders[i].id == leaderId 
  //
  static findById (leaderId) {
    for (let k = 0; k < theGame.players[theGame.currentPlayer].leaders.length; k++) {
      if (theGame.players[theGame.currentPlayer].leaders[k].id == leaderId) {
        return k;
      }
    }

   return (-1);
  }


  findUnit (unitId) {
    var i;
  
    for (i=0; i < this.units.length; i++)
      if (this.units[i].id == unitId)
        return i;
  
    return undefined;
  }


  addUnit (aUnit) {
    aUnit.parent = this;
    this.units.push (aUnit);
  }

  // Remove the unit identified by unitId. Returns the unit itself
  removeUnit (unitId) {
    if (this.units.length == 0) throw ("Cannot remove unit from a leader with no units");
    
    var unitIndex = this.findUnit (unitId);
    if (unitIndex != undefined)
    {
      var unit = this.units.splice (unitIndex, 1);
      unit.parent = undefined;
      return unit;
    }
    else
    {
      console.log ("Warning: Leader.prototype.removeUnit: unit not found");
      return undefined;
    }
  }
  
  
  // Return the strength of all controlled units (both directly and indirectly) of type t
  strength (t) {
    let s = 0;
    
    // Units directly commanded
    for (let i = 0; i < theGame.players[theGame.currentPlayer].units.length; i++)
      if (theGame.players[theGame.currentPlayer].units[i].commandedBy == this.id && theGame.players[theGame.currentPlayer].units[i].type == t)
          s += 1 * theGame.players[theGame.currentPlayer].units[i].strength;  // Force conversion to number

    // Subordinate Leaders
    for (let i = 0; i < theGame.players[theGame.currentPlayer].leaders.length; i++)
      if (theGame.players[theGame.currentPlayer].leaders[i].parent == this.id)
          s += theGame.players[theGame.currentPlayer].leaders[i].strength(t);

    return s;
  }


  draw () {
    this.widget.draw (this.mode, this.orientation, this.x, this.y, this.zOrder);
  }
  
  hide () {
    this.widget.hide ();  
  }
  
  flipMode () {
    if (this.mode == "l") { 
      this.mode = "c";
    }
    else if (this.mode == "c")
    {
      this.mode = "l";
    }
    else 
      throw ("Invalid stack mode: " + this.mode);
      
    this.draw();
  }

  moveFL () {
    const curOrientation = 1*this.orientation;
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

    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }

  moveF () {
    const curOrientation = 1*this.orientation;
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

    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }

  moveFR () {
    const curOrientation = 1*this.orientation;
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

    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }

  uTurn () {
    const curOrientation = 1*this.orientation;
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

    this.draw();
  }
  
  rotateCW () {
    const curOrientation = 1*this.orientation;
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

    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }
  
  rotateCCW () {
    const curOrientation = 1*this.orientation;
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

    this.draw();
    this.drawEnemiesWithinVisibilityRange();
  }  
  
  nearEnemy () {
    const numOtherLeaders = theGame.players[theGame.currentPlayer].leaders.length; 

    for (let i = 0; i < numOtherLeaders; i++) {
      const distanceSquared = distanceSquareInUnitCoords (
        xMapCoordFromUnitCoord (theGame.players[theGame.currentPlayer].leaders[i].x, theGame.players[theGame.currentPlayer].leaders[i].y),
        yMapCoordFromUnitCoord (theGame.players[theGame.currentPlayer].leaders[i].x, theGame.players[theGame.currentPlayer].leaders[i].y),
        yMapCoordFromUnitCoord (this.x, this.y), 
        xMapCoordFromUnitCoord (this.x, this.y)
      );
        
      if (distanceSquared < visibilityRadiusSquared) {
        return true;
      }
    }
    
    return false;  
  }  
  

  // Returns an array of Leader
  enemiesWithinVisibilityRange () {
    let result = [];
    const otherPlayer = theGame.otherPlayer ();
    const numOtherLeaders = theGame.players[otherPlayer].leaders.length; 

    for (let i = 0; i < numOtherLeaders; i++) {
    
      const distanceSquared = distanceSquareInUnitCoords (
        xMapCoordFromUnitCoord (theGame.players[otherPlayer].leaders[i].x, theGame.players[otherPlayer].leaders[i].y),
        yMapCoordFromUnitCoord (theGame.players[otherPlayer].leaders[i].x, theGame.players[otherPlayer].leaders[i].y),
        yMapCoordFromUnitCoord (this.x, this.y), 
        xMapCoordFromUnitCoord (this.x, this.y)
      );
        
       if (distanceSquared < visibilityRadiusSquared) {
        result.push (theGame.players[otherPlayer].leaders[i]);
      }
    }
    
    return result;  
  }

  drawEnemiesWithinVisibilityRange () {
    const enemyLeaders = this.enemiesWithinVisibilityRange ();
    
    for (let i=0; i < enemyLeaders.length; i++) {
      enemyLeaders[i].draw ();
    }
  }

} // End of Class


  




