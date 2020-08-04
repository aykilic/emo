
require('dotenv').config();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "gmail",
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
         html: "<p style="text-align: center">&nbsp;</p>
         <p style="text-align: center;"><img src="fgh" alt="" />&nbsp;</p>
         <p style="text-align: center;">&nbsp;</p>
         <table>
         <tbody style="text-align: center;">
         <tr style="text-align: center;">
         <td style="text-align: center;">Nolu Siparişiniz oluşturuldu</td>
         </tr>
         </tbody>
         </table>", // html body
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