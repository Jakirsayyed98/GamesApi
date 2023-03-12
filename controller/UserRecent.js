const { updateMany, insertMany } = require('../models/usermodule');
const userModel = require('../models/usermodule')


const addToRecent = async (req, res) => {

    var { email, Game_id } = req.body;

    var Userexist = await userModel.findOne({ email: email })
    if (Userexist != null) {


        if (Game_id != null) {
            userModel.findOneAndUpdate({ email: email },{ Recent: {Game_id}}).then((result) => {
                res.json({ error_code: "1", message: "SuccessFully added to recent ", data: result })
            })
        } else {
            return res.json({ error_code: "0", message: "Game id required" })
        }

    } else {
        res.json({ error_code: "0", message: "user not exist" })
    }
}

// userModel.updateOne({email : email } , {$set:{ Recent : [{Game_id:Game_id}]}}).then((result)=>{
//         res.json({error_code:"1",message:"SuccessFully added to recent ",data:result})
// })


module.exports = addToRecent;
