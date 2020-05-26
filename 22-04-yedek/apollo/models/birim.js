const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const birimSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  birimad: {
    type: String,
    required: true
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
module.exports = mongoose.model('birim', birimSchema, 'birim');