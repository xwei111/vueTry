const mongoose = require('mongoose');
const memberInfoDB = require('../mongodb/memberInfo')

const Schema = mongoose.Schema;


const infoSchema = new Schema({
			id:{
				type: String,
			    required: true
			},
			name: {
			    type: String,
			    required: true
			},
			sex:{
				type:Number,
				required:true
			},
			tel:{
				type:Number,
				required:true
			},
			lev:{
				type:Number,
				required:true
			},
			integral:{
				type:Number,
				required:true
			},
			img:{
				type:String,
				required:true
			}
		},{
			timestamps: true,//在schema中设置timestamps为true，schema映射的文档document会自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
		})

infoSchema.set('autoIndex', false);

const memberInfo = memberInfoDB.model('memberInfo', infoSchema);


module.exports = memberInfo;