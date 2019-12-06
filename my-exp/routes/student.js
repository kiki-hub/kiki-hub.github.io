var express = require("express");
var router = express.Router();

const { Student, Banjilist } = require("../utils/schema");

router.get("/", (req, res) => {
    res.render("stuPerson", {
        username: req.session.username,
        sno: req.session.sno,
    });
});

router.get("/stu_shen", (req, res) => {
    res.render("stu_shen", {
        username: req.session.username,
        sno: req.session.sno,
    });
})

router.get("/stu_today", (req, res) => {
    res.render("stu_today", {
        username: req.session.username,
        sno: req.session.sno,
    });
})

router.get("/stu_updatemsg", (req, res) => {
    Banjilist.find({}, {}).then(result => {
        res.render("stu_updatemsg", {
            username: req.session.username,
            sno: req.session.sno,
            mobile: req.session.mobile,
            banjilist: result,
        });
    })
});


router.post("/changemsg", (req, res) => {
    var body = req.body;
    console.log(body);
    Student.updateOne({
        mobile: req.session.mobile
    }, {
        $set: body
    }).then(result => {
        console.log(result);
        res.send(`<script>alert('班级信息添加成功'); location.href="/student"</script>`)
    });
});


router.get("/stu_resetpwd", (req, res) => {
    res.render("stu_resetpwd", {
        mobile: req.session.mobile,
        username: req.session.username,
        sno: req.session.sno,
        password: req.session.password,
    });
});

router.post("/changepwd", (req, res) => {

    if (req.session.mobile) {
        var body = req.body;
        console.log(body);
        var mobile = req.session.mobile;
        Student.updateOne({ mobile }, {
            $set: {
                password: body.newpwd,
            }
        }).then(result => {
            console.log(result);
            res.json({
                code: 200,
                msg: "密码修改成功",
                newpwd: body.newpwd
            });
        });
    } else {
        res.send(`<script>alert('你还没有登录,请马上登录'); location.href="/login"</script>`);
    }
});



module.exports = router;