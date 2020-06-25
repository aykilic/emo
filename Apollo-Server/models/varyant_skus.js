const mongoose=require('mongoose');
const Schema = mongoose.Schema;
var Decimal = require('mongoose-float').loadType(mongoose, 2);
const vatyant_skusSchema = new Schema({
  
//   stokid
// stokname
// varyant1_id
// varyant1_name
// varyant2_id
// varyant2_name
// varyantname1
// varyantname2
// fiyat1
// fiyat2
// color
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  stokid: {
    type: Schema.ObjectId,
  },
  stokname: {
    type: String,
  },
  varyant1_id:{
    type: Schema.ObjectId,
  },
  varyant1_name: {
    type: String,
  },
  varyant2_id:{
    type: Schema.ObjectId,
  },
  varyant2_name: {
    type: String,
  },
  varyant_option1_id: {
    type:  Schema.ObjectId,
  },
  varyant_option1_name: {
    type:  String,
  },
  varyant_option2_id: {
    type:  Schema.ObjectId,
  },
  varyant_option2_name: {
    type:  String,
  },
  fiyat1:{
    type: Decimal,
    default:0
  },
  indirim:{
    type: Number,
    default:0
  },
  kdv:{
    type: Number,
    default:0
  },
  description:{
    type:String,

  },
  miktar: {
    type: Number,
    default:0
  },
  color: {
    type:  String,
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
module.exports = mongoose.model('vatyant_skus', vatyant_skusSchema, 'vatyant_skus');