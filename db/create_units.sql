CREATE VIEW Units AS 
SELECT 
    DD.gameId,
    SD.unitId,
    N.playerId,
    N.nationId,
    SD.name,
    SD.commander,
    SD.size,
    SD.type,
    DD.strength,
    DD.commandedBy,
    DD.isActive
FROM
    Units_Static_Data SD, Units_Dynamic_Data DD, Nations_Static_Data N
WHERE 
    SD.unitId = DD.unitId 
    AND 
    SD.nationId = N.nationId
