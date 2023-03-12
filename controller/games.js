const gamesModels = require('../models/gamesModel')


const getGames = (req,res)=>{

    gamesModels.find().then((result)=>{
        return  res.json({errorCode:"0",message:"Successfull", data: result })
    })
}


const getSingelGame = (req,res)=>{
    const {id} = req.body;
    if(id!=""){
    gamesModels.findOne({_id:id}).then((result)=>{
        return  res.json({errorCode:"0",message:"Successfull", data: result })
    })
}else{
    return res.json({ërror_code :"0" , message :"Game id feild is required "})
}
}


module.exports = { getGames  , getSingelGame}

// module.exports ={getGames,getSingelGame} ;