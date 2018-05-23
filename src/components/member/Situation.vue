<template>
	<div>
		<div class='topSitu'>
			<ul>
				<li>
					<img class='ig' src='../../assets/img/allNum.png'>
					<p>会员总数</p>
					<p>{{allMemberData[0]}}</p>
				</li>
				<li>
					<p>新增会员</p>
					<p>{{allMemberData[1]}}</p>
				</li>
				<li>
					<p>活跃会员</p>
					<p>{{allMemberData[2]}}</p>
				</li>
				<li>
					<p>会员订单</p>
					<p>{{allMemberData[3]}}</p>
				</li>
				<li>
					<p>会员GMV</p>
					<p>{{ Math.round(allMemberData[4]*100)/100 }}</p>
				</li>
			</ul>
		</div>


		<div class='ContentSitu'>

			<div class='ContentTopSitu'>
				<div>
					<p></p>
					<p>近期会员走势图</p>
				</div>
				<div>
					<p class='ContentTopSituP'>时间区间</p>
					<ul class='ContentTopSituUl'>
						<li @click="selectDayHandle" data-id='1' :class="dataId=='1'?'selectDay':''">近7天</li>
						<li @click="selectDayHandle" data-id='2' :class="dataId=='2'?'selectDay':''">近30天</li>
						<li @click="selectDayHandle" data-id='3' :class="dataId=='3'?'selectDay':''">近60天</li>
					</ul>
				</div>
			</div>


			<div class='ContentLeftSitu'>
				<div class='timeData'>
					<p class='timeDataP1'>时间区间内汇总数据</p>
					<p class='timeDataP2'>（2018-04-14~2018-05-13）</p>
					<ul class='timeDataMain'>
						<li>
							<div>
								<img src="../../assets/img/ic1.png" />
								<span>新增会员</span>
							</div>
							<p>{{selectData[0]}}</p>
						</li>
						<li>
							<div>
								<img src="../../assets/img/ic1.png" />
								<span>活跃会员</span>
							</div>
							<p>{{selectData[1]}}</p>
						</li>
						<li>
							<div>
								<img src="../../assets/img/ic1.png" />
								<span>会员订单数</span>
							</div>
							<p>{{selectData[2]}}</p>
						</li>
						<li>
							<div>
								<img src="../../assets/img/ic1.png" />
								<span>会员支付金额</span>
							</div>
							<p>{{ Math.round(selectData[3]*100)/100 }}</p>
						</li>
					</ul>
				</div>
			</div>

			<div class='ContentRightSitu'>
				<div style="margin: 10px 0 10px 50px">
					<el-radio-group v-model='acvtiveID' size="small" @change='activeChange'>
				      <el-radio-button label="1">新增会员</el-radio-button>
				      <el-radio-button label="2">活跃会员</el-radio-button>
				    </el-radio-group>
				</div>

				<LineCharts :lineData='lineData'></LineCharts>

			</div>
		</div>
	</div>
</template>

<script>
	import {allMember,lineTrendData,lineMemberNew,lineMemberActive} from 'api/member'
	import LineCharts from './situChildren/LineCharts'

	export default{
		name:"Situation",
		data(){
			return{
				allMemberData:[],
				dataId:'1',
				selectData:[],
				acvtiveID:'1',
				lineData:[],
			}
		},
		components:{
			LineCharts
		},
		created(){
			this._allMember();
			this._lineTrendData(1);
			this._lineMemberNew();
		},
		methods:{
			selectDayHandle(e){
				const selectId = e.target.getAttribute('data-id');
				this.dataId = selectId;
				this._lineTrendData(selectId);

				if(this.acvtiveID=='1'){
					this._lineMemberNew()
				}else if(this.acvtiveID=='2'){
					this._lineMemberActive()
				}

			},
			activeChange(vl){
				this.acvtiveID = vl;

				if(this.acvtiveID=='1'){
					this._lineMemberNew()
				}else if(this.acvtiveID=='2'){
					this._lineMemberActive()
				}

			},
			_allMember(){
				allMember()
					.then((data)=>{
						this.allMemberData = data;
					})
			},
			_lineTrendData(selectId){
				lineTrendData(selectId)
					.then((data)=>{
						this.selectData = data;
					})
			},
			_lineMemberNew(){
				lineMemberNew(this.dataId)
					.then((data)=>{
						this.lineData = data;
					})
			},
			_lineMemberActive(){
				lineMemberActive(this.dataId)
					.then((data)=>{
						this.lineData = data;
					})
			}
		}
	}
</script>
<style>
	.topSitu{
		width: 100%;
		height: 100px;
		border-bottom: 1px solid #eee;
	}
	.ig{
		width: 38px;
		height: 38px;
	}
	.topSitu li{
		float: left;
		width: 18%;
		height: 80px;
		text-align: center;
		line-height: 24px;
		padding-top: 24px;
	}
	.topSitu li img{
		position: relative;
		left: 90px;
	}
	.topSitu li:nth-of-type(1){
		/*font-weight: 900;*/
		width: 28%;
		border-right: 1px solid #eee;
		box-sizing: border-box;
	}
	.topSitu li p:nth-of-type(2){
		/*font-weight: 900;*/
		font-size: 24px;
		color: #666;
	}
	.ContentSitu{
		width: 94%;
		height: 350px;
		border: 1px solid #eee;
		box-sizing: border-box;
		margin-left: 3%;
		margin-top: 10px;
	}
	.ContentTopSitu{
		height: 35px;
		width: 100%;
		border-bottom: 1px solid #eee;
		padding-top: 15px;
	}
	.ContentTopSitu div:nth-of-type(1){
		float: left;
	}
	.ContentTopSitu div:nth-of-type(1) p{
		display: inline-block;
	}
	.ContentTopSitu div:nth-of-type(1) p:nth-of-type(1){
		width: 5px;
		height: 16px;
		background: #F89552;
		position: relative;
		top: 2px;
		margin-left: 5px;
	}
	.ContentTopSitu div:nth-of-type(2){
		float: right;
	}
	.ContentTopSituP{
		float: left;
	}
	.ContentTopSituUl{
		float: left;
	}
	.ContentTopSituUl li{
		float: left;
		padding: 0 5px;
		cursor: pointer;
	}
	.ContentTopSituUl li:nth-of-type(1){
		border-right: 1px solid #ccc;
		box-sizing: border-box;
	}
	.ContentTopSituUl li:nth-of-type(2){
		border-right: 1px solid #ccc;
		box-sizing: border-box;
	}
	.selectDay{
		color: #F56C6C;
	}
	.ContentLeftSitu{
		width: 33%;
		height: 299px;
		float: left;
	}
	.ContentRightSitu{
		width: 67%;
		height: 299px;
		float: left;
	}
	.timeData{
		width: 80%;
		height: 80%;
		border: 1px solid #eee;
		margin-top: 8%;
		margin-left: 8%;
	}
	.timeDataP1{
		height: 34px;
		line-height: 40px;
		font-weight: 700;
		text-align: center;
	}
	.timeDataP2{
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		margin-bottom: 10px;
	}
	.timeDataMain{
		width: 100%;
		height: 160px;
	}
	.timeDataMain li{
		width: 50%;
		float: left;
		height: 60px;
		text-align: center;
		padding-top: 20px;
	}
	.timeDataMain li div{
		line-height: 30px;
		font-size: 14px;
	}
	.timeDataMain li p{
		font-size: 24px;
		color: #666;
	}
</style>
