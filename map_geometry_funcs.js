'use strict';


const lineMovementInfo = [];

lineMovementInfo["N"] = {
  moveForwardLeft: [
    { x: -1, y: -1 },
    { x:  0, y: -1 }
  ],
  moveForwardRight: [
    { x: 0, y: -1 },
    { x: 1, y: -1 }
  ],
  uTurn: {
    newOrientation: "S",
    offset: [
      { x: -1, y: 0}   // When on even x
      { x: -1, y:0 }   // When on odd x
    ]
  },
  flipOrientation: "E";
  nextCW: "NE",
  nextCCW: "NW"
};  

lineMovementInfo["NW"] = {
  moveForwardLeft: [
    { x: -1, y: 0 },
    { x: -1, y: 0 }
  ],
  moveForwardRight: [
    { x: -1, y: -1 },
    { x:  0, y: -1 }
  ],
  uTurn: {
    newOrientation: "SE",
    offset: [
      { x: -1, y: 1 },
      { x:  0, y: 1 }
    ]
  },
  flipOrientation: "NE",
  nextCW: "N",
  nextCCW: "SW"
};

lineMovementInfo["SW"] = {
  moveForwardLeft: [
    { x: , y: 1 },
    { x: , y: 1 }
  ],
  moveForwardRight: [
    { x: -1, y: 0 },
    { x: -1, y: 0 }
  ], 
  uTurn: {
    newOrientation: "NE",
    offset: [
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  },
  flipOrientation: "NW",
  nextCW: "NW",
  nextCCW: "S"
};

lineMovementInfo["S"] = {
  moveForwardLeft: [
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ],
  moveForwardRight: [
    { x: -1, y: 1 },
    { x: 0, y: 1 }
  ],
  uTurn: {
    newOrientation: "N",
    offset: [
      { x: 1, y: 0 },
      { x: 1, y: 0 }
    ]
  },
  flipOrientation: "W",
  nextCW: "SW",
  nextCCW: "SE"
};

lineMovementInfo["SE"] = {
  moveForwardLeft: [
    { x: 1, y: 0 },
    { x: 1, y: 0 }
  ],
  moveForwardRight: [
    { x: 0, y: },
    { x: 1, y: }
  ], 
  uTurn: {
    newOrientation: "NW",
    offset: [
      { x: 0, y: -1},
      { x: 1, y: -1}
    ]
  },
  flipOrientation: "SW",
  nextCW: "S",
  nextCCW: "NE"
};

lineMovementInfo["NE"] = {
  moveForwardLeft: [
    { x: , y: },
    { x: , y: }
  ],
  moveForwardRight: [
    { x: , y: },
    { x: , y: }
  ],
    xOffsetYEven: [0,1],    // index 0 = increment when moving forward left
  xOffsetYOdd: [1,1],    // index 0 = increment when moving forward left
  yOffset: [-1,0],     // index 1 = increment when moving forward right
  uTurn: {
    newOrientation: "SW",
    offset: [
      { x: -1, y: -1},  // Even x
      { x: 0, y: -1}    // Odd x
    ],
  },
  flipOrientation: "SE",
  nextCW: "SE",
  nextCCW: "N"
};

const lineDrawInfo = [];

lineDrawInfo ["N"] = {
  angle: 0,
  xOffset: -29,
  yOffset: 7,

};

lineDrawInfo["NE"] = {
  angle: -300,
  xOffset: -22,
  yOffset: -3,
};

lineDrawInfo["SE"] = {
  angle: -240,
  xOffset: -5,
  yOffset: -7,

};

lineDrawInfo["S"] = {
  angle: -180,
  xOffset: 2,
  yOffset: 3,
};

lineDrawInfo["SW"] = {
  angle: -120,
  xOffset: -3,
  yOffset: 18,
};

lineDrawInfo["NW"] = {
  angle: -60,
  xOffset: -19,
  yOffset: 21,
};


const columnMovementInfo = [];

columnMovementInfo ["NE"] = {
  angle: -60,
  xOffset: -23, 
  yOffset: 22,
  uTurn: {
    newOrientation: "SW",
    xOffsetEven: -1,
    xOffsetOdd: 0,
    yOffset: 1
  },
  flipOrientation: "NW",
  movement: [
    { x: 0, y: -1 },
    { x: 1, y: -1 }
  ],
  nextCW: "E",
  nextCCW: "NW"
};
  
 columnMovementInfo ["E"] = {
  angle: 0,
  xOffset: -29,
  yOffset: 6,
  uTurn: {
    newOrientation: "W",
    xOffsetEven: -1,
    xOffsetOdd: -1,
    yOffset: 0
  },
  flipOrientation: "N",
  movement: [
    { x: 1, y: 0 },
    { x: 1, y: 0 }
  ],
  nextCW: "SE",
  nextCCW: "NE"
};

columnMovementInfo ["SE"] = {
  angle: 60,
  xOffset: -21, 
  yOffset: -8,
  uTurn: {
    newOrientation: "NW",
    xOffsetEven: -1,
    xOffsetOdd: 0,
    yOffset: -1
  },
  flipOrientation: "NE",
  movement: [
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ],
  nextCW: "SW",
  nextCCW: "NE"
};

columnMovementInfo["SW"] = {
  angle: 120,
  xOffset: 0,
  yOffset: -10,
  uTurn: {
    newOrientation: "NE",
    xOffsetEven: 0,
    xOffsetOdd: 1,
    yOffset: -1
  },
  flipOrientation: "SE",
  movement: [
    { x: -1, y: 1 },
    { x:  0, y: 1 }
  ],
  nextCW: "W",
  nextCCW: "SE"
};

columnMovementInfo ["W"] = {
  angle: 180,
  xOffset: 4,   
  yOffset: 4,
  uTurn: {
    newOrientation: "E",
    xOffsetEven: 1,
    xOffsetOdd: 1,
    yOffset: 0
  },
  flipOrientation: "S",
  movement: [
    { x: -1, y: 0 },
    { x: -1. y: 0 }
  ],
  nextCW: "NW",
  nextCCW: "SW"
};

columnMovementInfo ["NW"] = {
  angle: 240,
  xOffset: -4,
  yOffset: 20,
  uTurn: {
    newOrientation: "SE",
    xOffsetEven: 0,
    xOffsetOdd: 1,
    yOffset: 1
  },
  flipOrientation: "SW",
  movement: [
    { x: -1, y: -1 },
    { x:  0, y: -1 }
  ],

  nextCW: "NW",
  nextCCW: "W"
};
  
  

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


