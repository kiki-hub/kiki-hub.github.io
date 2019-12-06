var express = require("express");
var router = express.Router();

var { Banjilist, Teabanjilist } = require("../utils/schema");

router.get("/", (req, res) => {
    res.render("TeaPerson", {
        username: req.session.username,
        sno: req.session.sno,
    });
});

router.get("/tea_banji", (req, res) => {
    Teabanjilist.find({ tno: req.session.tno }, {}).then(result => {
        if (result) {
            var obj = result;
            console.log(obj);
            Banjilist.find({}, {}).then(result => {
                res.render("tea_banji", {
                    username: req.session.username,
                    sno: req.session.sno,
                    banjilist: result,
                    obj,
                });
            });
        } else {
            Banjilist.find({}, {}).then(result => {
                res.render("tea_banji", {
                    username: req.session.username,
                    sno: req.session.sno,
                    banjilist: result,
                });
            });
        }
    })

});

router.post("/addBanji", (req, res) => {
    var body = req.body;
    Teabanjilist.findOne({
        bancode: body.bancode,
        tno: req.session.tno,
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "该班级已存在",
            });
        } else {
            Teabanjilist.insertMany({
                mobile: req.session.mobile,
                username: req.session.username,
                bancode: body.bancode,
                tno: req.session.tno,
            }).then(result => {
                res.json({
                    code: 200,
                    msg: "教师班级添加成功",
                });
            });
        }
    });
});






module.exports = router;