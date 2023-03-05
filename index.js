const express = require('express');
const app =express();
const mongooose = require('mongoose');
const auth = require('./middlwear/middelwear');
const PORT = process.env.PORT || 2000;
const url =process.env.MONGO_URL || "mongodb+srv://jakirsayyed98:5ypFCNhcZbYT2QMB@cluster0.quz1kf2.mongodb.net/?retryWrites=true&w=majority";
const UserRoutes = require('./Routes/UserRoute')
var fetchUrl = require("fetch").fetchUrl;



app.get('/games',(req,res)=>{

    fetchUrl("https://pub.gamezop.com/v3/games?id=4625", function(error, meta, body){
        
        var data = body.toString()
        res.json({errorcode:"0",message:"Sucessfull",games:JSON.parse(data)})
    });

    // fetch('https://pub.gamezop.com/v3/games?id=4625').then((result)=>{
    //     res.json({errorcode:"0",message:"Sucessfull",games:result.json()})
    // })
})



app.use(express.json());

// app.get("/",auth , (req,res)=>{
//     console.log("Jakir2")
// })

app.use('/user',UserRoutes);



mongooose.set({strictQuery : true})
mongooose.connect(url,()=>{
    app.listen(PORT,()=>{
        console.log("Server was started successfully on Port number "+PORT)
    })
}).catch((error)=>{
    console.log("Error in "+error)
})


