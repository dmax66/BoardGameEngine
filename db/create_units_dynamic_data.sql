CREATE TABLE `Units_Dynamic_Data` (
  `game_ID` int NOT NULL,
  `id` varchar(10) NOT NULL,
  `commandedBy` varchar(10) NOT NULL,
  `strength` int NOT NULL,
  `entryTurn` int DEFAULT NULL,
  `exitTurn` int DEFAULT NULL,
  KEY `fk_Game_idx` (`game_ID`),
  KEY `fk_Units_Static_Data_idx` (`id`),
  CONSTRAINT `fk_Game` FOREIGN KEY (`game_ID`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `fk_Units_Static_Data` FOREIGN KEY (`id`) REFERENCES `Units_Static_Data` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
