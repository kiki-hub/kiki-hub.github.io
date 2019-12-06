<template>
    <div class="footer">
        <van-tabbar v-model="active">
            <van-tabbar-item name="home" icon="video-o" to="/">电影</van-tabbar-item>
            <van-tabbar-item name="cinema" icon="shop-o" to="/cinema">影院</van-tabbar-item>
            <van-tabbar-item name="mine" icon="user-o" to="/mine">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
          active:this.gl
        }
    },
    props:['gl'],
}
</script>

<style scoped>
    .van-tabbar-item{
        font-size: 14px;
    }
    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
    }
</style>