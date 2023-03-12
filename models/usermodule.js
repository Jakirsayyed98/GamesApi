const mongoose = require('mongoose')
const gamesModels = require('../models/gamesModel')

const Usermodel = mongoose.Schema({
    username:{
        type:String,
        require : true
    },
    name:{
        type:String,
        require : true
    },
    email:{
        type:String,
        require : true
    },
    password:{
        type:String,
        require : true
    },
    isVerified:{
        type:String,
        default:0
    },
    OTP:{
        type:String,
        require:true
    },
    Recent:{
        type:Array,
        default:[],
        require:true
    }
},{timestamps:true});


module.exports = mongoose.model('UserModel',Usermodel)