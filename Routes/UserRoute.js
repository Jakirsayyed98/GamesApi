const express = require('express');
const app =express();
const UserRoutes = express.Router();


UserRoutes.get("/",(req,res)=>{
    res.status(200).json({user : req.body})
})
module.exports = UserRoutes;