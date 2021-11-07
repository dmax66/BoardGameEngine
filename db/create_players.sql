CREATE VIEW Players AS 
SELECT 
	DD.Game_ID AS gameId,
    SD.Symbol AS symbol,
    SD.Name AS name,
    DD.Morale AS morale 
FROM 
	Players_Static_Data SD, Players_Dynamic_Data DD
WHERE 
	SD.Symbol = DD.Player;
