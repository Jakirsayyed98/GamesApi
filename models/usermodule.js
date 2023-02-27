const mongoose = require('mongoose')

const model = mongoose.Schema({
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
    }
},{timestemps:true})