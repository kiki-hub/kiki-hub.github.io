import axios from "axios";


var token = "";
// axios.defaults.baseURL = "http://localhost:1909/"; // 应用的基路径 
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import { Loading } from 'element-ui';
import { Message } from 'element-ui';

var loadingInstance = null;

export function Toast(msg, type, duration) {
    var duration = duration || 800;
    var type = type || "success";
    Message({
        type,
        message: msg,
        center: true,
        duration
    })
}

// axios 拦截器   Interceptors

// 请求 request 拦截器   请求之前业务逻辑 配置 data /headers
/*
axios.interceptors.request.use(function(config) {
    console.log(config);
    token = sessionStorage.token ? sessionStorage.token : "";
    // console.log(token);
    config.headers['token'] = token;
    // 请求发送之前做的事情
    loadingInstance = Loading.service({
        lock: false,
        text: '正在登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
    });
    return config;
}, function(error) {
    // 请求发送失败做的事情
    console.log("请求失败");
    loadingInstance.close();
    Toast("请求失败-request", "error");
    return Promise.reject(error);
});

*/

// import router from "@/router";

// 响应 response 拦截器   根据返回的状态码 做对应的业务逻辑 
/*
axios.interceptors.response.use(function(response) {
    console.log(response);
    // 获取到响应数据做的事情
    setTimeout(() => {
        loadingInstance.close();
        Toast(response.data.msg);
        if (response.data.code == "10000") {
            // router.push({ name: 'login' });
        }
    }, 1000);

    return response;
}, function(error) {
    // 响应失败
    console.log("响应失败");
    loadingInstance.close();
    Toast("响应失败-response", "error");
    return Promise.reject(error);
});
*/




export const http = axios;