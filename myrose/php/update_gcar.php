<?php
    @require_once("configcommon.php");

    $id_num=$_GET["id"];
    $buy_num=$_GET["buy_num"];          

    $sqlstr="update `formy_goodscar` set `buy_num`=$buy_num where id_num =$id_num";
    // insert into `formy_goodscar` (id_num,goods_img,goods_name,goods_size,buy_num,goods_allprice,goods_price)  values(54,"htun1.png","海豚项链","均码（可调节）",1,1780,1780)
    mysql_query($sqlstr);//没必要接收结果

    //此方法用来获取被影响的行数
    $row = mysql_affected_rows();
    $msg = array();  // { status: true, msg: "新增成功！"}
    if($row>0){
        $msg["status"] = true;
        $msg["msg"]="更新成功";
        
    }else{
        $msg["status"] = false;
        $msg["msg"]="更新失败";
    }

    echo json_encode($msg);
?>