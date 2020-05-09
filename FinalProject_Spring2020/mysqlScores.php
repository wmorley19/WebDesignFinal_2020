<!-- this file connects to the database to post the score/name of the user after they stop playing-->

<?php

$host = "localhost:3308";
$user = "root";
$psw = "";
$dbname = "snakeball";

$conn = mysqli_connect("$host","$user", "$psw", "$dbname");
//$sql ="INSERT INTO highscore(name,score)VALUES('".$p."','".$s."')";

if($conn == false){
	die("mysql is not connected");
}
else{
	$p = $_REQUEST["player"];
	$s = $_REQUEST["score"];
	$sql ="INSERT INTO highscore(name,score)VALUES('".$p."','".$s."')";
	//$sql = "INSERT INTO 'highscore(name,score)'VALUES('Billy', 5)";
	echo("we are connected");

}
if(mysqli_query($conn, $sql)){
	echo("YAY");
}
else{
	echo("BOOO");
}

mysqli_close($conn);
?>