<template>
    <div class="search">
        <Head :title="title"></Head>
        <div class="con">
            <form action="/">
                <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
                />
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:"猫眼电影",
        }
    },
    methods:{
        onSearch(){

        },
        onCancel(){
            
        }
    }
}
</script>


<style  scoped>
    .con{
        width: 100%;
        margin-top: 50px;
    }
</style>