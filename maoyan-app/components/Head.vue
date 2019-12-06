<template>
    <header>
        <van-nav-bar :title="title" left-text="返回" left-arrow class="h1" @click-left="onClickLeft">
            <van-icon name="search" slot="right" />
        </van-nav-bar>
    </header>
</template>


<script>
export default {
    props:['title'],
    methods:{
        onClickLeft(){
            // Toast('返回');
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
    header{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index:100;
    }

    .h1{
        width: 100%;
        height: 50px;
        background: red;
        font-size: 18px;  
        text-align: center;
        line-height: 50px;
    }

    .van-nav-bar__text{
        color: #fff;
    }
</style>