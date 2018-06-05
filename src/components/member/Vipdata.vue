<template>
	<div class='vipdataBox'>
		<el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="80px" size='small' label-suffix=':'>
			<el-form-item label="会员" prop="vipman">
			    <el-input v-model="ruleForm.vipman" auto-complete="off" style="width: 160px" placeholder='请输入姓名或手机号'></el-input>
			</el-form-item>

			<el-form-item label="等级" prop="lev">
			    <el-select v-model="ruleForm.lev" placeholder="请选择" style="width: 120px">
			    	<el-option
				      key=""
				      label="全部"
				      value="">
				    </el-option>
				    <el-option
				      v-for="item in levData"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
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

			<el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')" class='search' icon="el-icon-search">搜索</el-button>
			</el-form-item>
		</el-form>

		<div class='addNewBox'>
			<p>共有<span>{{vipDataAll.total}}</span>条数据</p>
			<el-button type="primary" @click="addNewHandle" class='addNew' size='small'>新建</el-button>
		</div>
		

		<!-- 表格 -->
		<el-table
		  class='table'
	      :data="vipDataAll.data"
	      style="width: 100%">
	      <el-table-column
	        prop="name"
	        label="会员姓名">
	      </el-table-column>
	      <el-table-column
	        prop="img"
	        label="头像">
	        <template slot-scope="scope">
	        	<img class="tableImg" :src='scope.row.img' />
	        </template>
	      </el-table-column>
	      <el-table-column
	        prop="sex"
	        label="会员性别">
	        <template slot-scope="scope">
		        <p v-html="scope.row.sex == '0'?'男':'女' "></p>
		    </template>
	      </el-table-column>
	      <el-table-column
	        prop="tel"
	        label="手机号码">
	      </el-table-column>
	      <el-table-column
	        prop="lev"
	        label="会员等级">
	      </el-table-column>
	      <el-table-column
	        prop="integral"
	        label="会员积分">
	      </el-table-column>
	      <el-table-column
	        label="操作">
	        <template slot-scope="scope">
		        <span class="seacrchP" @click="handleSee(scope.$index, scope.row)">
			        查看
			    </span>
			    <span style="color:#ccc">|</span>
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

	    <!-- 分页 -->
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="currentSize"
	      layout="sizes, prev, pager, next"
	      :total='vipDataAll.total'
	      class='pagVipData'
	      >
	    </el-pagination>
	    <!-- 分页 -->

	

	<Modal :levData='levData' :isSee='isSee' :detailData='detailData' :ruleForm='ruleForm' ></Modal>

	</div>
</template>

<script>
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import Modal from './vipDataChild//Modal'
	import {vipDataLev,vipDataDetail,deleteVip} from 'api/member'
	import qs from 'qs'

	export default{
		name:"Vipdata",
		data(){
			return{
				ruleForm:{
					vipman:'',
					lev:'',
					sex:''
				},
				sexOptions:[{
					value:'',
					label:'全部'
				},{
					value:'0',
					label:'男'
				},{
					value:'1',
					label:'女'
				}],
		        currentPage:1,
		        currentSize:10,
		        total:0,
		        levData:[],
		        isSee:'',
		        detailData:{
		        	
		        },
			}
		},
		components:{
			Modal
		},
		created(){
			this.ruleForm.currentPage = this.currentPage
			this.ruleForm.currentSize = this.currentSize
			let obj = qs.stringify(this.ruleForm)
			this._vipData(obj);
			this._vipDataLev();
		},
		methods:{
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	this.currentPage = 1
			        	this.currentSize = 10
			        	this.ruleForm.currentPage = this.currentPage
						this.ruleForm.currentSize = this.currentSize

			            let obj = qs.stringify(this.ruleForm)
						this._vipData(obj);

			        } else {
			            return false;
			        }
		        });
		    },
		    handleSee(index, row) {
		        let id = row.id;
		        this.setVipDataModal(true)
		        this._vipDataDetail(id)
		        this.isSee = 'see'
		    },
		    handleEdit(index, row){
		    	let id = row.id;
		    	this.setVipDataModal(true)
		        this._vipDataDetail(id);
		        this.isSee = 'change'
		    },
		    handleDelete(index, row){
		    	let id = row.id;
		    	this._deleteVip(id)
		    },
		    addNewHandle(){
		    	this.setVipDataModal(true)
		    	this.isSee = 'add'
		    	this.detailData={}
		    },
		    handleSizeChange(val) {
		        this.currentSize = val
		        this.ruleForm.currentSize = this.currentSize
		        let obj = qs.stringify(this.ruleForm)
				this._vipData(obj);
		    },
		    handleCurrentChange(val) {
		        this.currentPage = val
		        this.ruleForm.currentPage = this.currentPage
		        let obj = qs.stringify(this.ruleForm)
				this._vipData(obj);
		    },
		    _vipData(obj){

		    	this.vipDataAllList(obj)

		    },
		    _vipDataLev(){
		    	vipDataLev()
		    		.then((data)=>{
		    			if(data.code==200){
		    				this.levData = data.data
		    			}
		    		})
		    },
		    _vipDataDetail(id){
		    	vipDataDetail(id)
		    		.then((data)=>{
		    			var data=data.data;
		    			if(data.code==200){
		    				var result = data.data;
		    				var imgobj={};
		    				var imgAry=[];
		    				imgobj.url = result.img;
		    				imgAry.push(imgobj)
		    				this.detailData=result;
		    				this.detailData.imgAry = imgAry;
		    			}
		    		})
		    },
		    _deleteVip(id){
		    	deleteVip(id)
		    		.then((data)=>{
		    			var result = data.data;
		    			if(result.code==200){
		    				this.$message.success('删除成功');
		    				var ruleFormObj = qs.stringify(this.ruleForm)

	        				this.vipDataAllList(ruleFormObj);
		    			}else{
		    				this.$message.success('删除失败');
		    			}
		    		})
		    },
		    ...mapActions([
		    	'vipDataAllList'
		    ]),
		    ...mapMutations({
	      		setVipDataModal:'SET_VIPDATAMODAL'
	      	}),
		},
		computed:{
			...mapGetters([
				'vipDataAll',
			]),
		}
	}
</script>
<style scoped>
	.vipdataBox{
		padding: 20px;
	}
	.search{
		margin-left: 40px;
	}
	.table{
		text-align: center;
	}
	.table th div{
		text-align: center;
	}
	.seacrchP{
		cursor: pointer;
		color: #F46300;
	}
	.pagVipData{
		float: right;
		margin: 20px 0;
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
	.tableImg{
		width: 30px;
		height: 30px;
	}
</style>
