const express = require('express');
const http =require('http')
const https =require('https')
// import https from 'https'
require('dotenv').config();
const { ApolloServer, gql, PubSub } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
 const { GraphQLUpload } = require('graphql-upload')
const {createWriteStream} = require('fs')
const mongoose = require("mongoose");
const path = require("path");
const fs =require ('fs');
const ejs = require("ejs");
const bodyParser = require('body-parser')
const hmacSHA256 = require ('crypto-js/hmac-sha256');
const Base64 = require ('crypto-js/enc-base64');

// const socketio = require('socket.io')
// const {sendmail}=require('./helpers/emailservice.js')
var jwt = require('jsonwebtoken');
// const socketio = require('socket.io') // my io.on('connection', socket => {}) function taking io as param

var promisesAll = require('promises-all');

// Provide resolver functions for your schema fields
const resolvers = require('./resolvers/index');

const Models =require('./models/index');
const { assertValidSDL } = require('graphql/validation/validate');
const pubsub=new(PubSub);
mongoose.connect(process.env.DB_HOST,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify:false, useUnifiedTopology: true})
  .then(()=>console.log('connected'))
  .catch(e =>
     console.log("Server Connection Failed!")
     );
  
  //  new Date().toLocaleString('tr', {
  //   timeZone: 'Europe/Istanbul'
  // });
  //  console.log(Date());

const basicDefs = importSchema('./schema.graphql')

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 3443, hostname: 'www.emosetekstil.com.tr' },
  // production: { ssl: false, port: 4000, hostname: 'localhost' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
}
// console.log(process.env.NODE_ENV);
const environment = process.env.NODE_ENV || 'production'
const config = configurations[environment]



const apollo = new ApolloServer({
  introspection: true,
  playground: true,
   typeDefs: [basicDefs],
  resolvers: [
    resolvers,
  ],



  // context: {
  //   Models,
  //   pubsub
  // },
  context: async ({ req, payload }) => {
      // console.log("req*****************************************************",req, "payload", payload);
    return {
      ...req,
      pubsub,
      Models,
    };
},
  // Upload: false,
  graphiql: true,
  
//   subscriptions: {
//     onConnect: async (connectionParams, webSocket) => {
//       console.log("connect",connectionParams);
//       // log.info(`<ws> ${user.name} connected.`);
//       // log.info(`<ws> ibo connected.`);
//       let data = {}
//        data = "ibo"
//       return data
//     },
//     onDisconnect: (params, socket) => {
//         // console.log("params-*****************************************************",params.client);
//   },
// }
 });
const app = express();
app.use(express.json());
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());
// app.use(async(req, res, next)=>{
//   // console.log("req.headers",req.headers);
// const token=req.headers['authorization'];
// if(token && token !=='null'){
//   //  console.log(token);
// // try {
//   const User= await jwt.verify(token,process.env.JWT_SECRET)
//   req.role = User
//    console.log("User",User);
// // } catch (e) {
//   // console.log("hata",e);
// // }
//   if(User){

//   }
// }
// next()
// });
// console.log(environment);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './helpers')))
// express.static(path.join(__dirname, './'));
app.get("/sell",async (req, res, next) => {
  let sippp=""
   console.log("sell hazırlık",req.body);
  if (req.body.status==='success') {
    
      const model = Models.siparis
        console.log("success");
      
    //  return await stokturu.find({_id:id})
      const sip= await model.findOne({sipno:req.body.merchant_oid})
      
      if (sip) {
        console.log("2");
         let cevap=""
        // console.log(1);
        let hash =Base64.stringify(hmacSHA256(sip.sipno+process.env.merchant_salt+'success'+sip.tutar*100,process.env.merchant_key,true));
        console.log("uretilen hash",hash);
          if(hash!=req.body.hash){
            console.log("3");
            res.send('PAYTR notification failed: bad hash');
            return
          }
          if(req.body.status==="success"){ // ödemeye onay verildi
            console.log("4");
             await model.findOneAndUpdate({sipno :req.body.merchant_oid}, {"$set":   { "status": true}  })
            // veritabanından status durumunu değiştir.
            res.send('OK');
            return

          }
          else{ // ödemeye onay verilmedi
            console.log("5");
            res.send('OK');
            return
          }
      }else{
        //böyle bir sipariş yok
        // $hash = base64_encode( hash_hmac('sha256', $post['merchant_oid'].$merchant_salt.$post['status'].$post['total_amount'], $merchant_key, true) );
        // Base64.stringify(hmacSHA256(hash_str+merchant_salt, merchant_key,true));
        console.log("6");
        res.send('OK');
        return
        
        //  sippp="hata"
        // sippp=sip
      }
  }
  return
// console.log(req.body.datam)

}),
app.get("/hello", (req, res, next) => {
  let emailTemplate;
  let capitalizedFirstName = "John";
  let userEmail = "John@example.com";

  ejs
  .renderFile(path.join(__dirname, "./helpers/forgotpasswordmail.ejs"),
  {
    username:"Ali ****", //capitalizedFirstName,
    usermail:'asdad@assertValidSDL.com',
    // confirm_link: "http://www.8link.in/confirm=", //+ userEmail
    confirm_link: 'http://www.emosetekstil.com.tr/'+ 12333333, //+ userEmail
    sipno:"59243435"
  })
  .then(result => {
    emailTemplate = result;
    res.send(emailTemplate);
  })
  .catch(err => {
    res.status(400).json({
        message: "Error Rendering emailTemplate",
        error: err
       });
    });
  
  });

  apollo.applyMiddleware({
  
  app,
  cors: {
    credentials: true,
    origin: true
  },
});
let server
if (config.ssl) {
  // Assumes certificates are in a .ssl folder off of the package root. Make sure 
  // these files are secured.
  server = https.createServer(
    {
      // key: fs.readFileSync(path.join(__dirname,`./ssl/${environment}/www.emosetekstil.com.tr.key`)),
      // cert: fs.readFileSync(path.join(__dirname,`./ssl/${environment}/www.emosetekstil.com.tr.crt`))
      key: fs.readFileSync(`/etc/apache2/ssl/private/www.emosetekstil.com.tr.key`),
      cert: fs.readFileSync(`/etc/apache2/ssl/private/www.emosetekstil.com.tr.crt`)
      // key: fs.readFileSync(`/etc/letsencrypt/live/mail.emosetekstil.com.tr/privkey.pem`),
      // cert: fs.readFileSync(`/etc/letsencrypt/live/mail.emosetekstil.com.tr/fullchain.pem`)
      // key: fs.readFileSync(`/cert/key.key`),
      // cert: fs.readFileSync(`/cert/cert.crt`),
    },
    app
  )
} else {
  server = http.createServer(app)
}
// const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(server);
// httpServer.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
//   console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`)
// );
//  console.log(Date());
// httpServer.listen({ port: 4000 }, () => {
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  // console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`)
// })
server.listen({ port: config.port }, () =>{
  console.log(`🚀 Server ready at http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`),
  console.log(`🚀 Server Subscriptions at ws${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.subscriptionsPath}`)}
)
