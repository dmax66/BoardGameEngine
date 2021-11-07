CREATE VIEW Nations AS 
SELECT 
	SD.id AS id, 
    SD.name AS name, 
    SD.adjective AS adjective, 
    SD.playerId AS playerId, 
    DD.nationId AS nationId,
    DD.gameId AS gameId, 
    DD.cavReplacementPoints AS cavReplacementPoints,
    DD.infReplacementPoints AS infReplacementPoints,
    DD.artReplacementPoints AS artReplacementPoints 
FROM 
	Nations_Static_Data SD, Nations_Dynamic_Data DD
WHERE 
	SD.id = DD.nationId;
