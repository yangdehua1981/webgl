const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const db = require('./public/js/db');

const app = express();
app.use(bodyParser.json());
//app.use(bodyParser.text());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/view')));

// 注册路由
app.post('/register', (req, res) => {
    const { username, password, mail, mobile } = req.body;

    // 使用 bcrypt 对密码进行哈希处理
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 将用户数据插入到数据库中
    const stmt = db.prepare('INSERT INTO users (username, password,email,mobile) VALUES (?, ?,?,?)');
    stmt.run(username, hashedPassword, mail, mobile);
    stmt.finalize();

    res.json({ message: '注册成功' });
});

// 登录路由
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 查询用户记录
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (!row) {
            return res.status(401).json({ error: '用户名或密码错误' });
        }

        // 验证密码
        const isPasswordValid = bcrypt.compareSync(password, row.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: '用户名或密码错误' });
        }

        res.json({ message: '登录成功' });
    });
});

app.get('/register.html', (req, res) => {
    fs.readFile('public/view/register.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    })
}
);

app.get('/', (req, res) => {
    fs.readFile('public/view/login.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    })
}
);

app.get('/main.html', (req, res) => {
    fs.readFile('public/view/main.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    })
}
);

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`服务器已启动，监听端口 ${port}`);
});
