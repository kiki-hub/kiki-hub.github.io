const crypto = require("crypto"); //node自带模块

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