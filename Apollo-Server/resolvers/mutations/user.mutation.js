var jwt = require('jsonwebtoken');
const {sendmail}=require('../../emailservice.js')
module.exports = {
  createUser: async (parent, {  username, lastname ,usermail, password },{ Models }) => {
     
    const model = Models.User
    // console.log(model);
     const user = await model.findOne({ 'usermail':usermail });
     console.log(user);
    return new Promise((resolve,object) =>{
    if(user){
      // throw new Error('Kullanıcı adı kullanımda')
      resolve({res:'Kullanıcı adı kullanımda'})
    }else{
      // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
     new model({
      username,
      lastname,
      usermail,
      password
    }).save((err,doc) =>{

      if(err) reject(err)
      else resolve(doc)
    });
  }
  // console.log("hata");
});
},

  // createUser: async (parent, {  username},{ User }) => {
  //   const user = await User.findOne({ username });

  //   if(user){
  //     throw new Error('var')
  //   }
  //   return await new User({
  //     username,
  //     lastname,
  //     mail,
  //     password
  //   }).save((error)=>{
  //     if(error){
  //       throw error;
  //     }
  //   });
  // },
  sendmail:async (parent, {username}, { Models }) => {
     sendmail()
  }
}
