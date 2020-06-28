const mongoose=require('mongoose');
var Decimal = require('mongoose-float').loadType(mongoose, 2);
const Schema = mongoose.Schema;
const satirSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
    stokid: {
      type: Schema.ObjectId,
    },
    varyantid: {
      
      type: Schema.ObjectId,
    },
    count:{
        type:Number

    },
    aratoplam: {
        type: Decimal,
    },
    kdv: {
      type: Decimal,
    },
    tutar: {
      type: Decimal,
    },
  });
  const siparisSchema = new Schema({
    _id:{
      type: Schema.ObjectId,
      auto: true,
      },
    userid: {
          type: Schema.ObjectId, 
      },
      sipno:{
          type:String
      },
    // --------------
    aratoplam: {
        type: Decimal,
    },
    kdv: {
      type: Decimal,
    },
    // --------------

    odemetipi:{
        type:String
    },
    odemedurumu:{
        type:String
    },
    teslimat:{
        type:String
    },


    tutar: {
      type: Decimal,
    },
    satirs:
      [ 
        satirSchema 
      ]
    ,
    createdAt: {
      type: Date,
      default: Date.now
      }
  
  });
module.exports = mongoose.model('siparis', siparisSchema, 'siparis');