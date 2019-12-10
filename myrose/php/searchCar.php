<?php
    @require_once("configcommon.php");


    $sqlstr="SELECT * FROM `formy_goodscar`";
    $result=mysql_query($sqlstr);

    $all=array();
    while($item=mysql_fetch_assoc($result)){
        $all[]=$item;
    }

    echo json_encode($all);

?>