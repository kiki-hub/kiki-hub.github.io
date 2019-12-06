
const jwt = require("jsonwebtoken");

const secret = "wuhan1909daydayup";

// data 需要加密的字段
exports.createToken = function(data){
    return jwt.sign(data,secret);
}

// 解密
const decodeToken = function(token){
    return new Promise(function(resolve,reject){
        jwt.verify(token,secret,function(err,data){
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
exports.decodeToken = decodeToken;



// exports.decodeTokenware = function(req,res,next){
    
// }



// 获取token里面解密的 mobile
exports.getMobile = function(req,res,callback){
    var token = req.headers.token;
    if (token) {
        decodeToken(token).then(mobile => {
            callback(mobile);  // 得到解密的手机号
        }).catch(err => {
            res.json({
                code: '400',
                msg: "无效的token，请重新登录",
                err,
                type: 0
            })
        })
    } else {
        res.json({
            code: '400',
            msg: "token不存在,请立即登录",
            type: 0
        })
    }
}