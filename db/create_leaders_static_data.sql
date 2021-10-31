CREATE TABLE `Leaders_Static_Data` (
  `id` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `nation` varchar(10) NOT NULL,
  `player` int NOT NULL,
  `army` varchar(20) DEFAULT NULL,
  `unitName` varchar(15) NOT NULL COMMENT 'Name of the Corp commanded by the Leader',
  `type` varchar(15) NOT NULL COMMENT 'Allowed values:'' infantry'', ''cavalry''',
  `initiative` varchar(45) NOT NULL,
  `hasBonus` tinyint NOT NULL,
  `commandCapacity` int NOT NULL,
  `subordinationValue` int NOT NULL COMMENT 'How many command points from the CommandSpan of the leader are used',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;