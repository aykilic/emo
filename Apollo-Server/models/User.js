const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const kodla = require('bcrypt');

const  userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
userSchema.pre('save',function(next){
  if (!this.isModified('password')){
    return next()
  }
  kodla.hash (this.password,10)
    .then(hash=>{

      this.password=hash;
      next();

    })

});
module.exports = mongoose.model('user', userSchema);
