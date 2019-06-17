<?php
include_once("base.php");
header("Content-Type:application/json");

if (isset($_GET['text']) && $_GET['text'] != "" && isset($_GET['number']) && $_GET['number'] != "")
	{
	include ('db.php');

	$text = $_GET['text'];
	$number = $_GET['number'];

    $entry["text"]=$text;
    $entry["number"]=$number;

    //insert block into factum blockchain.
    $myresponse = insert_block_into_factum($entry);

    $response_json=json_decode($myresponse);
    //echo($myresponse);
    $block_link=make_link_from_block_hash(json_decode($myresponse)->entry_hash);

    insert_deposit_100($con);

	$result = mysqli_query($con, "INSERT INTO messages (message, fromNumber, block_link) VALUES ('$text', '$number', '$block_link')");
	if ($result === TRUE)
		{


		$status['type'] = "OK";
		$status['code'] = 200;
		$status['message'] = "Message added into the database.";
		$status['error'] = false;

		$status['message'] .= " and block added to chain";
		$status["block info"] = json_decode($myresponse);

		// $response['status'] = $status;

        mysqli_close($con);
        
        $sms = array(
            "from" => "InvestMetric",   /* Can be up to 11 alphanumeric characters */
            "to" => $number,  /* The mobile number you want to send to */
            "message" => "100 Credits has been send.",
          );
          echo sendSMS($sms);
		}
	  else
		{
		$status['type'] = "Not Found";
		$status['code'] = 404;
		$status['message'] = "Message not added into the database.";
		$status['error'] = true;
		}
	}
  else
	{
	$status['type'] = "Bad Request";
	$status['code'] = 400;
	$status['message'] = "The parameters are wrong.";
	$status['error'] = true;
	// response($response);
	}

$response['status'] = $status;
response($response);

function response($response)
	{
	$json_response = json_encode($response);
	echo $json_response;
	}

function get_chain_id(){
    return "086c905173fa90fa1809741f2a0febc0aeea0a058454167973036f04e590218a";
}

function insert_deposit_100($con){
    $sql = "insert into transactions (sourceuser,targetuser,amount) values ('deposit',". wrap(get_default_target_user()) . ");";
    return insert_into(
        $con,
        "transactions",
        array("sourceuser","targetuser","amount"),
        array(wrap("deposit"),wrap(get_default_target_user()),"100")
    );

}

function make_link_from_block_hash($block_hash){
    return "https://explorer.factom.com/chains/".get_chain_id()."/entries/".$block_hash;
}

function insert_block_into_factum($block_contents){

    $curl = curl_init();

    $postfields1['external_ids']=array(base64_encode(json_encode($block_contents)));
    $postfields1['content']=base64_encode(json_encode($block_contents));

    //echo($postfields1);

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://ephemeral.api.factom.com/v1/chains/".get_chain_id()."/entries",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => json_encode($postfields1),
      CURLOPT_HTTPHEADER => array(
        "Content-Type: application/json",
        "app_id: 014a84e7",
        "app_key: e20f9985f1bbfecb7faa2d59cf83693a",
        "cache-control: no-cache"
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
      echo "cURL Error #:" . $err;
      header("Content-Type:text/plain");
    } else {
      return $response;

    }

}

function sendSMS ($sms) {
    $username = "u53836451ffde268b0f728870b62480d3";
    $password = "5C43663742927CB50B9700DEF6B8B29F";
    $context = stream_context_create(array(
      'http' => array(
        'method' => 'POST',
        'header'  => 'Authorization: Basic '.
                    base64_encode($username.':'.$password). "\r\n".
                    "Content-type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($sms),
        'timeout' => 10
    )));
    $response = file_get_contents("https://api.46elks.com/a1/sms",
      false, $context);
  
    if (!strstr($http_response_header[0],"200 OK"))
      return $http_response_header[0];
    return $response;
  }

?>