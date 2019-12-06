
import axios from "axios";
import {Toast} from "antd-mobile";
import {history} from "~";
// axios.defaults.baseURL = "http://localhost:1909/";   // 基路径
axios.defaults.baseURL = "https://xiaomengzhen.top:1909/";   // 基路径
var token="";

export function loadingToast(msg) {
    Toast.loading(msg, 2, () => {
      console.log('Load complete !!!');
    });
  }

export function successToast(msg) {
    Toast.hide();
    Toast.success(msg, 2);
  }

export function failToast(msg) {
    Toast.hide();
    Toast.fail(msg, 2);
  }

// axios 拦截器   Interceptors

// 请求 request 拦截器   请求之前业务逻辑 配置 data /headers
axios.interceptors.request.use(function(config) {
    console.log(config); 
    loadingToast("努力加载中...");
    token=sessionStorage.token?sessionStorage.token:"";
    config.headers['token']=token;
    return config;
}, function(error) {
    // 请求发送失败做的事情
    failToast("网络错误！！");
    return Promise.reject(error);
});


// 响应 response 拦截器   根据返回的状态码 做对应的业务逻辑 
axios.interceptors.response.use(function(response) {
    console.log(response);
    if(response.data.code==='400'){
      history.push("/login");
    }
    else{
      successToast(response.data.msg);
    }   
    return response;
}, function(error) {
    // 响应失败
    failToast("服务器响应失败");
    return Promise.reject(error);
});

export {axios}

