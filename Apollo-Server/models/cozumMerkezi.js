const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const cozum_userSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  gg:{
    type:String
  },
  mss:{
    type:String
  },
  ii:{
    type:String
  },
  kvkk:{
    type:String
  },
  ssk:{
    type:String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('cozumMerkezi', cozum_userSchema, 'cozumMerkezi');