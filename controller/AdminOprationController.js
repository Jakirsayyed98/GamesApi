
var fetchUrl = require("fetch").fetchUrl;
const gamesModel = require("../models/gamesModel");
var gamesModels = require('../models/gamesModel');

const saveGames =  (req,res)=>{

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

}


module.exports  = saveGames;

 