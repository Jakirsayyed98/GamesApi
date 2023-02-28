const jwt = require('jsonwebtoken')
var SECRET_KEY = "JAKIR"

const auth = (req,res,next)=>{

    try {
        
        const token = req.headers.authorization;

        if(token){

            var result  = jwt.verify(token,SECRET_KEY)

            req.user_id = result.id
    

        }else{
            res.status(500).json({message:"Unathorized user"});
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error});
    }

}

module.exports = auth