CREATE TABLE `Units_Static_Data` (
  `ID` varchar(10) NOT NULL,
  `Name` varchar(15) NOT NULL,
  `Commander` varchar(20) NOT NULL,
  `Nation` varchar(10) NOT NULL COMMENT 'Allowed values: "french", "russian", "prussian", "german", "swedish", "austrian"',
  `Size` varchar(10) NOT NULL COMMENT 'Allowed values: "division", "brigade"',
  `Type` varchar(10) NOT NULL COMMENT 'Allowed values: infantry, cavalry, artillery\n\n',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
