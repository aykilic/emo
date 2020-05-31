const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const guest_userSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
//   name:{
//     type:String
//   },
  createdAt: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('guest_user', guest_userSchema, 'guest_user');