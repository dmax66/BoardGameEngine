var players = [];
var gameSequenceTracker = 0;
var gameTurn = 0;

var sequenceOfPlay = [
  [ 0, "Command Phase", "Administrative Segment" ],
  [ 0, "Command Phase", "Organization Segment" ],
  [ 0, "Movement Phase", "Movement Command Segment" ],
  [ 0, "Movement Phase", "Individual Initiative Segment" ],
  [ 0, "Movement Phase", "Bridge Segment" ],
  [ 0, "Combat Phase", "Forced March Segment" ],
  [ 0, "Combat Phase", "Battle Resolution Segment" ],
  [ 0, "Combat Phase", "Disorganization and Rally Segment" ],

  [ 1, "Command Phase", "Administrative Segment" ],
  [ 1, "Command Phase", "Organization Segment" ],
  [ 1, "Movement Phase", "Movement Command Segment" ],
  [ 1, "Movement Phase", "Individual Initiative Segment" ],
  [ 1, "Movement Phase", "Bridge Segment" ],
  [ 1, "Combat Phase", "Forced March Segment" ],
  [ 1, "Combat Phase", "Battle Resolution Segment" ],
  [ 1, "Combat Phase", "Disorganization and Rally Segment" ],
];

