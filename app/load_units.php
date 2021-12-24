<?php

include 'db_params.php';
include 'log.php';

$game_id = $_GET["game_id"];

if ($loglevel > 0) fprintf ($logfile, "Entering %s, game_id=%s\n ", __FILE__, $game_id);

// Create connection
if ($loglevel > 0) fwrite ($logfile, "Opening connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error)
{
	fwrite ($logfile, "failed\n");
	die();
}
else if ($loglevel > 0)	fwrite ($logfile, "success\n");


$sql = "USE " . $schemaname;;
$result = mysqli_query($conn, $sql);


$sql = sprintf ("SELECT * FROM Units WHERE gameId = %s", $game_id);


if ($loglevel > 1) fprintf($logfile, "SQL query: %s\n", $sql); 


if ($loglevel > 0) fwrite($logfile, "Launching query...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if (mysqli_num_rows($result) > 0) 
{
  $outp = $result->fetch_all(MYSQLI_ASSOC);	
  
  if ($loglevel > 0) fwrite($logfile, "Success\n");
  echo json_encode($outp);
} 
else
{
	if ($loglevel > 0) fwrite($logfile, "SELECT failed\n");
	die ("ERROR:" . mysqli_error($conn));
}

mysqli_close($conn);
fclose($logfile);