var jwt = require('jsonwebtoken');
const tokens = require('../../helpers/token')
var mongoose = require('mongoose');
const ObjectID = require("mongodb").ObjectID;
const {sendmail}=require('../../emailservice.js')
module.exports = {
  createUser: async (parent, {  username, lastname ,usermail, password },{ Models }) => {
     
    const model = Models.User
    // console.log(model);
     const user = await model.findOne({ 'usermail':usermail });
    //  console.log(user);
     return await new Promise( (resolve,reject) =>{
      if(user){
        console.log("user1",user);
        // throw new Error('Kullanıcı adı kullanımda')
         resolve({res:'Kullanıcı adı kullanımda'})
      }else{
        // console.log(usermail);
        // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
        // console.log(username, lastname ,usermail, password);
        new model({
        username,
        lastname,
        usermail,
        password,
      }).save((err,doc) =>{

        if(err) 
        reject(err)
        else 
        var role ="user"
        var token = tokens.generate({username,lastname,usermail,role})
        
        resolve({username,lastname,usermail,role,token})
      });
  }
});
},
  // createUser: async (parent, {  username, lastname ,usermail, password },{ Models }) => {
  //   const model = Models.User
  //   // const user = await model.findOne({ 'usermail':usermail });
  //   // console.log(user);

  //   // if(user){
      
  //     // throw new Error('var')
  //   // }
  //   // else{
  //     console.log("burda");
  //   return await new model({
  //     username,
  //     lastname,
  //     usermail,
  //     password
  //   }).save((error,doc)=>{
  //     if(error){
  //       // console.log(error);
  //       console.log("hayır");
  //       throw error;
  //     }else{
  //       console.log("evet");
  //       resolve(doc)
  //     }
  //   });
  // // }
  // },
  // _id:ID
  // uid:ID
  // baslik:String
  // ad_soyad:  String
  // email:String
  // cep:String
  // tc_v_no:String
  // v_daire:String
  // adres:String
  // p_kodu:String
  // il:String
  // ilce:String
  // id:ID
  user_detail_mutation: async (parent,{userdetail},  { Models }) => {
    // console.log(Models);
    const model = Models.User_detail
    // console.log(userdetail);
  return await new Promise((resolve,object) =>{

     new model({  
      
            uid:userdetail.uid,
            baslik:userdetail.baslik,
            ad_soyad:userdetail.ad_soyad,
            email:userdetail.email,
            cep:userdetail.cep,
            tc_v_no:userdetail.tc_v_no,
            v_daire:userdetail.v_daire,
            adres:userdetail.adres,
            p_kodu:userdetail.p_kodu,
            il:userdetail.il,
            ilid:userdetail.ilid,
            ilce:userdetail.ilce,
            ilceid:userdetail.ilceid,
            
        }).save((err,doc) =>{

        if(err) reject(err)
        else resolve(doc)
    })
})
},
  user_detail_edit_mutation: async (parent,{userdetail},  { Models }) => {
    // console.log(Models);
    const model = Models.User_detail
    console.log(userdetail);
    return await model.findByIdAndUpdate({_id:userdetail.id},{
      
            baslik:userdetail.baslik,
            ad_soyad:userdetail.ad_soyad,
            email:userdetail.email,
            cep:userdetail.cep,
            tc_v_no:userdetail.tc_v_no,
            v_daire:userdetail.v_daire,
            adres:userdetail.adres,
            p_kodu:userdetail.p_kodu,
            il:userdetail.il,
            ilid:userdetail.ilid,
            ilce:userdetail.ilce,
            ilceid:userdetail.ilceid,
    },{new: true});
//   return new Promise((resolve,object) =>{

//      new model({  
      
//             
//             baslik:userdetail.baslik,
//             ad_soyad:userdetail.ad_soyad,
//             email:userdetail.email,
//             cep:userdetail.cep,
//             tc_v_no:userdetail.tc_v_no,
//             v_daire:userdetail.v_daire,
//             adres:userdetail.adres,
//             p_kodu:userdetail.p_kodu,
//             il:userdetail.il,
//             ilid:userdetail.ilid,
//             ilce:userdetail.ilce,
//             ilceid:userdetail.ilceid,
            
//         }).save((err,doc) =>{

//         if(err) reject(err)
//         else resolve(doc)
//     })
// })
},
deleteuserdetail_mutation: async (root, { id }, { Models }) => {
  // console.log(id);
  const model = Models.User_detail
  return await model.findByIdAndDelete(id);
},
  sendmail:async (parent, {username}, { Models }) => {
     sendmail()
  }
}
