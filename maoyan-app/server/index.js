const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express();

const connection = require("../utils/connect");

//post 获取body数据必须要加
app.use(express.json()); //得到post请求提交的数据 fromData
app.use(express.urlencoded({ extended: false })); //req.body

// 全局声明session
var session = require("express-session");
app.use(session({
    name: "my-server",
    saveUninitialized: true,
    secret: "test",
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false
}))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()


//此文件相当于express app.js
app.get("/api/demo", (req, res) => {
    res.json({
        code: 200,
        msg: "这是一个测试用的demo文件",
    });
});

//导入api.js
const apiRouter = require("./api");
app.use("/api", apiRouter);

//导入session
var session = require("express-session");
app.use(session({
    name: "my-server",
    saveUninitialized: true,
    secret: "test",
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false
}));