const express = require('express');
const http =require('http')
require('dotenv').config();
const { ApolloServer, gql, PubSub } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
 const { GraphQLUpload } = require('graphql-upload')
const {createWriteStream} = require('fs')
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
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
  .catch(e => console.log(e));
  
  //  new Date().toLocaleString('tr', {
  //   timeZone: 'Europe/Istanbul'
  // });
  //  console.log(Date());

const basicDefs = importSchema('./schema.graphql')
const server = new ApolloServer({
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
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './helpers')))
// express.static(path.join(__dirname, './'));
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
server.applyMiddleware({
  
  app,
  cors: {
    credentials: true,
    origin: true
  },
});
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
// httpServer.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
//   console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`)
// );
//  console.log(Date());
httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`)
})
