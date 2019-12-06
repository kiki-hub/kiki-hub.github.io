<template>
    <div>
        <div class="future">
        
            <h3>最近好看</h3>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(smovie,index) in fonemovies" :key="index">
                        <img :src="smovie.img" alt class="swiperimg" /><br>
                        <div class="minfo">
                            <p class="mname">{{smovie.nm}}</p>
                            <p class="mtime">{{smovie.comingTitle}}</p>
                        </div>
                    </div>
                </div>
            </div>

        <div class="movie" v-for="(movie,i) in ftwomovies" :key="i">
            <div class="img">
                <img :src="movie.img|imgSrc" alt="">
            </div>
            <div class="content">
                <h3>{{movie.nm}}</h3>
                <p><span>{{movie.wish}}</span>想看</p>
                <p>主演:{{movie.star}}</p>
                <p>{{movie.rt}}上映</p>
            </div>
            <div class="button" >
                <button v-if="movie.showst===4" class="prebuy">预售</button>
                <button v-else class="wantsee">想看</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           fonemovies:[],
           ftwomovies:[],
        }
    },
    mounted(){
    this.$axios.get("/api/fonemovies").then(res=>{
        this.fonemovies=res.data.result;
        console.log(res.data.result);
    });

    this.$axios.get("/api/ftwomovies").then(res=>{
    //   console.log(res.data.result);
    //   console.log(this);
        this.ftwomovies=res.data.result;
    });
    
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer: true,
        observeParents: true

    });
    document.body.style.backgroundColor = "#f4f4f4";

  },
}
</script>


<style scoped>
    .movie{
        width: 100%;
        padding:12px 32px;
        display:flex;
        justify-content: space-between;
        background: #fff;
    }
    
    .movie .img{
        width: 64px;
        height: 90px;
        /* border: 1px solid #000; */
        margin-right:8px;
    }
    .movie .img >img{
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

    .button .prebuy{
        background-color: #3c9fe6;
    }

    .button .wantsee{
        background-color: #faaf00;
    }



    /*       swiper      */

    h3{
        font-size: 16px;
        font-weight: 400;
        color: #000;
        margin-left: 15px;
        margin-top: 15px;
    }

    .swiper-container {
        width: 100%;
        height: 180px;
        margin: 15px auto;
        padding: 10px;
        background-color: #fff;
    }
    .swiper-wrapper{
        position: relative;
        width:100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: transform;
        box-sizing:content-box;
    }
    .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: top;
    position: relative;
    }
    .swiperimg {
        display: block;
        width: 100%;
        height:70%;
    }
    .minfo{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height:30%;
    }
    .minfo .mname{
        width: 100%;
        font-size: 10px;
        color: #000;
    }
    .minfo .mtime{
        width: 100%;
        font-size: 8px;
        color: #000;
    }
    
    
</style>