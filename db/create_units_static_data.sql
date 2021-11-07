CREATE TABLE `Units_Static_Data` (
  `id` varchar(10) NOT NULL,
  `name` varchar(15) NOT NULL,
  `commander` varchar(20) NOT NULL,
  `nation` varchar(2) NOT NULL,
  `size` varchar(10) NOT NULL COMMENT 'Allowed values: "d", "b", "r"',
  `type` varchar(10) NOT NULL COMMENT 'Allowed values: i, c, a',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
