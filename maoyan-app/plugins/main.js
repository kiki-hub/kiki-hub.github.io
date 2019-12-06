import Vue from "vue";


//使用全局样式
// import "../style/index.scss";

// 引入vuex
import store from "../store";

// 使用vue-resource 
import VueResource from "vue-resource";
Vue.use(VueResource); // this.$http.get  Vue.http

// 使用axios
import { http } from "./axios";
Vue.prototype.$axios = http; // this.$axios = axios

// 注册全局组件头部
import Head from "../components/Head.vue";
Vue.component("Head", Head);


// 注册全局组件尾部
import Footer from "../components/Footer.vue";
Vue.component("Footer", Footer);

//自定义指令


// 自定义过滤器

Vue.filter("imgSrc", value => {
    if (!value) return value;
    value = value.replace("/w", '/128');
    value = value.replace(".h/", ".180/");
    return value;
})

Vue.filter("btnflag", value => {
    if (!value) return value;
    if (value === "true") {
        value = true;
    } else {
        value = false;
    }
    return value;
})