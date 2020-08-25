const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})
const ObjectID = require("mongodb").ObjectID;
const { forgotpasswordsendmail }=require('../../helpers/forgotpasswordmail.js')
module.exports = {
  createStokturu: async (root,{ stokturad, parentid },{Models}) => {
    // const Stokturu = await Stokturu.findOne({ username });

    // console.log("dgfdg");
    const stokturu = Models.stokturu
    // return await new stokturu({
      
    //   stokturad,
    //   parentid

    // }).save((error) => {
      
      
    //   if(error){
    //     throw error;
    //   }
    // });
    return await new Promise((resolve,object) =>{
      // console.log("parent",parent)
       new stokturu({
            stokturad,
            parentid
          }).save((err,doc) =>{
              // console.log(err)
          if(err) reject(err)
          else resolve(doc)
      })
  })
  },
  updateStokturu: async (root, { id,stokkodu, stokturad, parentid, fiyat1,indirim,kdv,description}, { Models }) => {
    const stokturu = Models.stokturu
      // console.log(id,stokturad,parentid,fiyat1,fiyat2);
     return await stokturu.findByIdAndUpdate({_id:id},{stokkodu:stokkodu, stokturad:stokturad, parentid:parentid, fiyat1:fiyat1, indirim:indirim,kdv:kdv,description:description},{new: true});
    // collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
  },
  updatestokimageurl: async (root, { id, imageurl, filename,path,publicid}, { Models }) => {
    const stokturu = Models.stokturu
    // var images = new images({
    //   imageurl: imageurl,
    //   filename: filename    // assign the _id from the person
    // });
    //  const stokturu = new Stokturu()
    //  stokturu.vars.push([{ images: [{ imageurl: imageurl }], }])
    //  const vars = stokturu.vars[0]
    // vars.isNew;
    // vars.save(function (err) {
    //   if (err) return handleError(err)
    //   console.log('Success!');
    // });
     return await stokturu.findByIdAndUpdate({ _id: id },
      //  {
      //    $push:
      //    {
      //      vars:
      //      [{
      //        images:
      //        [{
      //          imageurl: imageurl,
      //          filename: filename
      //        }]
      //      }]
      //    }
      //  },
       {
         "$push": {
           "vars": [{
              // "stok":id,
             "images": {
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,

             }
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  // updatealtvaryantimageurl: async (root, { id, imageurl, filename, path, publicid }, { Models }) => {
  //   const varyantalt = Models.varyantalt
  //   return await varyantalt.findByIdAndUpdate({ _id: id },
  //     //  {
  //     //    $push:
  //     //    {
  //     //      vars:
  //     //      [{
  //     //        images:
  //     //        [{
  //     //          imageurl: imageurl,
  //     //          filename: filename
  //     //        }]
  //     //      }]
  //     //    }
  //     //  },
  //      {
  //        "$push": {
  //          "vars": [{
  //             // "stok":id,
  //            "images": {
  //              "imageurl": imageurl,
  //              "filename": filename,
  //              "path": path,
  //              "publicid": publicid,

  //            }
  //          }]
                    
  //        }
         
  //      },
  //         {upsert: true }
  //    );


  // },
  // updatealtvaryantcolor: async (root, { id, color }, { Models }) => {
  //   const varyantalt = Models.varyantalt
  //   return await varyantalt.findByIdAndUpdate({ _id: id },
  //     //  {
  //     //    $push:
  //     //    {
  //     //      vars:
  //     //      [{
  //     //        images:
  //     //        [{
  //     //          imageurl: imageurl,
  //     //          filename: filename
  //     //        }]
  //     //      }]
  //     //    }
  //     //  },
  //      {
  //        "$set": {
  //              "color": color,
  //        }
  //      },
  //         {upsert: true }
  //    );


  // },
  deleteStokturu: async (root,{ id },{Models}) => {
    // console.log(id);
    const stokturu = Models.stokturu
    return await stokturu.findByIdAndDelete(id);
  },
  deleteimage: async (root, { id, imageid, path }, { Models }) => {
     console.log(id, imageid, path);

    const stokturu = Models.stokturu
   await cloudinary.uploader.destroy(path, (error,result) =>{
      // console.log(result.result, error)
      if (result.result === 'ok') {
        
          // console.log("id="+id,"imageid="+imageid);
    
     stokturu.findOneAndUpdate({ 
      _id: ObjectID(id),
      // make sure sub document have a unique field let take _id
       
  }, 
  { 
    $pull: {vars: {"images._id":ObjectID(imageid)},},
  },
  {
      upsert:false,
      new:true
  }, function(error, product){
      // console.log(error);
     
  })
      }

    });
    // const veri = await stokturu.findOne({ _id: ObjectID("5e28b4a2a1d9692b29a65b24") },
    //   {
    //     "vars": {
    //       "$elemMatch": {
    //         "$images": {
    //           "$elemMatch": {
    //             // 
    //             "filename": "hirai-450x450.jpg"
    //           }
    //         }
    //       }
    //          }
    //    })

    // const veri = await stokturu.aggregate([
    //   { $match: {_id:ObjectID("5e28b4a2a1d9692b29a65b24")} }  ,
      
    //   { $unwind: "$vars" },
      
    //   { $match: { "vars.images.filename": "5320_7d93.jpeg" } },
      
    // ])
    
  //   console.log("id="+id,"imageid="+imageid);
    
  //   await stokturu.findOneAndUpdate({ 
  //     _id: id,
  //     // make sure sub document have a unique field let take _id
       
  // }, 
  // { 
  //   $pull: {vars: {"images._id":imageid}},
  // },
  // {
  //     upsert:false,
  //     new:true
  // }, function(err, product){
  //    console.log(product);
     
  // })
       
    // console.log(veri);

  },
  // deletealtvaryantimage: async (root, { id, imageid, path }, { Models }) => {
  //    console.log("path:",path,"imageid:",imageid,"id:",id);
  //   const varyantalt = Models.varyantalt
  //  await cloudinary.uploader.destroy(path, (error,result) =>{
  //      console.log(result, error)
  //     if (result.result === 'ok') {
        
  //         // console.log("id="+id,"imageid="+imageid);
    
  //         varyantalt.findOneAndUpdate({ 
  //     _id: id,
  //     // make sure sub document have a unique field let take _id
       
  // }, 
  // { 
  //   $pull: {vars: {"images._id":imageid}},
  // },
  // {
  //     upsert:false,
  //     new:true
  // }, function(err, product){
  //   //  console.log(product);
     
  // })
  //     }

  //   });
    

  // },
  sendForgotPasswordMail:async (root,{ usermail, token },{Models}) => {
    // console.log(usermail, tok  en );
    const model = Models.User
    await forgotpasswordsendmail({ usermail, token })
    return await model.findOneAndUpdate({ usermail: usermail },
      // {$push:{ variant: {name:variant} } },{new: true});
      { $set: { token: token } },{new: true});
    // {_id:id},
    // { $push: { variantname: variantname  } },
    // {new: true});
  },
  //////////////////////////
  updateStok: async (root,{ id, variant },{ Models }) => {
    // console.log(_id,stokturad);
    const stokturu = Models.stokturu
    return await stokturu.findByIdAndUpdate({_id:id},
      // {$push:{ variant: {name:variant} } },{new: true});
      {$push:{ variant: variant } },{new: true});
    // {_id:id},
    // { $push: { variantname: variantname  } },
    // {new: true});
  },
  updateStokalt: async (root,{ id, variant },{Models}) => {
    // console.log(_id,stokturad);
    const stokturu = Models.stokturu
     let asd= await stokturu.findOne({_id:id});
      // console.log(asd.variant.name[0]);
  },
  createYorum: async (root,{ id, userid, parentid, yorum },{Models}) => {
    //  console.log(id,userid, parentid, yorum);
    const stokturu = Models.stokturu
    return await stokturu.findByIdAndUpdate({_id:id},
      // {$push:{ variant: {name:variant} } },{new: true});
      {$push:{ 
        "yorumlar": [{ 
          "_id":ObjectID(),
          "userid":userid,
          "parentid":parentid,
          "yorum":yorum
         }]
         } },{new: true});
    // {_id:id},
    // { $push: { variantname: variantname  } },
    // {new: true});
  },
  yorumEditMutation: async (root, { stokid, yorumid, yorum}, { Models }) => {
    const stokturu = Models.stokturu
      //  console.log(stokid, yorumid, yorum);
     return await stokturu.findOneAndUpdate({'_id':stokid, 'yorumlar._id':yorumid},
     { $set: { 'yorumlar.$.yorum': yorum} });
    // collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
  },
  votes_mutation: async (root,{ stokid, userid, yorumid, vote, set },{Models}) => {
      // console.log(stokid,yorumid,userid,vote);
    //  return
    const stokturu = Models.stokturu
    // return await stokturu.findByIdAndUpdate({_id:stokid,'yorumlar._id':yorumid,'votes.userid':userid},
    //   // {$push:{ variant: {name:variant} } },{new: true});
    //   {$push:{ 
    //     "yorumlar.0.votes": [{ 
    //       "userid":userid,
    //       "vote":vote
    //      }]
    //      } },{new: true});
    // console.log("set",set);
    if(set == 1){
      // console.log("1");
      // console.log(yorumid);
      // console.log(userid);
      return await stokturu.findOneAndUpdate({'_id':ObjectID(stokid)},
      // {$set: {"a.$[i].c.$[j].d": 2}}, {arrayFilters: [{"i.b": 0}, {"j.d": 0}]} TODO: Önemli
      // Input: {a: [{b: 0, c: [{d: 0}, {d: 1}]}, {b: 1, c: [{d: 0}, {d: 1}]}]} TODO: Önemli
      {$set: {"yorumlar.$[i].votes.$[j].vote": vote}},
       {arrayFilters: [{"i._id": ObjectID(yorumid)}, {"j.userid": ObjectID(userid)}]},
      );
    }else if(set == 0){
      // console.log("0");
      // console.log("push",stokid);
      // console.log("push",yorumid);
      return await stokturu.findOneAndUpdate({'_id':ObjectID(stokid),'yorumlar._id':ObjectID(yorumid)},
      // {$set: {"a.$[i].c.$[j].d": 2}}, {arrayFilters: [{"i.b": 0}, {"j.d": 0}]} TODO: Önemli
      // Input: {a: [{b: 0, c: [{d: 0}, {d: 1}]}, {b: 1, c: [{d: 0}, {d: 1}]}]} TODO: Önemli
      
         {$push:{ 
        "yorumlar.$.votes": [{ 
          "userid":userid,
          "vote":vote
         }]
         } },{new: true});
      
    }
  },
  

  
};
