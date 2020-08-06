
const ejs = require('ejs');
require('dotenv').config();
const path = require("path");
const nodemailer = require('nodemailer');
// const template = './havale.ejs';
// let datam={};
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

  const havalesendmail = async (data)=>{
    console.log("data",data);
   let datam=data
     transporter.sendMail({
        // from: '"Fred Foo 👻" <aykilicpanel@gmail.com>', // sender address
        from: '<aykilicpanel@gmail.com>', // sender address
        to: "aykilicibrahim@gmail.com", // list of receivers
        // subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output,
      }).then(()=>{
          console.log("email sent");
      }).catch((err)=>{
        console.log(err);
    })
}
const output = async (data) => {
  try {
    console.log("output",data);
      //Parameters inside the HTML file
      // let params = {firstName : 'John', lastName: 'Doe'};
      // ejs.renderFile(path.join(__dirname, "./helpers/havale.ejs"),
       await ejs.renderFile(path.join(__dirname, "/havale.ejs"),
      //  {
      //   username:"Ali Sakin", //capitalizedFirstName,
      //   confirm_link: "http://www.8link.in/confirm=", //+ userEmail
      //   sipno:"59243435"
      // }
      );
      // console.log(ejs);
  } catch (error) {
      console.log("Error occured: ", error);
  }
}
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <aykilicibrahim@gmal.com>', // sender address
//     to: "aykilicibrahim@hotmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

exports.havalesendmail = havalesendmail