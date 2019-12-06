//链接数据库
const mongoose = require("mongoose");

const hostname = "0.0.0.0";
const port = 27017;
const dbName = "wh1909";

const DB_CONN_STR = `mongodb://${hostname}:${port}/${dbName}`;

//链接数据库 代码
mongoose.connect(DB_CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("mongodb  数据库连接成功 ...");
});

connection.on("open", () => {
    console.log("mongodb  数据库已经链接open开启 ...");
});

connection.on("error", () => {
    console.log("mongodb  connection异常 ...");
});

connection.on("disconnected", () => {
    console.log("mongodb  数据库连接断开 ...");
});

module.exports = connection;