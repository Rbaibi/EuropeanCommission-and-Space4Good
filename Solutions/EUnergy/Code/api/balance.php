<?php
include_once("base.php");
header("Content-Type:application/json");

if ( $_SERVER["REQUEST_METHOD"]=="GET" ){

    include ('db.php');

	$status['type'] = "OK";
	$status['code'] = 200;
	$status['message'] = "Database is available.";
	$status['error'] = false;

	include_once("base.php");

    $sql = "SELECT SUM(amount) AS total FROM transactions where targetuser='" . get_default_target_user() . "';";

    //echo($sql);

    $result = mysqli_query($con, $sql);

    $myrow = mysqli_fetch_array($result);

    $user['balance'] = $myrow['total'];
    $data['user'] = $user;

	$response['status'] = $status;
	$response['data'] = $data;
}else{

	$status['type'] = "Bad Request";
	$status['code'] = 400;
	$status['message'] = "must be GET request";
	$status['error'] = true;
	$response['status'] = $status;

}



response($response);

function response($response){

    $json_response = json_encode($response);
    echo $json_response;
}

?>

