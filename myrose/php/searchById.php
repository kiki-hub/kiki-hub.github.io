<?php
    @require_once("configcommon.php");

    $id=$_GET["id"];

    $sqlstr="SELECT * FROM `formy_htunlist` where id='$id';";
    $result=mysql_query($sqlstr);

    $all=array();
    while($item=mysql_fetch_assoc($result)){
        $all[]=$item;
    }

    echo json_encode($all);

?>