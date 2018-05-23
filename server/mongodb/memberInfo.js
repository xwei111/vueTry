const mongoose = require('mongoose');
const config = require('../config/index')

// mongoose.connect(url);//链接一个数据库
// const db = mongoose.connection;

const url = config.prodUrl;

const memberInfoDB = mongoose.createConnection(url);//链接多个数据库

memberInfoDB.on('error', (err) => {
  console.error(`  MongoDB Connection Error: ${err}`);
});

memberInfoDB.once('connected', () => {
  console.log(`  MongoDB Connection Success!`);
});

memberInfoDB.on('disconnected', () => {
  console.error(`  MongoDB Connection Failed!`);
});

module.exports = memberInfoDB;