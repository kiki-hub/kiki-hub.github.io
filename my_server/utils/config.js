const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4Fi3DqtcKnhU9oZzgj7m',
  accessKeySecret: '0m3Ibvb4MGaqgK4y2KJZJs47iMudci',
  endpoint: 'https://dysmsapi.aliyuncs.com',  //阿里云发送验证码的接口
  apiVersion: '2017-05-25'
});


exports.sendCode = function (code,mobile) {
  var params = {
      "RegionId": "cn-hangzhou",
      "PhoneNumbers": mobile, //手机号
      "SignName": "你的丝芙兰",
      "TemplateCode": "SMS_179286072",
      "TemplateParam":'{code:'+ code +'}' //验证码
  }

  var requestOption = {
      method: 'POST'
  };



  return client.request('SendSms', params, requestOption); //SendSms短信发送
}


// var params = {
//   "RegionId": "cn-hangzhou"
// }

// var requestOption = {
//   method: 'POST'
// };

// client.request('QuerySendDetails', params, requestOption); //短信查询


// module.exports=client;
