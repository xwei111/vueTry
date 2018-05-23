const memberInfo = require('../models/memberInfo')

const formidable = require('formidable')
const fs = require('fs');
var sd = require("silly-datetime");
const AVATAR_UPLOAD_FOLDER = '/avatar/'; // 上传路径

const findAll = (findObj) =>{
	const p = new Promise((resolve,reject)=>{
		memberInfo.find(findObj).sort({_id:-1}).exec((err,docAll)=>{
			if(err){
				reject(err)
			}else{
				resolve(docAll)
			}
		})
	})

	return p;
}


// 会员信息列表分页及查询
exports.memberList = (req,res,next)=>{

	const {vipman,sex,lev,currentPage,currentSize} = req.query;
	
	var skip = (Number(currentPage)-1)*Number(currentSize)
	var limit = Number(currentSize)
	var vipmanobj=vipman?{name:{$regex:vipman}}:{}//模糊查询
	var sexobj=sex?{sex:sex}:{}
	var levanobj=lev?{lev:lev}:{}
	var obj = {...vipmanobj,...sexobj,...levanobj}

	findAll(obj)
		.then((result)=>{
			memberInfo.find(obj).skip(skip).limit(limit).sort({_id:-1}).exec((err,doc)=>{
					if(err){
						console.log('err',err);
						return ;
					}
					res.json({
						code:200,
						total:result.length,
						data:doc
					})
				})
		})
		.catch((err)=>{
			console.log('err',err)
		})

}

// 会员等级
exports.memberLev = (req,res,next) =>{

	findAll({})
		.then((result)=>{
			let levAry = [];
			let levData=[];
			result.map((item,idx)=>{
				if(levAry.indexOf(item.lev)<0){
					levAry.push(item.lev)
				}
			})

			for(let i=0;i<levAry.length;i++){
				var levObj={};
				levObj.value=levAry[i]
				levObj.label=levAry[i]
				levData.push(levObj)
			}
			res.json({
				code:200,
				data:levData
			})
		})
		.catch((err)=>{
			console.log('err',err)
		})
}

// 信息详情
exports.memberDetail = (req,res,next)=>{

	const {id} = req.query;
	const findObj ={id:id};

	findAll(findObj)
		.then((result)=>{
			res.json({
				code:200,
				data:result[0]
			})
		})
		.catch((err)=>{
			console.log('err',err)
		})

}

// 修改会员信息
exports.changeMenber = (req,res,next)=>{

	const {id} = req.query;
	const obj = req.body;

	memberInfo.update({id:id},obj).exec((err,doc)=>{
		if(err){
			console.log('err',err)
			res.json('err')
			return ;
		}

		res.json({
			code:200,
			msg:'success'
		})
	})

}

// 新增会员
exports.addMember = (req,res,next)=>{
	const obj = req.body;
	let ifH = false;
	findAll({})
		.then((result)=>{
			result.forEach((item,index,arr)=>{
				if(item.name == obj.name){
					ifH = true;
					
				}
			})
			if(ifH){
				res.json({
					code:400,
					msg:'会员已存在'
				})
			}else{
				let id = Number(Number(result[0].id) +1);
				obj.id = id;
				memberInfo.create(obj,(err,doc)=>{
					if(err){
						console.log('err',err)
						return ; 
					}
					res.json({
						code:200,
						msg:'success'
					})
				})
			}
			
		})
		.catch((err)=>{
			console.log('err',err)
		})
}

// 删除会员
exports.deleteMember = (req,res,next)=>{
	const { id } = req.query;

	memberInfo.findOneAndRemove({id:id}).exec((err,doc)=>{
		if(err){
			console.log('err',err)
			res.json('err')
			return ;
		}

		res.json({
			code:200,
			msg:'success'
		})
	})
}

// 上传图片
exports.uploadImg = function (req, res, next) {
	var form = new formidable.IncomingForm();   //创建上传表单
	form.encoding = 'utf-8';		//设置编辑
	form.uploadDir = 'server/public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
	form.keepExtensions = true;	 //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

	form.parse(req, function (err, fields, files) {

		if (err) {
			return res.json({
				"code": 500,
				"message": "内部服务器错误"
			})
		}

		// 限制文件大小 单位默认字节 这里限制大小为2m
		if (files.file.size > form.maxFieldsSize) {
			fs.unlink(files.file.path)
			return res.json({
				"code": 401,
				"message": "图片应小于2M"
			})
		}

		var extName = '';  //后缀名
		switch (files.file.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}

		if (extName.length == 0) {
			return res.json({
				"code": 404,
				"message": "只支持png和jpg格式图片"
			})
		}

		//使用第三方模块silly-datetime
		var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
		//生成随机数
		var ran = parseInt(Math.random() * 8999 + 10000);

		// 生成新图片名称
		var avatarName = t + '_' + ran + '.' + extName;
		// 新图片路径
		var newPath = form.uploadDir + avatarName;

		// 更改名字和路径
		fs.rename(files.file.path, newPath, function (err) {
			if (err) {
				return res.json({
					"code": 401,
					"message": "图片上传失败"
				})
			}
			return res.json({
				"code": 200,
				"message": "上传成功",
				result: 'http://localhost:3000'+AVATAR_UPLOAD_FOLDER + avatarName
			})
		})
	});

}












