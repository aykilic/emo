
var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
createsepet_mutation: async (parent, {uid , guid, stokid, stokad, varyantid,varyantoption1,varyantoption2,path,publicid,count}, { Models }) => {
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
  
  
     Promise.all(
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
}
}