const crypto = require("crypto"); // Node 自带API 

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1909"; // 123456789  1w2u3h4a5n61798099

exports.aesEncrypt = aesEncrypt; // 加密
exports.aesDecrypt = aesDecrypt; // 解密
exports.keys = keys; // 密钥


// a.  请求头 没有 token  
// b.  前端 发送 的请求头的 token 与 存储 在后台 的token 不一样  
// c.  请求头 有 token    后端 存储 token 已经消失

//注册登录 不需要检验token
//反向代理

// 写一个检验token的函数      
exports.checkToken = function(req, res, next) {
    console.log("path===" + req.path);
    if (req.path !== "/vue/login" && req.path !== "/vue/register") {
        const client_token = req.headers.token;
        const server_token = req.session.token;
        console.log(client_token);
        console.log(server_token);
        if (client_token) {
            if (server_token) {
                if (client_token == server_token) {
                    next();
                } else {
                    res.json({
                        code: "10000",
                        msg: "token不匹配，请重新登录",
                    });
                }
            } else {
                res.json({
                    code: "10000",
                    msg: "token已经过期，请重新登录",
                });
            }
        } else {
            res.json({
                code: "10000",
                msg: "token不存在，请重新登录",
            });
        }
    } else {
        next();
    }

}