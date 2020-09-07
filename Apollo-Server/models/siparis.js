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
    stokad:{
        type:String
    },
    varyantid: {
      
      type: Schema.ObjectId,
    },
    count:{
        type:Number

    },
    birimfiyat: {
        type: Decimal,
    },
    aratoplam: {
        type: Decimal,
    },
    kdv: {
      type: Decimal,
    },
    kdvtutar: {
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
      type: String
    },
    faturano:{
      type: Number
    },
    irsaliyeno:{
      type: Number
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
        type:String,
        default:"Beklemede"
    },
    fatdurum:{
        type:String,
        default:"Beklemede"
    },


    tutar: {
      type: Decimal,
    },
    satirs:
      [ 
        satirSchema 
      ],
    isViewed:{
      type:Boolean,
      default:true
    },
    status:{
      type:Boolean,
      default:false
    },
    createdAt: {
      type: Date,
      default: Date.now
      }
  
  });
module.exports = mongoose.model('siparis', siparisSchema, 'siparis');