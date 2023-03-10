const ObjectID = require("mongodb").ObjectID;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const tokens = require('../../helpers/token')
const forgottokens = require('../../helpers/tokenforgot')
var jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const axios = require('axios');
const querystring = require('querystring');
module.exports = {
  user: async (parent, args, context)=>{
    return await context.Models.User.findById(args._id);
  },
  users: async (parent, args, context)=> {
    // return await User.find({}).sort({'createdAt': 'asc'})
    return await context.Models.User.find({})
  },
  // Query: async (parent, args, {stokturu})=> {
  Query: async (parent, args, { Models })=> {
    const stokturu = Models.stokturu
    // return await stokturu.find()
     let asd = await stokturu.aggregate(
       [
      //    {
      //   "$project": {
      //     stokad:1,
      //     yorumlar:1,
      //     parentid:1

      // }},
        {$unwind: "$yorumlar"},
        {$unwind: "$yorumlar.votes"},
        { "$group": {
          
               "_id":  "$yorumlar._id",
              "like": {$sum: {$cond: {if: {$gt: ["$yorumlar.votes.vote", 0]},then: 1,else: 0}}}, 
              "dislike": {$sum: {$cond: {if: {$lt: ["$yorumlar.votes.vote", 0]},then: -1,else: 0 }}    
            } 
          }
        },
        {
          "$project": {
              "_id":"$_id",
              "like": "$like",
              "dislike": "$dislike",
              
          }
      },
      
   ])
   

        // console.log("asd",asd);
    // console.log("afd", afd);
   
    
    //  console.log(asd);
    let afd = await stokturu.find()
    // console.log("afd",afd);
    let arr1=[]
    let deneme=[]
    let obj1
    afd.forEach((item,a)=>{
      // afd[a]=item
      
      item.yorumlar.forEach((aitem,b)=>{
        Object.assign(afd[a].yorumlar[b], {like:0,dislike:0})
        if(asd.length){
          asd.forEach((sitem,c)=>{
            if(aitem._id.toString () === sitem._id.toString ()){
               Object.assign(afd[a].yorumlar[b], {like:sitem.like,dislike:sitem.dislike})
              
            }else{
              //  Object.assign(afd[a].yorumlar[b], {like:0,dislike:0})
            }
          })
        }else{ //asd

        }

      })
    })
     return await afd
    
  },
  StokturuQuery:async (parent, {id}, { Models }) => {
    const stokturu = Models.stokturu
    
    return await stokturu.find({_id:id})
  },
  fiyatListQuery:async (parent, {idlist}, { Models }) => {  
    const stokturu = Models.stokturu
    let id=[]
    idlist.map(item=>{  id.push(item.id)}

    )
    // console.log(id);
    // return await stokturu.find().where('_id').in(idlist.id).exec();
    // console.log(await stokturu.find({_id:{$in: id}}));
     
    return await stokturu.find({_id:{$in: id}})
  },
  birimList: async (parent, args, {Models})=> {
    // return await User.find({}).sort({'createdAt': 'asc'})
    // return cars.find(car => (car.id = args.id));
    return await Models.birim.find()
  },
  // varyantschemaQuery: async (parent, {stokid}, {Models})=> {
  //    const varyant=Models.varyant
  //   return await varyant.find({stokid:stokid})
  // },
  varyantQuery: async (parent, args, { Models }) => {
    const varyant = Models.varyant
    //  console.log(id,parentid);
    
    return await varyant.find()
  },
  varyantSkusQuery: async (parent, args, { Models }) => {
    const model = Models.varyant_skus
    //  console.log(id,parentid);
    
    return await model.find()
  },
  altvaryantQuery: async (parent, {varyant_id}, { Models }) => {
    // console.log(varyant_id);
    const varyant = Models.varyantValue
    //  console.log(id,parentid);
    
    return await varyant.find({varyant_id:ObjectID(varyant_id)})
  },
  allvaryantQuery: async (parent, args, { Models }) => {
    // console.log(varyant_id);
     const varyant = Models.varyant
    // //  console.log(id,parentid);
    
    // return await varyant.find({varyant_id:ObjectID(varyant_id)})
    return await varyant.aggregate([
      { $lookup:
          {
             from: "varyantValue",
             localField: "_id",
             foreignField: "varyant_id",
             as: "varyant_options"
          }
      }
  ])
  // console.log(a);
  },
  anakategoriQuery: async (parent, { parentid }, { Models }) => {
    const stokturu = Models.stokturu
    //  console.log(id,parentid);
    
    return await stokturu.find({parentid:null})
  },
  // altvaryantQuery: async (parent, { stokid}, { Models }) => {
  //   const varyant = Models.varyant
  //   //  console.log(id,parentid);
    
  //   return await varyant.find({stokid:ObjectID(stokid)})
  // },
  // childvaryantQuery: async (parent, { stokid }, { Models }) => {
  //   const varyant = Models.varyant
     
  //    return await varyant.find({stokid:ObjectID(stokid)})  
  // },
  // childvaryantQuery: async (parent, args, { Models }) => {
  //   const varyant = Models.varyant
     
  //    return await varyant.find()  
  // },
  // childvaryantQuery: async (parent, args, { Models }) => {
  //   const varyant = Models.varyant
  //   //  console.log(id,parentid);
    
  //   return await varyant.find()
  // },
  // StokChildren: async (parent, args, context) => {


    // return await context.Models.stokturu.find()
  // },
  // varyantsecimgQuery: async (parent, { stokid, varyantname }, { Models }) => {
  //   const varyant = Models.varyant
  //   const veri= await varyant.find({ stokid: stokid, varyantname:varyantname } )
  //   return veri
  // },
  // varyantimgQuery: async (parent, { stokid}, { Models }) => {
  //   const varyant = Models.varyant
  //   //  console.log(id,parentid);
    
  //   return await varyant.find({stokid:ObjectID(stokid)})
  // },
  // altvaryantQuery: async (parent, {stokid,varyantaltid}, {Models})=> {
  //   // return await User.find({}).sort({'createdAt': 'asc'})
  //   // return cars.find(car => (car.id = args.id));
  //   const varyant = Models.varyant
  //   // const veri = await varyantalt.findOne({ 'stokid': ObjectID(stokid), 'varyantalt._id': ObjectID(varyantaltid) })
  //   // console.log(stokid,varyantaltid);
    
  //   return await varyant.findOne({ 'stokid': ObjectID(stokid) }
    
  //   // { 'children': { $elemMatch: { 'field': 'Family Name', 'value': 'Smith' } } }
  //   )
  //   // return await altvaryant.aggregate([
  //   //   {
  //   //     $lookup: {
  //   //       from: 'varyant',
  //   //       localField: '_id',
  //   //       foreignField: 'vayantid',
  //   //       as: 'varyantalt'
  //   //     }
  //   //   }
  //   // ]);
  //   // console.log(veri);
    
  // },
  // varyantimgurlQuery: async (parent, {id}, {Models})=> {
  //   const varyant=Models.varyant
  //   //  console.log({id});
    
  // //  return await stokturu.find({_id:id})
  //   return await varyant.find({ _id: ObjectID(id) },
    
  //   )
  // },
  imgurlQuery: async (parent, {id}, {Models})=> {
    const stokturu = Models.stokturu
    // console.log({id});
    
  //  return await stokturu.find({_id:id})
    return await stokturu.find({_id:ObjectID(id)})
  },
  sliderlist: async (parent, args, {Models})=> {
    const model = Models.homePage
    // console.log({id});
    
  //  return await stokturu.find({_id:id})
    return await model.find()
  },
//   altimgurlQuery: async (parent, { id }, { Models }) => {
//     const varyantalt = Models.varyantalt
//     //  console.log({id});
    
//   //  return await stokturu.find({_id:id})
//     return await varyantalt.find({_id:id})
//  },
  photoQuery:async (parent, {photoid}, {Models})=> {
    // return await User.find({}).sort({'createdAt': 'asc'})
    // return cars.find(car => (car.id = args.id));
     const photo=Models.photo
    return await photo.find({photoid:photoid})
  },
  // altvaryantsecimgQuery: async (parent, { stokid }, { Models }) => {
  //   const varyant = Models.varyant
  //    const varyantalt = Models.varyantalt
  //   const altvaryantidbul = await varyant.find({ stokid: stokid })
    
  //    let altvaryantid =ObjectID(altvaryantidbul[0]._id)
    
  //   const veri = await varyantalt.find({varyantid:altvaryantid})
  //   //    console.log(veri);
  //   // console.log(ObjectID(stokid));
     
    
  //   // const veri=varyant.aggregate([
  //   //   {
  //   //     $match: {
  //   //     // stokid:stokid.toString()
  //   //       stokid:mongoose.Types.ObjectId(stokid)
  //   //     }
        
  //   //   },
  //   //    {"$unwind": "$varyantname"},
  //   //   {$lookup: {
  //   //     from: 'varyantalt', 
  //   //     localField: '_id', 
  //   //     foreignField: 'varyantid', 
  //   //     as: 'varyantalt'}},
        
  //   //   { $unwind: "$varyantalt" },
  //   //   { $unwind: "$varyantalt.vars" },
          
  //   //       {
  //   //         $project: {
            
  //   //           varyantname: "$varyantname",
  //   //           stokid:"$stokid",
  //   //           createdAt:"$createdAt",
  //   //           __v: "$__v",
  //   //           varyantalt:"$varyantalt"
              
  //   //           // surName: 1
              
  //   //       }
  //   //   }
  //   // //   // { "$match": { "varyantalt.varyantid": altvaryantid } },  
  //   // ])
  //   // .exec((err, res) => {
  //   //   if (err) throw err;
  //   //   console.log("res::",res);
  //   // })

  
    
  // // return  altvaryantidbul || veri
  // return veri
  
  // },
  // varyantname: async (parent, { stokid }, { Models }) => { 
  //   const stokturu = Models.stokturu
  //   const varyant = Models.varyant
    
  //   const veri = await varyant.find({ stokid: stokid, parentid:null } 
  //   )
  //   return veri
  // }
  hasvaryantsatirQuery: async (parent, {id}, {Models})=> {
    const model = Models.varyant_skus
    // console.log({id});
    
  //  return await stokturu.find({_id:id})
    return await model.find({stokid:ObjectID(id)})
  },
  // varyantQuery: async (parent, {id}, {Models})=> {
  //   const model = Models.varyant_skus
  //   // console.log({id});
    
  // //  return await stokturu.find({_id:id})
  //   return await model.find()
  // },
  
  search_basketlist:async(parent, {guid}, {Models})=> {
    const model = Models.sepet
    //  console.log({guid});
    
  //  return await stokturu.find({_id:id})
    return await model.find({guid:ObjectID(guid)})
  },
  search_ubasketlist:async(parent, {uid}, {Models})=> {
    const model = Models.sepet
    //  console.log({guid});
    
  //  return await stokturu.find({_id:id})
    return await model.find({uid:ObjectID(uid)})
  },
  loginuser_Query:async (parent, {usermail, password}, {Models})=> {
    const model = Models.User
    // console.log("req",req);
    //  let ibo= await model.find({usermail:usermail})
    return new Promise((resolve,object) =>{
       model.findOne({ 'usermail': usermail})
      .then((user=>{
        // console.log(user);
        if(!user){
          return resolve({_id:"",username:"",lastname:"",usermail:"",res:'Kay??tl?? Mail Bulunamad??'})
        }else{
        bcrypt.compare(password, user.password).then(function(hash) {
          if(hash){
            //bura
            var token = tokens.generate({username:user.username,lastname:user.lastname,usermail:user.usermail,role:user.role})
            Object.assign(user, {res:'true',token:token});
            return resolve(user)
          }else{
            return resolve({_id:"",username:"",lastname:"",usermail:"",res:'??ifre yanl????'})
          }
      })
    }
      })
      )
    })
  },
  forgotUserQuery:async (parent, {usermail, password}, {Models})=> {
    const model = Models.User
    // console.log("req",req);
    //  let ibo= await model.find({usermail:usermail})
    return new Promise((resolve,object) =>{
       model.findOne({ 'usermail': usermail})
      .then((user=>{
        // console.log(user);
        if(!user){
          return resolve({_id:"",username:"",lastname:"",usermail:"",res:false})
        }else{
            var token = forgottokens.generate({usermail:usermail})
            Object.assign(user, {res:true, token:token});
            return resolve(user)  
    }
      })
      )
    })
  },
  role_Query:async (parent, {usermail}, {Models,req})=> {
    // console.log(req);
    // const model = Models.User
    // let login=""
    // return new Promise((resolve,object) =>{
    //    model.findOne({ 'usermail': usermail})
    //   .then((user=>{
    //     if(!user){
    //       return resolve({_id:"",username:"",lastname:"",usermail:"",res:'Kay??tl?? Mail Bulunamad??'})
    //     }else{
        
    //         Object.assign(user, {res:'true',token:token});
    //         return resolve(user)
          
         
    // }
    //   })
    //   )
    // })
  },
  all_Userdetail_Query:async(parent, args, {Models})=> {
    const model = Models.User_detail
    //  console.log({guid});
  
  //  return await stokturu.find({_id:id})
    return await model.find()
  },
  cozumQuery:async(parent, args, {Models})=> {
    const model = Models.cozumMerkezi
    //  console.log({guid});
  
  //  return await stokturu.find({_id:id})
    return await model.find()
  },
  Search_Userdetail_Query:async(parent, {uid}, {Models})=> {
    const model = Models.User_detail
    //  console.log({guid});
    
  //  return await stokturu.find({_id:id})
    return await model.find({uid:ObjectID(uid)})
  },
  Search_luser:async(parent, {uid}, {Models})=> {
    // console.log(uid);
    const model = Models.User
    return await model.findOne({_id:ObjectID(uid)})
    // console.log(asd);
  },
  search_siparislist:async(parent, args, {Models})=> {
    const model = Models.siparis
   return await model.aggregate([
    // {$set: {userid: {$toObjectId: "$userid"} }},
    
      {
        $lookup:
          {
            from: 'User_detail',
            localField: 'userid',
            foreignField: '_id',
            as: 'user'
          },
          
      },
      //  { '$unwind': { 'path': '$satirs', 'preserveNullAndEmptyArrays': true } },
      // {
      //   $group: {
      //     tutar: { $sum: "$satirs.tutar"}
      //   }
      // },
      { $addFields: {
        tutar: { $sum: {
          $map: { input: "$satirs" , as: "a", in: "$$a.tutar" }
        }}
    }}
   ])
    // console.log(asd);
    //  return await model.find()
  },
  search_faturalist:async(parent, args, {Models})=> {
    const model = Models.siparis
   return await model.aggregate([
    // {$set: {userid: {$toObjectId: "$userid"} }},
    { $match:{ "fatdurum":  "Faturaland??"} },
      {
        $lookup:
          {
            from: 'User_detail',
            localField: 'userid',
            foreignField: '_id',
            as: 'user'
          },
          
      },
      //  { '$unwind': { 'path': '$satirs', 'preserveNullAndEmptyArrays': true } },
      // {
      //   $group: {
      //     tutar: { $sum: "$satirs.tutar"}
      //   }
      // },
      { $addFields: {
        tutar: { $sum: {
          $map: { input: "$satirs" , as: "a", in: "$$a.tutar" }
        }}
    }}
   ])
    // console.log(asd);
    //  return await model.find()
  },
  // filtreleme
  search_siparisfilterlist:async(parent, {startdate, enddate, odemeyontemmodel, odemedurummodel,teslimatdurummodel,fatdurummodel}, {Models})=> {
    const model = Models.siparis
      //  console.log("startdate",new Date(startdate),"enddate",new Date(enddate) );
      //  enddate ="2020-09-14T23:59:59.000Z"
  //  return await model.aggregate([
   return await model.aggregate([
    // {$set: {userid: {$toObjectId: "$userid"} }},
    // { $match:{$and : [{$or:[{ "odemedurumu":  odemedurummodel},{"odemedurumu": { $ne:"" } }
    // { $match:{ "odemedurumu":  odemedurummodel} }
    // $match: {
    //   $or: [
    //     {
    //       $expr: {
    //         $cond: [
    //           {
    //             "$eq": [
    //               {
      //  $and:[
      //   {startDate:{$lte:new Date()}},
      //     {endDate:{$gte:new Date()}}
      // ]
      //  {$match:{$and:[
      //   { "createdAt": {$gte: new Date(startdate), $lte: new Date(enddate)}}]}},
    {$match: {
      

        createdAt: {
          $gte: new Date(startdate),
          $lte: new Date(enddate)
        }

      }
    },
    {$match:
      {$expr: 
        
        {$and:[
          { $cond: [{ $eq: [ odemedurummodel, "" ] },true,  { $eq: [ "$odemedurumu", odemedurummodel ] }] },
          { $cond: [{ $eq: [ odemeyontemmodel, "" ] },true,  { $eq: [ "$odemetipi", odemeyontemmodel ] }] },
          { $cond: [{ $eq: [ teslimatdurummodel, "" ] },true,  { $eq: [ "$teslimat", teslimatdurummodel ] }] },
          { $cond: [{ $eq: [ fatdurummodel, "" ] },true,  { $eq: [ "$fatdurum", fatdurummodel ] }] },
        ]}
      }
    },
      {
        $lookup:
          {
            from: 'User_detail',
            localField: 'userid',
            foreignField: '_id',
            as: 'user'
          },
      },
    //   //  { '$unwind': { 'path': '$satirs', 'preserveNullAndEmptyArrays': true } },
    //   // {
    //   //   $group: {
    //   //     tutar: { $sum: "$satirs.tutar"}
    //   //   }
    //   // },
    //   { $addFields: {
    //     tutar: { $sum: {
    //       $map: { input: "$satirs" , as: "a", in: "$$a.tutar" }
    //     }}
    // }}
   ])
    //  console.log(asd);
    //  return await model.find()
  },

   search_getviewsiparis:async(parent, args, {Models})=> {
    const model = Models.siparis
    return await model.aggregate([
      {$match: {
        isViewed: {
          $eq: true
        }
      }
    },
    {$sort: {'createdAt': -1}},
    {
      $lookup:
        {
          from: 'User_detail',
          localField: 'userid',
          foreignField: '_id',
          as: 'user'
        },
    },
  ])
},
  // search_getviewsiparis
  son_numaralar:async(parent, args, {Models})=> {
    const model = Models.numaralar
    return await model.findOne()

    // console.log(asd);
  },
  Search_checkmail:async(parent, {email}, {Models})=> {
    //  console.log({email});
    const model = Models.User
    //  console.log({guid});
    
  //  return await stokturu.find({_id:id})
    return await model.findOne({'usermail':email})
  },
  posQuery:async(parent, {pos}, {Models})=> {
    
    
    return await axios( {
        method: 'POST',
        url: 'https://www.paytr.com/odeme/api/get-token',
        // data: JSON.stringify(obj),
        data:querystring.stringify(pos),
        //  headers: { 
        //    'Content-Type': 'application/x-www-form-urlencoded' 
        //   },

    })
    // .then(res => res.json())
    .then(async function(response){
      //  console.log(((response)));
      let data=Object.assign(pos,{res:response.data.status}) //[{res:response.data.status}]
       data=Object.assign(data,{token:response.data.token}) //[{res:response.data.status}]
      // let data=response.data.status
      // console.log([data]);
      return data
    })
    .catch(json => {
       let data={res:'hata'}
       return data
    
    });
    // console.log(val);
    // return val
    
    
  },
};

