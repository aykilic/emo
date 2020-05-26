var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
    createVaryant: async (parent,{ stokid, varyantname },{Models}) => {
      const varyant = Models.varyant
      return await new varyant({
        stokid,
        varyantname
      }).save((error, id) => {
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
  deleteilkVaryant: async (root,{ id },{Models}) => {
    // console.log(id);
    const varyant = Models.varyant
    return await varyant.findByIdAndDelete(id);
  },


  addaltVaryant: async (parent,{ stokid, altvaryantname, altvaryantvalue },{Models}) => {
    const varyant = Models.varyant

    // const varyantname = await varyant.findOne({
    //   'stokid': ObjectID(stokid),
       
    // },function(err,newDeal){
    //   if (err) throw err;
      
    //   // console.log("returned from the model: ",newDeal.varyantalt[0].varyantname)
    //   return newDeal.varyantalt[0].varyantname
    //   });
    
    
    // console.log(varyantname.varyantalt[0].varyantname);
    
    ///////////////////////
    return await varyant.findOneAndUpdate({ 'stokid': ObjectID(stokid) }, {
      "$push": {
        "varyantalt": [
          {
            "varyantname" : altvaryantname,
            "varyantvalue": varyantvalue,
            
          }
        ]
        }
    },{ upsert: true })
    // console.log(varyantname);
    
},
// deletealtVaryant: async (root,{ id },{Models}) => {
//   // console.log(id);
//   const varyantalt = Models.varyantalt
//   return await varyantalt.findByIdAndDelete(id);
// },
  updateVaryantval: async (root, { stokid, varyantvalue, varyantaltvalue }, { Models }) => {
    // console.log(stokid);
    
    const varyant = Models.varyant
    if(varyantaltvalue === "" || varyantaltvalue===null){
    await varyant.findOneAndUpdate({ 'stokid': ObjectID(stokid) }, {
     
      

      "$push": {
      "varyantalt":[{"varyantvalue": varyantvalue,}]
      }

                },
        { upsert: true }
    )
    
    } else {
      
      await varyant.findOneAndUpdate({ 'stokid': ObjectID(stokid) }, {
     
      

        "$push": {
        "varyantalt.$.varyantalt":[{"varyantvalue": varyantaltvalue,}]
        }
  
                  },
          { upsert: true }
      )

    }
    // await varyant.findOneAndUpdate({ 'stokid': ObjectID(stokid) }, {
     
      

    //   "$push": {
    //   "varyantalt":[{"varyantvalue": varyantvalue,}]
    //   }

    //             },
    //     { upsert: true }
    // )
  },
  updateAltVaryantval: async (root, { stokid, varyantaltid, altvaryantaltid, varyantname, varyantaltname }, { Models }) => {
    // console.log(stokid);
    
    const varyant = Models.varyant
    if(varyantaltname === "" || varyantaltname===null){
      await varyant.findOneAndUpdate({ 'stokid': ObjectID(stokid), 'varyantalt._id': ObjectID(varyantaltid) },
      {
        "$set": {
          "varyantalt.$.varyantname": varyantname
      }
      
     
                },
        { upsert: true }
    )
    } else {
      await varyant.findOneAndUpdate({ 'stokid': ObjectID(stokid), 'varyantalt.varyantalt._id': ObjectID(altvaryantaltid) },
      {
        "$set": {
          "varyantalt.$.varyantalt.$.varyantname": varyantaltname
      }
      
     
                },
        { upsert: true }
    )
    }
    
  }
  };
  