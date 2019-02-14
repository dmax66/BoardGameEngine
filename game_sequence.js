var players = [];
var gameSequenceTracker = 0;
var gameTurn = 0;

var sequenceOfPlay = [
  [ "French", "Command Phase", "Administrative Segment" ],
  [ "French", "Command Phase", "Organization Segment" ],
  [ "French", "Movement Phase", "Movement Command Segment" ],
  [ "French", "Movement Phase", "Individual Initiative Segment" ],
  [ "French", "Movement Phase", "Bridge Segment" ],
  [ "French", "Combat Phase", "Forced March Segment" ],
  [ "French", "Combat Phase", "Battle Resolution Segment" ],
  [ "French", "Combat Phase", "Disorganization and Rally Segment" ],

  [ "Allied", "Command Phase", "Administrative Segment" ],
  [ "Allied", "Command Phase", "Organization Segment" ],
  [ "Allied", "Movement Phase", "Movement Command Segment" ],
  [ "Allied", "Movement Phase", "Individual Initiative Segment" ],
  [ "Allied", "Movement Phase", "Bridge Segment" ],
  [ "Allied", "Combat Phase", "Forced March Segment" ],
  [ "Allied", "Combat Phase", "Battle Resolution Segment" ],
  [ "Allied", "Combat Phase", "Disorganization and Rally Segment" ],
];


/* Keeps track of the supply-related info during the game */
var supplyInfo = 
[
  { 
    player: "French", 
    nationality: "French", 
    AP: 0, 
    accumulatedReinforcementPoints: 0
  },
  { 
    player: "Allied", 
    nationality: "Austrian", 
    AP: 0, 
    accumulatedReinforcementPoints: 0
  },
  { 
    player: "Allied", 
    nationality: "Prussian", 
    AP: 0, 
    accumulatedReinforcementPoints: 0
  },
  { 
    player: "Allied", 
    nationality: "Swedish", 
    AP: 0, 
    accumulatedReinforcementPoints: 0
  }
];

