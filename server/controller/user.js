const userInfo = require('../models/user')
const jwt = require('jsonwebtoken')

const findAll = (findObj) =>{
	const p = new Promise((resolve,reject)=>{
		userInfo.find(findObj).sort({_id:-1}).select({createdAt:0,updatedAt:0,__v:0}).exec((err,docAll)=>{
			if(err){
				reject(err)
			}else{
				resolve(docAll)
			}
		})
	})

	return p;
}


// 新增会员
exports.login = (req,res,next)=>{

	const {user,pass} = req.query;

	const obj={user:user}

	findAll(obj)
		.then((result)=>{
			const data = result[0];
			console.log('data',data)
			if(!data){
				res.json({
					code:401,
					data:'用户不存在'
				})
			}else if(pass!==data.pass){
				res.json({
					code:401,
					data:'用户密码错误'
				})
			}else{
				let id = data._id
				let expires = 60 * 60 * 24 * 30;
				let token = jwt.sign({ id, user }, 'secret', { expiresIn: expires })
				res.json({
					code:200,
					message:'登录成功',
					data:{
						user:user,
						token:token,
						id:id
					}
				})
			}
		})
		.catch((err)=>{
			console.log('err',err)
		})
}












