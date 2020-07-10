const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const numaralarSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  name:{
    type: String,
    default:'ilk'
  },
  faturano: {
    type: Number,
    default:0
  },
  irsaliyeno:{
    type: Number,
    default:0
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
module.exports = mongoose.model('numaralar', numaralarSchema, 'numaralar');