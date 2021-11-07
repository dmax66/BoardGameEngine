CREATE VIEW `Leaders` AS 
SELECT`SD`.`id` AS `id`,`SD`.`name` AS `name`,`SD`.`nation` AS `nation`,`SD`.`player` AS `player`,`SD`.`armyName` AS `armyName`,`SD`.`unitName` AS `unitName`,`SD`.`type` AS `type`,`SD`.`initiative` AS `initiative`,`SD`.`hasBonus` AS `hasBonus`,`SD`.`commandCapacity` AS `commandCapacity`,`SD`.`subordinationValue` AS `subordinationValue`,`DD`.`gameId` AS `gameId`,`DD`.`leaderId` AS `leaderId`,`DD`.`X` AS `X`,`DD`.`Y` AS `Y`,`DD`.`orientation` AS `orientation`,`DD`.`mode` AS `mode`,`DD`.`parentId` AS `parentId`,`DD`.`zOrder` AS `zOrder` 
FROM `Leaders_Static_Data` `SD`, `Leaders_Dynamic_Data` `DD`
WHERE (`SD`.`id` = `DD`.`leaderId`);
