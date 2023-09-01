const db = require('./db');

// 创建 users 表格
db.serialize(function () {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL ,
      mobile TEXT NOT NULL 
    )
  `);
});