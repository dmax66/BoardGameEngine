<?php

//
// create_game_from_scenario.php (scenario_idn game_name) -- Create a new entity game from the init data associated with a scenario
//

include 'db_params.php';
include 'log.php'; 

$scenario_id = $_GET["scenario_id"];
$game_name = $_GET["game_name"];

fprintf ($logfile, "Entering %s, scenario_id=%s\n", __FILE__, $scenario_id);

// Create database connection
fwrite ($logfile, "Opening database connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error)
{
	fwrite ($logfile, "failed\n");
	die("FAIL");
}
else fwrite ($logfile, "success\n");


$sql = "USE game_engine";
$result = mysqli_query($conn, $sql);


if ($loglevel > 0) fwrite($logfile, "Creating the game...");

$sql = sprintf("INSERT INTO Games (
		SELECT 
		  NULL, 
		  '%s', 
			ID,  
			StartTurn, 
			EndTurn, 
			StartPhase, 
			Weather, 
			FrenchAdminPoints, 
			ArmyOfSilesiaAdminPoints, 
			ArmyOfBohemiaAdminPoints, 
			ArmyOfTheNorthAdminPoints, 
			FrenchReinforcementPoints, 
			FrenchGuardReinforcementPoints, 
			RussianReinforcementPoints, 
			PrussianReinforcementPoints, 
			AustrianReinforcementPoints, 
			SwedishReinforcementPoints, 
			FrenchMorale, 
			AlliedMorale 
		FROM Scenarios WHERE Scenarios.ID='%s')", 
	$game_name,  
	$scenario_id);

if ($loglevel) fwrite($logfile, "done\n");
if ($loglevel) fwrite($logfile, "Querying result...");

$result = mysqli_query($conn, $sql);

if ($loglevel) fwrite($logfile, "done\n");


if ($result != TRUE) {
	if ($loglevel > 0) fwrite($logfile, "INSERT failed\n");
	die ("ERROR: " . mysqli_error($conn));
}

$game_id = $conn->insert_id;

//
// Insert the leaders data from the scenario 
//
$sql = sprintf("INSERT INTO Leaders_Dynamic_Data (game_id, id, x, y, orientation, mode, parentId) SELECT '%s', id, x, y, orientation, mode, parentId FROM Scenario_Leaders_Data WHERE Scenario_Id='%s'", $game_id, $scenario_id);

if ($loglevel > 1) fprintf($logfile, "SQL query: %s\n", $sql); 
if ($loglevel > 0) fwrite($logfile, "Launching query...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if ($result == TRUE) {
	if ($loglevel > 0) fwrite($logfile, "Success\n");
} 
else {
	if ($loglevel > 0) fwrite($logfile, "INSERT failed\n");
	die ("Error " . mysqli_error($conn));
}


//
// Insert the units data from the scenario 
//
$sql = sprintf("INSERT INTO Units_Dynamic_Data (game_id, id, commandedBy, strength, entryTurn, exitTurn) SELECT '%s', id, commandedBy, strength, entryTurn, exitTurn FROM Scenario_Units_Data WHERE Scenario_Id='%s'", $game_id, $scenario_id);

if ($loglevel > 1) fprintf($logfile, "SQL query: %s\n", $sql); 
if ($loglevel > 0) fwrite($logfile, "Launching query...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if ($result == TRUE) {
	if ($loglevel > 0) fwrite($logfile, "Success\n");
} 
else {
	if ($loglevel > 0) fwrite($logfile, "INSERT failed\n");
	die ("Error " . mysqli_error($conn));
}

fprintf ($logfile, "Return value: %s\n", $game_id );


// And return the new game_id
echo $game_id;
 

mysqli_close($conn);
fclose($logfile);
