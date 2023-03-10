const express = require('express');
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
 const { GraphQLUpload } = require('graphql-upload')
const {createWriteStream} = require('fs')
const mongoose = require("mongoose");
const path = require("path");
// const socketio = require('socket.io')
const {sendmail}=require('./helpers/emailservice.js')
// const socketio = require('socket.io') // my io.on('connection', socket => {}) function taking io as param

var promisesAll = require('promises-all');

// const {Stream}  = require('stream');
// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// Provide resolver functions for your schema fields
const resolvers = require('./resolvers/index');

// const User = require('./models/User');
// const variant = require('./models/variant');
// const stokturu = require('./models/stokturu');
// const birim = require('./models/birim');
const Models =require('./models/index')

// const kategori =require('./models/kategori');
  // {
  // Query: {
  //   hello: () => 'Hello worldd!',
  // },
// };
mongoose.connect(process.env.DB_HOST,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify:false, useUnifiedTopology: true})
  .then(()=>console.log('connected'))
  .catch(e => console.log(e));
  

const twotypeDefs = gql`
  
  type File {
    
    filename: String!
    mimetype: String!
    encoding: String!
    
    
  }
  extend type Mutation {
    uploadFile(file: Upload!): File
    
  }
`;


const resolver = {
  Mutation: {
    
  }
}
   
  
const root = {
  Upload: GraphQLUpload
}
const basicDefs = importSchema('./schema.graphql')
const server = new ApolloServer({
  
   typeDefs: [basicDefs,twotypeDefs]
  ,
  resolvers: [
    resolvers,
    resolver,
    root
  ],
  context: {
    Models,
    
  },
  // Upload: false,
  graphiql: true
});
// subscriptions: {
  //   onConnect: async ({ authToken }) => {
  //     if (authToken) {
  //       const user = await AuthServices.getUser(authToken);
  //       if (user) {
  //         await user.setOnline();
  //         return {
  //           authToken,
  //         };
  //       }
  //     }
  //     return {};
  //   },
  // },
  // onDisconnect: (params, socket) => {
  //   socket.initPromise.then(async ({ authToken }) => {
  //     if (authToken) {
  //       const user = await AuthServices.getUser(authToken);
  //       if (user) {
  //         await user.setOffline();
  //       }
  //     }
  //   });
  // },
// const schema = makeExecutableSchema({
//   typeDefs: /* GraphQL */ `
//     scalar Upload
//   `,
//   resolvers: {
//     Upload: GraphQLUpload
//   }
// })
// console.log(process.env.DB_HOST);
const app = express();
server.applyMiddleware({
  
  app,
  cors: {
    credentials: true,
    origin: true
  },
});
// const io = require('socket.io')(server)
// io.on('connection', (socket) => {
//   console.log('A client connected')
// });
// app.use(ObjectID)
// app.use("/zimage",express.static(path.join(__dirname,"./zimage")))
app.listen({ port: 4000 }, () =>
  console.log(`???? Server ready at http://localhost:4000${server.graphqlPath}`)
);

