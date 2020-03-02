const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const photoSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  photoname: {
    type: String,
    required: true
  },
  photourl: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('photo', photoSchema, 'photo');