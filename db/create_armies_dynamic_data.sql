CREATE TABLE `Armies_Dynamic_Data` (
  `armyId` varchar(5) NOT NULL,
  `gameId` int NOT NULL,
  `adminPoints` int NOT NULL DEFAULT '0',
  `COP_X` int NOT NULL DEFAULT '0',
  `COP_Y` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`armyId`,`gameId`),
  KEY `fk_game_idx` (`gameId`),
  CONSTRAINT `fk_army` FOREIGN KEY (`armyId`) REFERENCES `Armies_Static_Data` (`symbol`),
  CONSTRAINT `fk_game3` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
