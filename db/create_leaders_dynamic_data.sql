CREATE TABLE `Leaders_Dynamic_Data` (
  `gameId` int NOT NULL,
  `leaderId` varchar(10) NOT NULL,
  `X` int DEFAULT NULL,
  `Y` int DEFAULT NULL,
  `orientation` varchar(2) DEFAULT NULL,
  `mode` varchar(1) DEFAULT NULL,
  `parentId` varchar(10) DEFAULT NULL,
  `zOrder` int DEFAULT NULL,
  KEY `fk_Leaders_Dynamic_Data_Leaders_Static_Data1_idx` (`leaderId`),
  KEY `fk_games_idx` (`gameId`),
  CONSTRAINT `fk_games` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `fk_leaders` FOREIGN KEY (`leaderId`) REFERENCES `Leaders_Static_Data` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
