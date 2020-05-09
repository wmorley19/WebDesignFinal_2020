<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "willmorley";
$password = "Grizzlies19";
$dbname = "snakeball";

$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$n = $_REQUEST["n"];
$s = $_REQUEST["s"];

$sql = "INSERT INTO highscores (name, score) VALUES ('" . $n . "', '" . $s . "')";
echo $sql;

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>