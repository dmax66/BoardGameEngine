CREATE TABLE `Leaders_Dynamic_Data` (
  `game_ID` int NOT NULL,
  `id` varchar(10) NOT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `orientation` varchar(2) DEFAULT NULL,
  `mode` varchar(1) DEFAULT NULL,
  `parentId` varchar(10) DEFAULT NULL,
  `zOrder` int DEFAULT NULL,
  KEY `fk_Leaders_Dynamic_Data_Leaders_Static_Data1_idx` (`id`),
  KEY `fk_games_idx` (`game_ID`),
  CONSTRAINT `fk_games` FOREIGN KEY (`game_ID`) REFERENCES `Games` (`ID`),
  CONSTRAINT `fk_leaders` FOREIGN KEY (`id`) REFERENCES `Leaders_Static_Data` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
