CREATE TABLE `Armies_Dynamic_Data` (
  `armyId` varchar(5) NOT NULL,
  `gameId` int NOT NULL,
  `adminPoints` int NOT NULL DEFAULT '0',
  `COP_x` int NOT NULL DEFAULT '0',
  `COP_y` int NOT NULL DEFAULT '0',
  `COP_isActive` int NOT NULL DEFAULT '1',
  `COP_turnToReactivate` int NOT NULL DEFAULT '-1',
  `SS_x` int NOT NULL DEFAULT '-1',
  `SS_y` int NOT NULL DEFAULT '-1',
  `SS_isActive` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`armyId`,`gameId`),
  KEY `fk_game_idx` (`gameId`),
  CONSTRAINT `fk_army` FOREIGN KEY (`armyId`) REFERENCES `Armies_Static_Data` (`armyId`),
  CONSTRAINT `fk_game3` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
