CREATE ALGORITHM=UNDEFINED DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER VIEW `Armies` AS select `SD`.`symbol` AS `symbol`,`SD`.`name` AS `name`,`SD`.`playerId` AS `playerId`,`DD`.`armyId` AS `armyId`,`DD`.`gameId` AS `gameId`,`DD`.`adminPoints` AS `adminPoints`,`DD`.`COP_X` AS `COP_X`,`DD`.`COP_Y` AS `COP_Y` from (`Armies_Static_Data` `SD` join `Armies_Dynamic_Data` `DD`) where (`SD`.`symbol` = `DD`.`armyId`);
