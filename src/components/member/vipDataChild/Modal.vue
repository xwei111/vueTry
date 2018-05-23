<template>
	<div>
		<el-dialog
		  title="会员详情"
		  :visible.sync="vipDataModal"
		  width="40%"
		  :before-close='beforeClose'
		>

		  <el-form :model="detailData" :rules='rules' status-icon ref="detailData" label-width="100px" size='small' label-suffix=':'>

			<el-form-item label="会员姓名" prop="name">
			    <el-input v-model="detailData.name" auto-complete="off" style="width: 160px" placeholder='请输入姓名' :disabled="isSee=='add'? false :true"></el-input>
			</el-form-item>

			<el-form-item label="会员头像" prop="img">
				<el-upload
				  action="http://localhost:3000/member/uploadImg"
				  list-type="picture-card"
				  :limit='limit'
				  :on-success='hanldeSuccess'
				  :on-remove='hanldeRemove'
				  :fileList='detailData.imgAry'
				  :disabled="isSee=='see'? true :false"
				  >
				  <i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>


			<el-form-item label="会员性别" prop="sex">
			    <!-- <el-input v-model="detailData.sex == '0'? '男' : detailData.sex =='1'? '女' : '' " auto-complete="off" style="width: 160px" :disabled="isSee=='add'? false :true"></el-input> -->
			    <el-select v-model="detailData.sex" placeholder="请选择" style="width: 160px" :disabled="isSee=='add'? false :true">
				    <el-option
				      v-for="item in sexOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="手机号码" prop="tel">
			    <el-input v-model.number="detailData.tel " auto-complete="off" style="width: 160px" :disabled="isSee=='add'? false :true" placeholder='请输入手机号'></el-input>
			</el-form-item>

			<el-form-item label="会员等级" prop="lev">
			    <el-select v-model="detailData.lev" placeholder="请选择" style="width: 160px" :disabled="isSee=='see'? true :false  ">
				    <el-option
				      v-for="item in levData"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="会员积分" prop="integral">
			    <el-input v-model.number="detailData.integral " auto-complete="off" style="width: 160px" placeholder='请输入积分' :disabled="isSee=='see'? true :false  "></el-input>
			</el-form-item>


		</el-form>




		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancle">取 消</el-button>
		    <el-button type="primary" @click="sure('detailData')">保存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import {changeVipDetail,addVip} from 'api/member'
	import qs from 'qs'

	export default{
		name:'Modal',
		data(){

			const validateTel =(rule,value,callback) =>{

				const regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

				if(value == undefined){
					callback(new Error('请输入手机号'));
				}else{
					if(regex.test(value)){
						callback()
					}else{
						callback(new Error('请输入正确手机号'));
					}
				}
			}

			return{
				sexOptions:[{
					value:0,
					label:'男'
				},{
					value:1,
					label:'女'
				}],
				limit:1,
				fileList:[{'url':'http://img5.imgtn.bdimg.com/it/u=812586171,724963760&fm=27&gp=0.jpg'}],
				rules:{
					name:[
						{required:true,message:'请输入姓名',trigger: ['blur']}
					],
					img:[
						{required:true,message:'请选择图片',trigger: ['blur']}
					],
					sex:[
						{required:true,message:'请选择性别'}
					],
					tel:[
						{required:true, trigger: 'blur',validator: validateTel,},
						{type:'number',message:'请输入正确手机号'}
					],
					lev:[
						{required:true,message:'请选择等级'}
					],
					integral:[
						{required:true,message:'请输入会员积分',trigger: ['blur']},
						{ type:'number',min:0, message: '请输入数字格式积分且积分不得小于0' }
					]
				}
			}
		},
		props:[
			'levData',
			'isSee',
			'detailData',
			'ruleForm'
		],
		methods: {
	      	cancle(){
	      		this.setVipDataModal(false);
	      		// this.$refs['detailData'].resetFields();
	      	},
	      	hanldeSuccess(response, file, fileList){
	      		if(response.code==200){
		      		var imgUrl = response.result
		      		this.detailData.img = imgUrl;
		      	}
	      	},
	      	hanldeRemove(){
	      		this.detailData.img = '';
	      	},
	      	sure(detailData){
	      		if(this.isSee=='change'){
	      			this.$refs[detailData].validate((valid) => {
				        if (valid) {
				        	var obj={};

				        	obj.lev=Number(this.detailData.lev);
				        	obj.integral=Number(this.detailData.integral);
				        	obj.img = this.detailData.img;

				        	var id = this.detailData.id

				        	this._changeVipDetail(id,obj)

				        } else {
				            return false;
				        }
			        });
	      		}

	      		if(this.isSee=='add'){
	      			this.$refs[detailData].validate((valid) => {
				        if (valid) {
				        	
				        	this._addVip(this.detailData)

				        } else {
				            return false;
				        }
			        });
	      		}

	      		if(this.isSee=='see'){
	      			this.setVipDataModal(false)
	      		}

	      	},
	      	beforeClose(){
	      		this.setVipDataModal(false)
	      		// this.$refs['detailData'].resetFields();
	      	},
	      	_changeVipDetail(id,obj){
	      		changeVipDetail(id,obj)
	        		.then((data)=>{
	        			var data = data.data;

	        			if(data.code==200){
	        				this.$message.success('修改成功');


	        				var ruleFormObj = qs.stringify(this.ruleForm)

	        				this.vipDataAllList(ruleFormObj);

	        				this.setVipDataModal(false)
	        			}else{
	        				this.$message.error('修改失败');
	        			}
	        		})
	      	},
	      	_addVip(obj){
	      		addVip(obj)
	        		.then((data)=>{
	        			const result = data.data;
	        			if(result.code==200){
	        				this.$message.success('新建成功');
	        				var ruleFormObj = qs.stringify(this.ruleForm)

	        				this.vipDataAllList(ruleFormObj);

	        				this.setVipDataModal(false)

	        			}else{
	        				this.$message.error(result.msg);
	        			}
	        		})
	      	},
	      	...mapMutations({
	      		setVipDataModal:'SET_VIPDATAMODAL'
	      	}),
	      	...mapActions([
		    	'vipDataAllList'
		    ])
	    },
	    computed:{
			...mapGetters([
				'vipDataModal',
			])
		}
	}
</script>
<style>
	.sureHide{
		display: none;
	}
</style>



