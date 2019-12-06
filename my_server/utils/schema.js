const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const student_schema = new Schema({
    mobile: Number,
    username: String,
    password: String,
    actpwd: String,
    sno: Number,
    bancode: String,
    email: String,
    md: String,
    flag: Number,
})

exports.Student = mongoose.model("student", student_schema);

const teacher_schema = new Schema({
    mobile: Number,
    username: String,
    password: String,
    actpwd: String,
    tno: Number,
    flag: Number,
})

exports.Teacher = mongoose.model("teacher", teacher_schema);

const banji_schema = new Schema({
    bancode: String,
    banji: String
});

exports.Banjilist = mongoose.model("banjilist", banji_schema);

const teabanji_schema = new Schema({
    tno: Number,
    mobile: Number,
    username: String,
    bancode: String,
});

exports.Teabanjilist = mongoose.model("teabanjilist", teabanji_schema);

const uid_schema = new Schema({
    name: String,
    id: Number
});

exports.Uid = mongoose.model("uid", uid_schema);

const movie_schema = new Schema({
    id: Number,
    haspromotionTag: Boolean,
    img: String,
    version: String,
    nm: String,
    preSStringhow: Boolean,
    sc: String,
    globalReleased: Boolean,
    wish: Number,
    star: String,
    rt: String,
    showInfo: String,
    showst: Number,
    wishst: Number,
    comingTitle: String,
    buynum: Number,
    mobile: Number,
});

exports.Movielist = mongoose.model("movie", movie_schema);

const hgood_schema=new Schema({
    offerPrice: Number,
    skuId: String,
    isQuantity: Number,
    skuName: String,
    sku: String,
    skuProductID: String,
    skuBrand:String,
    brandName_cn: String,
    Icon: String,
    skuPic: String,
    skuPic2: String,
    skuUrl: String,
    type: String
})

exports.Hgood = mongoose.model("hgood",hgood_schema);

var cart_schema = new Schema({
    mobile:Number,
    goodId:String,
    count:Number,
    good:Object,
    checked:Boolean
});

exports.Cart = mongoose.model("cart",cart_schema);

const banner_schema=new Schema({
    imgs:String,
})

exports.Banner=mongoose.model("banner",banner_schema);

const checkcode_schema=new Schema({
    mobile:String,
    code:String,
    time:String
})

exports.Checkcode=mongoose.model("checkcode",checkcode_schema);

const classgood_schema=new Schema({
    "parentCategory":Object,
    "childCategory":Object
})

exports.Classgood=mongoose.model("classgood",classgood_schema);
