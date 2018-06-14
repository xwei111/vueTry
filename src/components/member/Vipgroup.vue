<template>
	  <div class='vipdataBox'>
		  	  <!-- 搜索 -->
			<el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="80px" size='small' label-suffix=':'>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="ruleForm.name" auto-complete="off" style="width: 160px" placeholder='请输入姓名'></el-input>
				</el-form-item>

				<el-form-item label="性别" prop="sex">
					<el-select v-model="ruleForm.sex" placeholder="请选择" style="width: 120px">
						<el-option
						v-for="item in sexOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="年龄" prop="age">
					<el-input v-model="ruleForm.age" auto-complete="off" style="width: 160px" placeholder='请输入姓名或手机号'></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" class='search' icon="el-icon-search">搜索</el-button>
					<el-button @click="reset" class='search'>重置</el-button>
				</el-form-item>
			</el-form>
			<!-- 搜索 -->


		  	<div class='addNewBox'>
				<p>共有<span>{{searchDB.length}}</span>条数据</p>
				<el-button type="primary" @click="addNewHandle" class='addNew' size='small'>新建</el-button>
			</div>
			<!-- 表格 -->
			<el-table
				class='table'
				:data="searchDB"
				style="width: 100%"
				:header-cell-style="textAlign"
				>
				<el-table-column
					prop="id"
					label="ID">
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名">
				</el-table-column>
				<el-table-column
					prop="sex"
					label="性别">
					<template slot-scope="scope">
						<p v-html="scope.row.sex == 0?'男':'女' "></p>
				</template>
				</el-table-column>
				<el-table-column
					prop="age"
					label="年龄">
				</el-table-column>
				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<span class="seacrchP" @click="handleEdit(scope.$index, scope.row)">
							编辑
						</span>
						<span style="color:#ccc">|</span>
						<span class="seacrchP" @click="handleDelete(scope.$index, scope.row)">
							删除
						</span>

					</template>
				</el-table-column>
			</el-table>
			<!-- 表格 -->

			<!-- 新建修改 -->
			<el-form :class="isSure?'':'notSee'" :model="detailData" :rules='rules' status-icon ref="detailData" label-width="100px" size='small' label-suffix=':'>

				<el-form-item label="姓名" prop="name">
					<el-input v-model="detailData.name" auto-complete="off" style="width: 160px" placeholder='请输入姓名'></el-input>
				</el-form-item>


				<el-form-item label="性别" prop="sex">
					<el-select v-model="detailData.sex" placeholder="请选择" style="width: 160px">
						<el-option
						v-for="item in sexOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="年龄" prop="age">
					<el-input v-model.number="detailData.age " auto-complete="off" style="width: 160px" placeholder='请输入积分'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="sure('detailData')">保存</el-button>
					<el-button @click="cancle">取消</el-button>
				</el-form-item>
			</el-form>
			<!-- 新建修改 -->

	  </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {updateData,addData,searchData,deleteData} from 'indexedDB';
import { setTimeout } from 'timers';
	export default{
		name:"Vipgroup",
		data() {
	      	return {
				sexOptions:[{
					value:0,
					label:'男'
				},{
					value:1,
					label:'女'
				}],
				rules:{
					name:[
						{required:true,message:'请输入姓名',trigger: ['blur']}
					],
					sex:[
						{required:true,message:'请选择性别'}
					],
					age:[
						{required:true,message:'请输入年龄',trigger: ['blur']}
					],
				},
				detailData:{
					
				},
				isSure:false,
				searchDB:[],
				id:'',
				ruleForm:{}
	      	};
		},
		created(){
			this._searchData('idIndex');
		},
	    methods: {
	        textAlign(){
				return {'text-align':'center'}
			},
			addNewHandle(){
				this.isSure=true;
				this.id='';
				this.detailData={}
			},
			handleEdit(index, row){
				this.isSure=true
				let id = Number(row.id);
				this.id=id;
				searchData('idIndex',IDBKeyRange.only(id))
					.then((data)=>{
						this.detailData=data[0]
					})

			},
			handleDelete(index, row){
				let deleid = Number(row.id);
				deleteData(deleid)
					.then((data)=>{
						this.$message.success('删除成功');
						this._searchData('idIndex')
					})
			},
			sure(detailData){
				this.$refs[detailData].validate((valid) => {
					if (valid) {
						if(this.id){
							this.detailData.id=this.id;
							updateData(this.detailData)
								.then((data)=>{
									this._searchData('idIndex')
									this.isSure=false
								})
							this.$message.success('修改成功');
						}else{
							updateData(this.detailData)
								.then((data)=>{
									this._searchData('idIndex')
									this.isSure=false
								})
							this.$message.success('添加成功');
						}
					
					}
				})
			},
			cancle(){
				this.isSure=false
			},
			submitForm(ruleForm){
				this.$refs[ruleForm].validate((valid) => {
					if (valid) {
						var obj = this.ruleForm;
						var byWhich='';
						var nameIf=false;
						var sexIf=false;
						var ageIf=false;
						var searchAry=[]

						if(obj.name&&obj.name!=''){
							nameIf=true
						}

						if(obj.sex&&obj.sex!=''||obj.sex==0){
							sexIf=true
						}

						if(obj.age&&obj.age!=''){
							ageIf=true
						}

						if(nameIf&&sexIf&&ageIf){
							byWhich='allIndex4'
							searchAry[0]=obj.name;
							searchAry[1]=obj.sex;
							searchAry[2]=Number(obj.age);
						}else if(nameIf&&sexIf){
							byWhich='allIndex1'
							searchAry[0]=obj.name;
							searchAry[1]=obj.sex;
						}else if(nameIf&&ageIf){
							byWhich='allIndex2';
							searchAry[0]=obj.name;
							searchAry[1]=Number(obj.age);
						}else if(sexIf&&ageIf){
							byWhich='allIndex3'
							searchAry[0]=obj.sex;
							searchAry[1]=Number(obj.age);
						}else if(nameIf){
							byWhich='nameIndex'
							searchAry=obj.name
						}else if(sexIf){
							byWhich='sexIndex'
							searchAry=obj.sex
						}else if(ageIf){
							byWhich='ageIndex'
							searchAry=Number(obj.age)
						}else{
							byWhich='idIndex'
							searchAry=null
						}
						
						searchData(byWhich,searchAry)
							.then((data)=>{
								this.searchDB=data
							})
					
					}
				})
			},
			reset(){
				this.ruleForm={}
				this._searchData('idIndex');
			},
			_searchData(byWhich,searchObj){
				searchData(byWhich,searchObj)
					.then((data)=>{
						this.searchDB=data
					})
			}
		}
	}
</script>
<style scoped>
	.vipdataBox{
		padding: 20px;
	}
	.table{
		text-align: center;
	}
	.table th div{
		text-align: center;
	}
	.seacrchP{
		cursor: pointer;
	}
	.addNewBox{
		height: 50px;
		width: 100%;
	}
	.addNewBox p{
		float: left;
		margin: 10px 0 0 10px;
	}
	.addNewBox p span{
		color: #F46300;
	}
	.addNew{
		float: right;
	}
	.notSee{
		display: none;
	}
</style>
