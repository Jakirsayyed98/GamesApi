const express = require('express');
const app =express();
const mongooose = require('mongoose');
const auth = require('./middlwear/middelwear');
const PORT = process.env.PORT || 2000;
const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.0";
const UserRoutes = require('./Routes/UserRoute')

app.use(express.json());

app.get("/",auth , (req,res)=>{
    console.log("Jakir2")
})

app.use('/user',UserRoutes);



mongooose.set({strictQuery : true})
mongooose.connect(url,()=>{
    app.listen(PORT,()=>{
        console.log("Server was started successfully on Port number "+PORT)
    })
}).catch((error)=>{
    console.log("Error in "+error)
})


