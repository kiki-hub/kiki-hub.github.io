<template >	
	<div>
		<Head :title="title"></Head>
		<div class="con">
			<h2>用户注册</h2>
			<van-cell-group class="register" :model="form">
				<van-field
					v-model="form.mobile"
					label="手机号"
					placeholder="请输入手机号"
				/>
				<van-field
					v-model="form.username"
					required
					clearable
					label="用户名"
					right-icon="question-o"
					placeholder="请输入用户名"
				/>

				<van-field
					v-model="form.password"
					type="password"
					label="密码"
					placeholder="请输入密码"
					required
				/>
				<van-field
					v-model="form.dbpwd"
					type="password"
					label="密码"
					placeholder="请确认密码"
					required
				/>
				<p><router-link to="/login">马上登录</router-link></p>
				<van-button type="info" class="btn" @click="gotoregister">注册</van-button>
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
		gotoregister(){
			console.log(this.form);
			this.$axios.post("/api/register",this.form).then(res=>{
				console.log(res);
				alert(res.data.msg);
				if(res.data.flag){
					this.$router.push({name:'login'});
				}
			});
		}
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
 .register{
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

