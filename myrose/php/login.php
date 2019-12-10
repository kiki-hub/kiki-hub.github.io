<?php
    @require_once("configcommon.php");

    $userphone=$_POST["userphone"];
    $password=$_POST["password"];

    $sqlstr="SELECT * FROM `formy_userinfo` where userphone='$userphone' and password='$password';";
    $result=mysql_query($sqlstr);

    $all=array();
    while($item=mysql_fetch_assoc($result)){
        $all[]=$item;
    }

    echo json_encode($all);

?>