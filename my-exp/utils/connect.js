const mongoose = require("mongoose");
// 连接数据库
const hostname = "0.0.0.0";
const port = 27017;
const dbName = "wh1909";

const CONN_DB_STR = `mongodb://${hostname}:${port}/${dbName}`;

mongoose.connect(CONN_DB_STR, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("数据库连接成功");
})

connection.on("open", () => {
    console.log("mongo数据库连接已开启");
})

connection.on("error", (err) => {
    console.log("数据库连接异常" + err);
})

connection.on("disconnected", () => {
    console.log("数据库断开连接");
})

module.export = connection;