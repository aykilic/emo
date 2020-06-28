const mongoose=require('mongoose');
const Schema = mongoose.Schema;
var Decimal = require('mongoose-float').loadType(mongoose, 2);
const sepetSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  uid:{
    type: String,
    
  },
  guid:{
    type: String,
    
  },
  stokid: {
    type: Schema.ObjectId,
    
  },
  stokad: {
    type: String,
    
  },
  varyantid: {
    type: Schema.ObjectId,
    
  },
  varyantoption1: {
    type: String,
    
  },
  varyantoption2: {
    type: String,
    
  },
  fiyat: {
    type: Decimal,
  },
  path: {
    type: String,
  },
  publicid: {
    type: String,
  },
  count: {
    type: Number,
  },
  kdv:{
    type:Number
  },
//   variant: {
//     name:  {type: String},
//     value: {type: String}
//   },
  
  createdAt: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('sepet', sepetSchema, 'sepet');