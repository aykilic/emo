const ObjectID = require("mongodb").ObjectID;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
module.exports = {
  user: async (parent, args, context)=>{
    return await context.Models.User.findById(args._id);
  },
  users: async (parent, args, context)=> {
    // return await User.find({}).sort({'createdAt': 'asc'})
    return await context.Models.User.find({})
  },
  // Query: async (parent, args, {stokturu})=> {
  Query: async (parent, args, context)=> {
    // return await User.find({}).sort({'createdAt': 'asc'})
    // return cars.find(car => (car.id = args.id));
    return await context.Models.stokturu.find()
  },
  StokturuQuery:async (parent, {id}, { Models }) => {
    const stokturu = Models.stokturu
    
    return await stokturu.find({_id:id})
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
  childvaryantQuery: async (parent, { stokid }, { Models }) => {
    const varyant = Models.varyant
    //  console.log(id,parentid);
    
    return await varyant.find({stokid:ObjectID(stokid)})  
  },
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
    let login=""
    //  let ibo= await model.find({usermail:usermail})
    return new Promise((resolve,object) =>{
       model.findOne({ 'usermail': usermail})
      .then((user=>{
        if(!user){
          return resolve({_id:"",username:"",lastname:"",usermail:"",res:'Kayıtlı Mail Bulunamadı'})
        }else{
        bcrypt.compare(password, user.password).then(function(hash) {
          if(hash){
            Object.assign(user, {res:'true'});
            return resolve(user)
          }else{
            return resolve({_id:"",username:"",lastname:"",usermail:"",res:'Şifre yanlış'})
          }
      })
    }
      })
      )
    })
  },
  all_Userdetail_Query:async(parent, args, {Models})=> {
    const model = Models.User_detail
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
    { $match:{ "fatdurum":  "Faturalandı"} },
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
      // console.log("startdate",new Date(startdate),"enddate",new Date(enddate) );
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
    // console.log({email});
    const model = Models.User
    //  console.log({guid});
    
  //  return await stokturu.find({_id:id})
    return await model.findOne({'usermail':email})
  },
};

