<?php
    @require_once("configcommon.php");//引入公用的外部PHP

    $sqlstr="SELECT * FROM `formy_htunlist`;";
    $result=mysql_query($sqlstr);

    $all=array();

    while($item=mysql_fetch_assoc($result)){
        $all[]=$item;
    }

    // print_r($all);
    // 最后得到json数据
    echo json_encode($all);




?>