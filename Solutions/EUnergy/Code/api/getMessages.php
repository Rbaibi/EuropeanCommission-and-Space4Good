<?php
include ('db.php');
include_once("base.php");

header("Content-Type:application/json");

$status['type'] = "OK";
$status['code'] = 200;
$status['message'] = "Database is available.";
$status['error'] = false;
$result = mysqli_query($con, "SELECT * FROM `messages`");
$count = 0;

$data = array();

foreach($result as $row){
    $user['id'] = $row['id'];
    $user['message'] = $row['message'];
    $user['fromNumber'] = $row['fromNumber'];
    $user['block_link'] = $row['block_link'];
    $currentuser[$count] = $user;
    $data['user'] = $currentuser;

    $count+= 1;
}

$response['status'] = $status;
$response['data'] = $data;
response($response);

function response($response)
	{
	$json_response = json_encode($response);
	echo $json_response;
	}

?>