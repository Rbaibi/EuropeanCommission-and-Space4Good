<?php

// Connect to database

$con = mysqli_connect("vanautrui.org", "api_essen", "api_essen", "api_essen");

if (mysqli_connect_errno())
	{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	die();
	}

?>