CREATE VIEW Leaders AS 
SELECT
  DD.gameId,
  DD.leaderId,
  SD.playerId,
  SD.nationId,
  SD.armyId,
  SD.name,
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
