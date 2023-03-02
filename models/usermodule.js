const mongoose = require('mongoose')

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
    }
},{timestamps:true});


module.exports = mongoose.model('UserModel',Usermodel)