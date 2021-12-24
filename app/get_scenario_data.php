<?php
// Load from the database a list of scenarios and return the values

include 'db_params.php';
include 'log.php';


$scenario_id = $_GET['scenario_id'];

if ($loglevel > 0) fprintf ($logfile, "Entering %s, scenario_id=%s", __FILE__, $scenario_id);

// Create database connection
if ($loglevel) fwrite ($logfile, "Opening connection...");
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error)
{
	fwrite ($logfile, "failed\n");
	die("ERROR: can't open connection");
}
else fwrite ($logfile, "success\n");


$sql = "USE " . $schemaname;;
$result = mysqli_query($conn, $sql);

$sql = sprintf ("SELECT * FROM Scenarios WHERE ID='%s'", $scenario_id);
if ($loglevel > 1) fprintf($logfile, "SQL=%s\n", $sql);
if ($loglevel > 0) fwrite($logfile, "Querying result...");

$result = mysqli_query($conn, $sql);

if ($loglevel > 0) fwrite($logfile, "done\n");


if (mysqli_num_rows($result) > 0) 
{
	$outp = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($outp);
	
	if ($loglevel > 0) fwrite($logfile, "Result set OK\n");
} 
else
{
	echo "ERROR: no rows";
	if ($loglevel > 0) fwrite($logfile, "No rows\n");
}

mysqli_close($conn);
fclose($logfile);
