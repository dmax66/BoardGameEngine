CREATE VIEW Units AS 
SELECT 
    SD.id AS id,
    SD.name AS name,
    SD.commander AS commander,
    SD.nation AS nation,
    SD.size AS size,
    SD.type AS type,
    DD.game_ID AS gameId,
    DD.id AS unitId,
    DD.commandedBy AS commandedBy,
    DD.strength AS strength,
    N.playerId AS playerId 
FROM
    Units_Static_Data SD, Units_Dynamic_Data DD, Nations_Static_Data N
WHERE 
    SD.id = DD.id 
    AND 
    SD.nation = N.id;
