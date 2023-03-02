var Nodemailer = require('nodemailer');
var Transformer  = Nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    requireTLS:false,
    
    tls:false,
    auth:{
        user: 'jakirsayyed98@gmail.com',
        pass: '9221065740'
    }
});

var mailOption= {
    from:"jakirsayyed98@gmail.com",
    to:"jakirsayyed98@gmail.com",
    html: 'Good Morning!',
    subject:"OTP for verification",
    PLAIN:"Hello Your OTP is 5421",

}

Transformer.sendMail(mailOption,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log(info.response + " Mailed Send Successfully")
    }
})

