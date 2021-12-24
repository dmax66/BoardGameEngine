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


$sql = "USE " . $schemaname;;
$result = mysqli_query($conn, $sql);


if ($loglevel > 0) fwrite($logfile, "Creating the game...\n");

$sql = sprintf ("CALL createNewGame('%s', '%s', @game_id)", $game_name, $scenario_id);
if ($loglevel > 1) {
  fprintf ($logfile, "SQL=%s", $sql);
}

$result = mysqli_query ($conn, $sql);


if ($loglevel > 0) {
  if ($result == TRUE) {
	  fwrite($logfile, "Success\n");
  }
	else {
    fwrite($logfile, "Error\n");
    die ("Error " . mysqli_error($conn));
	}
}

$sql = "SELECT @game_id as _game_id";
if ($loglevel > 1) {
  fprintf ($logfile, "SQL=%s", $sql);
}

$result = mysqli_query ($conn, $sql);

if ($loglevel > 0) {
  if ($result == TRUE) {
	 fwrite($logfile, "Success\n");
  }
  else {
	  fwrite($logfile, "Error\n");
	  die ("Error " . mysqli_error($conn));
	}
}

$row = $result->fetch_assoc();
$game_id = $row['_game_id'];

fprintf ($logfile, "Return value: %s\n", $game_id );


// And return the new game_id
echo $game_id;
 

mysqli_close($conn);
fclose($logfile);