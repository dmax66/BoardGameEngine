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


$parentId = $_GET['parentId'] == "" ? 'NULL' : $_GET['parentId'];

$sql = sprintf ("UPDATE Leaders_Dynamic_Data SET x=%s, y=%s, orientation=%s, mode='%s', zOrder=%s, parentId='%s' WHERE leaderId='%s' AND gameId=%s",
  $_GET['x'],
  $_GET['y'],
  $_GET['orientation'],
  $_GET['mode'],
  $_GET['zOrder'],
  $parentId,
  $_GET['leaderId'],
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