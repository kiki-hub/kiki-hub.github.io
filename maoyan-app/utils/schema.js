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
exports.Fonemovielist = mongoose.model("fonemovie", movie_schema);
exports.Ftwomovielist = mongoose.model("ftwomovie", movie_schema);
exports.Buymovielist = mongoose.model("buymovie", movie_schema);

const user_schema = new Schema({
    mobile: Number,
    username: String,
    password: String,
    dbpwd: String,
    email: String,
    address: String,
})

exports.User = mongoose.model("user", user_schema);


const mhouse_schema = new Schema({
    id: Number,
    mark: Number,
    nm: String,
    sellPrice: String,
    addr: String,
    distance: String,
    tag: Object,
    promotion: Object
})

exports.Mhouse = mongoose.model("mhouse", mhouse_schema);


const city_schema = new Schema({
    cityId: Number,
    name: String,
    pinyin: String,
    isHot: Number,
})

exports.City = mongoose.model("mhouse", city_schema);