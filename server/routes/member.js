const express = require('express');
const router = express.Router();

const memberInfo = require('../controller/memberInfo')

// 会员信息
router.get('/memberList',memberInfo.memberList)

// 会员等级 memberLev
router.get('/memberLev',memberInfo.memberLev)

// 会员信息详情
router.get('/memberDetail',memberInfo.memberDetail)

// 更新会员信息详情
router.put('/changeMenber',memberInfo.changeMenber)

// 新增会员
router.post('/addMember',memberInfo.addMember)

// 删除会员
router.delete('/deleteMember',memberInfo.deleteMember)

// 上传图片
router.post('/uploadImg',memberInfo.uploadImg)

module.exports = router;