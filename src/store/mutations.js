import * as types from './mutationTypes';
import {leftMenu} from 'assets/js/config';


const mutations = {
	[types.SET_NAME](state,name){
		state.name = name
	},
	[types.SET_LEFTMENU](state,type){
		const p = new Promise((resolve,reject)=>{
			if(type=='1'){
				state.leftMenu=leftMenu.member;
				resolve('success')
			}else if(type=='2'){
				state.leftMenu=leftMenu.admin;
				resolve('success')
			}else if(type=='3'){
				state.leftMenu=leftMenu.sale;
				resolve('success')
			}
		})

		return p;
	},
	[types.SET_USERINFO](state,data){
		state.userInfo = data
	},
	[types.SET_VIPDATAMODAL](state,data){
		state.vipDataModal = data
	},
	[types.SET_VIPDATAALL](state,data){
		state.vipDataAll = data
	}
}

export default mutations;