<template>
	<div class='content'>
		<el-card class="box-card">
			<el-form :model="ruleForm" :rules='rules' status-icon ref="ruleForm" label-width="80px" size='small' label-suffix=':'>
				<el-form-item label="账号" prop="user">
				    <el-input v-model="ruleForm.user" auto-complete="off" style="width: 260px"></el-input>
				</el-form-item>

				<el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="ruleForm.pass" auto-complete="off" style="width: 260px"></el-input>
				</el-form-item>

				<el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')" class='login'>登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import {login} from 'api/login';

	export default{
		name:'Home',
		data(){
			const validatePass = (rule,value,callback)=>{
				if(value===''){
					callback(new Error('请输入密码'));
				}else{
					callback()
				}
			}
			return{
				ruleForm:{
					user:'',
					pass:'',
				},
				rules:{
					user:[
						{required:true,message:'请输入账号',trigger: ['blur']}
					],
					pass:[
						{required:true,validator: validatePass, trigger: 'blur'},
						{ min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			...mapActions([
				'getUserInfo'
			]),
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {

			            const userinfoObj={
			            	user:this.ruleForm.user,
			            	pass:this.ruleForm.pass,
			            }

			            this.getUserInfo(userinfoObj)
			            	.then((data)=>{
	            				if(data.code==200){
			       					window.sessionStorage.setItem('token',data.token);
			            			this.$message.success(data.msg);
			            			this.$router.push({path:'/main'})
			            		}else{
			            			this.$message.error(data.msg);
			            		}
			            	})


			        } else {
			            return false;
			        }
		        });
		    }
		},
		computed:{
			
		},
	}
</script>
<style>
	.content{
		position: absolute;
		width: 100%;
		height: 100%;
		background: url('../../assets/img/bgimg.jpg') no-repeat;
		background-size: cover;
	}
	.box-card {
	    width: 480px;
	    margin: 150px auto;
	}
	.login{
		/*margin-left: 100px;*/
		width: 260px;
	}
</style>