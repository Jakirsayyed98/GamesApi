const gamesModels = require('../models/gamesModel')
const getGames = (req,res)=>{

    gamesModels.find().then((result)=>{
        return  res.json({errorCode:"0",message:"Successfull", data: result })
    })
}


module.exports = getGames;