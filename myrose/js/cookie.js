/* 
    name    string      键
    value   string      值
    day     number      有效事件
    path    string      路径
*/

// cookie 的创建(键值对  name=value)
function setCookie(name, value, day, path = "/") {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + date.toGMTString() + ";path=" + path;
}


// 获取cookie  根据对应的键获取对应的值
// getCookie("user");
function getCookie(name) {
    var cookie = document.cookie;
    var dataList = cookie.split("; "); //用"; "分割
    var obj = {}
    for (var i = 0; i < dataList.length; i++) {
        var item = dataList[i].trim(); // 去除首尾空格
        var key = item.split("=")[0];
        var val = item.split("=")[1];
        obj[key] = val;
    }
    console.log(obj);
    if (obj[name]) {
        return obj[name];
    } else {
        return "";
    }
}