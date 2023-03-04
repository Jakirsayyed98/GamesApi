const nodemailer = require('nodemailer')

module.exports= mailer = (email, otpCode) => {

    let transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",  
        secure: true,
        secureConnection: false,
        port: 465,
        debug: true,
        requireTLS:true,
        tls:{
            ciphers:'SSLv3' //networking between one server to another
        },
        auth: {
            user: 'kanjal@paydoh.money',
            pass: 'Kanjal@12345'
        }
    });

    let mailOptions = {
      from: 'kanjal@paydoh.money',
      to: email,
      subject: "Your OTP is "+ otpCode,
      html: "<p>Your OTP for Change Password </p>"+ otpCode,
      text: "Thank You!!",
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return  console.log(error,"Send Email Error")
        } else {
          return  console.log('Email Sent: ' + info.response)
        }
    });
}