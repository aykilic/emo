var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
    createSiparisFis_mutation:async (root,{ satirList, siparisfis },{Models}) => {
        // console.log(satirList);
        const siparis = Models.siparis
        return await new Promise((resolve,object) =>{


            new siparis({
                userid:siparisfis.userid,
                stokid:siparisfis.stokid,
                irsaliyeno:siparisfis.irsaliyeno,
                faturano:siparisfis.faturano,
                sipno:siparisfis.sipno,
                odemetipi:siparisfis.odemetipi,
                odemedurumu:siparisfis.odemedurumu,
                teslimat:siparisfis.teslimat,
                fatdurum:siparisfis.fatdurum,
                aratoplam:siparisfis.aratoplam,
                kdv:siparisfis.kdv,
                kdvtutar:siparisfis.kdvtutar,
                tutar:siparisfis.tutar,
                satirs:satirList
              }).save((err,doc) =>{
                  // console.log(err)
              if(err) reject(err)
              else resolve(doc)
          })

        })

    },
    numara_guncelle:async (root, { faturano, irsaliyeno }, { Models }) => {
        // console.log(id,count);
       const model = Models.numaralar
      return await model.findOneAndUpdate({'name' :'ilk'}, {"$set":   { "irsaliyeno": irsaliyeno,"faturano": faturano}  },{upsert:true})
       // return await varyant.findByIdAndDelete(id);
     },
     siparis_numara_guncelle:async (root, { id, faturano, irsaliyeno }, { Models }) => {
        // console.log(id,count);
       const model = Models.siparis
      return await model.findOneAndUpdate({_id :id}, {"$set":   { "irsaliyeno": irsaliyeno,"faturano": faturano}  },{upsert:true})
       // return await varyant.findByIdAndDelete(id);
     },
     
    siparistutarupdate:async (root, {id, aratoplam,kdv,tutar }, { Models }) => {
        // console.log(id,count);
       const model = Models.siparis
      return await model.findOneAndUpdate({_id :id}, {"$set":   { "aratoplam": aratoplam,"kdv": kdv,"tutar": tutar}  })
       // return await varyant.findByIdAndDelete(id);
     },
    siparissatirdelete: async (root, {sipid, satirid }, { Models }) => {
        //  console.log(sipid, satirid);
       const model = Models.siparis
      return await model.findOneAndUpdate({_id :sipid}, {$pull: {satirs: {"_id":ObjectID(satirid)}}})
    //   $pull: {vars: {"images._id":ObjectID(imageid)}},
       // return await varyant.findByIdAndDelete(id);
     },
    // {_id: TheMainID, "theArray._id": TheArrayID}, {$pull: 
    //     {"theArray.$.theNestedArray": {_id: theNestedArrayID}}}
    sipariskargodurumupdate:async (root, parent, { Models }) => {
      const model = Models.siparis
      return await Promise.all(
        parent.kargodurumlist.map((item)=>{ 
            // console.log(item)
           return model.updateMany({"sipno": item.sipno }, {"$set":   { "teslimat": parent.kargodurum}  },{multi:true}); 
  
      })).then(function(results){
        // console.log(results);
          let data={'res':'ok'};
           return  data
          
      });
    },
    siparisodemedurumupdate:async (root, parent, { Models }) => {
      const model = Models.siparis
      return await Promise.all(
        parent.odemedurumlist.map((item)=>{ 
            // console.log(item)
           return model.updateMany({"sipno": item.sipno }, {"$set":   { "odemedurumu": parent.odemedurum}  },{multi:true}); 
  
      })).then(function(results){
        // console.log(results);
          let data={'res':'ok'};
           return  data
          
      });
    },
    
}