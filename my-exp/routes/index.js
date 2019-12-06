var express = require('express');
var router = express.Router();

const { keys, aesDecrypt } = require("../utils"); //Index.js可以不用加，会默认找到
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express--App',
        word: "Are you Ok?",
        ts: ["旭旭老师", "露纯老师", "大佐老师", "小曼老师"],
        username: "小大力",
        sno: req.session.sno,
    });
});

router.get("/home", (req, res) => {
    console.log(req.session);
    res.render("home", {
        title: "千锋后台管理系统",
        username: req.session.username,
        mobile: req.session.mobile,
        sno: req.session.sno,
    });
})

// 学生注册登录，个人中心
router.get("/login", (req, res) => {
    var query = req.query;
    // console.log(query);
    var mobile = query.mobile ? aesDecrypt(query.mobile, keys) : "";
    res.render("login", {
        mobile,
        username: req.session.username,
        sno: req.session.sno,

    });
})
router.get("/register", (req, res) => {
    res.render("register", {
        username: req.session.username,
        sno: req.session.sno,
    });
})


// 教师注册登录，个人中心
router.get("/tlogin", (req, res) => {
    var query = req.query;
    // console.log(query);
    var mobile = query.mobile ? aesDecrypt(query.mobile, keys) : "";
    res.render("tlogin", {
        mobile,
        username: req.session.username,
        sno: req.session.sno,
    });
});

router.get("/tregister", (req, res) => {
    res.render("tregister", {
        username: req.session.username,
        sno: req.session.sno,
    });
});





router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/home");
    })
})

//student个人中心

router.get("/stuPerson", (req, res) => {
    res.render("stuPerson", {
        username: req.session.username,
        sno: req.session.sno,
    });
})

//teacher个人中心
router.get("/TeaPerson", (req, res) => {
    res.render("TeaPerson", {
        username: req.session.username,
        sno: req.session.sno,
    });
})





//下面的都是实验
router.get('/wh1909', function(req, res) {
    res.send("this is a get 请求 返回数据给前端");
});

router.get('/info', function(req, res) {
    res.json({
        msg: "这是一个get请求 返回json数据",
        code: 200,
        query: req.query, //查询参数
        url: req.url,
        path: req.path,
    })
})

router.get('/list/:uid', function(req, res) {
    res.json({
        msg: "返回list中的json数据",
        code: 200,
        headers: req.headers,
        params: req.params //路由参数
    })
});

// 浏览器无法直接打开post请求,用postman来测post请求
router.post('/postsome', function(req, res) {
    res.json({
        code: 200,
        result: "这是一个post请求",
        body: req.body,
        headers: req.headers,
        query: req.query,
    })
});

//all  post&&get
router.all('/allsome', function(req, res) {
    res.send("这是一个post和get都可以的请求");
});


module.exports = router;