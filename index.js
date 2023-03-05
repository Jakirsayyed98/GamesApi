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


app.get('/savegames', (req,res)=>{

    fetchUrl("https://pub.gamezop.com/v3/games?id=4625", function(error, meta, body){
        var data = JSON.parse(body.toString())
        
        for (const i in data.games){

        gamesModels.findOne({code:data.games[i].code}).then((exist)=>{
            if(!exist){
                gamesModels.create({
                
                    code:data.games[i].code,
                    url:data.games[i].url,
                    name:data.games[i].name.en,
                    isPortrait:data.games[i].isPortrait,
                    description:data.games[i].description.en,
                    gamePreviews:data.games[i].gamePreviews.en,
                    assets:data.games[i].assets,
                    width:data.games[i].width,
                    height:data.games[i].height,
                    colorMuted:data.games[i].colorMuted,
                    colorVibrant:data.games[i].colorVibrant,
                    privateAllowed:data.games[i].privateAllowed,
                    rating:data.games[i].rating,
                    numberOfRatings:data.games[i].numberOfRatings,
                    gamePlays:data.games[i].gamePlays
    
                    // categories:categoriesdata,
    
    
                    // tags:data.games[i].tags.en.forEach(element => {
                    //     element
                    // })
                   
                })

            }else{
                console.log(i+" - this id is exist ")
            }

            })

        
          
        }

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


