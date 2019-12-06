var express = require("express");
var router = express.Router();



const { Uid, Student, Teacher,Movielist } = require("./utils/schema");
const { aesEncrypt, keys } = require("./utils");

router.get("/", (req, res) => {
    res.json({
        msg: "这是 vue 项目 后台接口文件",
        body: null,
        code: 200
    })
});

router.get("/movie", (req, res) => {
    const limit=req.query.limit*1||0;
    console.log(limit);
    Movielist.find().limit(limit).then(result=>{
        res.json({
            msg: "这是 vue 项目 后台接口文件",
            body: null,
            code: 200,
            result:result,
        })
    })  
});

router.post("/register", (req, res) => {
    var body = req.body;
    console.log(body);
    var flag = !!body.type;

    flag ? insertDate(Teacher, "teacher") : insertDate(Student, "student");

    function insertDate(coll, collName) {
        coll.findOne({
            mobile: body.mobile * 1,
        }).then(result => {
            if (result) {
                res.json({
                    msg: "账号已被注册,请重新注册",
                    code: 200,
                    flag: 0,
                    result: "注册失败",
                })
            } else {
                //插入
                Uid.updateOne({
                    name: collName,
                }, {
                    $inc: {
                        id: 1
                    }
                }).then(result => {
                    Uid.findOne({
                        name: collName,
                    }).then(result => {
                        body.sno = result.id;
                        body.flag = flag;
                        coll.insertMany(body).then(result => {
                            res.json({
                                msg: "注册成功...",
                                code: 200,
                                flag: 1,
                                result: "",
                            })
                        })
                    })
                })
            }
        })
    }
});

router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body);
    var flag = !!body.type;
    flag ? findData(Teacher) : findData(Student);

    function findData(coll) {
        console.log(body.mobile);
        coll.findOne({
            mobile: body.mobile * 1,
        }).then(result => {
            console.log(result);
            if (result) {
                if (result.password == body.password) {

                    req.session.mobile = result.mobile;
                    req.session.username = result.username;
                    req.session.flag = result.flag;
                    req.session.token = aesEncrypt(body.mobile + new Date().getTime(), keys);
                    if (result.sno) {
                        req.session.sno = result.sno;
                    } else {
                        req.session.tno = result.tno;
                    }

                    res.json({
                        msg: "验证通过，登录成功",
                        code: 200,
                        flag: 1,
                        result,
                        token: req.session.token,
                    });
                } else {
                    res.json({
                        msg: "账号或密码输入不正确,请重新登录",
                        code: 200,
                        flag: 0,
                    })
                }
            } else {
                res.json({
                    msg: "该账号不存在，请重新登录",
                    code: 200,
                    flag: 0,
                })
            }
        })
    }
});



// 学生接口
// 根据学生 mobile 获取 所有信息
router.get("/stugetinfo", (req, res) => {
    console.log(req.headers);
    Student.findOne({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            msg: "获取学生基本信息成功",
            result,
            code: 200
        })
    })
})




// 教师接口
// 根据教师 mobile 获取 所有信息
router.get("/teacherinfo", (req, res) => {
    console.log(req.headers);
    Teacher.findOne({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            msg: "获取教师基本信息成功",
            result,
            code: 200
        })
    })
})








module.exports = router;