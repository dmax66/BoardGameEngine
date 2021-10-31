CREATE TABLE `Scenario_Units_Data` (
  `Scenario_ID` varchar(10) NOT NULL,
  `id` varchar(10) NOT NULL,
  `commandedBy` varchar(10) NOT NULL,
  `strength` int NOT NULL,
  `entryTurn` int DEFAULT NULL,
  `exitTurn` varchar(45) DEFAULT NULL,
  KEY `fk_Scenario_Units_Data_Units_Static_Data1_idx` (`id`),
  KEY `fk_Scenario_Units_Data_Scenarios1` (`Scenario_ID`),
  CONSTRAINT `fk_Scenario_Units_Data_Scenarios1` FOREIGN KEY (`Scenario_ID`) REFERENCES `Scenarios` (`ID`),
  CONSTRAINT `fk_Scenario_Units_Data_Units_Static_Data1` FOREIGN KEY (`id`) REFERENCES `Units_Static_Data` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
