import axios from './axios';

// 会员总数
 function memberNum() {
	return axios.get(`/memberNum`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

// 新增会员
 function addMember(dt) {
	return axios.get(`/addMember?dt=${dt}`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

// 活跃会员
 function activeMember(dt) {
	return axios.get(`/activeMember?dt=${dt}`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

// 会员订单
 function orderMember(dt) {
	return axios.get(`/orderMember?dt=${dt}`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

// 会员GMV
 function gmvMember(dt) {
	return axios.get(`/gmvMember?dt=${dt}`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

// 新增折线图
export function lineMemberNew(dt){
	return axios.get(`/lineMemberNew?dt=${dt}`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

// 活跃折线图
export function lineMemberActive(dt){
	return axios.get(`/lineMemberActive?dt=${dt}`)
		.then((data)=>{
			var data=data.data
			if(data.code=='200'){
				return data.data
			}
		})
}

export function allMember(){
	return Promise.all([
				memberNum(),
				addMember(4),
				activeMember(4),
				orderMember(4),
				gmvMember(4)
			]).then((data)=>data)
}

export function lineTrendData(dt){
	return Promise.all([
				addMember(dt),
				activeMember(dt),
				orderMember(dt),
				gmvMember(dt)
			]).then((data)=>data)
}


// 会员信息
export function vipData(obj){
	return axios.get(`/member/memberList?${obj}`)
		.then((data)=>data.data)
}

// 会员等级
export function vipDataLev(){
	return axios.get(`/member/memberLev`)
		.then((data)=>data.data)
}

// 信息详情
export function vipDataDetail(id){
	return axios.get(`/member/memberDetail?id=${id}`)
}

// 修改会员信息
export function changeVipDetail(id,obj){
	return axios.put(`/member/changeMenber?id=${id}`,obj)
}

// 新增会员
export function addVip(obj){
	return axios.post(`/member/addMember`,obj)
}

// 删除会员
export function deleteVip(id){
	return axios.delete(`/member/deleteMember?id=${id}`)
}


