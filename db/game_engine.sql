-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: game_engine
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `APTable`
--

DROP TABLE IF EXISTS `APTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `APTable` (
  `armyId` varchar(5) NOT NULL,
  `minDistance` int NOT NULL,
  `maxDistance` int NOT NULL,
  `dieRoll` int NOT NULL,
  `seasonId` varchar(2) NOT NULL,
  `adminPoints` int NOT NULL,
  PRIMARY KEY (`armyId`,`minDistance`,`maxDistance`,`dieRoll`,`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `APTable`
--

LOCK TABLES `APTable` WRITE;
/*!40000 ALTER TABLE `APTable` DISABLE KEYS */;
INSERT INTO `APTable` VALUES ('AoB',0,20,1,'au',5),('AoB',0,20,1,'sp',5),('AoB',0,20,1,'su',5),('AoB',0,20,2,'au',4),('AoB',0,20,2,'sp',4),('AoB',0,20,2,'su',4),('AoB',0,20,3,'au',3),('AoB',0,20,3,'sp',3),('AoB',0,20,3,'su',3),('AoB',0,20,4,'au',2),('AoB',0,20,4,'sp',2),('AoB',0,20,4,'su',2),('AoB',0,20,5,'au',1),('AoB',0,20,5,'sp',1),('AoB',0,20,5,'su',1),('AoB',0,20,6,'au',0),('AoB',0,20,6,'sp',0),('AoB',0,20,6,'su',0),('AoB',20,40,1,'au',4),('AoB',20,40,1,'sp',4),('AoB',20,40,1,'su',4),('AoB',20,40,2,'au',3),('AoB',20,40,2,'sp',3),('AoB',20,40,2,'su',3),('AoB',20,40,3,'au',2),('AoB',20,40,3,'sp',2),('AoB',20,40,3,'su',2),('AoB',20,40,4,'au',1),('AoB',20,40,4,'sp',1),('AoB',20,40,4,'su',1),('AoB',20,40,5,'au',0),('AoB',20,40,5,'sp',0),('AoB',20,40,5,'su',0),('AoB',20,40,6,'au',0),('AoB',20,40,6,'sp',0),('AoB',20,40,6,'su',0),('AoB',40,60,1,'au',2),('AoB',40,60,1,'sp',2),('AoB',40,60,1,'su',2),('AoB',40,60,2,'au',2),('AoB',40,60,2,'sp',2),('AoB',40,60,2,'su',2),('AoB',40,60,3,'au',1),('AoB',40,60,3,'sp',1),('AoB',40,60,3,'su',1),('AoB',40,60,4,'au',1),('AoB',40,60,4,'sp',1),('AoB',40,60,4,'su',1),('AoB',40,60,5,'au',0),('AoB',40,60,5,'sp',0),('AoB',40,60,5,'su',0),('AoB',40,60,6,'au',0),('AoB',40,60,6,'sp',0),('AoB',40,60,6,'su',0),('AoB',60,80,1,'au',2),('AoB',60,80,1,'sp',2),('AoB',60,80,1,'su',2),('AoB',60,80,2,'au',1),('AoB',60,80,2,'sp',1),('AoB',60,80,2,'su',1),('AoB',60,80,3,'au',1),('AoB',60,80,3,'sp',1),('AoB',60,80,3,'su',1),('AoB',60,80,4,'au',0),('AoB',60,80,4,'sp',0),('AoB',60,80,4,'su',0),('AoB',60,80,5,'au',0),('AoB',60,80,5,'sp',0),('AoB',60,80,5,'su',0),('AoB',60,80,6,'au',0),('AoB',60,80,6,'sp',0),('AoB',60,80,6,'su',0),('AoS',0,20,1,'au',5),('AoS',0,20,1,'sp',5),('AoS',0,20,1,'su',5),('AoS',0,20,2,'au',5),('AoS',0,20,2,'sp',4),('AoS',0,20,2,'su',4),('AoS',0,20,3,'au',4),('AoS',0,20,3,'sp',3),('AoS',0,20,3,'su',3),('AoS',0,20,4,'au',3),('AoS',0,20,4,'sp',2),('AoS',0,20,4,'su',2),('AoS',0,20,5,'au',2),('AoS',0,20,5,'sp',1),('AoS',0,20,5,'su',1),('AoS',0,20,6,'au',0),('AoS',0,20,6,'sp',0),('AoS',0,20,6,'su',0),('AoS',20,40,1,'au',5),('AoS',20,40,1,'sp',4),('AoS',20,40,1,'su',4),('AoS',20,40,2,'au',4),('AoS',20,40,2,'sp',3),('AoS',20,40,2,'su',3),('AoS',20,40,3,'au',3),('AoS',20,40,3,'sp',2),('AoS',20,40,3,'su',2),('AoS',20,40,4,'au',2),('AoS',20,40,4,'sp',1),('AoS',20,40,4,'su',1),('AoS',20,40,5,'au',1),('AoS',20,40,5,'sp',0),('AoS',20,40,5,'su',0),('AoS',20,40,6,'au',0),('AoS',20,40,6,'sp',0),('AoS',20,40,6,'su',0),('AoS',40,60,1,'au',4),('AoS',40,60,1,'sp',2),('AoS',40,60,1,'su',2),('AoS',40,60,2,'au',3),('AoS',40,60,2,'sp',2),('AoS',40,60,2,'su',2),('AoS',40,60,3,'au',2),('AoS',40,60,3,'sp',1),('AoS',40,60,3,'su',1),('AoS',40,60,4,'au',1),('AoS',40,60,4,'sp',1),('AoS',40,60,4,'su',1),('AoS',40,60,5,'au',0),('AoS',40,60,5,'sp',0),('AoS',40,60,5,'su',0),('AoS',40,60,6,'au',0),('AoS',40,60,6,'sp',0),('AoS',40,60,6,'su',0),('AoS',60,80,1,'au',2),('AoS',60,80,1,'sp',2),('AoS',60,80,1,'su',2),('AoS',60,80,2,'au',2),('AoS',60,80,2,'sp',1),('AoS',60,80,2,'su',1),('AoS',60,80,3,'au',1),('AoS',60,80,3,'sp',1),('AoS',60,80,3,'su',1),('AoS',60,80,4,'au',1),('AoS',60,80,4,'sp',0),('AoS',60,80,4,'su',0),('AoS',60,80,5,'au',0),('AoS',60,80,5,'sp',0),('AoS',60,80,5,'su',0),('AoS',60,80,6,'au',0),('AoS',60,80,6,'sp',0),('AoS',60,80,6,'su',0),('AotN',0,20,1,'au',2),('AotN',0,20,1,'sp',2),('AotN',0,20,1,'su',2),('AotN',0,20,2,'au',2),('AotN',0,20,2,'sp',2),('AotN',0,20,2,'su',2),('AotN',0,20,3,'au',1),('AotN',0,20,3,'sp',1),('AotN',0,20,3,'su',1),('AotN',0,20,4,'au',1),('AotN',0,20,4,'sp',1),('AotN',0,20,4,'su',1),('AotN',0,20,5,'au',0),('AotN',0,20,5,'sp',0),('AotN',0,20,5,'su',0),('AotN',0,20,6,'au',0),('AotN',0,20,6,'sp',0),('AotN',0,20,6,'su',0),('AotN',20,40,1,'au',2),('AotN',20,40,1,'sp',2),('AotN',20,40,1,'su',2),('AotN',20,40,2,'au',1),('AotN',20,40,2,'sp',1),('AotN',20,40,2,'su',1),('AotN',20,40,3,'au',1),('AotN',20,40,3,'sp',1),('AotN',20,40,3,'su',1),('AotN',20,40,4,'au',0),('AotN',20,40,4,'sp',0),('AotN',20,40,4,'su',0),('AotN',20,40,5,'au',0),('AotN',20,40,5,'sp',0),('AotN',20,40,5,'su',0),('AotN',20,40,6,'au',0),('AotN',20,40,6,'sp',0),('AotN',20,40,6,'su',0),('AotN',40,60,1,'au',1),('AotN',40,60,1,'sp',1),('AotN',40,60,1,'su',1),('AotN',40,60,2,'au',1),('AotN',40,60,2,'sp',1),('AotN',40,60,2,'su',1),('AotN',40,60,3,'au',0),('AotN',40,60,3,'sp',0),('AotN',40,60,3,'su',0),('AotN',40,60,4,'au',0),('AotN',40,60,4,'sp',0),('AotN',40,60,4,'su',0),('AotN',40,60,5,'au',0),('AotN',40,60,5,'sp',0),('AotN',40,60,5,'su',0),('AotN',40,60,6,'au',0),('AotN',40,60,6,'sp',0),('AotN',40,60,6,'su',0),('AotN',60,80,1,'au',0),('AotN',60,80,1,'sp',0),('AotN',60,80,1,'su',0),('AotN',60,80,2,'au',0),('AotN',60,80,2,'sp',0),('AotN',60,80,2,'su',0),('AotN',60,80,3,'au',0),('AotN',60,80,3,'sp',0),('AotN',60,80,3,'su',0),('AotN',60,80,4,'au',0),('AotN',60,80,4,'sp',0),('AotN',60,80,4,'su',0),('AotN',60,80,5,'au',0),('AotN',60,80,5,'sp',0),('AotN',60,80,5,'su',0),('AotN',60,80,6,'au',0),('AotN',60,80,6,'sp',0),('AotN',60,80,6,'su',0),('FA',0,20,1,'au',5),('FA',0,20,1,'sp',5),('FA',0,20,1,'su',5),('FA',0,20,2,'au',4),('FA',0,20,2,'sp',4),('FA',0,20,2,'su',4),('FA',0,20,3,'au',3),('FA',0,20,3,'sp',3),('FA',0,20,3,'su',3),('FA',0,20,4,'au',2),('FA',0,20,4,'sp',2),('FA',0,20,4,'su',2),('FA',0,20,5,'au',1),('FA',0,20,5,'sp',1),('FA',0,20,5,'su',1),('FA',0,20,6,'au',0),('FA',0,20,6,'sp',0),('FA',0,20,6,'su',0),('FA',20,40,1,'au',4),('FA',20,40,1,'sp',4),('FA',20,40,1,'su',4),('FA',20,40,2,'au',3),('FA',20,40,2,'sp',3),('FA',20,40,2,'su',3),('FA',20,40,3,'au',2),('FA',20,40,3,'sp',2),('FA',20,40,3,'su',2),('FA',20,40,4,'au',1),('FA',20,40,4,'sp',1),('FA',20,40,4,'su',1),('FA',20,40,5,'au',0),('FA',20,40,5,'sp',0),('FA',20,40,5,'su',0),('FA',20,40,6,'au',0),('FA',20,40,6,'sp',0),('FA',20,40,6,'su',0),('FA',40,60,1,'au',2),('FA',40,60,1,'sp',2),('FA',40,60,1,'su',2),('FA',40,60,2,'au',2),('FA',40,60,2,'sp',2),('FA',40,60,2,'su',2),('FA',40,60,3,'au',1),('FA',40,60,3,'sp',1),('FA',40,60,3,'su',1),('FA',40,60,4,'au',1),('FA',40,60,4,'sp',1),('FA',40,60,4,'su',1),('FA',40,60,5,'au',0),('FA',40,60,5,'sp',0),('FA',40,60,5,'su',0),('FA',40,60,6,'au',0),('FA',40,60,6,'sp',0),('FA',40,60,6,'su',0),('FA',60,80,1,'au',2),('FA',60,80,1,'sp',2),('FA',60,80,1,'su',2),('FA',60,80,2,'au',1),('FA',60,80,2,'sp',1),('FA',60,80,2,'su',1),('FA',60,80,3,'au',1),('FA',60,80,3,'sp',1),('FA',60,80,3,'su',1),('FA',60,80,4,'au',0),('FA',60,80,4,'sp',0),('FA',60,80,4,'su',0),('FA',60,80,5,'au',0),('FA',60,80,5,'sp',0),('FA',60,80,5,'su',0),('FA',60,80,6,'au',0),('FA',60,80,6,'sp',0),('FA',60,80,6,'su',0);
/*!40000 ALTER TABLE `APTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Armies`
--

DROP TABLE IF EXISTS `Armies`;
/*!50001 DROP VIEW IF EXISTS `Armies`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Armies` AS SELECT 
 1 AS `armyId`,
 1 AS `playerId`,
 1 AS `gameId`,
 1 AS `name`,
 1 AS `adminPoints`,
 1 AS `COP_x`,
 1 AS `COP_y`,
 1 AS `COP_isActive`,
 1 AS `COP_turnToReactivate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Armies_Dynamic_Data`
--

DROP TABLE IF EXISTS `Armies_Dynamic_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Armies_Dynamic_Data` (
  `armyId` varchar(5) NOT NULL,
  `gameId` int NOT NULL,
  `adminPoints` int NOT NULL DEFAULT '0',
  `COP_x` int NOT NULL DEFAULT '0',
  `COP_y` int NOT NULL DEFAULT '0',
  `COP_isActive` int NOT NULL DEFAULT '1',
  `COP_turnToReactivate` int NOT NULL DEFAULT '-1',
  PRIMARY KEY (`armyId`,`gameId`),
  KEY `fk_game_idx` (`gameId`),
  CONSTRAINT `fk_army` FOREIGN KEY (`armyId`) REFERENCES `Armies_Static_Data` (`armyId`),
  CONSTRAINT `fk_game3` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Armies_Dynamic_Data`
--

LOCK TABLES `Armies_Dynamic_Data` WRITE;
/*!40000 ALTER TABLE `Armies_Dynamic_Data` DISABLE KEYS */;
INSERT INTO `Armies_Dynamic_Data` VALUES ('AoB',52,0,0,0,0,-1),('AoS',52,45,53,3,1,-1),('AotN',52,0,0,0,0,-1),('FA',52,21,1,62,1,-1);
/*!40000 ALTER TABLE `Armies_Dynamic_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Armies_Static_Data`
--

DROP TABLE IF EXISTS `Armies_Static_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Armies_Static_Data` (
  `armyId` varchar(5) NOT NULL,
  `name` varchar(30) NOT NULL,
  `playerId` varchar(2) NOT NULL,
  PRIMARY KEY (`armyId`),
  KEY `fk_player_idx` (`playerId`),
  CONSTRAINT `fk_player` FOREIGN KEY (`playerId`) REFERENCES `Players_Static_Data` (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Armies_Static_Data`
--

LOCK TABLES `Armies_Static_Data` WRITE;
/*!40000 ALTER TABLE `Armies_Static_Data` DISABLE KEYS */;
INSERT INTO `Armies_Static_Data` VALUES ('AoB','Army of Bohemia','a'),('AoS','Army of Silesia','a'),('AotN','Army of the North','a'),('FA','French Army','f');
/*!40000 ALTER TABLE `Armies_Static_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Calendar`
--

DROP TABLE IF EXISTS `Calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Calendar` (
  `turn` int NOT NULL,
  `days` varchar(20) NOT NULL,
  `season` varchar(2) NOT NULL,
  PRIMARY KEY (`turn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Calendar`
--

LOCK TABLES `Calendar` WRITE;
/*!40000 ALTER TABLE `Calendar` DISABLE KEYS */;
INSERT INTO `Calendar` VALUES (1,'25-26 April','sp'),(2,'27-28 April','sp'),(3,'29-30 April','sp'),(4,'1-2 May','sp'),(5,'3-4 May','sp'),(6,'5-6 May','sp'),(7,'7-8 May','sp'),(8,'9-10 May','sp');
/*!40000 ALTER TABLE `Calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `Turn` int NOT NULL,
  `EventType` varchar(20) NOT NULL,
  `Nation` varchar(2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Type` varchar(1) DEFAULT NULL,
  `Leader_Id` varchar(10) DEFAULT NULL,
  `X` int DEFAULT NULL,
  `Y` int DEFAULT NULL,
  `Mode` varchar(1) DEFAULT NULL,
  `Orientation` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,'Reinforcement','f',0,'x','Sou',0,62,'c','0'),(1,'Reinforcement','f',0,'x','Nap',0,62,'c','0'),(1,'Replacement','r',1,'i','x',0,0,'x','0'),(1,'Replacement','r',1,'c','x',0,0,'x','0'),(2,'Reinforcement','f',0,'x','Ber',0,78,'c','0'),(3,'Reinforcement','f',0,'x','fMG_G',0,78,'c','0'),(4,'Reinforcement','f',0,'x','Oud',0,78,'c','0'),(4,'Reinforcement','f',0,'x','fMG_A',14,90,'c','5'),(5,'Replacement','r',3,'i','x',0,0,'x','0'),(5,'Replacement','r',2,'c','x',0,0,'x','0'),(5,'Replacement','f',2,'i','x',0,0,'x','0'),(6,'Reinforcement','f',0,'x','Seb',6,0,'c','3'),(7,'Reinforcement','f',0,'x','fMG_B',0,62,'c','0'),(8,'Reinforcement','f',0,'x','fMG_C',13,18,'l','0'),(9,'Replacement','r',4,'i','x',0,0,'x','0'),(9,'Replacement','r',2,'c','x',0,0,'x','0'),(9,'Replacement','f',1,'i','x',0,0,'x','0'),(9,'Replacement','f',4,'c','x',0,0,'x','0'),(10,'Reinforcement','f',0,'x','Van',6,0,'c','3'),(13,'Replacement','r',3,'i','x',0,0,'x','0'),(13,'Replacement','r',1,'c','x',0,0,'x','0'),(13,'Replacement','f',4,'i','x',0,0,'x','0'),(13,'Replacement','ig',2,'c','x',0,0,'x','0'),(17,'Replacement','r',1,'i','x',0,0,'x','0'),(24,'Replacement','p',3,'i','x',0,0,'x','0'),(26,'Reinforcement','a',0,'x','Schwarz',47,90,'c','5'),(28,'Reinforcement','f',0,'x','Mur',56,69,'l','5'),(28,'Replacement','p',3,'i','x',0,0,'x','0'),(28,'Replacement','f',7,'i','x',0,0,'x','0'),(28,'Replacement','f',1,'c','x',0,0,'x','0'),(29,'Reinforcement','s',0,'x','Berna',0,0,'c','0'),(33,'Reinforcement','r',0,'x','rMG_V',38,90,'c','5'),(36,'Replacement','r',2,'i','x',0,0,'x','0'),(36,'Replacement','r',1,'c','x',0,0,'x','0'),(36,'Replacement','a',2,'i','x',0,0,'x','0'),(36,'Replacement','a',1,'c','x',0,0,'x','0'),(36,'Replacement','f',2,'i','x',0,0,'x','0'),(36,'Replacement','f',1,'c','x',0,0,'x','0'),(36,'Replacement','p',3,'i','x',0,0,'x','0'),(36,'Replacement','ig',1,'i','x',0,0,'x','0'),(36,'Replacement','ig',3,'i','x',0,0,'x','0'),(38,'Reinforcement','f',0,'x','fMG_I',0,8,'c','0'),(39,'Reinforcement','r',0,'x','Benn',68,3,'c','3'),(40,'Replacement','r',2,'i','x',0,0,'x','0'),(40,'Replacement','r',1,'c','x',0,0,'x','0'),(40,'Replacement','a',1,'i','x',0,0,'x','0'),(40,'Replacement','a',1,'c','x',0,0,'x','0'),(40,'Replacement','p',2,'i','x',0,0,'x','0'),(40,'Replacement','p',1,'c','x',0,0,'x','0'),(40,'Replacement','f',2,'i','x',0,0,'x','0'),(40,'Replacement','f',1,'c','x',0,0,'x','0'),(42,'DepotDown','f',0,'x','Hof',0,0,'x','0'),(42,'DepotDown','f',0,'x','Bautzen',0,0,'x','0'),(42,'DepotDown','f',0,'x','Bunzlau',0,0,'x','0'),(42,'DepotDown','f',0,'x','Goerlitz',0,0,'x','0'),(42,'DepotDown','f',0,'x','Glogau',0,0,'x','0'),(42,'SupplySourceDown','f',0,'x','Dresden',0,0,'x','0'),(44,'Reinforcement','f',0,'x','Aug',0,78,'c','0'),(44,'Reinforcement','f',0,'x','fMG_J',0,62,'c','0'),(44,'Replacement','r',2,'i','x',0,0,'x','0'),(44,'Replacement','r',1,'c','x',0,0,'x','0'),(44,'Replacement','p',2,'i','x',0,0,'x','0'),(44,'Replacement','f',3,'i','x',0,0,'x','0'),(44,'Replacement','f',1,'c','x',0,0,'x','0'),(45,'Reinforcement','r',0,'x','Wittg',47,90,'c','5'),(46,'Reinforcement','r',0,'x','Konst',47,90,'c','5'),(47,'Reinforcement','a',0,'x','Gyu',47,90,'c','5'),(48,'Replacement','r',2,'i','x',0,0,'x','0'),(48,'Replacement','r',1,'c','x',0,0,'x','0'),(48,'Replacement','a',2,'i','x',0,0,'x','0'),(48,'Replacement','p',2,'i','x',0,0,'x','0'),(48,'Replacement','p',1,'c','x',0,0,'x','0'),(48,'Replacement','f',3,'i','x',0,0,'x','0'),(49,'Reinforcement','a',0,'x','Schwarz',47,90,'c','5'),(51,'GermanUnitsWithdrawn','g',0,'x','NA',0,0,'x','0'),(52,'Replacement','a',2,'i','x',0,0,'x','0'),(52,'Replacement','p',2,'i','x',0,0,'x','0'),(52,'Replacement','f',3,'c','x',0,0,'x','0');
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games`
--

DROP TABLE IF EXISTS `Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Games` (
  `gameId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `scenarioId` varchar(2) NOT NULL,
  `currentTurn` int NOT NULL DEFAULT '1',
  `endTurn` int NOT NULL,
  `playerZero` varchar(2) NOT NULL,
  `currentPlayer` int NOT NULL DEFAULT '0',
  `currentSegment` int NOT NULL DEFAULT '0',
  `weather` varchar(15) NOT NULL,
  PRIMARY KEY (`gameId`),
  UNIQUE KEY `Name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games`
--

LOCK TABLES `Games` WRITE;
/*!40000 ALTER TABLE `Games` DISABLE KEYS */;
INSERT INTO `Games` VALUES (52,'aaa','S',1,23,'f',0,-1,'0');
/*!40000 ALTER TABLE `Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Leaders`
--

DROP TABLE IF EXISTS `Leaders`;
/*!50001 DROP VIEW IF EXISTS `Leaders`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Leaders` AS SELECT 
 1 AS `gameId`,
 1 AS `playerId`,
 1 AS `leaderId`,
 1 AS `nationId`,
 1 AS `name`,
 1 AS `armyName`,
 1 AS `unitName`,
 1 AS `type`,
 1 AS `initiative`,
 1 AS `hasBonus`,
 1 AS `commandCapacity`,
 1 AS `subordinationValue`,
 1 AS `X`,
 1 AS `Y`,
 1 AS `orientation`,
 1 AS `mode`,
 1 AS `parentId`,
 1 AS `zOrder`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Leaders_Dynamic_Data`
--

DROP TABLE IF EXISTS `Leaders_Dynamic_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Leaders_Dynamic_Data` (
  `gameId` int NOT NULL,
  `leaderId` varchar(10) NOT NULL,
  `X` int DEFAULT NULL,
  `Y` int DEFAULT NULL,
  `orientation` varchar(2) DEFAULT NULL,
  `mode` varchar(1) DEFAULT NULL,
  `parentId` varchar(10) DEFAULT NULL,
  `zOrder` int DEFAULT NULL,
  KEY `fk_Leaders_Dynamic_Data_Leaders_Static_Data1_idx` (`leaderId`),
  KEY `fk_games_idx` (`gameId`),
  CONSTRAINT `fk_games` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `fk_leaders` FOREIGN KEY (`leaderId`) REFERENCES `Leaders_Static_Data` (`leaderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Leaders_Dynamic_Data`
--

LOCK TABLES `Leaders_Dynamic_Data` WRITE;
/*!40000 ALTER TABLE `Leaders_Dynamic_Data` DISABLE KEYS */;
INSERT INTO `Leaders_Dynamic_Data` VALUES (52,'Ber',-10,-10,'0','c',NULL,NULL),(52,'Bess',-10,-10,'0','c','Sou',NULL),(52,'Bluch',25,64,'3','l',NULL,NULL),(52,'Bul',22,31,'2','c',NULL,NULL),(52,'Chem',-10,-10,'3','l',NULL,NULL),(52,'Eug',7,30,'0','c',NULL,NULL),(52,'Eugen',-10,-10,'3','l','Winzi',NULL),(52,'fMG_A',-10,-10,'0','c',NULL,NULL),(52,'fMG_E',42,43,'0','l',NULL,NULL),(52,'fMG_G',-10,-10,'0','c',NULL,NULL),(52,'fMG_H',1,78,'0','c',NULL,NULL),(52,'Gali',-10,-10,'3','l','Konst',NULL),(52,'Glog',112,42,'0','l',NULL,NULL),(52,'Gortch',-10,-10,'3','l',NULL,NULL),(52,'Kle',18,46,'3','l',NULL,NULL),(52,'Konst',56,70,'2','c',NULL,NULL),(52,'Kor',-10,-10,'3','l','Milo',NULL),(52,'Lat',-10,-10,'0','c','Eug',NULL),(52,'Lau',-10,-10,'0','c','Eug',NULL),(52,'Mac',-10,-10,'0','c','Eug',NULL),(52,'Magde',15,18,'0','l',NULL,NULL),(52,'Markow',-10,-10,'3','l','Milo',NULL),(52,'Marm',-10,-10,'3','l','Nap',NULL),(52,'Milo',36,74,'2','c',NULL,NULL),(52,'Nap',-10,-10,'0','c',NULL,NULL),(52,'Ney',3,62,'0','c',NULL,NULL),(52,'Oud2',-10,-10,'0','c',NULL,NULL),(52,'pMG_K',31,29,'4','l',NULL,NULL),(52,'Raj',-10,-10,'3','l','Konst',NULL),(52,'Rey',8,25,'0','c',NULL,NULL),(52,'Rosen',112,41,'4','l',NULL,NULL),(52,'Seb',-10,-10,'1','c',NULL,NULL),(52,'Sou',-10,-10,'3','l',NULL,NULL),(52,'Treu',-10,-10,'3','l','Winzi',NULL),(52,'Van',-10,-10,'1','c',NULL,NULL),(52,'Vic',15,30,'1','c',NULL,NULL),(52,'Winzi',28,56,'3','l',NULL,NULL),(52,'Witten',32,30,'1','l',NULL,NULL),(52,'Wittg',26,53,'3','l',NULL,NULL),(52,'Woro',15,17,'4','l',NULL,NULL),(52,'Yermo',-10,-10,'3','l','Konst',NULL),(52,'Yor',36,74,'2','c',NULL,NULL);
/*!40000 ALTER TABLE `Leaders_Dynamic_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Leaders_Static_Data`
--

DROP TABLE IF EXISTS `Leaders_Static_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Leaders_Static_Data` (
  `leaderId` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `nationId` varchar(10) NOT NULL,
  `playerId` varchar(1) NOT NULL,
  `armyName` varchar(20) DEFAULT NULL,
  `unitName` varchar(15) NOT NULL COMMENT 'Name of the Corp commanded by the Leader',
  `type` varchar(15) NOT NULL COMMENT 'Allowed values:'' infantry'', ''cavalry''',
  `initiative` varchar(45) NOT NULL,
  `hasBonus` tinyint NOT NULL,
  `commandCapacity` int NOT NULL,
  `subordinationValue` int NOT NULL COMMENT 'How many command points from the CommandSpan of the leader are used',
  PRIMARY KEY (`leaderId`),
  UNIQUE KEY `ID_UNIQUE` (`leaderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Leaders_Static_Data`
--

LOCK TABLES `Leaders_Static_Data` WRITE;
/*!40000 ALTER TABLE `Leaders_Static_Data` DISABLE KEYS */;
INSERT INTO `Leaders_Static_Data` VALUES ('Arr','Arrighi','f','f','French Army','III Cavalry','c','5',0,2,1),('Aug','Augereau','f','f','French Army','IX Corps','i','2',0,3,2),('Benn','Bennigsen','r','a','Army of Bohemia','I Corps','i','2',0,4,4),('Ber','Bertrand','f','f','French Army','IV Corps','i','3',1,6,2),('Berna','Bernadotte','s','a','Army of the North','XXXX','i','1',0,4,4),('Bess','Bessieres','f','f','French Army','Guard Cavalry','c','5',0,2,1),('Bluch','Bluecher','p','a','Army of Bohemia','I Corps','i','4',1,8,3),('Bul','Bulow','p','a','Army of the North','III Corps','i','2',0,5,2),('Chem','Unknown','f','f','French Army','Chemnitz Garr','i','0',0,0,0),('Collo','Colloredo','a','a','Army of Bohemia','I Corps','i','1',0,3,2),('Cyr','St. Cyr','f','f','French Army','XIV Corps','i','5',0,6,2),('Doc','Doctorov','r','a','Army of Bohemia','Infantry Corps','i','1',0,6,3),('Dru','Drouot','f','f','French Army','Old Guard','i','4',0,6,3),('Duro','Durosnel','f','f','French Army','Dresden Garr','i','0',0,0,0),('Eug','Eugene','f','f','French Army','Armee de l\'Elbe','i','2',0,5,2),('Eugen','Eugen','r','a','Army of Bohemia','II Infantry','i','2',0,2,1),('fMG_A','Maj Gen A','f','f','French Army','','i','0',0,3,4),('fMG_B','Maj Gen B','f','f','French Army','','i','0',0,3,4),('fMG_C','Maj Gen C','f','f','French Army','','i','0',0,3,4),('fMG_D','Maj Gen D','f','f','French Army','','i','0',0,3,4),('fMG_E','Maj Gen E','f','f','French Army','','i','0',0,3,4),('fMG_F','Maj Gen F','f','f','French Army','','i','0',0,3,4),('fMG_G','Maj Gen G','f','f','French Army','','i','0',0,3,4),('fMG_H','Maj Gen H','f','f','French Army','','i','0',0,3,4),('fMG_I','Maj Gen I','f','f','French Army','','i','0',0,3,4),('fMG_J','Maj Gen J','f','f','French Army','','i','0',0,3,4),('fMG_K','Maj Gen K','f','f','French Army','','i','0',0,3,4),('fMG_L','Maj Gen L','f','f','French Army','','i','0',0,3,4),('fMG_R','Maj Gen R','f','f','French Army','','i','0',0,3,4),('fMG_T','Maj Gen T','f','f','French Army','`','c','4',0,2,2),('fMG_U','Maj Gen U','f','f','French Army','','c','4',0,2,2),('fMG_V','Maj Gen V','f','f','French Army','','c','4',0,2,2),('fMG_W','Maj Gen W','f','f','French Army','','c','4',0,2,2),('fMG_X','Maj Gen X','f','f','French Army','','c','4',0,2,2),('fMG_Y','Maj Gen Y','f','f','French Army','','c','4',0,2,2),('fMG_Z','Maj Gen Z','f','f','French Army','','c','4',0,2,2),('Gali','Galitzin','r','a','Army of Bohemia','II Cuirassiers','c','4',0,4,1),('Ger','Gerard','f','f','French Army','XI Corps','i','3',0,4,2),('Gir','Girard','f','f','French Army','Ad Hoc','i','3',0,3,2),('Glog','Laplane','f','f','French Army','Glogau Garrison','i','0',0,0,0),('Gortch','Gortchakow','r','a','Army of Bohemia','I Infantry','i','1',0,3,2),('Gyu','Gyulai','a','a','Army of Bohemia','III Corps','i','1',0,3,2),('HHomb','Hesse Homburg','a','a','Army of Bohemia','Reserve','i','2',0,6,3),('Kapz','Kapzewitsch','r','a','Army of Silesia','X Corps','i','1',0,3,2),('Kell','Kellerman','f','f','French Army','IV Cavalry','c','4',0,1,1),('Kle','Kleist','p','a','Army of Bohemia','II Corps','i','2',0,5,2),('Klen','Klenau','a','a','Army of Bohemia','IV Corps','i','1',0,4,2),('Konst','Konstantin','r','a','Army of Bohemia','Guards+Reserve','i','2',0,4,2),('Kor','Korff','p','a','Army of Silesia','I Cavalry','c','4',0,3,1),('Kosen','Kosen','p','a','Army of Silesia','','i','0',0,3,2),('Lang','Langeron','r','a','Army of Silesia','','i','2',0,5,4),('Lanu','Lanusse','f','f','French Army','Magdeburg Garr','i','0',0,2,0),('Lat','Latour-Maubourg','f','f','French Army','I Cavalry','c','5',0,2,1),('Lau','Lauriston','f','f','French Army','V Corps','i','2',0,5,2),('Lauer','Lauer','f','f','French Army','Torgau Garr','i','0',0,2,0),('Lheri','L\'Heritier','f','f','French Army','V Cavalry','c','4',0,2,1),('Mac','MacDonald','f','f','French Army','XI Corps','i','4',1,6,3),('Magde','Lemoine','f','f','French Army','Magdeburg Garr','i','0',0,0,0),('Marg','Margaron','f','f','French Army','Leipzig Garr','i','0',0,0,0),('Markow','Markow','r','a','Army of Silesia','IV Infantry','i','4',0,2,1),('Marm','Marmont','f','f','French Army','VI Corps','i','3',0,6,3),('Meer','Meerveldt','a','a','Army of Bohemia','II Corps','i','1',0,2,1),('Milo','Miloradowitch','r','a','Army of Bohemia','II Corps','i','2',0,4,2),('Mor','Mortier','f','f','French Army','II Young Guard','i','3',1,6,2),('Mur','Murat','f','f','French Army','Cavalry Reserve','c','4',0,6,3),('Nans','Nansouty','f','f','French Army','Guard Cavalry','c','5',0,2,1),('Nap','Napoleon','f','f','French Army','Emperor','i','4',1,10,6),('Ney','Ney','f','f','French Army','III Corps','i','3',0,6,3),('Ols','Olsufiew','r','a','Army of Silesia','IX Corps','i','1',0,2,1),('Oud','Oudinot','f','f','French Army','I Young Guard','i','2',0,6,3),('Oud2','Oudinot','f','f','French Army','XII Corps','i','2',0,6,3),('Pahlen','Pahlen','a','a','Army of Bohemia','IV Cavalry','c','4',0,3,1),('pMG_A','Maj Gen A','p','a','Army of Bohemia','','i','0',0,3,4),('pMG_B','Maj Gen B','p','a','Army of Bohemia','','i','0',0,3,4),('pMG_C','Maj Gen C','p','a','Army of Bohemia','','i','0',0,3,4),('pMG_D','Maj Gen D','p','a','Army of the North','','i','0',0,3,4),('pMG_E','Maj Gen E','p','a','Army of the North','','i','0',0,3,4),('pMG_F','Maj Gen F','p','a','Army of the North','','i','0',0,3,4),('pMG_G','Maj Gen G','p','a','Army of the North','','i','0',0,3,4),('pMG_H','Maj Gen H','p','a','Army of Silesia','','i','0',0,3,4),('pMG_I','Maj Gen I','p','a','Army of Silesia','','i','0',0,3,4),('pMG_J','Maj Gen J','p','a','Army of Silesia','','i','0',0,3,4),('pMG_K','Maj Gen K','p','a','Army of the North','','i','0',0,3,4),('pMG_L','Maj Gen L','p','a','Army of Silesia','','i','0',0,3,4),('pMG_M','Maj Gen M','a','a','Army of Bohemia','','i','0',0,3,4),('pMG_N','Maj Gen N','p','a','Army of the North','','i','0',0,3,4),('pMG_T','Maj Gen T','p','a','Army of Silesia','','c','4',0,2,2),('pMG_U','Maj Gen U','p','a','Army of Silesia','','c','4',0,2,2),('pMG_W','Maj Gen W','p','a','Army of the North','','c','4',0,2,2),('pMG_X','Maj Gen X','a','a','Army of Bohemia','','c','4',0,2,2),('pMG_Y','Maj Gen Y','p','a','Army of Bohemia','','c','4',0,2,2),('pMG_Z','Maj Gen Z','a','a','Army of Bohemia','','c','4',0,2,2),('Pon','Poniatowski','f','f','French Army','VIII Corps','i','4',0,3,2),('Priest','St Priest','r','a','Army of Silesia','VII Corps','i','2',0,4,2),('Raj','Rajewski','r','a','Army of Bohemia','III Grenadiers','i','1',0,2,1),('Rey','Reynier','f','f','French Army','VII Corps','i','4',1,6,2),('rMG_V','Maj Gen V','r','a','Army of the North','','c','4',0,2,2),('Rosen','Rosen','p','a','Army of the North','Rosen','i','0',0,0,0),('Sacken','Osten-Sacken','r','a','Army of Silesia','XI Corps','i','3',1,6,2),('Scherb','Scherbatow','r','a','Army of Silesia','VI Corps','i','1',0,2,1),('Schwarz','Schwarzenberg','a','a','Army of Bohemia','XXXX','i','2',1,6,4),('Seb','Sebastiani','f','f','French Army','II Cavalry','c','5',0,3,1),('Sou','Soult','f','f','French Army','Old Guard','i','4',0,6,3),('Souh','Souham','f','f','French Army','III Corps','i','2',0,6,2),('Stedi','Stedingk','s','a','Army of the North','I Corps','i','1',0,5,2),('Tau','Tauenzien','p','a','Army of the North','IV Corps','i','2',0,5,2),('Tolly','Barclay de Tolly','r','a','Army of Bohemia','','i','3',1,6,2),('Tolst','Ostermann-Tolstoj','r','a','Army of Bohemia','Militia','i','1',0,3,2),('Treu','Treubezkov','p','a','Army of Silesia','III Cavalry','c','4',0,3,1),('Van','Vandamme','f','f','French Army','I Corps','i','2',1,4,2),('Vic','Victor','f','f','French Army','II Corps','i','2',0,6,2),('Wasi','Wasiltchikow','r','a','Army of Silesia','IV Cavalry','c','4',0,3,1),('Winzi','Winzingerode','r','a','Army of the North','II Corps','i','2',0,4,2),('Witten','Lapoype','f','f','French Army','Wittenberg Garr','i','0',0,2,0),('Wittg','Wittgenstein','r','a','Army of Bohemia','','i','2',0,5,3),('Woro','Woronzow','r','a','Army of the North','XIV Corps','i','1',0,4,2),('Yermo','Yermolow','r','a','Army of Bohemia','V Guards','i','1',0,3,1),('Yor','Yorck','p','a','Army of Silesia','II Corps','i','2',0,5,2);
/*!40000 ALTER TABLE `Leaders_Static_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Nations`
--

DROP TABLE IF EXISTS `Nations`;
/*!50001 DROP VIEW IF EXISTS `Nations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Nations` AS SELECT 
 1 AS `gameId`,
 1 AS `playerId`,
 1 AS `nationId`,
 1 AS `name`,
 1 AS `adjective`,
 1 AS `cavReplacementPoints`,
 1 AS `infReplacementPoints`,
 1 AS `artReplacementPoints`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Nations_Dynamic_Data`
--

DROP TABLE IF EXISTS `Nations_Dynamic_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nations_Dynamic_Data` (
  `nationId` varchar(2) NOT NULL,
  `gameId` int NOT NULL,
  `cavReplacementPoints` int DEFAULT '0',
  `infReplacementPoints` int DEFAULT '0',
  `artReplacementPoints` int DEFAULT NULL,
  PRIMARY KEY (`nationId`,`gameId`),
  KEY `game_fk_idx` (`gameId`),
  CONSTRAINT `game_fk` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `nation_fk` FOREIGN KEY (`nationId`) REFERENCES `Nations_Static_Data` (`nationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nations_Dynamic_Data`
--

LOCK TABLES `Nations_Dynamic_Data` WRITE;
/*!40000 ALTER TABLE `Nations_Dynamic_Data` DISABLE KEYS */;
INSERT INTO `Nations_Dynamic_Data` VALUES ('a',52,0,0,0),('f',52,0,0,0),('g',52,0,0,0),('ig',52,0,0,0),('p',52,0,0,0),('pl',52,0,0,0),('r',52,0,0,0),('s',52,0,0,0);
/*!40000 ALTER TABLE `Nations_Dynamic_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Nations_Static_Data`
--

DROP TABLE IF EXISTS `Nations_Static_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nations_Static_Data` (
  `nationId` varchar(2) NOT NULL,
  `name` varchar(15) NOT NULL,
  `adjective` varchar(15) NOT NULL,
  `playerId` varchar(2) NOT NULL,
  PRIMARY KEY (`nationId`),
  KEY `fk_players_idx` (`playerId`),
  CONSTRAINT `fk_players` FOREIGN KEY (`playerId`) REFERENCES `Players_Static_Data` (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nations_Static_Data`
--

LOCK TABLES `Nations_Static_Data` WRITE;
/*!40000 ALTER TABLE `Nations_Static_Data` DISABLE KEYS */;
INSERT INTO `Nations_Static_Data` VALUES ('a','Austria','Austrian','a'),('f','France','French','f'),('g','Germany','German','f'),('ig','Imperial Guard','Imperial Guard','f'),('p','Prussia','Prussian','a'),('pl','Poland','Polish','f'),('r','Russia','Russian','a'),('s','Sweden','Swedish','a');
/*!40000 ALTER TABLE `Nations_Static_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Players`
--

DROP TABLE IF EXISTS `Players`;
/*!50001 DROP VIEW IF EXISTS `Players`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Players` AS SELECT 
 1 AS `gameId`,
 1 AS `playerId`,
 1 AS `name`,
 1 AS `morale`,
 1 AS `rank`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Players_Dynamic_Data`
--

DROP TABLE IF EXISTS `Players_Dynamic_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Players_Dynamic_Data` (
  `playerId` varchar(2) NOT NULL,
  `gameId` int NOT NULL,
  `morale` int NOT NULL DEFAULT '0',
  `rank` int NOT NULL,
  PRIMARY KEY (`playerId`,`gameId`),
  KEY `fk_game2_idx` (`gameId`),
  CONSTRAINT `fk_game2` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `fk_player2` FOREIGN KEY (`playerId`) REFERENCES `Players_Static_Data` (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Players_Dynamic_Data`
--

LOCK TABLES `Players_Dynamic_Data` WRITE;
/*!40000 ALTER TABLE `Players_Dynamic_Data` DISABLE KEYS */;
INSERT INTO `Players_Dynamic_Data` VALUES ('a',52,0,1),('f',52,0,0);
/*!40000 ALTER TABLE `Players_Dynamic_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Players_Static_Data`
--

DROP TABLE IF EXISTS `Players_Static_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Players_Static_Data` (
  `ID` int NOT NULL,
  `name` varchar(15) NOT NULL,
  `playerId` varchar(43) NOT NULL,
  PRIMARY KEY (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Players_Static_Data`
--

LOCK TABLES `Players_Static_Data` WRITE;
/*!40000 ALTER TABLE `Players_Static_Data` DISABLE KEYS */;
INSERT INTO `Players_Static_Data` VALUES (1,'Allied','a'),(0,'French','f');
/*!40000 ALTER TABLE `Players_Static_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scenario_Armies_Data`
--

DROP TABLE IF EXISTS `Scenario_Armies_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Scenario_Armies_Data` (
  `scenarioId` varchar(10) NOT NULL,
  `armyId` varchar(5) NOT NULL,
  `adminPoints` int NOT NULL,
  `COP_x` int NOT NULL,
  `COP_y` int NOT NULL,
  `COP_isActive` int NOT NULL,
  PRIMARY KEY (`scenarioId`,`armyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scenario_Armies_Data`
--

LOCK TABLES `Scenario_Armies_Data` WRITE;
/*!40000 ALTER TABLE `Scenario_Armies_Data` DISABLE KEYS */;
/*!40000 ALTER TABLE `Scenario_Armies_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scenario_Leaders_Data`
--

DROP TABLE IF EXISTS `Scenario_Leaders_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `fk1` FOREIGN KEY (`id`) REFERENCES `Leaders_Static_Data` (`leaderId`),
  CONSTRAINT `fk2` FOREIGN KEY (`parentId`) REFERENCES `Scenario_Leaders_Data` (`id`),
  CONSTRAINT `fk3` FOREIGN KEY (`Scenario_ID`) REFERENCES `Scenarios` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scenario_Leaders_Data`
--

LOCK TABLES `Scenario_Leaders_Data` WRITE;
/*!40000 ALTER TABLE `Scenario_Leaders_Data` DISABLE KEYS */;
INSERT INTO `Scenario_Leaders_Data` VALUES ('S','Ber',0,0,'0','c',NULL),('S','Bess',0,0,'0','c','Sou'),('S','Bluch',25,64,'3','l',NULL),('S','Bul',22,31,'2','c',NULL),('S','Chem',0,0,'3','l',NULL),('S','Eug',7,30,'0','c',NULL),('S','Eugen',0,0,'3','l','Winzi'),('S','fMG_A',0,0,'0','c',NULL),('S','fMG_E',42,43,'0','l',NULL),('S','fMG_G',0,0,'0','c',NULL),('S','fMG_H',1,78,'0','c',NULL),('S','Gali',0,0,'3','l','Konst'),('S','Glog',112,42,'0','l',NULL),('S','Gortch',0,0,'3','l',NULL),('S','Kle',18,46,'3','l',NULL),('S','Konst',56,70,'2','c',NULL),('S','Kor',0,0,'3','l','Milo'),('S','Lat',0,0,'0','c','Eug'),('S','Lau',0,0,'0','c','Eug'),('S','Mac',0,0,'0','c','Eug'),('S','Magde',15,18,'0','l',NULL),('S','Markow',0,0,'3','l','Milo'),('S','Marm',0,0,'3','l','Nap'),('S','Milo',36,74,'2','c',NULL),('S','Nap',0,0,'0','c',NULL),('S','Ney',3,62,'0','c',NULL),('S','Oud2',0,0,'0','c',NULL),('S','pMG_K',31,29,'4','l',NULL),('S','Raj',0,0,'3','l','Konst'),('S','Rey',8,25,'0','c',NULL),('S','Rosen',112,41,'4','l',NULL),('S','Seb',0,0,'1','c',NULL),('S','Sou',0,0,'3','l',NULL),('S','Treu',0,0,'3','l','Winzi'),('S','Van',0,0,'1','c',NULL),('S','Vic',15,30,'1','c',NULL),('S','Winzi',28,56,'3','l',NULL),('S','Witten',32,30,'1','l',NULL),('S','Wittg',26,53,'3','l',NULL),('S','Woro',15,17,'4','l',NULL),('S','Yermo',0,0,'3','l','Konst'),('S','Yor',36,74,'2','c',NULL);
/*!40000 ALTER TABLE `Scenario_Leaders_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scenario_SupplySources`
--

DROP TABLE IF EXISTS `Scenario_SupplySources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Scenario_SupplySources` (
  `scenarioId` varchar(45) NOT NULL,
  `armyId` varchar(5) NOT NULL,
  `X` int NOT NULL DEFAULT '-1',
  `Y` int NOT NULL DEFAULT '-1',
  PRIMARY KEY (`armyId`,`scenarioId`),
  KEY `fk_Scenario_SupplySources_2_idx` (`scenarioId`),
  CONSTRAINT `fk_Scenario_SupplySources_1` FOREIGN KEY (`armyId`) REFERENCES `Armies_Static_Data` (`armyId`),
  CONSTRAINT `fk_Scenario_SupplySources_2` FOREIGN KEY (`scenarioId`) REFERENCES `Scenarios` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scenario_SupplySources`
--

LOCK TABLES `Scenario_SupplySources` WRITE;
/*!40000 ALTER TABLE `Scenario_SupplySources` DISABLE KEYS */;
/*!40000 ALTER TABLE `Scenario_SupplySources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scenario_Units_Data`
--

DROP TABLE IF EXISTS `Scenario_Units_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `fk_Scenario_Units_Data_Units_Static_Data1` FOREIGN KEY (`id`) REFERENCES `Units_Static_Data` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scenario_Units_Data`
--

LOCK TABLES `Scenario_Units_Data` WRITE;
/*!40000 ALTER TABLE `Scenario_Units_Data` DISABLE KEYS */;
INSERT INTO `Scenario_Units_Data` VALUES ('S','10FrInf','Ney',9,0,'99'),('S','11FrInf','Ney',9,0,'99'),('S','12FrInf','Ber',10,0,'99'),('S','13FrInf','Oud',9,0,'99'),('S','14FrInf','Oud',9,0,'99'),('S','16FrInf','Lau',5,0,'99'),('S','17FrInf','Seb',5,0,'99'),('S','18FrInf','Lau',6,0,'99'),('S','19FrInf','Lau',8,0,'99'),('S','1FrGdeCav','Bess',2,0,'99'),('S','1FrHv','Lat',1,0,'99'),('S','1FrInf','fMG_C',6,0,'99'),('S','1FrLt','Lat',1,0,'99'),('S','1FrYGdeInf','Sou',11,0,'99'),('S','1OGde','Eug',4,0,'99'),('S','20FrInf','Marm',8,0,'99'),('S','21FrInf','Marm',11,0,'99'),('S','22FrInf','Marm',8,0,'99'),('S','23FrCav','Ney',1,0,'99'),('S','24FrCav','Ber',1,0,'99'),('S','25FrInf','fMG_E',5,0,'99'),('S','29FrInf','fMG_A',8,0,'99'),('S','2FrGdeCav','Bess',2,0,'99'),('S','2FrHv','Seb',1,0,'99'),('S','2FrInf','Van',9,0,'99'),('S','2FrLt','Seb',1,0,'99'),('S','2FrYGdeInf','fMG_B',5,0,'99'),('S','31FrInf','Mac',4,0,'99'),('S','32FrInf','Rey',1,0,'99'),('S','35FrInf','Mac',10,0,'99'),('S','36FrInf','Mac',8,0,'99'),('S','3FrHv','Lat',1,0,'99'),('S','3FrLt','Lau',1,0,'99'),('S','4FrHv','Arr',2,0,'99'),('S','4FrInf','Vic',8,0,'99'),('S','4FrLt','Seb',1,0,'99'),('S','5FrInf','Van',9,0,'99'),('S','5FrLt','Arr',2,0,'99'),('S','6FrCav','Lau',1,0,'99'),('S','6FrLt','Arr',2,0,'99'),('S','8FrInf','Ney',13,0,'99'),('S','9FrInf','Ney',9,0,'99'),('S','Duro','Duro',6,0,'99'),('S','GdArt','Sou',6,0,'99'),('S','Lanu','Lanu',3,0,'99'),('S','Lapl','Lapl',5,0,'99'),('S','Lapo','Witten',2,0,'99'),('S','Laue','Lauer',2,0,'99'),('S','Marg','Marg',6,0,'99'),('S','26GerCav','fMG_E',2,0,'99'),('S','28GerCav','Mac',1,0,'99'),('S','39GerInf','fMG_H',7,0,'99'),('S','10PrInf','Bluch',9,0,'99'),('S','11PrInf','Bluch',7,0,'99'),('S','14PrInf','Kle',2,0,'99'),('S','1PrInf','Yor',2,0,'99'),('S','2PrInf','Yor',1,0,'99'),('S','3PrInf','Bul',5,0,'99'),('S','4PrInf','Bul',1,0,'99'),('S','5PrInf','Woro',4,0,'99'),('S','6PrInf','Bul',2,0,'99'),('S','7PrInf','Yor',4,0,'99'),('S','8PrInf','Yor',3,0,'99'),('S','ArtPr','Bluch',6,0,'99'),('S','Dolffs','Bluch',3,0,'99'),('S','Juerg','Yor',1,0,'99'),('S','Oppen','Bul',2,0,'99'),('S','12RuInf','pMG_M',2,0,'99'),('S','1RuCuir','Gali',2,0,'99'),('S','1RuGde','Yermo',3,0,'99'),('S','1RuGren','Raj',2,0,'99'),('S','2RuCuir','Gali',1,0,'99'),('S','2RuGde','Yermo',2,0,'99'),('S','2RuGren','Raj',2,0,'99'),('S','3RuCuir','Gali',2,0,'99'),('S','3RuInf','Eugen',4,0,'99'),('S','4RuInf','Eugen',3,0,'99'),('S','5RuInf','Gortch',4,0,'99'),('S','Engel','Milo',2,0,'99'),('S','Ilow','Gortch',2,0,'99'),('S','Karpen','Milo',2,0,'99'),('S','Karpow','Kor',3,0,'99'),('S','KosX','Kle',2,0,'99'),('S','Krass','Woro',5,0,'99'),('S','Lcav','Gali',1,0,'99'),('S','Lisan','Kor',1,0,'99'),('S','MarkowInf','Woro',3,0,'99'),('S','Mile','Kor',3,0,'99'),('S','RuArt1','Konst',3,0,'99'),('S','15FrInf','Ber',10,0,'99'),('S','Mixc','Gortch',1,0,'99'),('S','Gdei','Konst',2,0,'99');
/*!40000 ALTER TABLE `Scenario_Units_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scenarios`
--

DROP TABLE IF EXISTS `Scenarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Scenarios` (
  `ID` varchar(10) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Description` varchar(45) DEFAULT NULL,
  `StartTurn` int NOT NULL DEFAULT '0',
  `EndTurn` int NOT NULL DEFAULT '0',
  `StartPhase` int NOT NULL,
  `FrenchMorale` int NOT NULL DEFAULT '0',
  `AlliedMorale` int NOT NULL DEFAULT '0',
  `FirstPlayer` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scenarios`
--

LOCK TABLES `Scenarios` WRITE;
/*!40000 ALTER TABLE `Scenarios` DISABLE KEYS */;
INSERT INTO `Scenarios` VALUES ('D','Dresden',NULL,34,44,0,0,0,'f'),('L','Leipzig',NULL,55,55,0,0,0,'a'),('S','Spring','Spring Scenario',1,23,0,0,0,'a');
/*!40000 ALTER TABLE `Scenarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SupplySource_DynamicData`
--

DROP TABLE IF EXISTS `SupplySource_DynamicData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SupplySource_DynamicData` (
  `armyId` varchar(5) NOT NULL,
  `gameId` int NOT NULL,
  `x` int NOT NULL DEFAULT '-1',
  `y` int NOT NULL DEFAULT '-1',
  `isActive` int NOT NULL DEFAULT '1',
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`armyId`,`gameId`,`x`,`y`),
  KEY `fk_SupplySource_DynamicData_1_idx` (`armyId`),
  KEY `fk_SupplySource_DynamicData_2_idx` (`gameId`),
  CONSTRAINT `fk_SupplySource_DynamicData_1` FOREIGN KEY (`armyId`) REFERENCES `Armies_Static_Data` (`armyId`),
  CONSTRAINT `fk_SupplySource_DynamicData_2` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SupplySource_DynamicData`
--

LOCK TABLES `SupplySource_DynamicData` WRITE;
/*!40000 ALTER TABLE `SupplySource_DynamicData` DISABLE KEYS */;
INSERT INTO `SupplySource_DynamicData` VALUES ('AoB',52,48,90,0,NULL),('AoB',52,53,90,0,NULL),('AoB',52,64,90,0,NULL),('AoB',52,78,90,0,NULL),('AoB',52,80,90,0,NULL),('AoB',52,83,90,0,NULL),('AoB',52,90,90,0,NULL),('AoB',52,105,90,0,NULL),('AoS',52,94,40,0,NULL),('Aos',52,100,40,0,NULL),('AoS',52,101,40,0,NULL),('AoS',52,114,40,0,NULL),('AoS',52,121,90,0,NULL),('AoS',52,125,90,0,NULL),('AoS',52,137,50,0,NULL),('AoS',52,137,64,0,NULL),('AotN',52,55,0,0,NULL),('AotN',52,68,3,0,NULL),('FA',52,1,8,0,'Wesel'),('FA',52,1,62,1,'Erfurt'),('FA',52,56,70,0,'Dresden');
/*!40000 ALTER TABLE `SupplySource_DynamicData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `SupplySources`
--

DROP TABLE IF EXISTS `SupplySources`;
/*!50001 DROP VIEW IF EXISTS `SupplySources`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `SupplySources` AS SELECT 
 1 AS `armyId`,
 1 AS `gameId`,
 1 AS `x`,
 1 AS `y`,
 1 AS `isActive`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `Units`
--

DROP TABLE IF EXISTS `Units`;
/*!50001 DROP VIEW IF EXISTS `Units`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Units` AS SELECT 
 1 AS `gameId`,
 1 AS `unitId`,
 1 AS `playerId`,
 1 AS `nationId`,
 1 AS `name`,
 1 AS `commander`,
 1 AS `size`,
 1 AS `type`,
 1 AS `strength`,
 1 AS `commandedBy`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Units_Dynamic_Data`
--

DROP TABLE IF EXISTS `Units_Dynamic_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Units_Dynamic_Data` (
  `gameId` int NOT NULL,
  `unitId` varchar(10) NOT NULL,
  `commandedBy` varchar(10) NOT NULL,
  `strength` int NOT NULL,
  KEY `fk_Game_idx` (`gameId`),
  KEY `fk_UDD_to_USD_idx` (`unitId`),
  CONSTRAINT `fk_Game` FOREIGN KEY (`gameId`) REFERENCES `Games` (`gameId`),
  CONSTRAINT `fk_UDD_to_USD` FOREIGN KEY (`unitId`) REFERENCES `Units_Static_Data` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Units_Dynamic_Data`
--

LOCK TABLES `Units_Dynamic_Data` WRITE;
/*!40000 ALTER TABLE `Units_Dynamic_Data` DISABLE KEYS */;
INSERT INTO `Units_Dynamic_Data` VALUES (52,'10FrInf','Ney',9),(52,'11FrInf','Ney',9),(52,'12FrInf','Ber',10),(52,'13FrInf','Oud',9),(52,'14FrInf','Oud',9),(52,'16FrInf','Lau',5),(52,'17FrInf','Seb',5),(52,'18FrInf','Lau',6),(52,'19FrInf','Lau',8),(52,'1FrGdeCav','Bess',2),(52,'1FrHv','Lat',1),(52,'1FrInf','fMG_C',6),(52,'1FrLt','Lat',1),(52,'1FrYGdeInf','Sou',11),(52,'1OGde','Eug',4),(52,'20FrInf','Marm',8),(52,'21FrInf','Marm',11),(52,'22FrInf','Marm',8),(52,'23FrCav','Ney',1),(52,'24FrCav','Ber',1),(52,'25FrInf','fMG_E',5),(52,'29FrInf','fMG_A',8),(52,'2FrGdeCav','Bess',2),(52,'2FrHv','Seb',1),(52,'2FrInf','Van',9),(52,'2FrLt','Seb',1),(52,'2FrYGdeInf','fMG_B',5),(52,'31FrInf','Mac',4),(52,'32FrInf','Rey',1),(52,'35FrInf','Mac',10),(52,'36FrInf','Mac',8),(52,'3FrHv','Lat',1),(52,'3FrLt','Lau',1),(52,'4FrHv','Arr',2),(52,'4FrInf','Vic',8),(52,'4FrLt','Seb',1),(52,'5FrInf','Van',9),(52,'5FrLt','Arr',2),(52,'6FrCav','Lau',1),(52,'6FrLt','Arr',2),(52,'8FrInf','Ney',13),(52,'9FrInf','Ney',9),(52,'Duro','Duro',6),(52,'GdArt','Sou',6),(52,'Lanu','Lanu',3),(52,'Lapl','Lapl',5),(52,'Lapo','Witten',2),(52,'Laue','Lauer',2),(52,'Marg','Marg',6),(52,'26GerCav','fMG_E',2),(52,'28GerCav','Mac',1),(52,'39GerInf','fMG_H',7),(52,'10PrInf','Bluch',9),(52,'11PrInf','Bluch',7),(52,'14PrInf','Kle',2),(52,'1PrInf','Yor',2),(52,'2PrInf','Yor',1),(52,'3PrInf','Bul',5),(52,'4PrInf','Bul',1),(52,'5PrInf','Woro',4),(52,'6PrInf','Bul',2),(52,'7PrInf','Yor',4),(52,'8PrInf','Yor',3),(52,'ArtPr','Bluch',6),(52,'Dolffs','Bluch',3),(52,'Juerg','Yor',1),(52,'Oppen','Bul',2),(52,'12RuInf','pMG_M',2),(52,'1RuCuir','Gali',2),(52,'1RuGde','Yermo',3),(52,'1RuGren','Raj',2),(52,'2RuCuir','Gali',1),(52,'2RuGde','Yermo',2),(52,'2RuGren','Raj',2),(52,'3RuCuir','Gali',2),(52,'3RuInf','Eugen',4),(52,'4RuInf','Eugen',3),(52,'5RuInf','Gortch',4),(52,'Engel','Milo',2),(52,'Ilow','Gortch',2),(52,'Karpen','Milo',2),(52,'Karpow','Kor',3),(52,'KosX','Kle',2),(52,'Krass','Woro',5),(52,'Lcav','Gali',1),(52,'Lisan','Kor',1),(52,'MarkowInf','Woro',3),(52,'Mile','Kor',3),(52,'RuArt1','Konst',3),(52,'15FrInf','Ber',10),(52,'Mixc','Gortch',1),(52,'Gdei','Konst',2);
/*!40000 ALTER TABLE `Units_Dynamic_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Units_Static_Data`
--

DROP TABLE IF EXISTS `Units_Static_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Units_Static_Data` (
  `unitId` varchar(10) NOT NULL,
  `name` varchar(15) NOT NULL,
  `commander` varchar(20) NOT NULL,
  `nationId` varchar(2) NOT NULL,
  `size` varchar(10) NOT NULL COMMENT 'Allowed values: "d", "b", "r"',
  `type` varchar(10) NOT NULL COMMENT 'Allowed values: i, c, a',
  PRIMARY KEY (`unitId`),
  UNIQUE KEY `ID_UNIQUE` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Units_Static_Data`
--

LOCK TABLES `Units_Static_Data` WRITE;
/*!40000 ALTER TABLE `Units_Static_Data` DISABLE KEYS */;
INSERT INTO `Units_Static_Data` VALUES ('10FrCav','10th','Jacquet','f','d','c'),('10FrInf','10th','Albert','f','d','i'),('10PrInf','10th','Roeder','p','d','i'),('10RuInf','10th','Leiwen','r','d','i'),('11FrInf','11th','Ricard','f','d','i'),('11PrInf','11th','Zieten','p','d','i'),('11RuInf','11th','Gurgalow','r','d','i'),('12FrInf','12th','','f','d','i'),('12PrInf','12th','August','p','d','i'),('12RuInf','12th','Chowanski','r','d','i'),('13FrInf','13th','Patchod','f','d','i'),('13RuInf','13th','Lidnfors','r','d','i'),('14FrInf','14th','Lorencez','f','d','i'),('14PrInf','14th','Unknown','p','d','i'),('14RuInf','14th','Helfreich','r','d','i'),('15FrInf','15th','','f','d','i'),('15GerInf','15th','Peyri','g','d','i'),('15RuInf','15th','Kornilow','r','d','i'),('16FrInf','16th','Maison','f','d','i'),('17FrInf','17th','Puthod','f','d','i'),('17RuInf','17th','Pilar','r','d','i'),('18FrInf','18th','Lagrange','f','d','i'),('18RuInf','18th','Benardos','r','d','i'),('19FrInf','19th','Rochambeau','f','d','i'),('1FrGdeCav','1st Guard Cav','Ornano','f','d','c'),('1FrHv','1st Hvy','Bordessol','f','d','c'),('1FrInf','1st','Philippon','f','d','i'),('1FrLt','1st Lt','Bruyere','f','d','c'),('1FrYGdeInf','1st Young Guard','Dumostier','f','d','i'),('1HvFr','1st Hvy','Bordessol','f','d','c'),('1OGde','1st Old Guard','Roguet','f','d','i'),('1PrInf','1st','Losthin','p','d','i'),('1RuCuir','1st Cuir','Deprerado','r','d','c'),('1RuGde','1st Gde','Rosen','r','d','i'),('1RuGren','1st Gren','Zwilenief','r','d','i'),('1SwCav','1st Reserve','','s','b','i'),('1SwInf','1st','Schutssnh','s','b','i'),('20FrInf','20th','Compans','f','d','i'),('21FrCav','21st','Corbineau','f','d','c'),('21FrInf','21st','Bonet','f','d','i'),('21RuInf','21st','Laptew','r','d','i'),('22FrInf','22nd','Friederich','f','d','i'),('22GerCav','22nd','Hammerst','g','b','c'),('22RuInf','22nd','Schapski','r','d','i'),('23FrCav','23rd','','f','d','c'),('23FrInf','23rd','Teste','f','d','i'),('24FrCav','24th','','f','d','c'),('24RuInf','24th','Wuitsch','r','d','i'),('25FrInf','25th','','f','d','i'),('25GerCav','25th Cav','Normann','g','b','c'),('25GerInf','25th','Sahr','g','d','i'),('26GerCav','26th Cav','Gablenz','g','b','c'),('26Polinf','26th','Kamienick','pl','d','i'),('26RuInf','26th','Paskiewitz','r','d','i'),('27PolCav','27th','Uminsky','pl','d','c'),('27PolInf','27th','Rozniezky','pl','d','i'),('27RuInf','27th','Newjeroski','r','d','i'),('28GerCav','28th Cav','Montbrun','g','b','c'),('29FrInf','29th','','f','d','i'),('29GerCav','29th Cav','Beaumont','g','b','c'),('29GerInf','29th','Raglowich','g','d','i'),('2FrGdeCav','2nd Guard Cav','Lefebvre','f','d','c'),('2FrHv','2nd Hvy','Wattier','f','d','c'),('2FrInf','2nd','Dumonceau','f','d','i'),('2FrLt','2nd Lt','D\'Hurbal','f','d','c'),('2FrYGdeInf','2nd Young Guard','Barrois','f','d','i'),('2OGde','2nd Old Guard','Curial','f','d','i'),('2PrInf','2nd','Warburg','p','d','i'),('2RuCuir','2nd Cuir','Kretow','r','d','c'),('2RuGde','2nd Gde','Udom I','r','d','i'),('2RuGren','2nd Gren','Sulima','r','d','i'),('2SwInf','2nd','Reuterski','s','b','i'),('31FrInf','31st','Ledru des','f','d','i'),('32FrInf','32nd','Durutte','f','d','i'),('35FrInf','35th','Frassinet','f','d','i'),('36FrInf','36th','Charpentier','f','d','i'),('38GerInf','38th','Franquemont','g','d','i'),('39GerInf','39th','Marchand','g','d','i'),('3FrGdeCav','3rd Guard Cav','Walther','f','d','c'),('3FrHv','3rd Hvy','Doumerc','f','d','c'),('3FrInf','3rd','Teste','f','d','i'),('3FrLt','3rd Lt','Chastel','f','d','c'),('3FrYGdeInf','3rd Young Guard','Delaborde','f','d','i'),('3PrInf','3rd','H Homburg','p','d','i'),('3RuCuir','3rd Cuir','Duka','r','d','c'),('3RuInf','3rd','Schowskoi','r','d','i'),('3SwInf','3rd','Braendstr','s','b','i'),('42FrInf','42nd','Creutzer','f','d','i'),('43FrInf','43rd','Claparede','f','d','i'),('44FrInf','44th','Berthezene','f','d','i'),('45FrInf','45th','Razout','f','d','i'),('4FrHv','4th Hvy','Defrance','f','d','c'),('4FrInf','4th','Dubreton','f','d','i'),('4FrLt','4th Lt','Exelmans','f','d','c'),('4PrInf','4th','Thuemen','p','d','i'),('4RuInf','4th','Puschnzk','r','d','i'),('4SwInf','4th','Posse','s','b','i'),('4YGde','4th YGde','Roguet','f','d','i'),('51FrInf','51st','Turreau','f','d','i'),('52FrInf','52nd','Semelle','f','d','i'),('5FrHv','5th Hvy','Collaert','f','d','c'),('5FrInf','5th','Dufour','f','d','i'),('5FrLt','5th Lt','Lorge','f','d','c'),('5PrInf','5th','Borstell','p','d','i'),('5RuInf','5th','Mesenzow','r','d','i'),('6FrCav','6th','Bruno','f','d','c'),('6FrHv','6th Hvy','Milhaud','f','d','c'),('6FrInf','6th','Vial','f','d','i'),('6FrLt','6th Lt','Fournier','f','d','c'),('6PrInf','6th','Krafft','p','d','i'),('6SwInf','6th','Boije','s','b','i'),('7PolLtCav','7th Light','Sokolnizk','pl','d','c'),('7PrInf','7th','Weltzien','p','d','i'),('7RuInf','7th','Talysin I','r','d','i'),('8FrInf','8th','Brayer','f','d','i'),('8PolLtCav','8th Light','Sulkowski','pl','d','c'),('8PrInf','8th','Girsa','p','d','i'),('8RuInf','8th','Urussow','r','d','i'),('9FrInf','9th','Brenier','f','d','i'),('9FrLt','9th Lt','Subervie','f','d','c'),('9PrInf','9th','Kluex','p','d','i'),('9RuInf','9th','Udom II','r','d','i'),('ALiech','2nd','A Liechtn','a','d','i'),('ArtFr1','Artillery Res','','f','d','a'),('ArtFr2','Artillery Res','','f','d','a'),('ArtFr3','Artillery Res','','f','d','a'),('ArtPr','Reserve','','p','d','a'),('AuArt','Res Reisner','Reisner','a','d','a'),('Bianchi','2nd Res','Bianchi','a','d','i'),('Boros','1st Dragon','Borosdin','r','d','c'),('BubnaCav','2nd Lt','Bubna','a','d','c'),('BubnaInf','2nd Lt','Bubna','a','d','i'),('CavAlven','Garde','Alvensleben','p','d','c'),('Chastel','1st Res','Chasteler','a','d','i'),('Cival','3rd Res','Civalart','a','d','i'),('Crennev','1st','Crennevil','a','d','c'),('Deniss','Denissiew','Denissiew','r','b','c'),('Dobsch','Lander','Dobschutz','p','d','i'),('Dolffs','Reserve','Dolffs','p','d','c'),('Duro','Dresden','Durosnel','f','d','i'),('Ehrengde','1st','Ehrengde','a','d','c'),('Ema','4th Dragons','Emanuel','r','d','c'),('Engel','Engelhart','Engelhart','r','d','i'),('GdArt','Guard Artillery','','f','d','a'),('Gdec','Guard Cav','','r','d','i'),('Gdei','Guard Inf','','r','d','i'),('GerCav','24th','Briche-J','g','b','c'),('Gloga','Glogau','Kosen','f','d','i'),('Greth','3rd','Greth','a','d','i'),('Harpe','Harpe','Harpe','r','d','i'),('Hirsch','Lander','Hirschfeld','p','d','i'),('Hohe','2nd','Hohenlohe','a','d','i'),('Ilow','Kossaks','Ilowainski','r','b','c'),('InfAlven','Garde','Alvensleben','p','d','i'),('Juerg','Reserve','Juergass','p','d','c'),('Karpen','Chas','Karpenko','r','b','c'),('Karpow','Kossaks','Karpow','r','b','c'),('KarpowII','Kossaks','Karpow II','r','b','c'),('KosX','Kossaks','Unknown','r','b','c'),('Krass','Krassofs','Krassofs','r','d','c'),('Lansk','2nd Hussars','Lanskoi','r','d','c'),('Lanu','Magdeburg','Lanusse','f','d','i'),('Lapl','Glogau','Laplane','f','d','i'),('Lapo','Wittenberg','Lapoype','f','d','i'),('Laue','Torgau','Lauer','f','d','i'),('Lcav','Light Cavalry','','r','d','c'),('Lecoq','24th','Lecoq','g','d','i'),('Lederer','1st','Lederer','a','d','c'),('Lef','Lefol','Lefol','f','d','i'),('Lemo','Magdeburg','Lemoine','f','d','i'),('Lisan','Ulan','Lisanewit','r','b','c'),('Marg','Leipzig','Margaron','f','d','i'),('MarkowCav','AvGde Markow','Markow','r','d','c'),('MarkowInf','AvGde Markow','Markow','r','d','i'),('Mayer','3rd','Mayer','a','d','i'),('Mensd','Kossaks','Mensdorf','r','b','c'),('Mezko','3rd Lt','Mezko','a','d','i'),('Mile','1st Hussars','Milesinow','r','d','c'),('Mixc','Mixed','','r','d','c'),('Mixi','Mixed','Kasakofski','r','d','i'),('MLiechCav','1st Lt','M Liechtn','a','d','c'),('MliechInf','1st Lt','M Liecthn','a','d','i'),('Muronz','Militia','Muronzow','r','d','i'),('Murray','2nd','Murray','a','d','i'),('Nostitz','Cuir','Nostitz','a','d','c'),('Oppen','Reserve','Oppenheimer','p','d','c'),('PahlenII','Pahlen II','Pahlen II','r','b','c'),('Pandsh','3rd Dragons','Pandshul','r','d','c'),('Philipp','3rd','Philipp','a','d','i'),('Platov','Kossaks','Platov','r','d','c'),('Pusch','Puschkin','Puschkin','r','d','c'),('Putlitz','Lander','Putlitz','p','d','i'),('Rosen','Rosen','Rosen','r','d','i'),('Rourke','AvGde ORourke','O\' Rourke','r','d','i'),('RuArt1','Reserve','','r','b','a'),('RuArt2','Reserve','','r','b','a'),('Schnell','1st','Schneller','a','d','c'),('SwArt','Reserve','','s','b','a'),('Tchali','Lt','Tchalikow','r','d','c'),('Thielm','Kossaks','Thielman','r','b','c'),('Tirow','Militia','Tirow','r','d','i'),('Tschapl','Tschaplitz','Tschaplitz','r','d','c'),('Weiss','3rd','Weissenw','a','d','i'),('Wimpf','2nd','Winpfen','a','d','i'),('Wobeser','Lander','Wobeser','p','d','i');
/*!40000 ALTER TABLE `Units_Static_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Weather_Static_Data`
--

DROP TABLE IF EXISTS `Weather_Static_Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Weather_Static_Data` (
  `Season` varchar(2) NOT NULL,
  `DieRoll` int NOT NULL,
  `Weather` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Weather_Static_Data`
--

LOCK TABLES `Weather_Static_Data` WRITE;
/*!40000 ALTER TABLE `Weather_Static_Data` DISABLE KEYS */;
INSERT INTO `Weather_Static_Data` VALUES ('sp',1,'Rain'),('sp',2,'Fair'),('sp',3,'Fair'),('sp',4,'Fair'),('sp',5,'Fair'),('sp',6,'Fair'),('su',1,'Rain&Mud'),('su',2,'Fair'),('su',3,'Fair'),('su',4,'Fair'),('su',5,'Heat'),('su',6,'Fair'),('au',1,'Rain+Mud'),('au',2,'Rain+Mud'),('au',3,'Mud'),('au',4,'Fair'),('au',5,'Fair'),('au',6,'Fair');
/*!40000 ALTER TABLE `Weather_Static_Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'game_engine'
--
/*!50003 DROP PROCEDURE IF EXISTS `createNewGame` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`game_engine_user`@`localhost` PROCEDURE `createNewGame`(IN game_name CHAR(45), IN scenario_id CHAR(10), OUT game_id INT(10))
BEGIN

START TRANSACTION;

INSERT INTO Games (
    name,
    scenarioId,
    currentTurn,
    endTurn,
    playerZero,
    currentPlayer,
    currentSegment,
    weather)
SELECT 
		  game_name, 
			scenarioId,  
			startTurn, 
			endTurn, 
      firstPlayer,
      0,
			startPhase, 
			weather 
		FROM 
		  Scenarios 
		WHERE 
		  Scenarios.scenarioId = scenario_id;

SET game_id = LAST_INSERT_ID(); 

INSERT INTO Players_Dynamic_Data (
	 playerId,
	 gameId,
	 morale)
SELECT
	 playerId,
	 game_id,
   morale
FROM 
	Scenario_Players_Data
WHERE 
	Scenario_Players_Data.scenarioId = scenario_id;

INSERT INTO Nations_Dynamic_Data (
	nationId,
	gameId,
	cavReplacementPoints,
	infReplacementPoints,
	artReplacementPoints)
SELECT
	nationId,
	game_id,
	cavReplacementPoints,
	infReplacementPoints,
	artReplacementPoints
FROM 
	Scenario_Nations_Data 
    WHERE Scenario_Nations_Data.scenarioId = scenario_id;
    

INSERT INTO Armies_Dynamic_Data (
	armyId,
	gameId,
	adminPoints,
	COP_X,
	COP_Y)
SELECT
	armyId,
    game_id,
    adminPoints,
    COP_X,
    COP_Y
FROM 
	Scenario_Armies_Data
WHERE 
	Scenario_Armies_Data.scenarioId = scenario_id;
	
INSERT INTO Leaders_Dynamic_Data (
    gameId, 
    leaderId, 
    x, 
    y, 
    orientation, 
    mode, 
    parentId) 
  SELECT 
    game_id, 
    leaderId, 
    x, 
    y, 
    orientation, 
    mode, 
    parentId 
  FROM 
    Scenario_Leaders_Data 
  WHERE 
    scenarioId = scenario_id;

INSERT INTO Units_Dynamic_Data (
	gameId,
	unitId,
	commandedBy,
	strength,
	entryTurn,
	exitTurn)
SELECT 
	game_id,
    unitId,
    commandedBy,
    strength,
    entryTurn,
    exitTurn
FROM 
	Scenario_Units_Data
WHERE 
	Scenario_Units_Data.scenarioId = scenario_id;    	

COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `Armies`
--

/*!50001 DROP VIEW IF EXISTS `Armies`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Armies` AS select `SD`.`armyId` AS `armyId`,`SD`.`playerId` AS `playerId`,`DD`.`gameId` AS `gameId`,`SD`.`name` AS `name`,`DD`.`adminPoints` AS `adminPoints`,`DD`.`COP_x` AS `COP_x`,`DD`.`COP_y` AS `COP_y`,`DD`.`COP_isActive` AS `COP_isActive`,`DD`.`COP_turnToReactivate` AS `COP_turnToReactivate` from (`Armies_Static_Data` `SD` join `Armies_Dynamic_Data` `DD`) where (`SD`.`armyId` = `DD`.`armyId`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Leaders`
--

/*!50001 DROP VIEW IF EXISTS `Leaders`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Leaders` AS select `DD`.`gameId` AS `gameId`,`SD`.`playerId` AS `playerId`,`DD`.`leaderId` AS `leaderId`,`SD`.`nationId` AS `nationId`,`SD`.`name` AS `name`,`SD`.`armyName` AS `armyName`,`SD`.`unitName` AS `unitName`,`SD`.`type` AS `type`,`SD`.`initiative` AS `initiative`,`SD`.`hasBonus` AS `hasBonus`,`SD`.`commandCapacity` AS `commandCapacity`,`SD`.`subordinationValue` AS `subordinationValue`,`DD`.`X` AS `X`,`DD`.`Y` AS `Y`,`DD`.`orientation` AS `orientation`,`DD`.`mode` AS `mode`,`DD`.`parentId` AS `parentId`,`DD`.`zOrder` AS `zOrder` from (`Leaders_Static_Data` `SD` join `Leaders_Dynamic_Data` `DD`) where (`SD`.`leaderId` = `DD`.`leaderId`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Nations`
--

/*!50001 DROP VIEW IF EXISTS `Nations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Nations` AS select `DD`.`gameId` AS `gameId`,`SD`.`playerId` AS `playerId`,`SD`.`nationId` AS `nationId`,`SD`.`name` AS `name`,`SD`.`adjective` AS `adjective`,`DD`.`cavReplacementPoints` AS `cavReplacementPoints`,`DD`.`infReplacementPoints` AS `infReplacementPoints`,`DD`.`artReplacementPoints` AS `artReplacementPoints` from (`Nations_Static_Data` `SD` join `Nations_Dynamic_Data` `DD`) where (`SD`.`nationId` = `DD`.`nationId`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Players`
--

/*!50001 DROP VIEW IF EXISTS `Players`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Players` AS select `DD`.`gameId` AS `gameId`,`SD`.`playerId` AS `playerId`,`SD`.`name` AS `name`,`DD`.`morale` AS `morale`,`DD`.`rank` AS `rank` from (`Players_Static_Data` `SD` join `Players_Dynamic_Data` `DD`) where (`SD`.`playerId` = `DD`.`playerId`) order by `DD`.`rank` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SupplySources`
--

/*!50001 DROP VIEW IF EXISTS `SupplySources`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `SupplySources` AS select `SupplySource_DynamicData`.`armyId` AS `armyId`,`SupplySource_DynamicData`.`gameId` AS `gameId`,`SupplySource_DynamicData`.`x` AS `x`,`SupplySource_DynamicData`.`y` AS `y`,`SupplySource_DynamicData`.`isActive` AS `isActive`,`SupplySource_DynamicData`.`name` AS `name` from `SupplySource_DynamicData` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Units`
--

/*!50001 DROP VIEW IF EXISTS `Units`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`game_engine_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Units` AS select `DD`.`gameId` AS `gameId`,`SD`.`unitId` AS `unitId`,`N`.`playerId` AS `playerId`,`N`.`nationId` AS `nationId`,`SD`.`name` AS `name`,`SD`.`commander` AS `commander`,`SD`.`size` AS `size`,`SD`.`type` AS `type`,`DD`.`strength` AS `strength`,`DD`.`commandedBy` AS `commandedBy` from ((`Units_Static_Data` `SD` join `Units_Dynamic_Data` `DD`) join `Nations_Static_Data` `N`) where ((`SD`.`unitId` = `DD`.`unitId`) and (`SD`.`nationId` = `N`.`nationId`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-17  9:46:08
