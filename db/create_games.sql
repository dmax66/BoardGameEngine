CREATE TABLE `Games` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Scenario_ID` varchar(2) NOT NULL,
  `CurrentTurn` int NOT NULL DEFAULT '1',
  `EndTurn` int NOT NULL,
  `CurrentPlayer` varchar(10) NOT NULL DEFAULT 'french',
  `CurrentSegment` int NOT NULL DEFAULT '0',
  `Weather` varchar(10) NOT NULL,
  `FrenchAdminPoints` int NOT NULL DEFAULT '0',
  `ArmyOfSilesiaAdminPoints` int NOT NULL DEFAULT '0',
  `ArmyOfBohemiaAdminPoints` int NOT NULL DEFAULT '0',
  `ArmyOfTheNorthAdminPoints` int NOT NULL DEFAULT '0',
  `FrenchReinforcementPoints` int NOT NULL DEFAULT '0',
  `FrenchGuardReinforcementPoints` int NOT NULL DEFAULT '0',
  `RussianReinforcementPoints` int NOT NULL DEFAULT '0',
  `PrussianReinforcementPoints` int NOT NULL DEFAULT '0',
  `AustrianReinforcementPoints` int NOT NULL DEFAULT '0',
  `SwedishReinforcementPoints` int NOT NULL DEFAULT '0',
  `FrenchMorale` int NOT NULL DEFAULT '0',
  `AlliedMorale` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
