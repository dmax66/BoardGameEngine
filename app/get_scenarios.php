<?php
// Load from the database a list of scenarios and return the values

$servername = "localhost";
$username = "game_engine_user";
$password = "3etomerG";

$logfile = fopen("../../log/app.log", "a+") or die ();
$debug = 1;

if ($debug) fwrite ($logfile, "Entering get_scenarios\n");

// Create connection
if ($debug) fwrite ($logfile, "Opening connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error)
{
	fwrite ($logfile, "failed\n");
	die();
}
else if ($debug)	fwrite ($logfile, "success\n");


$sql = "USE game_engine";
$result = mysqli_query($conn, $sql);


if ($debug) fwrite($logfile, "Launching query...");

$sql = "SELECT id, name FROM Scenarios";

if ($debug) fwrite($logfile, "done\n"); 



if ($debug) fwrite($logfile, "Querying result...");

$result = mysqli_query($conn, $sql);

if ($debug) fwrite($logfile, "done\n");


if (mysqli_num_rows($result) > 0) 
{
	$outp = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($outp);
	if ($debug) fwrite($logfile, "Result set OK\n");
} 
else
{
	echo "";
	if ($debug) fwrite($logfile, "No rows\n");
}

mysqli_close($conn);
fclose($logfile);