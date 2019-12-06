<template>    
    <div class="userinfo">
        <Head :title="title"></Head>
        <div class="con">
            <van-cell-group >
                <van-field
                    :value="userinfo.username"
                    label="用户名"
                    left-icon="contact"
                    disabled
                />
                 <van-field
                    :value="userinfo.mobile"
                    label="手机号码"
                    left-icon="coupon-o"
                    disabled
                />
                 <van-field
                    :value="userinfo.email"
                    label="邮箱"
                    left-icon="free-postage"
                    disabled
                />
                 <van-field
                    :value="userinfo.address"
                    label="地址"
                    left-icon="location-o"
                    disabled
                />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from "vuex";
export default {
    data(){
        return {
            title:"个人信息",
        }
    },
    // watch:{
    //     userinfo:function (val) {
    //         this.fullName = val ;
    //     },
    // },
    computed:{
        ...mapState(['userinfo']),
    },
    methods:{
        ...mapActions([]),
    },
    mounted(){
        console.log(sessionStorage.mobile);
    },
    updated(){
        
    }
}
</script>

<style scoped>
    .con{
        margin-top: 50px;
    }
    
</style>