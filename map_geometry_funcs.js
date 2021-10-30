'use strict';

const hexAround = [
  { 
    direction: "E",
    offset: [ 
      { x:  1, y: 0 },   // When on even y
      { x:  1, y: 0 }    // When on odd y
    ]
  },
  
  { 
    direction: "SE",
    offset: [ 
      { x:  0, y: 1 },   // When on even y
      { x:  1, y: 1 }    // When on odd y
    ]
  },
  
  { 
    direction: "SW",
    offset: [ 
      { x: -1, y: 1 },   // When on even y
      { x:  0, y: 1 }    // When on odd y
    ]
  },
  
  { 
    direction: "W",
    offset: [ 
      { x: -1, y: 0 },   // When on even y
      { x: -1, y: 0 }    // When on odd y
    ]
  },
  
  { 
    direction: "NW",
    offset: [ 
      { x: -1, y: -1 },   // When on even y
      { x:  0, y: -1 }    // When on odd y
    ]
  },
  
  { 
    direction: "NE",
    offset: [ 
      { x: 0, y: -1 },   // When on even y
      { x: 1, y: -1 }    // When on odd y
    ]
  }
];


// Returns an index [0-5] corresponding to 'orientation' that points to an entry in hexAround
function findIndexOf (orientation) {
  let i = 0;
  for (i = 0; i < hexAround.length; i++)
    if (hexAround.direction == orientation)
      return i;
      
  if (i == hexAround.length) {
    throw ("Invalid orientation");
    return -1;
  }
}


function orientationPrev (orientation)
{
  let i = orientation - 1;

  if (i < 0)
    i += hexAround.length;
    
  return i;
}


function orientationNext (orientation)
{
  let i = orientation + 1;

  if (i >= hexAround.length)
    i -= hexAround.length;
    
  return i;
}


// Return the opposite orientation of 'orientation'
function orientationOpposite (orientation) {
  let i = orientation + 3;
  if (i >= hexAround.length)
    i -= hexAround.length;
    
  return i;
}


// Returns the x offset to move to 'orientation'
function xOffset (orientation, isOddRow) {
  return hexAround[orientation].offset[isOddRow].x;
}
    
// Returns the x offset to move to 'orientation'
function yOffset (orientation, isOddRow) {
  return hexAround[orientation].offset[isOddRow].y;
}

    
const lineDrawInfo = [
  {
    orientation: "E",
    angle: 0,
    xOffset: -49,
    yOffset: 6
  },
  
  {
    orientation: "SE",
    angle: 60,
    xOffset: -38, 
    yOffset: -8
  },
  
  {
    orientation: "SW",
    angle: 120,
    xOffset: -23,
    yOffset: -10
  },
  
  {
    orientation: "W",
    angle: 180,
    xOffset: -15,   
    yOffset: 4
  },
  
  {
    orientation: "NW",
    angle: 240,
    xOffset: -21,
    yOffset: 20
  },
  
  {
    orientation: "NE",
    angle: -60,
    xOffset: -38, 
    yOffset: 22
  }  
];


const columnDrawInfo = [
  {
    orientation: "E",
    angle: 0,
    xOffset: -49,
    yOffset: 6
  },
  
  {
    orientation: "SE",
    angle: 60,
    xOffset: -38, 
    yOffset: -8
  },
  
  {
    orientation: "SW",
    angle: 120,
    xOffset: -23,
    yOffset: -10
  },
  
  {
    orientation: "W",
    angle: 180,
    xOffset: -15,   
    yOffset: 4
  },
  
  {
    orientation: "NW",
    angle: 240,
    xOffset: -21,
    yOffset: 20
  },
  
  {
    orientation: "NE",
    angle: -60,
    xOffset: -38, 
    yOffset: 22
  }  
];
  
 
const hexWidth = 34;
const hexHeight = 30;  

// Return the absolute x coordinate of the centre of the hex of coordinate unitX, unitY
function xMapCoordFromUnitCoord (unitX, unitY)
{
  if ((unitY % 2) == 0)
    return Math.floor ((unitX + 0.5) * hexWidth);
  else
    return (1 + unitX) * hexWidth;
}

// Return the absolute y coordinate of the centre of the hex of coordinate unitX, unitY
function yMapCoordFromUnitCoord (unitX, unitY)
{
  return hexHeight * unitY;
}

function xUnitCoordFromMapCoord (mapX, mapY)
{
  var y = Math.floor (mapY / hexHeight);
  if ((y % 2) == 0)
    return Math.floor (mapX / hexWidth);
  else
    return Math.floor (mapX / hexWidth - 0.5);
}

function yUnitCoordFromMapCoord (mapX, mapY)
{
  return Math.floor (mapY / hexHeight);
}


function secondHex (firstHex, mode, orientation) {
}




function line2ndHex (firstHex, orientation) {
  let result = { x:firstHex.x, y:firstHex.y };
  
  result.x += lineMovementInfo[orientation].uTurn.offset[firstHex.y % 2].x;
  result.y += lineMovementInfo[orientation].uTurn.offset[firstHex.y % 2].y;

  return result;
}

function column2ndHex (firstHex, orientation) {
  let result = { x:firstHex.x, y:firstHex.y };
  
  result.x += columnMovementInfo[orientation].uTurn.offset[firstHex.y % 2].x;
  result.y += columnMovementInfo[orientation].uTurn.offset[firstHex.y % 2].y;

  return result;
}

function sixHexesAround (centerHex) {
  let result = [];
  const isOddRow = centerHex.y % 2;
  
  for (let i=0; i < hexAround.length; i++) {
    let newHexCoords = { x:centerHex.x, y:centerHex.y};
     
    newHexCoords.x += hexAround[i].offset[isOddRow].x; 
    newHexCoords.y += hexAround[i].offset[isOddRow].y; 
    result.push (newHexCoords); 
  }
  return result;
}


// Return the set of hexes surrounding the given hex within radius. 
// Center hex is not returned
// The resulting set doesn't contain duplicates
//

function hexSetAround (centerHex, radius) {
  return _hexSetAroundIterative (centerHex, radius, []);
}



function _hexSetAroundIterative (centerHex, radius, dummy) {
  let result = [centerHex];
  let i = 0;

  while (i < result.length) {
    var temp = sixHexesAround (result[i]);

    // Termination clause: the distance from the sixHexAround[0] and centerHex > radius
    if (temp[0].x - centerHex.x > radius) {
      break;
    } 
    
    for (let j=0; j < temp.length; j++) {
      if (!isInSet (temp[j], result)) {
        result.push (temp[j]);      
      }    
    }
               
    i++;
  }

  return result;
}




function _hexSetAroundRecursive (centerHex, radius, result) {
  let t1 = [];
  
  if (radius == 0)
    return [];
    
  if (radius == 1) {
    t1 = sixHexesAround (centerHex);
      
    const newSet = addElemToArrayWODuplicates (t1, result);

    return newSet;
  }
  else {      // Radius >= 2
    t1 = sixHexesAround (centerHex);
    
    let newSet = addElemToArrayWODuplicates (t1, result);

    for (var i=0; i < t1.length; i++) {
      t1 = _hexSetAroundRecursive (t1[i], radius - 1, result);       
      addElemToArrayWODuplicates (t1, result);
    }
    
    return result;
  }
}


function isInSet (elem, set) {
  for (let i=0; i<set.length; i++)
    if (elem.x == set[i].x && elem.y == set[i].y)
      return true;
      
  return false;
}


// Add a set of hexes (newSet) to result, avoiding duplicates 
function addElemToArrayWODuplicates (newSet, result) {
  for (let i=0; i < newSet.length; i++)
    if (!isInSet (newSet[i], result))
      result.push (newSet[i]);
      
  return result;
}

