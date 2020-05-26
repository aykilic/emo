const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  createStokturu: async (root,{ stokturad, parentid },{Models}) => {
    // const Stokturu = await Stokturu.findOne({ username });

    // console.log("dgfdg");
    const stokturu = Models.stokturu
    return await new stokturu({
      
      stokturad,
      parentid

    }).save((error) => {
      
      
      if(error){
        throw error;
      }
    });
  },
  updateStokturu: async (root, { id, stokturad, parentid, fiyat1,fiyat2}, { Models }) => {
    const stokturu = Models.stokturu
      console.log(id,stokturad,parentid,fiyat1,fiyat2);
     return await stokturu.findByIdAndUpdate({_id:id},{stokturad:stokturad, parentid:parentid, fiyat1:fiyat1, fiyat2:fiyat2},{new: true});
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
    $pull: {vars: {"images._id":ObjectID(imageid)}},
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
  //////////////////////////
  updateStok: async (root,{ id, variant },{Models}) => {
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
  
  
};
