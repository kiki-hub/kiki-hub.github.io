<template>
    <div class="demo">
        <h3>我是demo测试页面</h3>
    </div>
</template>


<script>
export default {
    mounted(){
        var time=new Date();
        console.log(time);
        this.$axios.get("/demo").then(res=>{
            console.log(res);
        })
    }
}
</script>