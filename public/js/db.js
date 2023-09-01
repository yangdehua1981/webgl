const sqlite3 = require('sqlite3').verbose();

// 连接到 SQLite 数据库
const db = new sqlite3.Database('./database.sqlite');
// 导出数据库连接对象
module.exports = db;