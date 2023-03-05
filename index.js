const express = require('express');
const app =express();
const mongooose = require('mongoose');
const auth = require('./middlwear/middelwear');
const PORT = process.env.PORT || 2000;
const url =process.env.MONGO_URL || "mongodb+srv://jakirsayyed98:5ypFCNhcZbYT2QMB@cluster0.quz1kf2.mongodb.net/?retryWrites=true&w=majority";
const UserRoutes = require('./Routes/UserRoute')
var fetchUrl = require("fetch").fetchUrl;
var gamesModels = require('./models/gamesModel')

app.get("/getGames",(req,res)=>{
    gamesModels.find().then((result)=>{
        return  res.json({errorCode:"0",message:"Successfull", data: result })
    })
})


app.get('/savegames',(req,res)=>{

    fetchUrl("https://pub.gamezop.com/v3/games?id=4625", function(error, meta, body){
        var data = JSON.parse(body.toString())

        for (const i in data.games){
            console.log(data.games[i].name.en+"js")
            gamesModels.create({
                
                code:data.games[i].code,
                url:data.games[i].url,
                name:data.games[i].name.en,
                isPortrait:data.games[i].isPortrait,
                description:data.games[i].description.en,
                gamePreviews:data.games[i].gamePreviews.en,
                assets:data.games[i].assets,
                // categories:data.games[i].categories.en,


                // tags:data.games[i].tags.en.forEach(element => {
                //     element
                // })
                
                // tags:{
                //     require:true,
                //     type:String
                // },
                // width:{
                //     require:true,
                //     type:String
                // },
                // height:{
                //     require:true,
                //     type:String
                // },
                // colorMuted:{
                //     require:true,
                //     type:String
                // },
                // colorVibrant:{
                //     require:true,
                //     type:String
                // },
                // privateAllowed:{
                //     require:true,
                //     type:String
                // },
                // rating:{
                //     require:true,
                //     type:String
                // },
                // numberOfRatings:{
                //     require:true,
                //     type:String
                // },
                // gamePlays:{
                //     require:true,
                //     type:String
                // }
    
            }).then((result)=>{
             //   res.json({errorcode:"0",message:"Sucessfull",data:JSON.parse(data)})
            })
        }

        gamesModels.create({

            code:data.code,
            // url:{
            //     require:true,
            //     type:String
            // },
            // name:{
            //     require:true,
            //     type:String
            // },
            // isPortrait:{
            //     require:true,
            //     type:String
            // },
            // description:{
            //     require:true,
            //     type:String
            // },
            // gamePreviews:{
            //     require:true,
            //     type:String
            // },
            // assets:{
            //     require:true,
            //     type:String
            // },
            // categories:{
            //     require:true,
            //     type:String
            // },
            // tags:{
            //     require:true,
            //     type:String
            // },
            // width:{
            //     require:true,
            //     type:String
            // },
            // height:{
            //     require:true,
            //     type:String
            // },
            // colorMuted:{
            //     require:true,
            //     type:String
            // },
            // colorVibrant:{
            //     require:true,
            //     type:String
            // },
            // privateAllowed:{
            //     require:true,
            //     type:String
            // },
            // rating:{
            //     require:true,
            //     type:String
            // },
            // numberOfRatings:{
            //     require:true,
            //     type:String
            // },
            // gamePlays:{
            //     require:true,
            //     type:String
            // }

        }).then((result)=>{
         //   res.json({errorcode:"0",message:"Sucessfull",data:JSON.parse(data)})
        })
 });

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


