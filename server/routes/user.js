const express = require('express');
const router = express.Router();

const user = require('../controller/user')

// 登录
router.post('/login',user.login)

module.exports = router;