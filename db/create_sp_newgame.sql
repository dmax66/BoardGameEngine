DELIMITER //

CREATE PROCEDURE createNewGame (IN game_name CHAR(45), IN scenario_id CHAR(10), OUT game_id INT(10))
BEGIN

START TRANSACTION;

INSERT INTO Games (
    name,
    scenarioId,
    currentTurn,
    endTurn,
    currentPlayer,
    currentSegment,
    weather)
SELECT 
		  game_name, 
			scenarioId,  
			startTurn, 
			endTurn, 
      firstPlayer,
			startPhase, 
			weather 
		FROM 
		  Scenarios 
		WHERE 
		  Scenarios.scenarioId = scenario_id;

SET game_id = LAST_INSERT_ID(); 

INSERT INTO Players_Dynamic_Data (
	 playerId,
	 gameId,
	 morale)
SELECT
	 playerId,
	 game_id,
   morale
FROM 
	Scenario_Players_Data
WHERE 
	Scenario_Players_Data.scenarioId = scenario_id;

INSERT INTO Nations_Dynamic_Data (
	nationId,
	gameId,
	cavReplacementPoints,
	infReplacementPoints,
	artReplacementPoints)
SELECT
	nationId,
	game_id,
	cavReplacementPoints,
	infReplacementPoints,
	artReplacementPoints
FROM 
	Scenario_Nations_Data 
    WHERE Scenario_Nations_Data.scenarioId = scenario_id;
    

INSERT INTO Armies_Dynamic_Data (
	armyId,
	gameId,
	adminPoints,
	COP_X,
	COP_Y)
SELECT
	armyId,
    game_id,
    adminPoints,
    COP_X,
    COP_Y
FROM 
	Scenario_Armies_Data
WHERE 
	Scenario_Armies_Data.scenarioId = scenario_id;
	
INSERT INTO Leaders_Dynamic_Data (
    gameId, 
    leaderId, 
    x, 
    y, 
    orientation, 
    mode, 
    parentId) 
  SELECT 
    game_id, 
    leaderId, 
    x, 
    y, 
    orientation, 
    mode, 
    parentId 
  FROM 
    Scenario_Leaders_Data 
  WHERE 
    scenarioId = scenario_id;

INSERT INTO Units_Dynamic_Data (
	gameId,
	unitId,
	commandedBy,
	strength,
	entryTurn,
	exitTurn)
SELECT 
	game_id,
    unitId,
    commandedBy,
    strength,
    entryTurn,
    exitTurn
FROM 
	Scenario_Units_Data
WHERE 
	Scenario_Units_Data.scenarioId = scenario_id;    	

COMMIT;

END//
