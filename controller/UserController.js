const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/usermodule')
var SECRET_KEY = "JAKIR"
const nodemailer = require('../middlwear/OTPSend')

const UserSignUp = async (req, res) => {

    const { username, name, email, password, OTP } = req.body;

    try {

        const existingUser = await UserModel.findOne({ username: username })


        if (existingUser) {
            return res.status(400).json({ errorCode: 0, message: "User Already Registerd " })
        }

        var pass = await bcrypt.hash(password, 10)
        var otppin = Math.floor(Math.random() * 9999 + 1000)
        await UserModel.create({
            username: username,
            email: email,
            password: pass,
            name: name,
            OTP: otppin
        }).then((result) => {

            nodemailer(result.email, result.OTP)
            var tokens = jwt.sign({ id: result._id, email: result.email, password: result.password }, SECRET_KEY)

            return res.status(201).json({
                errorMsg: "SuccessFully registered",

                errorCode: "1",
                "data": result,
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

        var passw = await bcrypt.compare(password, ExistUser.password)
        if (!passw) {
            return res.status(401).json({
                errorCode: "0",
                message: "Invalid Credintials"
            })
        }


        var tokens = jwt.sign({ id: ExistUser._id, email: ExistUser.email, password: ExistUser.password }, SECRET_KEY)

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


const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        var data = await UserModel.findOne({ email: email })

        if (data.isVerified == "1") {
            return res.status(200).json({ errorcode: "1", message: "Already Verified" })
        }

        if (data.OTP != otp) {
            return res.status(400).json({ errorcode: "1", message: "Invalid OTP " })
        }

        UserModel.updateOne({ email: email }, { $set: { isVerified: "1" } }).then((verifyed) => {
            return res.status(201).json({ errorcode: "0", message: "Successfully verified", data: verifyed })
        })


    } catch (error) {
        res.status(401).json({ message: error })
    }


}


const verifiedUserList = (req, res) => {
    const { isVerified } = req.body
    if (isVerified != "") {
        UserModel.find({ isVerified: isVerified }).then((result) => {
            return res.json({ data: result })
        })
    } else {
        UserModel.find().then((result) => {
          return  res.json({ data: result })
        })
    }
}


module.exports = { UserSignUp, UserSignIn, verifyOTP, verifiedUserList }