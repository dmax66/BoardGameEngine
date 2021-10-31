CREATE TABLE `Scenario_Leaders_Data` (
  `Scenario_ID` varchar(10) NOT NULL,
  `id` varchar(10) NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `orientation` varchar(2) NOT NULL,
  `mode` varchar(8) NOT NULL,
  `parentId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Scenario_ID`,`id`),
  KEY `fk_Scenario_Leaders_Data_Leaders_Static_Data1_idx` (`id`),
  KEY `fk_2_idx` (`parentId`),
  CONSTRAINT `fk1` FOREIGN KEY (`id`) REFERENCES `Leaders_Static_Data` (`id`),
  CONSTRAINT `fk2` FOREIGN KEY (`parentId`) REFERENCES `Scenario_Leaders_Data` (`id`),
  CONSTRAINT `fk3` FOREIGN KEY (`Scenario_ID`) REFERENCES `Scenarios` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
