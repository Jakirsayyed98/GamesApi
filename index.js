const express = require('express');
const app =express();
const mongooose = require('mongoose');
const auth = require('./middlwear/middelwear');
const PORT = process.env.PORT || 2000;
const url =process.env.MONGO_URL || "mongodb+srv://jakirsayyed98:5ypFCNhcZbYT2QMB@cluster0.quz1kf2.mongodb.net/?retryWrites=true&w=majority";
const UserRoutes = require('./Routes/UserRoute')
const AdminOrationRoute = require('./Routes/adminOpration');
const GamesRoute = require('./Routes/GamesRoute');




app.use(express.json());

// app.get("/",auth , (req,res)=>{
//     console.log("Jakir2")
// })

app.use('/user',UserRoutes);
app.use('/admin' ,AdminOrationRoute);
app.use('/games',GamesRoute);


mongooose.set({strictQuery : true})
mongooose.connect(url,()=>{
    app.listen(PORT,()=>{
        console.log("Server was started successfully on Port number "+PORT)
    })
}).catch((error)=>{
    console.log("Error in "+error)
})


