const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})
var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
  createVaryant: async (parent, { stokid, varyantname, parentid }, { Models }) => {
    const varyant = Models.varyant
    return await new varyant({
      stokid,
      parentid,
      varyantname
    }).save((error) => {
      // console.log(id._id);
      // varyantalt.findByIdAndUpdate({ _id: id._id }, {
           
      //   altvaryant:[{
      //            "$set": {
      //                  "color": color,
      //            }
      //          }]
      //         }
      // ,
      //             {upsert: true }
               

      //  )


      if (error) {
        console.log("hata")
        throw error;
      }
    });
  },
  deleteVaryant: async (root, { id }, { Models }) => {
    // console.log(id);
    const varyant = Models.varyant
    return await varyant.findByIdAndDelete(id);
  },

  updatevaryantimageurl: async (root, { id, imageurl, filename, path, publicid }, { Models }) => {
    const varyant = Models.varyant
    //  console.log(id, imageurl, filename, path, publicid);
    
    return await varyant.findByIdAndUpdate({ _id: id },
      
      {
        "$set": {
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
      { upsert: true })
  },
  deletevaryantimage: async (root, { id, imageid, path }, { Models }) => {
    //  console.log("path:",path,"imageid:",imageid,"id:",id);
    const varyant = Models.varyant
    await cloudinary.uploader.destroy(path, (error, result) => {
      //  console.log(result, error)
      if (result.result === 'ok') {
        
        // console.log("id="+id,"imageid="+imageid);
    
        varyant.findOneAndUpdate({
          _id: ObjectID(id),
          // make sure sub document have a unique field let take _id
       
        },
          {
            $pull: { vars: { "images._id": ObjectID(imageid) } },
          },
          {
            upsert: false,
            new: true
          }, function (err, product) {
            //  console.log(product);
     
          })
      }

    });
    

  },
  updatevaryantcolor: async (root, { id, color }, { Models }) => {
    // console.log(id, color );
    
    const varyant = Models.varyant
    return await varyant.findByIdAndUpdate({ _id: ObjectID(id) },
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
        "$set": {
          "color": color,
        }
      },
      { upsert: true }
    )}
}
  