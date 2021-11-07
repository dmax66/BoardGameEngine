CREATE TABLE `Nations_Dynamic_Data` (
  `nationId` varchar(2) NOT NULL,
  `gameId` int NOT NULL,
  `cavReplacementPoints` int DEFAULT '0',
  `infReplacementPoints` int DEFAULT '0',
  `artReplacementPoints` int DEFAULT NULL,
  PRIMARY KEY (`nationId`,`gameId`),
  KEY `game_fk_idx` (`gameId`),
  CONSTRAINT `game_fk` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `nation_fk` FOREIGN KEY (`nationId`) REFERENCES `Nations_Static_Data` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
