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
  // deleteVaryant: async (root, { id }, { Models }) => {
  //   // console.log(id);
  //   const varyant = Models.varyant
  //   return await varyant.findByIdAndDelete(id);
  // },

  // updatevaryantimageurl: async (root, { id, imageurl, filename, path, publicid }, { Models }) => {
  //   const varyant = Models.varyant
  //   //  console.log(id, imageurl, filename, path, publicid);
    
  //   return await varyant.findByIdAndUpdate({ _id: id },
      
  //     {
  //       "$set": {
  //         "vars": [{
  //           // "stok":id,
  //           "images": {
  //             "imageurl": imageurl,
  //             "filename": filename,
  //             "path": path,
  //             "publicid": publicid,

  //           }
  //         }]
                
  //       }
         
  //     },
  //     { upsert: true })
  // },
  // deletevaryantimage: async (root, { id, imageid, path }, { Models }) => {
  //   //  console.log("path:",path,"imageid:",imageid,"id:",id);
  //   const varyant = Models.varyant
  //   await cloudinary.uploader.destroy(path, (error, result) => {
  //     //  console.log(result, error)
  //     if (result.result === 'ok') {
        
  //       // console.log("id="+id,"imageid="+imageid);
    
  //       varyant.findOneAndUpdate({
  //         _id: ObjectID(id),
  //         // make sure sub document have a unique field let take _id
       
  //       },
  //         {
  //           $pull: { vars: { "images._id": ObjectID(imageid) } },
  //         },
  //         {
  //           upsert: false,
  //           new: true
  //         }, function (err, product) {
  //           //  console.log(product);
     
  //         })
  //     }

  //   });
    

  // },
  // updatevaryantcolor: async (root, { id, color }, { Models }) => {
  //   // console.log(id, color );
    
  //   const varyant = Models.varyant
  //   // console.log(varyant);
  //   return await varyant.findByIdAndUpdate({ _id: ObjectID(id) },
    
  //     {
  //       "$set": {
  //         "color": color,
  //       }
  //     },
  //     { upsert: true }
  //   )},
  // updatevaryantcolors: async (root,parent, { Models }) => {
  //   const varyant = Models.varyant
  //   console.log(parent);
  //     const arr=[]
    
  //    arr.push({"id":parent.id,"color":parent.color,"miktar":parent.miktar,"fiyat1":parent.fiyat1,"fiyat2":parent.fiyat2})
  //    const new_arr = arr[0].id.map((id,i)=>({
  //      id,
  //      color:arr[0].color[i],
  //      miktar:arr[0].miktar[i],
  //      fiyat1:arr[0].fiyat1[i],
  //      fiyat2:arr[0].fiyat2[i],

  //     }));  
      
      
      
  //     console.log(new_arr)
      
        
  //   Promise.all(
  //     new_arr.map((item)=>{ 
          
  //       return varyant.updateMany({"_id": item.id }, {"$set":   { "color": item.color, "miktar": item.miktar, "fiyat1": item.fiyat1, "fiyat2": item.fiyat2}  },{multi:true}); 
           
  //   })
  //     ).then(function(results){
        
  //   });
  
  //     }
}
  