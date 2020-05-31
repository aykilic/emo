
var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
createsepet_mutation: async (parent, {guid, stokid, stokad, varyantid,varyantoption1,varyantoption2,path,publicid,count}, { Models }) => {
    const varyant = Models.sepet
  return new Promise((resolve,object) =>{

     new varyant({
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

        if(err) reject(err)
        else resolve(doc)
    })
})
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