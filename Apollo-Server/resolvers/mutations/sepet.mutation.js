
var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
createsepet_mutation: async (parent, {uid , guid, stokid, stokad, varyantid,varyantoption1,varyantoption2,fiyat,path,publicid,count}, { Models }) => {
    const varyant = Models.sepet

  return new Promise((resolve,object) =>{
    // console.log("parent",parent)
     new varyant({
            uid,
            guid,
            stokid,
            stokad,
            varyantid,
            varyantoption1,
            varyantoption2,
            fiyat,
            path,
            publicid, 
            count
        }).save((err,doc) =>{
            // console.log(err)
        if(err) reject(err)
        else resolve(doc)
    })
})
},
// mergesepet_mutation
mergesepet_mutation: async (root, parent, { Models }) => {

      console.log("parent",parent);
    const model = Models.sepet
  
  
    return await Promise.all(
      parent.sepetlist.map((item)=>{ 
          return model.insertMany(item,function(error, docs) {
           }); 
    })
      ).then(function(results){
        // console.log(results);
    });
  

      },
createguid_mutation: async (parent,{id},  { Models }) => {
    // console.log(Models);
    const varyant = Models.guest_user
  return new Promise((resolve,object) =>{

     new varyant({  
            // name:"a"
        }).save((err,doc) =>{

        if(err) reject(err)
        else resolve(doc)
    })
})
},
delete_basketproduct: async (root, { id }, { Models }) => {
  // console.log(id);
  const model = Models.sepet
//   return await new Promise((resolve,object) =>{
//     // let _id=id
//       model.findByIdAndDelete(id).then(data=>{
//         resolve(data)
//       })
//     //  resolve({_id:id})
// }).then((data,err)=>{
//   // return resolve({_id:id})
// }).catch(err=>{
//   console.log(err);
// })
return await new Promise((resolve, reject) => {
  model.findByIdAndDelete(id, (err) => {
      if (err) {
          reject(err);
      } else {
          // resolve(`Deleted article ${id} successfully`,{'_id':id});
           resolve({'_id':id,'res':`Deleted article ${id} successfully`});
      }
  });
});
  // console.log(id);
  // return await varyant.findByIdAndDelete(_id);
},
}