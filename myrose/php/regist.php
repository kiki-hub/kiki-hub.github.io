<?php
    @require_once("configcommon.php");

    $userphone=$_POST["userphone"];
    $password=$_POST["password"];

    // $userphone=$_GET["userphone"];
    // $password=$_GET["password"];

    $sqlstr="insert into `formy_userinfo` (userphone,password)  values('$userphone','$password') ";
    
    mysql_query($sqlstr);//没必要接收结果

//此方法用来获取被影响的行数
    $row = mysql_affected_rows();
    $msg = array();  // { status: true, msg: "新增成功！"}
    if($row>0){
        $msg["status"] = true;
        $msg["msg"]="添加成功";
        
    }else{
        $msg["status"] = false;
        $msg["msg"]="添加失败";
    }

    echo json_encode($msg);
?>