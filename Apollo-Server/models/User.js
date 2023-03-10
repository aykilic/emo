const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const kodla = require('bcrypt');
var jwt = require('jsonwebtoken');

const  userSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },
  username: {
    type: String,
  
  },
  lastname: {
    type: String,
    // required: true
  },
  usermail:{
    type:String
  },
  password: {
    type: String,
    // required: true
  },
  role:{
    type:String,
    default: 'user'
  },
  token:{
    type: String,
    default:null
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
userSchema.pre('save',function(next){
  // if (!this.isModified('password')){
  //   console.log("modify");
  //   return next()
  // }
  kodla.hash (this.password,10)
    .then(hash=>{

      this.password=hash;
      next();
    })

});
module.exports = mongoose.model('luser', userSchema, 'luser');
