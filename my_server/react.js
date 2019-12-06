const express = require("express");
const router =express.Router();
const {Movie,Hgood,Banner,Checkcode,Cart,Classgood} = require("./utils/schema");
const {sendCode} = require("./utils/config");
const {createToken,decodeToken,getMobile} = require("./utils/token");
// console.log(createToken);

 
router.get("/",(req,res)=>{
    res.json({
        code:200,
        msg:"react的demo测试",
    })
})


// router.get("/banner",(req,res)=>{
//     res.json({
//         code:200,
//         msg:"测试一下你OK"
//     })
// })

router.get("/getbanner",(req,res)=>{
    Banner.find().then(result=>{
        // console.log(result);
        res.json({
            code:200,
            msg:"banner图片获取成功",
            result,
        })
    })
})


router.get("/changemsg",(req,res)=>{
    res.json({
        code:200,
        msg:"react路由数据请求成功",
    })
})


router.get("/gethgood",(req,res)=>{
    Hgood.find().then(result=>{
        res.json({
            code:200,
            msg:"数据获取成功",
            result,
        })
    })
})



//发送验证码
router.post("/sendCode", (req, res) => {
    var mobile = req.body.mobile;
    var code = getCode();
    if (mobile == "") {
        res.json({
            msg: "手机号不能为空，请重新输入",
            code: 200
        })
    }
    sendCode(code,mobile).then(result => {
        console.log(result)
        if (result.Code == "OK") {
            var time=new Date();
            // const time=dt.getTime()
            console.log(time);
            Checkcode.insertMany({
                mobile,
                code,
                time,
            }).then(result => {
                res.json({
                    code: 200,
                    param: code,
                    msg: "验证码发送成功",
                    type: 1
                })
            })
        } else {
            res.json({
                code: 200,
                msg: "验证码发送失败",
                type: 0
            })
        }
    }).catch(err=>{
        res.json({
            code:200,
            msg:"服务器错误",
            type:0
        })
    })

})





// 获取验证码
// router.post("/sendCode",(req,res)=>{
//     var mobile=req.body.mobile;
//     var code=getCode();
//     if(!mobile){
//         res.json({
//             msg:"手机号不合法，请重新输入",
//             code:200,
//         })
//     }

    // 发送验证码
//     sendCode(code,mobile).then(res=>{
//         console.log(res);
//         if(res.Code=='OK'){
//             Checkcode.insertMany({
//                 mobile,
//                 code,
//                 time:new Date()
//             }).then(result=>{
//                 res.json({
//                     code:200,
//                     msg:"验证码发送成功",
//                     params:code,
//                     type:1,
//                 })
//             })
//         }
//         else{
//             res.json({
//                 code:200,
//                 msg:"验证码发送失败",
//                 type:0
//             })
//         }
//     }).catch(err=>{
//         res.json({
//             code:200,
//             msg:"阿里云服务器出错",
//             type:0
//         })
//     })
// })


//生成四位数的验证码
function getCode(){
    return Math.floor(Math.random()*9000)+1000;
}


// 验证登录  手机号和验证码是否匹配
router.post("/checklogin",(req,res)=>{
    const mobile=req.body.mobile;
    const code=req.body.code;
    console.log(mobile,code); 
    Checkcode.find({
        mobile,
        code
    }).then(result=>{
        if(result.length>0){
            console.log(result);
            var dt=new Date();
            var time=dt.getTime();
            var beforedt=new Date(result[0].time);
            var btime=beforedt.getTime();
            console.log(time,btime);
            console.log(time-btime);
            if(time-btime<24*60*60*1000){  //先改成5个小时,做完页面再改回来60*1000
                const token = createToken(mobile);
                console.log(token);
                res.json({
                    code:200,
                    msg:"登录成功",
                    type:1,
                    token
                })
            }
            else{
                res.json({
                    code:200,
                    msg:"验证码已过期",
                    type:0
                })
            }
        }
        else{
            res.json({
                code:200,
                msg:"手机号或验证码错误",
                type:0,
            })
        }
    })
})


//获取用户数据
router.post("/getmobile",(req,res)=>{
    var token=req.headers.token;
    console.log(token);
    if(token){
        decodeToken(token).then(result=>{
            res.json({
                code:200,
                msg:"token解密成功",
                result,
                type:1
            })
        }).catch(err=>{
            res.json({
                code:'400',
                msg:"token解密失败",
                err,
                type:0
            })
        })
    }
    else{
        res.json({
            code:'400',
            msg:"token不存在，请马上登录",
            type:0
        })
    }
})


//获得解密后的token
// export function getmobile(token){
//     if(token){
//         decodeToken(token).then(result=>{
//             res.json({
//                 code:200,
//                 msg:"token解密成功",
//                 result,
//                 type:1
//             })
//         }).catch(err=>{
//             res.json({
//                 code:'400',
//                 msg:"token解密失败",
//                 err,
//                 type:0
//             })
//         })
//     }
//     else{
//         res.json({
//             code:'400',
//             msg:"token不存在，请马上登录",
//             type:0
//         })
//     }
// }


// 上传头像  
var multer = require("multer");
var storage = multer.diskStorage({ // 操作硬盘 
    destination: function(req, file, cb) {
        cb(null, './public/avatar')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + 'wh1909' + file.originalname); // 123412123231221wh19092.jpg
    }
});

// 创建上传对象   
var upload = multer({ storage: storage }).any();


router.post("/uploadavatar",upload,(req,res)=>{
    //存入数据库
    //mobile
    console.log(upload);
    console.log(req.files[0]);
    var path=req.files[0].path;
    res.json({
        code:200,
        msg:"头像上传成功",
        path
    })
})

//购物车

// 加入购物车 

router.post("/addToShopCar",(req,res)=>{
    var body  = req.body;
    console.log(body.goodId);
    getMobile(req,res,mobile=>{
        Cart.findOne({
            mobile:mobile,
            goodId:body.goodId,
        }).then(result=>{
            if(result){
                Cart.updateOne({
                    mobile:mobile,
                    goodId:body.goodId
                },{
                    $inc:{
                        count:body.count
                    },
                    $set:{
                        time:new Date()
                    }
                }).then(data=>{
                    res.json({
                        code:200,
                        msg:"购物车数量累计添加成功",
                        result:data
                    })
                })
            }else{
                body.mobile = mobile;
                body.time = new Date();
                Cart.insertMany(body).then(data=>{
                    res.json({
                        code:200,
                        msg:"购物车数量新增成功",
                        result:data
                    })
                })
            }
        })
    })
})

// 根据 mobile 获取 当前用户的购物车
router.post("/getCarList",(req,res)=>{
    getMobile(req,res,mobile=>{
        Cart.find({
            mobile,
        }).then(result=>{
            res.json({
                code:200,
                msg:"购物车商品信息获取成功",
                result
            })
        })
    })
})



// 根据 goodId 修改 全选反选  
router.post("/changechecked",(req,res)=>{
    var body = req.body;
    const {
        checked,
        goodId
    } = body;
    getMobile(req,res,mobile=>{
        var obj = {
            mobile
        }
        if(goodId!=="-1"){
            obj.goodId = goodId
        }
        Cart.updateMany(obj,{
            $set:{
                checked,
            }
        }).then(result=>{
            res.json({
                code:200,
                msg:"修改商品选中成功....",
                result
            })
        })
    })
})


// 根据 goodId 修改 count 
router.post("/changecount",(req,res)=>{
    var body = req.body;
    var {
        count,
        flag,
        goodId 
    } = body;
    getMobile(req,res,mobile=>{
        var obj = {};
        if(count=="-1"){   // +1 -1 
            obj = {
                $inc:{
                    count:flag?1:-1
                }
            }
        }else{
            obj = {
                $set:{
                    count
                }
            }
        }
        Cart.updateOne({
            mobile,
            goodId
        },obj).then(result=>{
            res.json({
                code:200,
                msg:"修改商品数量成功....",
                result
            })
        })
    })
}) 

// 删除选中 
router.post("/delSelect",(req,res)=>{
    getMobile(req,res,mobile=>{
        Cart.remove({
            mobile,
            checked:true
        }).then(result=>{
            res.json({
                code:200,
                msg:"购物车删除选中成功...",
                result
            })
        })
    })
})

//获取分类数据
router.post("/getclassify",(req,res)=>{
    Classgood.find().then(result=>{
        res.json({
            code:200,
            msg:"分类数据获取成功",
            result,
        })
    })
})

module.exports=router;