CREATE VIEW Leaders AS 
SELECT
  DD.gameId,
  SD.playerId,
  DD.leaderId,
  SD.nationId,
  SD.name,
  SD.armyName,
  SD.unitName,
  SD.type,
  SD.initiative,
  SD.hasBonus,
  SD.commandCapacity,
  SD.subordinationValue,
  DD.X,
  DD.Y,
  DD.orientation,
  DD.mode,
  DD.parentId,
  DD.zOrder
FROM 
  Leaders_Static_Data SD, Leaders_Dynamic_Data DD
WHERE 
  SD.leaderId = DD.leaderId;
