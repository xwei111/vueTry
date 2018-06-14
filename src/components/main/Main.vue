<template>
	<div>
		<div class="topfather">
			<div class="top">
    			<img class='ig' src='../../assets/img/logo.jpg'>
    			<span class='title'>后台管理</span>
			</div>
			<div class="top">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="selectMenu">
					<el-menu-item v-for='(item,index) in menu' :key='index' :index="item.id">{{item.title}}</el-menu-item>
				</el-menu>
			</div>
			<div class="top">
				<img class='userig' src='../../assets/img/user_icon.jpg'>
				<span class='name'>{{user}}</span>
				<span class='back' @click="backHandle">退出</span>
			</div>
		</div>

		<div class='content'>
				
			<el-container class='contentBox'>
		    	<!-- 左菜单栏 -->
		        <el-aside width="200px">
		        	<el-menu
				      class="el-menu-vertical-demo"
				      background-color="#303133"
				      text-color="#fff"
				      active-text-color="#F56C6C"
				      @select="selectLeftMenu"
				      :router='routerPath'
				      :unique-opened='oneOpen'
				      :default-active='selectPath'
				      >

					    <div v-for="(item,index) in leftMenu" :key='index'>
					        <el-menu-item :index='item.path' v-if='!item.child'>
						        <i :class="item.icon"></i>
						        <span slot="title">{{item.title}}</span>
					        </el-menu-item>

					        <el-submenu :index='item.path'  v-if='item.child'>

					        	<template slot="title" v-if='item.child'>
					          		<i :class="item.icon" v-if='item.child'></i>
					          		{{item.title}}
					      		</template>
					          	<el-menu-item v-for='(itchild,index) in item.child' :key='index' :index="itchild.path" v-if='item.child'>
					          		{{itchild.title}}
					          	</el-menu-item>

					        </el-submenu>
				        </div>
				    </el-menu>
		        </el-aside>
		        <!-- 左菜单栏 -->
		        <!-- 主要内容区 -->
		    	<el-main>
		    		<router-view></router-view>
		    	</el-main>
		    	<!-- 主要内容区 -->
		    </el-container>

		</div>

		<div class='footer'>
			<p>Copyright © 2015 XW Technology All rights Reserved</p>
		</div>
		    
	</div>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	import jwt from 'jsonwebtoken'

	export default{
		name:'Main',
		data(){
			return{
				menu:[{
					title:'会员管理',
					id:'1'
				},{
					title:'管理中心',
					id:'2'
				},{
					title:'会员营销',
					id:'3'
				}],
				activeIndex:'',
				routerPath:true,
				oneOpen:true,
				selectPath:'',
				user:''
			}
		},
		created(){
			var that = this;
			const path = this.$route.path;

			if(path.indexOf('/vipmanage/')>-1){
				this.activeIndex = '1'
			}else if(path.indexOf('/admin/')>-1){
				this.activeIndex = '2'
			}else if(path.indexOf('/sale/')>-1){
				this.activeIndex = '3'
			}

			this.getLeftMenu(this.activeIndex);

			this.selectPath = path;

			jwt.verify(this.userInfo.token, 'secret', function(err, decoded) {
		      if (!err) {
		        	that.user = decoded.user
		      }
		    })

		},
		methods:{
			backHandle(){
				window.sessionStorage.setItem('token','');
				this.$router.push({path:'/'})
			},
			...mapMutations({
				'getLeftMenu':'SET_LEFTMENU'
			}),
			selectMenu(index,path){
				this.getLeftMenu(index);
				this.$router.push({path:this.leftMenu[0].path});
			},
			selectLeftMenu(key,keypath){
				console.log('key',key)
			}
		},
		computed:{
			...mapGetters([
				'leftMenu',
				'userInfo',
			])
		},
	}
</script>

<style scoped>
	.topfather{
		width: 1366px;
		height: 60px;
		background: #fff;
	}
	.top{
		display: inline-block;
	}
	.top:nth-of-type(1){
		float: left;
		margin-left: 50px;
	}
	.top:nth-of-type(2){
		margin-left: 100px;
		float: left;
	}
	.top:nth-of-type(3){
		margin-right: 50px;
		float: right;
	}
	.content{
		position: relative;
		min-height: 550px;
		width: 1266px;
		margin-left: 50px;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.el-aside {
	    background-color: #303133;
	    min-height: 550px;
	    overflow-x: hidden;
	}
	  
	.el-main {
	    background-color: #fff;
	    padding: 0;
	    min-height: 550px;
	}
	.contentBox{
		
		background: #f7f7f7;
	}
	.ig{
		width: 50px;
		height: 50px;
		float: left;
		margin-top: 5px;
	}
	.title{
		float: left;
		display: inline-block;
		line-height: 60px;
		font-size: 18px;
		color: #ccc;
	}
	.userig{
		width: 30px;
		height: 30px;
		float: left;
		margin-top: 13px;
	}
	.name{
		float: left;
		display: inline-block;
		line-height: 60px;
		color: #ccc;
	}
	.back{
		float: left;
		display: inline-block;
		line-height: 60px;
		color: #ccc;
		cursor: pointer;
		margin-left: 5px;
	}
	.el-menu-demo{
		border-bottom: none;
	}
	.el-menu-vertical-demo{
		width: 200px;
	}
	.footer{
		width: 100%;
		background: #fff;
		height: 80px;
		line-height: 80px;
		text-align: center;
	}
</style>