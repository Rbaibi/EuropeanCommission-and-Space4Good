<?php

function get_default_target_user(){
    return "consumer1";
}

function wrap($str){
    return "'" . $str . "'";
}

function insert_into($conn,$table,$columns_arr,$values_arr){
    $sql = "insert into " . $table . "(" . implode(",",$columns_arr) . ") values (" . implode(",",$values_arr) . ");";
    return mysqli_query($conn,$sql);
}

?>