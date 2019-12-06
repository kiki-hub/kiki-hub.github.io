<template>
    <div class="mine">
        <!-- <Head :title="title"></Head> -->
        <div class="con">        
            <div class="top">
                 <div class="bell"><van-icon name="bell" class="bellicon" /></div>
                <div class="lmsg">
                    <div class="img">
                         <img src="../static/images/photo.png" alt="">
                    </div>
                    <nuxt-link to="/login" class="loginnav" v-if="userinfo">{{userinfo.username}}</nuxt-link>
                    <nuxt-link to="/login" class="loginnav" v-else>立即登录</nuxt-link>
                </div>
                <div class="minenav">
                    <nuxt-link to="#" class="smallnav">轨迹</nuxt-link>
                    <nuxt-link to="#" class="smallnav">电影</nuxt-link>
                    <nuxt-link to="#" class="smallnav">剧集</nuxt-link>
                    <nuxt-link to="#" class="smallnav">综艺</nuxt-link>
                    <nuxt-link to="#" class="smallnav">书籍</nuxt-link>
                    <nuxt-link to="#" class="smallnav">收藏</nuxt-link>
                </div>
            </div>
            <van-grid square>
            <van-grid-item
                v-for="(icon,i) in iconlist"
                :key="i"
                :icon="icon.iconname"
                :text="icon.text"
            />
            </van-grid>
            <div class="navlan">
                <van-cell title="个人信息" icon="manager-o" is-link  to="/userinfo"/>
                <van-cell title="我的订单" icon="balance-list-o" is-link  to="/buylist"/>
                <van-cell title="设置" icon="setting-o" is-link  to="/setinfo"/>
            </div>
        </div>       
        <Footer :gl="active" />
    </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
    data(){
        return {
            title:"我的",
            active:"mine",
            show: false,
            iconlist:[
            {iconname:"underway",text:"折扣卡"},
            {iconname:"shop-collect",text:"优惠券"},
            {iconname:"gift-card",text:"银行活动"},
            {iconname:"diamond",text:"周边"},
            {iconname:"medel",text:"会员"},
            {iconname:"alipay",text:"支付"},
            {iconname:"map-marked",text:"定位"},
            {iconname:"printer",text:"专享"},
            ],
           userinfo:{},
        }
    },
    methods: {
    showPopup() {
      this.show = true;
    },
     ...mapMutations(['setuserinfo']),
  },
  watch:{
        userinfo:function (val) {
            this.fullName = val ;
        },
    },
  mounted(){
      this.mobile=sessionStorage.mobile?sessionStorage.mobile:"";
      this.$axios.get("/api/getuserinfo",{params:{
            mobile:sessionStorage.mobile,
        }}).then(res=>{
            console.log(res.data.result);
            this.userinfo=res.data.result[0];
            this.setuserinfo(this.userinfo);
            console.log(this.userinfo);
        })
  }

}
</script>

<style scoped>
    html{
        background-color: #e6e6e6;
    }
    .con{
        width: 100%;
    }
    .con .bell{
        width: 100%;
        height: 30px;
        padding: 0 15px;
    }
    .con .bell .bellicon{
        color: #fff;
        float: right;
        margin-top: 10px;
    }
    .top{
        width: 100%;
        height: 150px;
        background:url(https://assets.maizuo.com/h5/v5/public/app/img/bg.6837f67.png
 ) center center;
    }
    .top .lmsg{
        width: 100%;
        height:60px;
        /* background-color: rebeccapurple; */
        display: flex;
        padding-left: 15px;
        line-height: 60px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    .top .lmsg .img{
        width:60px;
        height: 60px;
        border-radius: 60px;
        margin-right: 15px;      
    }
    .top .lmsg .img >img{
        width:60px;
        height: 60px;
        border-radius: 60px;
    }
    .top .lmsg .loginnav{
        color: #000;
    }

    .top .minenav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top:15px;
        color:#fff;
        padding: 0 15px;
    }

    .top .minenav .smallnav{
        font-size: 16px;
        color:#fff;
    }
    
    .con .navlan{
        margin-top: 15px;
    }
</style>