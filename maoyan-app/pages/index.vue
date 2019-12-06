<template>
  <div class="hot">
    <Head :title="title"></Head>
    <div class="content">
      <div>
        <van-tabs v-model="activeName">
          <van-tab title="正在热映" name="a" to="/"></van-tab>
          <van-tab title="即将上映" name="b" to="/future"></van-tab>
        </van-tabs>
        <nuxt-child></nuxt-child>
      </div>
    </div>
    <Footer :gl="active" />      
  </div>
</template>

<script>

export default {
  data(){
    return{
      title:"猫眼电影",
      activeName:"a",
      active:"home",
    }   
  },
  
  
}
</script>

<style scoped>
    .content{
      margin-top: 50px;
    }
    .van-tabs{
      position:sticky;
      left: 0;
      top:50px;
      z-index: 100;
    }
</style>







