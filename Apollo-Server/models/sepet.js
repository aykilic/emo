const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const sepetSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  guid:{
    type: Schema.ObjectId,
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
  path: {
    type: String,
  },
  publicid: {
    type: String,
  },
  count: {
    type: Number,
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