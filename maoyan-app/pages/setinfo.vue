<template>
    <div class="setinfo">
        <Head :title="title"></Head>
            <div class="wrapbox"></div>
           <van-cell-group  :model="form">
             <van-field
                v-model="form.mobile"
                required
                clearable
                label="手机号"
                right-icon="question-o"
                @click-right-icon="$toast('question')"
            />
            <van-field
                v-model="form.username"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入您的用户名"
                aria-disabled
                @click-right-icon="$toast('question')"
            />
            <van-field
                v-model="form.email"
                required
                clearable
                label="邮箱"
                right-icon="question-o"
                placeholder="请输入您的邮箱"
                @click-right-icon="$toast('question')"
            />
            <van-field
                v-model="form.address"
                required
                clearable
                label="地址"
                right-icon="question-o"
                placeholder="请输入您的地址"
                @click-right-icon="$toast('question')"
            />
            </van-cell-group>
            <div class="leave">
                <van-button type="info" @click="onSave" class="btn">保存</van-button>
                <van-button type="danger" @click="leavelogin" class="btn">退出登录</van-button>
            </div>
    </div>       
</template>


<script>
import {mapState,mapActions,mapMutations} from "vuex";
export default {
    data(){
        return {
            title:"设置",
            areaList:{},
            searchResult: [],
            form:{},
        }
    },
    computed:{
        ...mapState(['msg','userinfo']),
    },
    methods:{
        ...mapMutations(['setuserinfo']),
  
        onSave(){
           this.$axios.get("/api/updateuserinfo",{params:this.form}).then(res=>{
               this.setuserinfo(this.form);
               console.log(res.data.msg);
               this.$notify({color: '#ad0000',background: '#ffe1e1',type: 'success', message: res.data.msg });
           })
        },
        leavelogin(){
            sessionStorage.clear();
            this.$router.push("/login");
        },    
    },
    mounted(){
       this.form=this.userinfo;
    },
}
</script>


<style  scoped>
    .leave{
        width: 100%;
        padding: 32px 16px;
    }
    .btn{
        width: 100%;
        margin-top: 5px;
    }
    .wrapbox{
        height: 50px;
    }

</style>
