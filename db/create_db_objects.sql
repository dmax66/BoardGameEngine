USE game_engine;

CREATE TABLE IF NOT EXISTS `Calendar` (
  `TurnNumber` int DEFAULT NULL,
  `Days` VARCHAR(10),
  `Season` VARCHAR(10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Leaders_Static_Data` (
  `id` VARCHAR(10) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `nation` VARCHAR(10) NOT NULL,
  `army` VARCHAR(10) NOT NULL,
  `unitName` VARCHAR(15) NOT NULL COMMENT 'Name of the Corp commanded by the Leader',
  `type` VARCHAR(15) NOT NULL COMMENT 'Allowed values: i, c',
  `initiative` VARCHAR(45) NOT NULL,
  `hasBonus` TINYINT NOT NULL,
  `commandCapacity` INT NOT NULL,
  `subordinationValue` INT NOT NULL COMMENT 'How many command points from the CommandCapacity of the leader are used',
  PRIMARY KEY (`id`))
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `Units_Static_Data` (
  `ID` VARCHAR(10) NOT NULL,
  `Name` VARCHAR(15) NOT NULL,
  `Commander` VARCHAR(20) NOT NULL,
  `Nation` VARCHAR(10) NOT NULL COMMENT 'Allowed values: f, r, p, a, g, pl',
  `Size` VARCHAR(10) NOT NULL COMMENT 'Allowed values: d, b',
  `Type` VARCHAR(10) NOT NULL COMMENT 'Allowed values: i, c, a',
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Scenarios` (
  `ID` VARCHAR(2),
  `Name` VARCHAR(50),
  `StartTurn` int DEFAULT NULL,
  `EndTurn` int DEFAULT NULL,
  `StartPhase` int DEFAULT NULL,
  `Weather` VARCHAR(10),
  `FrenchAdminPoints` int DEFAULT NULL,
  `ArmyOfSilesiaAdminPoints` int DEFAULT NULL,
  `ArmyOfBohemiaAdminPoints` int DEFAULT NULL,
  `ArmyOfTheNorthAdminPoints` int DEFAULT NULL,
  `FrenchReinforcementPoints` int DEFAULT NULL,
  `FrenchGuardReinforcementPoints` int DEFAULT NULL,
  `RussianReinforcementPoints` int DEFAULT NULL,
  `PrussianReinforcementPoints` int DEFAULT NULL,
  `AustrianReinforcementPoints` int DEFAULT NULL,
  `SwedishReinforcementPoints` int DEFAULT NULL,
  `FrenchMorale` int DEFAULT NULL,
  `AlliedMorale` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `Scenario_Leaders_Data` (
  `Scenario_ID` VARCHAR(10) NOT NULL,
  `id` VARCHAR(10) NOT NULL,
  `x` INT NOT NULL,
  `y` INT NOT NULL,
  `orientation` VARCHAR(2) NOT NULL,
  `mode` VARCHAR(8) NOT NULL,
  `parentId` VARCHAR(10) NULL,
  INDEX `fk_Scenario_Leaders_Data_Leaders_Static_Data1_idx` (`id` ASC) VISIBLE,
  PRIMARY KEY (`id`, `Scenario_ID`),
  INDEX `fk_2_idx` (`parentId` ASC) VISIBLE,
  INDEX `fk_3_idx` (`Scenario_ID` ASC) VISIBLE,
  CONSTRAINT `fk1`
    FOREIGN KEY (`id`)
    REFERENCES `Leaders_Static_Data` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk2`
    FOREIGN KEY (`parentId`)
    REFERENCES `Scenario_Leaders_Data` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk3`
    FOREIGN KEY (`Scenario_ID`)
    REFERENCES `Scenarios` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Scenario_Units_Data` (
  `Scenario_ID` VARCHAR(10) NOT NULL,
  `id` VARCHAR(10) NOT NULL,
  `commandedBy` VARCHAR(10) NOT NULL,
  `strength` INT NOT NULL DEFAULT 0,
  `entryTurn` INT NOT NULL DEFAULT 0,
  `exitTurn` INT NOT NULL DEFAULT 99,
  INDEX `fk_Scenario_Units_Data_Units_Static_Data1_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Scenario_Units_Data_Scenarios1`
    FOREIGN KEY (`Scenario_ID`)
    REFERENCES `Scenarios` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Scenario_Units_Data_Units_Static_Data1`
    FOREIGN KEY (`id`)
    REFERENCES `Units_Static_Data` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE IF NOT EXISTS `Leaders_Dynamic_Data` (
  `game_id` INT NOT NULL,
  `id` VARCHAR(10) NOT NULL,
  `x` INT NOT NULL,
  `y` INT NOT NULL,
  `mode` VARCHAR(1) NOT NULL,
  `orientation` VARCHAR(2) NOT NULL,
  `parentId` VARCHAR(10) NULL,
  INDEX `fk_Leaders_Dynamic_Data_Leaders_Static_Data1_idx` (`id` ASC) VISIBLE,
  INDEX `pk` USING BTREE (`id`, `game_id`) VISIBLE,
  CONSTRAINT `fk_Leaders_Dynamic_Data_Leaders_Static_Data1`
    FOREIGN KEY (`id`)
    REFERENCES `Leaders_Static_Data` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Units_Dynamic_Data` (
  `game_id` INT NOT NULL,
  `id` VARCHAR(10) NOT NULL,
  `commandedBy` VARCHAR(10) NOT NULL,
  `strength` INT NOT NULL,
  `EntryTurn` INT NULL DEFAULT 0,
  `exitTurn` INT NULL DEFAULT 99,
  PRIMARY KEY (`id`, `game_id`),
  INDEX `fk_Units_Dynamic_Data_Leaders_Dynamic_Data1_idx` (`commandedBy` ASC) VISIBLE,
  CONSTRAINT `fk_Units_Dynamic_Data_Units_Static_Data1`
    FOREIGN KEY (`id`)
    REFERENCES `Units_Static_Data` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Units_Dynamic_Data_Leaders_Dynamic_Data1`
    FOREIGN KEY (`commandedBy`)
    REFERENCES `Leaders_Dynamic_Data` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE IF NOT EXISTS `Games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `CurrentTurn` INT NOT NULL DEFAULT 1,
  `EndTurn` INT NOT NULL DEFAULT 99,
  `CurrentPhase` INT NOT NULL,
  `Weather` VARCHAR(10) NOT NULL DEFAULT 'Fair',
  `FrenchAdminPoints` INT NOT NULL DEFAULT 0,
  `ArmyOfSilesiaAdminPoints` INT NOT NULL DEFAULT 0,
  `ArmyOfBohemiaAdminPoints` INT NOT NULL DEFAULT 0,
  `ArmyOfTheNorthAdminPoints` INT NOT NULL DEFAULT 0,
  `FrenchReinforcementPoints` INT NOT NULL DEFAULT 0,
  `FrenchGuardReinforcementPoints` INT NOT NULL DEFAULT 0,
  `RussianReinforcementPoints` INT NOT NULL DEFAULT 0,
  `PrussianReinforcementPoints` INT NOT NULL DEFAULT 0,
  `AustrianReinforcementPoints` INT NOT NULL DEFAULT 0,
  `SwedishReinforcementPoints` INT NOT NULL DEFAULT 0,
  `FrenchMorale` INT NOT NULL DEFAULT 0,
  `AlliedMorale` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `NAME` (`Name` ASC) VISIBLE)
ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
