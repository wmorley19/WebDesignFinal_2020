<!-- this file connects to the database to pull the highest scores of SnakeBall game-->

<?php 
$host = "localhost:3308";
$user = "root";
$psw = "";
$dbname = "snakeball";

$conn = mysqli_connect("$host","$user", "$psw", "$dbname");

if($conn == false){
	die("Did not connect");
}
else{

	echo "High Scores";
	echo "<marquee class=\"shadow\"; direction=\"down\"; style =\"max-height:420px;\">";

	$sql = "SELECT * FROM highscore order by score DESC";
	$result = mysqli_query($conn, $sql);
	$count = 0;
	if(mysqli_num_rows($result)>0){
		while(($row = mysqli_fetch_assoc($result)) && ($count <5)){
			echo "<p>"."&nbsp".$row["Name"]. "----". $row["score"]." ";
			$count++;
		}
	}
}
mysqli_close($conn); 
echo "</marquee>";

?>