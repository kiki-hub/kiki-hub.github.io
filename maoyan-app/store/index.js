import Vue from "vue";
import Vuex from "vuex";
import { http } from "../plugins/axios";

// 显示声明
Vue.use(Vuex);

// 每一个 Vuex 应用的核心就是 store（仓库）  
// store 容器   包含着你的应用中大部分的状态 (state)   this.$store.state  store.state 
// Vuex 的状态存储是响应式的 
// 你不能直接改变 store 中的状态(state)  改变 store 中的状态的唯一途径就是显式地提交 (commit)  mutations 

// vuex 所有的逻辑通过 store 实现 

const store = () => new Vuex.Store({
    state: {
        mobile: sessionStorage.mobile,
        num: 2000,
        msg: "Are you ok",
        userinfo: {},
        movieList: {},
        city: "武汉",
    },
    actions: {

    },
    mutations: {
        setuserinfo(state, result) {
            state.userinfo = {...state.userinfo, ...result };
        },
        changecity(state, city) {
            state.city = city;
        }
        // setmovieList(state, result) {
        //     state.movieList = {...state.movieList, ...movieList };
        // }
    }
});


export default store;