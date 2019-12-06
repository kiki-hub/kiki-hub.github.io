const express = require("express");
const app = express();
const cors = require("cors");

// const server = require("http").createServer(app);


// 配置https
var http = require("http");
var https = require('https');
var fs = require("fs");
// 第一步：https
var privateKey  = fs.readFileSync('./cert/https.key', 'utf8');  
var certificate = fs.readFileSync('./cert/https.pem', 'utf8');  
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);   // https
var httpServer = http.createServer(app);   // http


const port = "1909";
const hostname = "0.0.0.0";
const connection = require("./utils/connect");
const path = require("path");

app.use(cors()); // cors 解决跨域的问题 
app.use(express.json()); //得到post请求提交的数据 fromData
app.use(express.urlencoded({ extended: false })); //req.body
app.use(express.static(path.join(__dirname, 'public')));  // 设置express静态文件目录 img/css/js

var session = require("express-session");
app.use(session({
    name: "my-server",
    saveUninitialized: true,
    secret: "test",
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false
}))


// 使用token中间件
var { checkToken } = require("./utils");
// app.use(checkToken);

// 测试用的
app.get("/index", (req, res) => {
    res.send("这是我的 1909后台服务器地址");
});


// 创建vue.js路由
const vueRouter = require("./vue.js");
app.use("/vue", vueRouter);

// 创建react.js路由
const reactRouter = require("./react.js");
app.use("/react", reactRouter);

httpsServer.listen(port, hostname, () => {
    console.log(`my server is running in https://${hostname}:${port}`);
});