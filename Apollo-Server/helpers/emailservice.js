
require('dotenv').config();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true, // true for 465, false for other ports
    // service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });
  const sendmail = (data)=>{
     transporter.sendMail({
        from: '"Fred Foo 👻" <aykilicibrahim@gmail.com>', // sender address
        to: "aykilicibrahim@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
         html: "<b>Hello world?</b><h3>ibooooo</h3>", // html body
      }).then(()=>{
          console.log("email sent");
      }).catch((err)=>{
        console.log(err);
    })
}

//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <aykilicibrahim@gmal.com>', // sender address
//     to: "aykilicibrahim@hotmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
exports.sendmail = sendmail