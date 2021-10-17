<?php

//
// init_units_from_scenario.php (game_id, scenario_id)
//

include 'db_params.php';
include 'log.php';
 
fwrite ($logfile, "Entering " . __FILE__ . "\n");

// Create connection
fwrite ($logfile, "Opening connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error)
{
	fwrite ($logfile, "failed\n");
	echo "ERROR - Can't connect to database";
	die();
}
fwrite ($logfile, "success\n");


$sql = "USE game_engine";
$result = mysqli_query($conn, $sql);


$sql = sprintf("INSERT INTO Units_Dynamic_Data (game_id, id, commandedBy, strength, entryTurn, exitTurn) SELECT '%s', id, commandedBy, strength, entryTurn, exitTurn FROM Scenario_Units_Data WHERE Scenario_Id='%s'", 
  $_GET['game_id'],  
  $_GET['scenario_id']);

if ($loglevel > 1) fprintf($logfile, "SQL query: %s\n", $sql); 



if ($loglevel > 0) fwrite($logfile, "Launching query...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if ($result == TRUE) 
{
	if ($loglevel > 0) fwrite($logfile, "Success\n");
  echo "SUCCESS";
} 
else
{
	if ($loglevel > 0) fwrite($logfile, "INSERT failed\n");
	echo "ERROR - INSERT failed";
}

mysqli_close($conn);
fclose($logfile);