<?php

    //TODO:
    //this should be the endpoint to get the credit score for producers and consumers. it should make a JSON
    //with their current credit score and their credit score over time

header("Content-Type:application/json");

if (   isset($_GET['username'])  ) {

    $username = $_GET['username'];

    $credit_score_history=array(0,1,0,2,0,3,4,4,4,3,4,5,4,7,7,7);

    //credit score
    $data["credit-score"]=7;
    $data["credit-score-history"]=$credit_score_history;

    //these are the different credit worthiness rating from best to worst

    //AAA AA A BBB BB B CCC C D
    //[8..0] GRANT ALL PRIVILEGES ON api_essen.* TO 'api_essen'@'%' IDENTIFIED BY 'api_essen';



    $status['type']    = "OK";
    $status['code']    = 200;
    $status['message'] = "credit score retrieved";
    $status['error']   = false;

    $response["status"]=$status;
    $response["data"]  =$data;

} else {
    $status['type']    = "Bad Request";
    $status['code']    = 400;
    $status['message'] = "The parameters are wrong. 'username' is the parameter";
    $status['error']   = true;

    $response['status'] = $status;
}

response($response);

function response($response)
{
    $json_response = json_encode($response);
    echo $json_response;
}


?>
