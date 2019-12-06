<template >
	
	<div>
		<Head :title="title"></Head>
		<div class="con">		
			<h2>用户登录</h2>
			<van-cell-group class="login" :model="form">
				<van-field
					v-model="form.mobile"
					label="手机号"
					placeholder="请输入手机号"
				/>

				<van-field
					v-model="form.password"
					type="password"
					label="密码"
					placeholder="请输入密码"
					required
				/>
				<p><router-link to="/register">还未注册，立即注册</router-link></p>
				<van-button type="info" class="btn" @click="gotologin">登录</van-button>
			</van-cell-group>
	</div>
	</div>
	
</template>

<script>
export default {
    data(){
		return {
			title:"猫眼电影",
			form:{},
		}
	},
	methods:{
		gotologin(){
		console.log(this.form);
	    this.$axios.post("/api/login",this.form).then(res=>{
			console.log(res);
			if(res.data.flag){
				// 数据缓存
				// sessionStorage.username=res.data.username;
                sessionStorage.mobile=res.data.result.mobile;
				this.$router.push("/");
			}			
		})
		}
	},
	mounted(){
		
	},
	updated(){
		// console.log(this.form);
	}
}
</script>

<style scoped>
.con{
	margin-top: 80px;
}
h2{
	font-size: 20px;
	font-weight: 400;
	text-align: center;
	margin-top: 40px;
}
 .login{
	 width: 100%;
	 padding: 0 32px;
	 margin-top: 40px;
 }
 .btn{
	 width: 100%;
	 height: 40px;
	 font-size: 16px;
	 line-height: 40px;
	 margin-top:20px;
 }
 p{
	 margin-top:20px;
 }
</style>

