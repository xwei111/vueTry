import * as types from './mutationTypes';
import {login} from 'api/login';
import {vipData} from 'api/member'

// 用户信息
export const getUserInfo = ({commit,state},userinfoObj)=>{

	const  p = new Promise((resolve,reject)=>{
		login(userinfoObj.user,userinfoObj.pass)
			.then((data)=>{
				if(data.code=='200'){
					commit(types.SET_USERINFO,data.data);
					
					resolve({
						code:'200',
						msg:'登陆成功'
					})
				}else{
					commit(types.SET_USERINFO,{})
					resolve({
						code:data.code,
						msg:data.msg
					})
				}
			})
	})

	return p;

}

// 会员信息列表
export const vipDataAllList = ({commit,state},obj) =>{

	const p = new Promise((resolve,reject)=>{
		vipData(obj)
			.then((data)=>{
				if(data.code==200){
    				commit(types.SET_VIPDATAALL,data)
    				resolve('success')
    			}
			})
	})

	return p;

}



