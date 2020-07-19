const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})
var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
  createVaryant: async (parent, { varyantname}, { Models }) => {
    const varyant = Models.varyant
    return await new varyant({
     
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
  createaltVaryant: async (parent, { varyantname, varyant_id,sira}, { Models }) => {
    const varyant = Models.varyantValue
    return await new varyant({
      sira,
      varyant_id,
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
  
  updateVaryant: async (root, { id, varyantname}, { Models }) => {
    const varyant = Models.varyant
      // console.log(id,stokturad,parentid,fiyat1,fiyat2);
     return await varyant.findByIdAndUpdate({_id:id},{varyantname:varyantname},{new: true});
    // collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
  },
  updatealtVaryant: async (root, { id, varyantname,color,sira}, { Models }) => {
    const varyant = Models.varyantValue
      // console.log(id,stokturad,parentid,fiyat1,fiyat2);
     return await varyant.findByIdAndUpdate({_id:id},{varyantname:varyantname,color:color,sira:sira},{new: true});
    // collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
  },
  deleteVaryant: async (root, { id }, { Models }) => {
    // console.log(id);
    const varyant = Models.varyant
    return await varyant.findByIdAndDelete(id);
  },
  deletealtVaryant: async (root, { id }, { Models }) => {
    // console.log(id);
    const varyant = Models.varyantValue
    return await varyant.findByIdAndDelete(id);
  },
  varyantstokmiktaredit:async (root, {id, count }, { Models }) => {
    //  console.log(id,count);
    const model = Models.varyant_skus
   return await model.findOneAndUpdate({_id :id}, {$inc : {miktar : count}},{new: true})
    // return await varyant.findByIdAndDelete(id);
  },
  varyantstoklistmiktaredit:async (root, {liste }, { Models }) => {
    //  console.log(id,count);
    const model = Models.varyant_skus
     await Promise.all(
      liste.map((item)=>{ 
          // console.log(item)
         return model.updateMany({"_id": item.id }, {"$inc":   { "miktar": item.count}  },{multi:true}); 

    })).then(function(results){
      //  console.log(results);
        let data={'res':'ok'};
         return  data
        
    });
    // console.log(asd);
  },
  updateVaryantMiktar:async (root, parent, { Models }) => {
    const varyant = Models.varyant_skus
    return await Promise.all(
      parent.veri.map((item)=>{ 
          // console.log(item)
         return varyant.updateMany({"_id": item.id }, {"$set":   { "miktar": item.miktar}  },{multi:true}); 

    })).then(function(results){
      // console.log(results);
        let data={'res':'ok'};
         return  data
        
    });
  
  



    // return await new Promise((resolve, reject) => {
    //       parent.veri.map((item)=>{ 
    //       // console.log(item)
    //       varyant.updateMany({"_id": item.id }, {"$set":   { "miktar": item.miktar}  },{multi:true},(err)=>{
    //         if (err) {
    //                   reject(err);
    //               } else {
    //                 resolve({'res':'ok'});
    //               }
    //       }); 



        // });


      // model.findByIdAndDelete(id, (err) => {
      //     if (err) {
      //         reject(err);
      //     } else {
      //         // resolve(`Deleted article ${id} successfully`,{'_id':id});
      //          resolve({'_id':id,'res':`Deleted article ${id} successfully`});
      //     }
      // });
    















  },
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
  createVaryantsatir:async (root, parent, { Models }) => {

    //  console.log(Models);
    
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
      

  const varyant = Models.varyant_skus
    return await Promise.all(
      parent.satirlist.map((item)=>{ 
          //  console.log(item)
        // return varyant.updateMany({"_id": item.id }, {"$set":   { "color": item.color, "miktar": item.miktar, "fiyat1": item.fiyat1, "fiyat2": item.fiyat2}  },{multi:true}); 
          return varyant.insertMany(item,function(error, docs) {
            //  console.log("error",error)
            //  console.log("docs",docs)

           }); 
           
    })
      ).then(function(results){
        
        // console.log(results);
    });
  

      }
}
  