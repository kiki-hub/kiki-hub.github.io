var express = require("express");
var router = express.Router();
const { Movielist, Fonemovielist, Ftwomovielist, User, Mhouse, Buymovielist } = require("../utils/schema");
console.log(Movielist, Ftwomovielist, User, Mhouse);

router.get("/movies", (req, res) => {
    Movielist.find().then(result => {
        res.json({
            code: 200,
            mag: "获取电影数据成功",
            result
        })
    })
});


router.get("/fonemovies", (req, res) => {
    Fonemovielist.find().then(result => {
        res.json({
            code: 200,
            msg: "获取电影数据成功",
            result
        })
    })
});

router.get("/ftwomovies", (req, res) => {
    Ftwomovielist.find().then(result => {
        res.json({
            code: 200,
            msg: "获取电影数据成功",
            result
        })
    })
});


router.get("/mhouseList", (req, res) => {
    Mhouse.find().then(result => {
        res.json({
            code: 200,
            msg: "电影院信息获取成功",
            result,
        })
    })
})



router.get("/demo", (req, res) => {
    res.json({
        code: 200,
        msg: "这是一个router的路由文件",
    })
});


// 注册
router.post("/register", (req, res) => {
    console.log(req.body);
    var body = req.body;
    User.findOne({
        mobile: body.mobile * 1,
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "该用户已存在，请重新注册",
            })
        } else {
            User.insertMany(body).then(result => {
                if (result) {
                    res.json({
                        code: 200,
                        msg: "注册成功",
                        flag: true,
                    })
                } else {
                    res.json({
                        code: 200,
                        msg: "注册失败",
                    });
                }
            })
        }
    })
})

// 登录
router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body.mobile);
    User.findOne({
        mobile: body.mobile,
    }).then(result => {
        console.log(result);
        if (result) {
            req.session.mobile = result.mobile;
            req.session.username = result.username;
            res.json({
                code: 200,
                msg: "登录成功",
                flag: true,
                result,
            })
        } else {
            res.json({
                code: 200,
                msg: "登录失败",
            })
        }
    })
})

// 更新用户信息
router.get("/updateuserinfo", (req, res) => {
    var mobile = req.query.mobile;
    User.updateOne({
        mobile,
    }, {
        $set: {
            username: req.query.username,
            email: req.query.email,
            address: req.query.address,
        }
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "更新成功",
            })
        } else {
            res.json({
                code: 200,
                msg: "更新失败",
            })
        }
    })
})

// 搜索用户信息
router.get("/getuserinfo", (req, res) => {
    var mobile = req.query.mobile;
    User.find({
        mobile,
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "用户信息获取成功",
                result
            })
        } else {
            res.json({
                code: 200,
                msg: "用户信息获取失败",
            })
        }
    })
})

// 插入购买记录信息
router.get("/insertbuymovielist", (req, res) => {
    req.query.mobile = req.session.mobile;
    console.log(req.query);
    var id = req.query.id;
    console.log(id);
    Buymovielist.findOne({
        mobile: req.query.mobile,
        id,
    }).then(result => {
        if (result) {
            Buymovielist.updateOne({
                mobile: req.query.mobile,
                id,
            }, {
                $inc: {
                    buynum: 1,
                }
            }).then(result => {
                if (result) {
                    res.json({
                        code: 200,
                        msg: "订单信息插入成功",
                    });
                } else {
                    res.json({
                        code: "200",
                        msg: "订单信息插入失败",
                    });
                }
            })

        } else {
            req.query.buynum = 1;
            Buymovielist.insertMany(req.query).then(result => {
                if (result) {
                    res.json({
                        code: 200,
                        msg: "订单信息插入成功",
                    });
                } else {
                    res.json({
                        code: "200",
                        msg: "订单信息插入失败",
                    });
                }
            })
        }
    })
})


// 搜索购买记录信息
router.get("/getbuymovielist", (req, res) => {
    var mobile = req.query.mobile;
    Buymovielist.find({
        mobile,
    }).then(result => {
        if (res) {
            res.json({
                code: 200,
                msg: "订单记录获取成功",
                result,
            });
        } else {
            res.json({
                code: 200,
                msg: "订单记录获取失败",
            })
        }
    })
})

module.exports = router;