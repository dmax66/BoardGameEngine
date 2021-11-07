CREATE TABLE `Players_Dynamic_Data` (
  `Player` varchar(2) NOT NULL,
  `Game_ID` int NOT NULL,
  `Morale` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Player`,`Game_ID`),
  KEY `fk_game2_idx` (`Game_ID`),
  CONSTRAINT `fk_game2` FOREIGN KEY (`Game_ID`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `fk_player2` FOREIGN KEY (`Player`) REFERENCES `Players_Static_Data` (`Symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
