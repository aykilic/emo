const ObjectID = require("mongodb").ObjectID;
const mongoose = require('mongoose');
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
  birimList: async (parent, args, {Models})=> {
    // return await User.find({}).sort({'createdAt': 'asc'})
    // return cars.find(car => (car.id = args.id));
    return await Models.birim.find()
  },
  varyantschemaQuery: async (parent, {stokid}, {Models})=> {
     const varyant=Models.varyant
    return await varyant.find({stokid:stokid})
  },
  varyantQuery: async (parent, {stokid, parentid }, { Models }) => {
    const varyant = Models.varyant
    //  console.log(id,parentid);
    
    return await varyant.find({stokid:stokid,parentid:parentid})
  },
  altvaryantQuery: async (parent, { stokid}, { Models }) => {
    const varyant = Models.varyant
    //  console.log(id,parentid);
    
    return await varyant.find({stokid:ObjectID(stokid)})
  },
  childvaryantQuery: async (parent, { stokid }, { Models }) => {
    const varyant = Models.varyant
    //  console.log(id,parentid);
    
    return await varyant.find({stokid:ObjectID(stokid)})
  },
  
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
  varyantimgurlQuery: async (parent, {id}, {Models})=> {
    const varyant=Models.varyant
    //  console.log({id});
    
  //  return await stokturu.find({_id:id})
    return await varyant.find({ _id: ObjectID(id) },
    
    )
  },
  imgurlQuery: async (parent, {id}, {Models})=> {
    const stokturu = Models.stokturu
    // console.log({id});
    
  //  return await stokturu.find({_id:id})
    return await stokturu.find({_id:ObjectID(id)})
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
  varyantname: async (parent, { stokid }, { Models }) => { 
    const stokturu = Models.stokturu
    const varyant = Models.varyant
    
    const veri = await varyant.find({ stokid: stokid, parentid:null } 
    )
    return veri
  }

};

