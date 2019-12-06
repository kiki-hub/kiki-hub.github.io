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
    md: String
})

exports.Student = mongoose.model("student", student_schema);

const teacher_schema = new Schema({
    mobile: Number,
    username: String,
    password: String,
    actpwd: String,
    tno: Number,
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