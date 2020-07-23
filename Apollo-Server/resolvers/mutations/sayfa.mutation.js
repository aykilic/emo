const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})

var mongoose = require('mongoose');
const ObjectID = require("mongodb").ObjectID;
module.exports = {
  anasayfaimageUpload: async (root, {imageurl, filename,path,publicid,stokid,stokturad}, { Models }) => {
    const model = Models.homePage
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
  // subdocument update işlemi
  anasayfaimageUpdate:async (root, {id, sayi }, { Models }) => {
      // console.log(id,sayi);
    const model = Models.homePage
   return await model.findOneAndUpdate({'slider1._id' :id},
    //  {$set :{slider1: {sira : sayi}}},
    {$set: {'slider1.$.sira':sayi}},
     {new: true})
    // return await varyant.findByIdAndDelete(id);
  },
}
  