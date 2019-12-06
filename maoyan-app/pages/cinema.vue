<template>
    <div class="cinema">
         <Head :title="title"></Head>
         <div class="content">
              <div class="top">
                <div class="city" @click="gotocitylist">
                   <span class="city-name">
                       {{city}}
                       <van-icon name="arrow-down"/>
                   </span>                 
                </div>
                <div class="search" @click="gotosearch">
                   <van-icon name="search" />
                   <span>搜影院</span>
                </div>
              </div>
              <div class="con">
                <van-dropdown-menu active-color="#ee0a24" class="menu">
                    <van-dropdown-item v-model="value1" :options="option1" />
                    <van-dropdown-item v-model="value2" title="品牌" :options="option2" />
                    <van-dropdown-item v-model="value3" :options="option3" />
                </van-dropdown-menu>
                <div class="wrapbox"></div>
                <div class="mhouseCon" v-for="(mhouse,i) in mhouseList" :key="i">    
                    <div class="mhouse">
                        <div >
                            <span class="mhouseName">{{mhouse.nm}}</span>           
                            <span >
                                <span class="mhousePrice">{{mhouse.sellPrice}}</span><span class="q">元起</span>
                            </span>            
                        </div>
                        <div class="maddress">
                            <div class="mhouseAdd">{{mhouse.addr}}</div>           
                            <div class="mhouseLong">{{mhouse.distance}}</div>           
                        </div>	
                        <div class="somelabel">      
                            <div class="allowRefund">退</div>
                            <div class="endorse">改签</div>
                            <div class="snack">小吃</div>
                            <div class="vipTag">折扣卡</div>
                            <div class="hallType">4K厅</div>          
                        </div>
                        <div class="msg">
                            <div class="img">
                                <img src="../static/images/k1.png" alt="">
                            </div>
                            <div class="news">
                                开卡特惠，首单2张最高立减6元
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
         </div>          
         <Footer :gl="active" />
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data(){
        return{
            title:"影院",
            active:"cinema",
            mhouseList:[],    
            value1: 0,
            value2: '',
            value3: 'a',
            option1: [
                { text: '全城', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '万达影城', value: 'a' },
                { text: '大地影院', value: 'b' },
                { text: '耀莱成龙国际影城', value: 'c' },
                { text: '保利国际影城', value: 'd' },
                { text: '博纳国际影城', value: 'e' },
                { text: '星美国际影城', value: 'f' },
                { text: 'CGV影城', value: 'g' },
            ],
            option3: [
                { text: '特色', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' },
            ] 
        }
    },
    computed:{
        ...mapState(['city']),
    },
    methods:{
        gotosearch(){
            this.$router.push("/search");
        },
        gotocitylist(){
            this.$router.push("/position");
        }
    },
    mounted(){
        this.$axios.get("/api/mhouseList").then(res=>{
            this.mhouseList=res.data.result;
        })
    }
}
</script>


<style  scoped>
    .content{
      margin-top: 50px;
    }
    .top{
        position: fixed;
        left: 0;
        top: 50px;
        width: 100%;
        height: 44px;
        font-size: 14px;
        color: #777;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .top .search{
        flex: 1;
        display: flex;
        background-color: #fff;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        height: 28px;
        font-size: 13px;
        color: #b2b2b2;
        margin-left: 18px;
        border: .5px solid #e6e6e6;
        border-radius: 5px;
        margin-right: 15px;
    }
    .city{
        margin-left: 15px;   
    }
    .city .city-name{
        display: block;
        width: 50px;
        height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 28px;
    }
    .cinema .con{
        margin-bottom: 100px;
    }

    .cinema .con .menu{
        width: 100%;
        position: fixed;
        left: 0;
        top: 94px;
    }

    .cinema .con .wrapbox{
        height: 94px;
    }
    .mhouseCon{
        width: 100%;  
        padding: 0 15px;
    }
    .mhouseCon .mhouse{
        padding: 15px 0;
        /* background-color:pink; */
        line-height: 23px;
        font-size: 16px;
        color: #000;
        border-bottom: 1px solid #f5f5f5;
    }
    .mhouseCon .mhouse .mhouseName{
        line-height: 23px;
        font-size: 16px;
        color: #000;
    }
    .mhouseCon .mhouse .mhousePrice{
        color: #f03d37;
        font-size: 18px;
    }
    .mhouseCon .mhouse .q{
        margin-left: 3px;
        font-size: 11px;
        color: #f03d37;
    }
    .mhouseCon .mhouse .mhouseAdd{
        font-size: 13px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .mhouseCon .mhouse .mhouseLong{
        font-size: 13px;
        color: #666;
        margin-left: 5px;
    }
    .mhouseCon .mhouse .maddress{
        display: flex;
        justify-content: space-between;
    }
    .mhouseCon .mhouse .somelabel{
        display: flex;
    }
    .mhouseCon .mhouse .somelabel >div{      
        margin: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        font-size: 0.6rem;
    }
    .mhouseCon .mhouse .somelabel .allowRefund{
        color: #589daf;
        border: 1px solid #589daf;
    }
    .mhouseCon .mhouse .somelabel .endorse{
        color: #589daf; 
        border: 1px solid #589daf;
    }
    .mhouseCon .mhouse .somelabel .snack{
        color: #f90;
        border: 1px solid #f90;
    }
    .mhouseCon .mhouse .somelabel .vipTag{
        color: #f90;
        border: 1px solid #f90;
    }
    .mhouseCon .mhouse .somelabel .hallType{
        color: #589daf; 
        border: 1px solid #589daf;
    }
    .mhouseCon .mhouse .msg{
        display:flex;
    }
    .mhouseCon .mhouse .msg .img{
        width: 15px;
        height: 14px;
        margin-right: 5px;
    } 
    .mhouseCon .mhouse .msg .img >img{
        width: 15px;
        height: 14px;
    }
    .mhouseCon .mhouse .msg .news{
        font-size: 12px;
        color: #999;
    }

</style>