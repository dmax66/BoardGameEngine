<?php

//
// UPDATE_LEADER (game_id, leader_id, x, y, orientation, mode, zOrder, parentId)


$servername = "localhost";
$username = "game_engine_user";
$password = "3etomerG";

$logfile = fopen("../../log/app.log", "a+") or die ();
$loglevel = 2;

if ($loglevel > 0) fwrite ($logfile, "Entering " . __FILE__ , "\n");

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


$sql = sprintf("UPDATE Leaders_Dynamic_Data SET x=%i, y=%i, orientation='%s', mode='%s', zOrder=%i, parentId=%s" ,
  $_GET['id'],
  $_GET['x'],
  $_GET['y'],
  $_GET['orientation'],
  $_GET['mode'],
  $_GET]'zOrder'],
  if ($_GET['parentId'] == "" ? 'NULL' : $_GET['parentId']);

if ($loglevel > 1) fwrite($logfile, "SQL query: %s\n", $sql); 



if ($loglevel > 0) fwrite($logfile, "Querying result...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if (mysqli_num_rows($result) > 0) 
{
	$outp = $result->fetch_all(MYSQLI_ASSOC);
	if ($loglevel > 0) fwrite($logfile, "Success\n");
	if ($loglevel > 1) fwrite($logfile, "Result set: %s\n, $outp");
	echo json_encode($outp);
} 
else
{
	echo "";
	if ($loglevel > 0) fwrite($logfile, "No rows\n");
}

mysqli_close($conn);
fclose($logfile);