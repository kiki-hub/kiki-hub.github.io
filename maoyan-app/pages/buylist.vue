<template>
    <div class="buymovielist">
        <Head :title="title"></Head>
            <div class="buylist">
                <div class="movie"  v-for="(buymovie,i) in buylist" :key="i">    
                <div class="img">
                    <img :src="buymovie.img|imgSrc" alt="">
                </div>
                <div class="content">
                    <h3>{{buymovie.nm}}</h3>
                    <p>观众评:<span>{{buymovie.sc}}</span></p>
                    <p>主演:{{buymovie.star}}</p>
                    <p>{{buymovie.showInfo}}</p>
                </div>
                <div class="buynumbox">
                   <div class="buynum">
                       ×{{buymovie.buynum}}
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title:"我的订单",
            buylist:[],
        }
    },
    watch:{
        buylist:function(val){
            this.buylist=val;
        }
    },
    mounted(){
        this.$axios.get("/api/getbuymovielist",{params:{
            mobile:sessionStorage.mobile,
        }}).then(res=>{
            console.log(res.data.result);
            this.buylist=res.data.result;
        })
    }
}
</script>

<style scoped>
    .buylist{
        width: 100%;
        margin-top: 50px;
    }

    .movie{
        width: 100%;
        padding:12px 32px;
        display:flex;
        justify-content: space-between;
    }
    
    .img{
        width: 64px;
        height: 90px;
        /* border: 1px solid #000; */
        margin-right:8px;
    }
    .img >img{
        display: block;
        width: 64px;
        height: 90px;
    }
    .content{
        flex: 1;
        min-width: 210px;
        height: 90px;
    }
    .content >h3{
        font-size: 17px;
        color: #333;
        font-weight: 700;
        padding-right: 5px;
    }
    .content >p{
        font-size: 13px;
        color: #666;
        margin-top: 6px;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .content >p >span{
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }
    .buynumbox{
        width: 47px;
        float: right;
    }
    .buynumbox .buynum{
        width: 47px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: grey;
        border: 0;
        border-radius: 4px;
        white-space: nowrap;
        font-size: 12px;
        margin-top:50px;
    }

</style>