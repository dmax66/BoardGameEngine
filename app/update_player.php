<?php

//
// UPDATE_LEADER (game_id, leader_id, x, y, orientation, mode, zOrder, parentId)


include 'db_params.php';
include 'log.php';

$loglevel = 2;

if ($loglevel > 0) fprintf ($logfile, "Entering %s\n", __FILE__);

// Create connection
if ($loglevel > 0) fprintf ($logfile, "Opening connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
	fprintf ($logfile, "failed\n");
	die ();
}
else if ($loglevel > 0)	{
  fprintf ($logfile, "success\n");
}

$sql = "USE " . $schemaname;;
$result = mysqli_query($conn, $sql);

$sql = sprintf ("UPDATE Players_Dynamic_Data SET morale=%s WHERE playerId='%s' AND gameId=%s",
  $_GET['morale'],
  $_GET['playerId'],
  $_GET['gameId']);

if ($loglevel > 1) {
  fprintf ($logfile, "SQL query: %s\n", $sql); 
}


if ($loglevel > 0) {
  fprintf ($logfile, "Querying result...");
}

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) {
  fprintf ($logfile, "done - Result:%i", $result);

}

if ($result == TRUE) 
{
  echo "SUCCESS";
} 
else
{
	echo "ERROR - UPDATE failed";
}


mysqli_close($conn);
fclose($logfile);