
const ejs = require('ejs');
require('dotenv').config();
const path = require("path");
const nodemailer = require('nodemailer');
// const template = './havale.ejs';
// let datam={};
let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
    // service: "Gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });
  //  const html =  ejs.renderFile("Apollo-Server/helpers/havale.ejs", {
  //   test: 'Test'
  // },{async: true});
  


  // const sendmail = ejs.renderFile(template, (err, html) => {
  //   if (err) console.log(err); // Handle error

  //   // console.log(`HTML: ${html}`);

  //   let mailOpts = {
  //     from: '"Fred Foo 👻" <aykilicibrahim@gmail.com>', // sender address
  //     to: "aykilicibrahim@gmail.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     html: html
  //   };


  //  transporter.sendMail(mailOpts, (err, info) => {
  //    if (err) console.log(err); //Handle Error

  //     console.log(info);
  //  });
  // });

//   const havalesendmail = async (datam)=>{
//     // console.log("data",data);
   
//      transporter.sendMail({
//         // from: '"Fred Foo 👻" <aykilicpanel@gmail.com>', // sender address
//         from: '<aykilicpanel@gmail.com>', // sender address
//         to: "aykilicibrahim@gmail.com", // list of receivers
//         // subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: async (data) => {
//           try {
//             console.log("output",datam);
//                await ejs.renderFile(path.join(__dirname, "/havale.ejs"),{sipno:datam.sipno,username:datam.username,confirm_link: "http://www.8link.in"}
              
//               );
              
//           } catch (error) {
//               console.log("Error occured: ", error);
//           }
//         },
//       }).then(()=>{
//           console.log("email sent");
//       }).catch((err)=>{
//         console.log(err);
//     })
// }
const havalesendmail = async (datam)=>{
   console.log("__dirname",__dirname);
await ejs.renderFile(__dirname + "/havale.ejs", { sipno:datam.sipno,username:datam.username,usermail:datam.usermail,confirm_link: "http://www.8link.in" }, function (err, data) {
  if (err) {
      console.log(err);
  } else {
      var mainOptions = {
          from: 'info@emosetekstil.com.tr',
          to: datam.usermail,
          subject: 'Sipariş',
          html:  data
      };
      //console.log("html data ======================>", mainOptions.html);

      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          // res.json({
          //   msg: 'fail'
          // })
          console.log(err);
        } else {
          res.json({
            msg: 'success'
          })
        }
    });
    }
});
}

//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <aykilicibrahim@gmal.com>', // sender address
//     to: "aykilicibrahim@hotmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

exports.havalesendmail = havalesendmail