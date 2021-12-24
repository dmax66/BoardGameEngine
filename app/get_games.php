<?php
// Load from the database a list of scenarios and return the values

include 'db_params.php';
include 'log.php';

if ($loglevel > 0) fprintf ($logfile, "Entering %s\n", __FILE__);

// Create connection
if ($loglevel > 0) fwrite ($logfile, "Opening connection...");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error)
{
	if ($loglevel > 0)fwrite ($logfile, "failed\n");
	die();
}
else if ($loglevel > 0)	fwrite ($logfile, "success\n");


$sql = "USE " . $schemaname;;
$result = mysqli_query($conn, $sql);
if (! $result)
{
  if ($loglevel > 0) fwrite ($logfile, "USE game_engine failed\n");
}


$sql = "SELECT G.gameId AS 'ID', G.name as 'Name', S.Description FROM Games G, Scenarios S WHERE G.scenarioId=S.ID";
if ($loglevel > 1) fprintf ($logfile, "SQL=%s\n", $sql);


if ($loglevel > 0) fwrite($logfile, "Querying result...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if (mysqli_num_rows($result) > 0) 
{
	$outp = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($outp);
	if ($loglevel > 0) fwrite ($logfile, "Result set OK\n");
} 
else
{
	if ($loglevel) fwrite ($logfile, "No rows\n");
	echo "ERROR: no rows";
}

mysqli_close($conn);
fclose($logfile);