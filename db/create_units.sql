CREATE VIEW Units AS 
SELECT 
	SD.id AS id,
    SD.name AS name,
    SD.commander AS commander,
    SD.nation AS nation,
    SD.size AS size,
    SD.type AS type,
    DD.gameId AS gameId,
    DD.unitId AS unitId,
    DD.commandedBy AS commandedBy,
    DD.strength AS strength,
    N.playerId AS playerId 
FROM
    Units_Static_Data SD, Units_Dynamic_Data DD, Nations_Static_Data N
WHERE 
	SD.id = DD.unitId 
    AND 
    SD.nation = N.id;
