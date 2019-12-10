var $ = {
    ajax({
        method,
        url,
        ascyn = true,
        data,
        datatype = "",
        success
    }) {
        var req = new XMLHttpRequest();
        if (method == "post") {
            req.open("post", url, ascyn);
            // post两种方法
            // 1.字符串集的方法
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (data) {
                if (typeof data == "object") {
                    var dataStr = "";
                    for (var key in data) {
                        dataStr += key + "=" + data[key] + "&";
                    }
                    data = dataStr.substring(0, dataStr.length - 1);
                    req.send(data);
                } else if (typeof data == "string") {
                    req.send(data);
                }

            } else {
                req.send();
            }

        } else if (method == "get") {
            if (data) {
                if (typeof data == "string") {
                    req.open("get", url + "?" + data, ascyn);
                } else if (typeof data == "object") {
                    var dataStr = "";
                    for (var key in data) {
                        dataStr += key + "=" + data[key] + "&";
                    }
                    data = dataStr.substring(0, dataStr.length - 1);
                    req.open("get", url + "?" + data, ascyn);
                }

            } else {
                req.open("get", url, ascyn);
            }

            req.send();
        }




        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                // console.log(req.responseText);
                if (datatype == "json") {
                    var result = JSON.parse(req.responseText);
                } else {
                    var result = req.responseText;
                }
                if (success) {
                    success(result);
                }
            }
        }
    }



    // ajax({
    //     method: "post",
    //     url: "../add.php",
    //     ascyn: true,
    //     data: {
    //         name: "asdasd",
    //         pwd: 123123,
    //         phone: 17293567265,
    //         age: 23
    //     },
    //     datatype: "json",
    //     success: function(res) {
    //         console.log(res);
    //     }
    // });

}