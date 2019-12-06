<template>
  <div>
    <van-nav-bar title="当前城市" @click-left="onClickLeft">
      <van-icon size="20px" color="#2c3e50" name="cross" slot="left" />
    </van-nav-bar>
    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <div class="selectcity">
      <div class="gpscity">
        <p class="citytitle">GPS定位你所在城市</p>
        <p class="citystyle">定位失败</p>
      </div>
      <div class="hotcity">
        <p class="citytitle">热门城市</p>
        <div class="bsgs">
          <p class="citystyle bsg" @click="gotocity($event)">北京</p>
          <p class="citystyle bsg" @click="gotocity($event)">上海</p>
          <p class="citystyle bsg" @click="gotocity($event)">广州</p>
          <p class="citystyle bsg" @click="gotocity($event)">深圳</p>
        </div>
      </div>
    </div>
    <van-index-bar :index-list="numList">
      <div v-for="(a,i) in numList" :key="i">
        <van-index-anchor :index="a" />
        <van-cell
          :title="p.name"
          v-for="(p,index) in cityList.filter(item=>item.pinyin.slice(0,1).toUpperCase().indexOf(a)!==-1)"
          :key="index"
          @click="gotocity($event)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      value: "",
      cityList: [],
      numList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  methods: {
    ... mapMutations(['changecity']),
    onClickLeft() {
        this.$router.go(-1);
    },
    gotocity(e) {
      var city = e.currentTarget.innerText;
      console.log(city);
      this.changecity(city);
      this.$router.go(-1);
    },
    
  },
  mounted() {
    this.$axios.get("/api/city").then(res => {
      this.cityList = res.data.result;
    });
  },
  watch: {
    cityList: function(val) {
      this.cityList = val;
      console.log(this.cityList);
    }
  }
};
</script>

<style scoped>
.selectcity {
  width: 100%;
  height: 200px;
  padding: 15px;
  background: #fff;
}
.citystyle {
  width: 100px;
  height: 30px;
  text-align: center;
  background-color: #f4f4f4;
  line-height: 30px;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0 7.5px;
  font-size: 14px;
  color: #191a1b;
  margin-bottom: 10px;
}
.citytitle {
  font-size: 13px;
  color: #797d82;
  margin-bottom: 10px;
}
.bsg {
  float: left;
}
</style>
