<?php
    @require_once("configcommon.php");

    $sqlstr="delete from `formy_goodscar`;";
    // insert into `formy_goodscar` (id_num,goods_img,goods_name,goods_size,buy_num,goods_allprice,goods_price)  values(54,"htun1.png","海豚项链","均码（可调节）",1,1780,1780)
    mysql_query($sqlstr);//没必要接收结果

    //此方法用来获取被影响的行数
    $row = mysql_affected_rows();
    $msg = array();  // { status: true, msg: "新增成功！"}
    if($row>0){
        $msg["status"] = true;
        $msg["msg"]="删除成功";  
    }else{
        $msg["status"] = false;
        $msg["msg"]="删除失败";
    }

    echo json_encode($msg);
?>