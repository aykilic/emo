var mongoose = require('mongoose');

const ObjectID = require("mongodb").ObjectID;
module.exports = {
    createSiparisFis_mutation:async (root,{ satirList, siparisfis },{Models}) => {
        console.log(satirList);
        const siparis = Models.siparis
        return await new Promise((resolve,object) =>{

            new siparis({
                userid:siparisfis.userid,
                stokid:siparisfis.stokid,
                sipno:siparisfis.sipno,
                odemetipi:siparisfis.odemetipi,
                odemedurumu:siparisfis.odemedurumu,
                teslimat:siparisfis.teslimat,
                aratoplam:siparisfis.aratoplam,
                kdv:siparisfis.kdv,
                tutar:siparisfis.tutar,
                satirs:satirList
              }).save((err,doc) =>{
                  // console.log(err)
              if(err) reject(err)
              else resolve(doc)
          })

        })

    }


}