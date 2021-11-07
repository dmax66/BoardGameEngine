CREATE TABLE `Armies_Static_Data` (
  `symbol` varchar(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `playerId` varchar(2) NOT NULL,
  PRIMARY KEY (`symbol`),
  KEY `fk_player_idx` (`playerId`),
  CONSTRAINT `fk_player` FOREIGN KEY (`playerId`) REFERENCES `Players_Static_Data` (`Symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
