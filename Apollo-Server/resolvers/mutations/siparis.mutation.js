var mongoose = require('mongoose');
const { newsiparis } = require('../subscriptions/siparis.subscription');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
    createSiparisFis_mutation:async (root,{ satirList, siparisfis },{ Models, pubsub}) => {
        //  console.log('tarihimiz',Date());
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
                  //  console.log(doc)
                  pubsub.publish('newsiparis',{
                    
                    newsiparis: doc
                  });
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
     siparis_numara_guncelle:async (root, { id, faturano, irsaliyeno, fatdurum }, { Models }) => {
        // console.log(id,count);
       const model = Models.siparis
      return await model.findOneAndUpdate({_id :id}, {"$set":   { "irsaliyeno": irsaliyeno, "faturano": faturano, "fatdurum":fatdurum}  },{upsert:true})
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
    deleteviewSiparislist:async (root, parent, { Models }) => {
      // console.log(parent);
      const model = Models.siparis
      return await Promise.all(
        parent.listid.map((item)=>{ 
            //  console.log(item)
           return model.updateMany({"_id": ObjectID(item.listid) }, {"$set":   { "isViewed": false}  },{multi:true}); 
  
      })).then(function(results){
        // console.log(results);
          let data={'res':'ok'};
           return  data
          
      });
    },
    kartsendmail:async (parent, {sipno}, { Models }) => {
      sendmail()
   },
    havalesendmail:async (parent, {sipno}, { Models }) => {
      sendmail()
   },
    doorsendmail:async (parent, {sipno}, { Models }) => {
      sendmail()
   },
    
}