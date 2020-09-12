const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})

var mongoose = require('mongoose');
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  anasayfaslider1Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "slider1": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfaslider2Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "slider2": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfareklam1Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "reklam1": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfaetiket1Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "etiket1": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfareklam2Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "reklam2": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfareklam3Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "reklam3": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfareklam4Upload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "reklam4": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  anasayfastampUpload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
     return await model.updateOne({},
      
       {
         "$push": {
           "stamp": [{
              // "stok":id,
               "imageurl": imageurl,
               "filename": filename,
               "path": path,
               "publicid": publicid,
               "stokid":stokid,
               "stokturad":stokturad,
           }]
                    
         }
         
       },
          {upsert: true }
     );


    
  },
  deletehomePageimageSlider1: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {slider1: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageSlider2: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {slider2: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageReklam1: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {reklam1: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageEtiket1: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {etiket1: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageReklam2: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {reklam2: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageReklam3: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {reklam3: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageReklam4: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {reklam4: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  deletehomePageimageStamp: async (root, { id, imageid, path }, { Models }) => {
    // console.log(id, imageid, path);

   const model = Models.homePage
  await cloudinary.uploader.destroy(path, (error,result) =>{
     // console.log(result.result, error)
     if (result.result === 'ok') {
       
         // console.log("id="+id,"imageid="+imageid);
   
    model.updateOne({ }, 
    { 
      $pull: {stamp: {"_id":ObjectID(imageid)}},
    },
    {
        upsert:false,
        new:true
    }, function(error, product){
        // console.log(error);
        
    })
     }

   });
  },
  // subdocument update işlemi
  anasayfaslider1Update:async (root, {id, sayi }, { Models }) => {
      // console.log(id,sayi);
    const model = Models.homePage
   return await model.findOneAndUpdate({'slider1._id' :id},
    //  {$set :{slider1: {sira : sayi}}},
    {$set: {'slider1.$.sira':sayi}},
     {new: true})
    // return await varyant.findByIdAndDelete(id);
  },
  anasayfaslider2Update:async (root, {id, sayi }, { Models }) => {
      // console.log(id,sayi);
    const model = Models.homePage
   return await model.findOneAndUpdate({'slider2._id' :id},
    //  {$set :{slider1: {sira : sayi}}},
    {$set: {'slider2.$.sira':sayi}},
     {new: true})
    // return await varyant.findByIdAndDelete(id);
  },
  anasayfareklam1Update:async (root, {id, sayi }, { Models }) => {
      // console.log(id,sayi);
    const model = Models.homePage
   return await model.findOneAndUpdate({'reklam1._id' :id},
    //  {$set :{slider1: {sira : sayi}}},
    {$set: {'reklam1.$.sira':sayi}},
     {new: true})
    // return await varyant.findByIdAndDelete(id);
  },
  anasayfaetiket1Update:async (root, {id, sayi }, { Models }) => {
      // console.log(id,sayi);
    const model = Models.homePage
   return await model.findOneAndUpdate({'etiket1._id' :id},
    //  {$set :{slider1: {sira : sayi}}},
    {$set: {'etiket1.$.sira':sayi}},
     {new: true})
    // return await varyant.findByIdAndDelete(id);
  },
  anasayfareklam2Update:async (root, {id, sayi }, { Models }) => {
    // console.log(id,sayi);
  const model = Models.homePage
 return await model.findOneAndUpdate({'reklam2._id' :id},
  //  {$set :{slider1: {sira : sayi}}},
  {$set: {'reklam2.$.sira':sayi}},
   {new: true})
  // return await varyant.findByIdAndDelete(id);
},
  anasayfareklam3Update:async (root, {id, sayi }, { Models }) => {
    // console.log(id,sayi);
  const model = Models.homePage
 return await model.findOneAndUpdate({'reklam3._id' :id},
  //  {$set :{slider1: {sira : sayi}}},
  {$set: {'reklam3.$.sira':sayi}},
   {new: true})
  // return await varyant.findByIdAndDelete(id);
},
  anasayfareklam4Update:async (root, {id, sayi }, { Models }) => {
    // console.log(id,sayi);
  const model = Models.homePage
 return await model.findOneAndUpdate({'reklam4._id' :id},
  //  {$set :{slider1: {sira : sayi}}},
  {$set: {'reklam4.$.sira':sayi}},
   {new: true})
  // return await varyant.findByIdAndDelete(id);
},
  anasayfastampUpdate:async (root, {id, sayi }, { Models }) => {
    // console.log(id,sayi);
  const model = Models.homePage
 return await model.findOneAndUpdate({'stamp._id' :id},
  //  {$set :{slider1: {sira : sayi}}},
  {$set: {'stamp.$.sira':sayi}},
   {new: true})
  // return await varyant.findByIdAndDelete(id);
},
  cozumCreateOrUpdate:async (root, {id, gg, mss, ii, kvkk, ssk }, { Models }) => {
  //  console.log(id);
  const model = Models.cozumMerkezi
    
    if (id == null) {

      return await new Promise((resolve,object) =>{
        new model({
            gg,
            mss,
            ii,
            kvkk,
            ssk,
          }).save((err,doc) =>{
          if(err) reject(err)
          else resolve(doc)
      })
    })
    }else{
      return await model.findOneAndUpdate({_id :id}, {"$set":   { "gg": gg, "mss": mss, "ii":ii, "kvkk":kvkk, "ssk":ssk}  },{upsert:true})
    }
},
}
  