const mongoose = require('mongoose');
const memberInfoDB = require('../mongodb/memberInfo')

const Schema = mongoose.Schema;

const userSchema = new Schema({
			user:{
				type: String,
			    required: true
			},
			pass: {
			    type: String,
			    required: true
			}
		},{
			timestamps: true,//在schema中设置timestamps为true，schema映射的文档document会自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
		})

userSchema.set('autoIndex', false);

const user = memberInfoDB.model('user', userSchema);


module.exports = user;