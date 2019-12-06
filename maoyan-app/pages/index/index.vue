<template>
    <div class="hot">
        <div class="movie" v-for="(movie,i) in movieList" :key="i">
            <div class="img">
                <img :src="movie.img" alt="">
            </div>
            <div class="content">
                <h3>{{movie.nm}}</h3>
                <p>观众评:<span>{{movie.sc}}</span></p>
                <p>主演:{{movie.star}}</p>
                <p>{{movie.showInfo}}</p>
            </div>
            <div class="button">
                <button v-if="movie.globalReleased" class="buy" @click="buymovies(movie)">购票</button>
                <button v-else class="prebuy">预售</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
    data(){
        return{
            movieList:[],
        }
    },
    methods:{
        buymovies(movie){
           this.$axios.get("/api/insertbuymovielist",{params:movie}).then(result=>{
               console.log(result.data.msg);
           });
       },
    },
    mounted(){
    this.$axios.get("/api/movies").then(res=>{
    //   console.log(res.data.result);
    //   console.log(this);
        this.movieList=res.data.result;
    });
  },
  updated(){
       
  },
}
</script>


<style scoped>
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
    .button{
        width: 47px;
        float: right;
    }
    .button >button{
        width: 47px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        border: 0;
        border-radius: 4px;
        white-space: nowrap;
        font-size: 12px;
    }

    .button .buy{
        background-color: #f03d37;  
    }

    .button .prebuy{
        background-color: #3c9fe6;
    }
</style>