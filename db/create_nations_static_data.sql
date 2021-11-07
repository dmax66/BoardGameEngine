CREATE TABLE `Nations_Static_Data` (
  `id` varchar(2) NOT NULL,
  `name` varchar(15) NOT NULL,
  `adjective` varchar(15) NOT NULL,
  `playerId` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_players_idx` (`playerId`),
  CONSTRAINT `fk_players` FOREIGN KEY (`playerId`) REFERENCES `Players_Static_Data` (`Symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
