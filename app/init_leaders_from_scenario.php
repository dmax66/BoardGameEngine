<?php

//
// init_leaders_from_scenario.php (game_id, scenario_id)


$servername = "localhost";
$username = "game_engine_user";
$password = "3etomerG";

$logfile = fopen("../../log/app.log", "a+") or die ();
$loglevel = 2;

if ($loglevel > 0) fwrite ($logfile, "Entering " . __FILE__ . "\n");

// Create connection
if ($loglevel > 0) fwrite ($logfile, "Opening connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error)
{
	fwrite ($logfile, "failed\n");
	die();
}
else if ($loglevel > 0)	fwrite ($logfile, "success\n");


$sql = "USE game_engine";
$result = mysqli_query($conn, $sql);


$sql = sprintf("INSERT INTO Leaders_Dynamic_Data (game_id, id, x, y, orientation, mode, parentId) SELECT '%s', id, x, y, orientation, mode, parentId FROM Scenario_Leaders_Data WHERE Scenario_Id='%s'", 
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
	die ("Error " . mysqli_error($conn));
}

mysqli_close($conn);
fclose($logfile);
