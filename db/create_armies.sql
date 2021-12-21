CREATE VIEW Armies AS 
SELECT 
        SD.armyId,
        SD.playerId,
        DD.gameId,
        SD.name,
        DD.adminPoints,
        DD.COP_x,
        DD.COP_y,
        DD.COP_isActive,
        DD.COP_turnToReactivate,
        DD.SS_x,
        DD.SS_y,
        DD.SS_isActive
FROM 
        Armies_Static_Data SD, Armies_Dynamic_Data DD 
WHERE
        SD.armyId = DD.armyId;
