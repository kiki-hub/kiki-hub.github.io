var express = require('express');
var router = express.Router();

const { Student, Uid, Teacher } = require("../utils/schema");
// console.log(Student, Uid);
const { keys, aesEncrypt } = require("../utils/index");




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 教师登录注册
// 注册
router.post("/tregister", (req, res) => {
    const body = req.body;
    console.log(body);

    // 连接数据库
    Teacher.findOne({
        mobile: body.mobile,
    }).then(result => {
        if (result) {
            //手机号已经被注册
            res.send(`<script>if(confirm("手机号已被注册，请重新注册")){
                location.href="../register";
            }</script>`);
        } else {
            console.log("uids准备更新");
            //插入
            Uid.update({ name: "teacher" }, {
                $inc: {
                    id: 1
                }
            }).then(result => {
                Uid.findOne({
                    name: "teacher",
                }).then(result => {
                    console.log(result);
                    body.tno = result.id;
                    Teacher.insertMany(body).then(result => {
                        res.send(`<script>if(confirm("恭喜注册成功！是否前往登录？")){
                            location.href="../tlogin?mobile=${aesEncrypt(body.mobile,keys)}";
                        }</script>`);
                    });
                });
            });
        }
    })
})

// 登录
router.post("/tlogin", (req, res) => {
    console.log("正在获取body");
    const body = req.body;
    console.log(body);

    Teacher.findOne({
        mobile: body.mobile
    }).then(result => {
        if (result) {
            if (body.password == result.password) {
                console.log(req.session);
                req.session.mobile = result.mobile;
                req.session.username = result.username;
                req.session.tno = result.tno;
                // req.session.username = result.username.tno;
                res.send(`<script>if(confirm("登录成功，即将跳转首页")){
                    location.href="../home";
                }</script>`);
            } else {
                res.send(`<script>if(confirm("用户名密码不匹配,请重新登录")){
                    location.href="../tlogin";
                }</script>`);
            }
        } else {
            res.send(`<script>if(confirm("用户不存在,请重新登录")){
                location.href="../tlogin?mobile=${aesEncrypt(body.mobile,keys)}";
            }</script>`);
        }
    })
})


// 学生登录注册
// 注册
router.post("/register", (req, res) => {
    const body = req.body;
    console.log(body);

    // 连接数据库
    Student.findOne({
        mobile: body.mobile,
    }).then(result => {
        if (result) {
            //手机号已经被注册
            res.send(`<script>if(confirm("手机号已被注册，请重新注册")){
                location.href="../register";
            }</script>`);
        } else {
            console.log("uids准备更新");
            //插入
            Uid.update({ name: "student" }, {
                $inc: {
                    id: 1
                }
            }).then(result => {
                Uid.findOne({
                    name: "student",
                }).then(result => {
                    console.log(result);
                    body.sno = result.id;
                    Student.insertMany(body).then(result => {
                        res.send(`<script>if(confirm("恭喜注册成功！是否前往登录？")){
                            location.href="../login?mobile=${aesEncrypt(body.mobile,keys)}";
                        }</script>`);
                    });
                });
            });
        }
    })
})

// 登录
router.post("/login", (req, res) => {
    console.log("正在获取body");
    const body = req.body;
    console.log(body);

    Student.findOne({
        mobile: body.mobile
    }).then(result => {
        if (result) {

            if (body.password == result.password) {
                console.log(req.session);
                req.session.mobile = result.mobile;
                req.session.username = result.username;
                req.session.password = result.password;
                req.session.sno = result.sno;
                res.send(`<script>if(confirm("登录成功，即将跳转首页")){
                    location.href="../home";
                }</script>`);
            } else {
                res.send(`<script>if(confirm("用户名密码不匹配,请重新登录")){
                    location.href="../login";
                }</script>`);
            }
        } else {
            res.send(`<script>if(confirm("用户不存在,请重新登录")){
                location.href="../login?mobile=${aesEncrypt(body.mobile,keys)}";
            }</script>`);
        }
    })
})


module.exports = router;