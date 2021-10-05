'use strict';


    
    
const lineMovementInfo = [
  {
    facing: "N",      // Facing of unit when starting the movement
    xOffsetYEven: [-1, 0],    // index 0 = increment when moving forward left
    xOffsetYOdd: [0, 1],    // index 0 = increment when moving forward left
    yOffset: [-1, -1]     // index 1 = increment when moving forward right
  }, 
  {
    facing: "NW",      // Facing of unit when starting the movement
    xOffsetYEven: [-1, -1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [-1,0],    // index 0 = increment when moving forward left
    yOffset: [0, -1]     // index 1 = increment when moving forward right
  },
  {
    facing: "SW",      // Facing of unit when starting the movement
    xOffsetYEven: [-1,-1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [0,-1],    // index 0 = increment when moving forward left
    yOffset: [1, 0]     // index 1 = increment when moving forward right
  },
  {
    facing: "S",      // Facing of unit when starting the movement
    xOffsetYEven: [0,-1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [1,0],    // index 0 = increment when moving forward left
    yOffset: [1, 1]     // index 1 = increment when moving forward right
  },
  {
    facing: "SE",      // Facing of unit when starting the movement
    xOffsetYEven: [1,0],    // index 0 = increment when moving forward left
    xOffsetYOdd: [1,1],    // index 0 = increment when moving forward left
    yOffset: [0,1]     // index 1 = increment when moving forward right
  },
  {
    facing: "NE",      // Facing of unit when starting the movement
    xOffsetYEven: [0,1],    // index 0 = increment when moving forward left
    xOffsetYOdd: [1,1],    // index 0 = increment when moving forward left
    yOffset: [-1,0]     // index 1 = increment when moving forward right
  }
];

const lineDrawInfo = 
[
  {
    facing: "N",
    angle: 0,
    xOffset: -29,
    yOffset: 7,
    flip: {
      newFacing: "S",
      xOffsetEven: -1,
      xOffsetOdd: -1,
      yOffset: 0
    }
  },
  {
    facing: "NE",
    angle: -300,
    xOffset: -22,
    yOffset: -3,
    flip: {
      newFacing: "SW",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: -1
    }
  },
  {
    facing: "SE",
    angle: -240,
    xOffset: -5,
    yOffset: -7,
    flip: {
      newFacing: "NW",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: -1
    }
  },
  {
    facing: "S",
    angle: -180,
    xOffset: 2,
    yOffset: 3,
    flip: {
      newFacing: "N",
      xOffsetEven: 1,
      xOffsetOdd: 1,
      yOffset: 0
    }
  },
  {
    facing: "SW",
    angle: -120,
    xOffset: -3,
    yOffset: 18,
    flip: {
      newFacing: "NE",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: 1
    }
  },
  {
    facing: "NW",
    angle: -60,
    xOffset: -19,
    yOffset: 21,
    flip: {
      newFacing: "SE",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: 1
    }
  }
];


const columnMovementInfo = 
[
  {
    facing: "NE",
    angle: -60,
    xOffset: -23, 
    yOffset: 22,
    flip: {
      newFacing: "SW",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: 1
    },
    movement: {
      xMoveWhenYEven: 0,
      xMoveWhenYOdd: 1,
      yMove: -1
    }
  },
  {
    facing: "E",
    angle: 0,
    xOffset: -29,
    yOffset: 6,
    flip: {
      newFacing: "W",
      xOffsetEven: -1,
      xOffsetOdd: -1,
      yOffset: 0
    },
    movement: {
      xMoveWhenYEven: 1,
      xMoveWhenYOdd: 1,
      yMove: 0
    }
  },
  {
    facing: "SE",
    angle: 60,
    xOffset: -21, 
    yOffset: -8,
    flip: {
      newFacing: "NW",
      xOffsetEven: -1,
      xOffsetOdd: 0,
      yOffset: -1
    },
    movement: {
      xMoveWhenYEven: 0,
      xMoveWhenYOdd: 1,
      yMove: 1
    }

  },
  {     
    facing: "SW",
    angle: 120,
    xOffset: 0,
    yOffset: -10,
    flip: {
      newFacing: "NE",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: -1
    },
    movement: {
      xMoveWhenYEven: -1,
      xMoveWhenYOdd: 0,
      yMove: 1
    }
  },
  {        
    facing: "W",
    angle: 180,
    xOffset: 4,   
    yOffset: 4,
    flip: {
      newFacing: "E",
      xOffsetEven: 1,
      xOffsetOdd: 1,
      yOffset: 0
    },
    movement: {
      xMoveWhenYEven: -1,
      xMoveWhenYOdd: -1,
      yMove: 0
    }
  },
  {
    facing: "NW",
    angle: 240,
    xOffset: -4,
    yOffset: 20,
    flip: {
      newFacing: "SE",
      xOffsetEven: 0,
      xOffsetOdd: 1,
      yOffset: 1
    },
    movement: {
      xMoveWhenYEven: -1,
      xMoveWhenYOdd: 0,
      yMove: -1
    }

  }        
];
  
  

function xMapCoordFromUnitCoord (unitX, unitY)
{
  if ((unitY % 2) == 0)
    return 34*unitX;
  else
    return 17+34*unitX;
}

function yMapCoordFromUnitCoord (unitX, unitY)
{
  return 30*unitY;
}

function xUnitCoordFromMapCoord (mapX, mapY)
{
  var y = Math.floor (mapY / 30);
  if ((y % 2) == 1)
    return Math.floor((mapX-17)/34);
  else
    return Math.floor (mapX / 34);
}

function yUnitCoordFromMapCoord (mapX, mapY)
{
  return Math.floor (mapY / 30);
}


