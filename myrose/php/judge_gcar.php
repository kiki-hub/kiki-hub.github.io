<?php
    @require_once("configcommon.php");

    $id=$_GET["id"];

    $sqlstr="SELECT buy_num FROM `formy_goodscar` where id_num='$id';";
    $result=mysql_query($sqlstr);

    $all=array();
    while($item=mysql_fetch_assoc($result)){
        $all[]=$item;
    }

    echo json_encode($all);
?>