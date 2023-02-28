const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/usermodule')
var SECRET_KEY = "JAKIR"
const UserSignUp = async (req, res) => {

    const { username, name, email, password } = req.body;

    try {

        const existingUser = await UserModel.findOne({ username: username })

        if (existingUser) {
            return res.status(400).json({ errorCode: 0, message: "User Already Registerd " })
        }

        var pass = await bcrypt.hash(password, 10)

         await UserModel.create({
            username: username,
            email: email,
            password: pass,
            name: name,
        }).then((result)=>{

            var tokens = jwt.sign({ id: result._id, email: result.email, password: result.password }, SECRET_KEY)

            return res.status(201).json({
                message: "SuccessFully registered",
                errorCode: 1,
                User: result,
                token: tokens
            })
        })

     


    } catch (error) {
        console.log(error)
    }





}

const UserSignIn = async (req, res) => {

    const { username, name, email, password } = req.body;

    try {

        const ExistUser = await UserModel.findOne({ email: email })

        if (!ExistUser) {
            return res.status(401).json({
                errorCode: "0",
                message: "User Not Exist"
            })
        }

        var passw =await bcrypt.compare(password, ExistUser.password)
        if (!passw) {
            return res.status(401).json({
                errorCode: "0",
                message: "Invalid Credintials"
            })
        }


        var tokens = jwt.sign({ id: ExistUser._id, email: ExistUser.email, password:ExistUser.password }, SECRET_KEY)

        return res.status(201).json({
            message: "SuccessFully registered",
            errorCode: 1,
            User: ExistUser,
            token: tokens
        })



    } catch (error) {
        console.log("Error " + error)
        res.status(400).json({
            errorCode: "0",
            message: error
        })
    }





}

module.exports = { UserSignUp, UserSignIn }