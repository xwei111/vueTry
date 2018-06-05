const express = require('express');
const router = express.Router();
const axios = require('axios');

const baseUrl = 'http://47.96.158.41:8085';

// 会员总数 ${baseUrl}/getMemberTotal?user_type=2&user_code=2016110902663110
router.get('/memberNum',(req,res)=>{

	axios.get(`${baseUrl}/getMemberTotal?user_type=2&user_code=2016110902663110`)
		.then((data)=>{
			res.json(data.data)
		})
})

// 新增会员  ${baseUrl}/getNewMember?user_type=2&user_code=2016110902663110&dt=4
router.get('/addMember',(req,res)=>{

	let dt = req.query.dt;

	axios.get(`${baseUrl}/getNewMember?user_type=2&user_code=2016110902663110&dt=${dt}`)
		.then((data)=>{
			res.json(data.data)
		})
})

// 活跃会员 ${baseUrl}/getActiveMember?user_type=2&user_code=2016110902663110&dt=4
router.get('/activeMember',(req,res)=>{

	let dt = req.query.dt;

	axios.get(`${baseUrl}/getActiveMember?user_type=2&user_code=2016110902663110&dt=${dt}`)
		.then((data)=>{
			res.json(data.data)
		})
})

// 会员订单 ${baseUrl}/getMemberOrderCnt?user_type=2&user_code=2016110902663110&dt=4
router.get('/orderMember',(req,res)=>{

	let dt = req.query.dt;

	axios.get(`${baseUrl}/getMemberOrderCnt?user_type=2&user_code=2016110902663110&dt=${dt}`)
		.then((data)=>{
			res.json(data.data)
		})
})

// 会员GMV ${baseUrl}/getMemberGMV?user_type=2&user_code=2016110902663110&dt=4
router.get('/gmvMember',(req,res)=>{

	let dt = req.query.dt;

	axios.get(`${baseUrl}/getMemberGMV?user_type=2&user_code=2016110902663110&dt=${dt}`)
		.then((data)=>{
			res.json(data.data)
		})
})

// 近期会员走势折线图(新增会员)  ${baseUrl}/getNewMemberTreand?user_type=2&user_code=2016110902663110&dt=1
router.get('/lineMemberNew',(req,res)=>{

	let dt = req.query.dt;

	axios.get(`${baseUrl}/getNewMemberTreand?user_type=2&user_code=2016110902663110&dt=${dt}`)
		.then((data)=>{
			res.json(data.data)
		})
})

// 近期会员走势折线图(活跃会员) http://47.96.158.41:8085/getActiveMemberTreand?user_type=2&user_code=2016110902663110&dt=1
router.get('/lineMemberActive',(req,res)=>{

	let dt = req.query.dt;

	axios.get(`${baseUrl}/getActiveMemberTreand?user_type=2&user_code=2016110902663110&dt=${dt}`)
		.then((data)=>{
			res.json(data.data)
		})
})


module.exports = router;