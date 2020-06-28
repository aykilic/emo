const mongoose = require('mongoose');
// const varyantalt = require('./varyantalt');
const Schema = mongoose.Schema;
const imagesSchema = new Schema({
  
  filename: {
    type: String
  },
  imageurl: {
    
    type: String,
    default: null,
  },
  publicid: {
    type: String,
  },
  path: {
    type: String,
  }
});
const varyantaltSchema = new Schema();
varyantaltSchema.add({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  varyantvalue: {
    type: String
  },
  // altvaryantname: {
  //     type: String,
  // },
  vars:
    [ 
      { images: imagesSchema }
    ]
  
  ,
  varyantname: {
    type: String,
    default:null,
  },
  varyantalt: 
  [
  //   { images: imagesSchema }
  // ]
    // [
    //   {
    //   varyantvalue: {
    //     type:String
    //   }
    // },
       varyantaltSchema
    ]
  ,
  createdAt: {
    type: Date,
    default: Date.now
    }

})
const varyantSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  stokid:{
    type: Schema.ObjectId,
    
  },
  varyantname: {
    type: String,
  
  },
  // varyantname:{ type: Object },
  varyantalt: 
  [
  //   { images: imagesSchema }
  // ]
    // [
    //   {
    //   varyantvalue: {
    //     type:String
    //   }
    // },
       varyantaltSchema
    ]
  ,
  // varyantalt:{type: Schema.ObjectId, ref:'varyantalt'},
  createdAt: {
    type: Date,
    default: Date.now
  }

});
// const varyant = mongoose.model('varyant', varyantSchema, 'varyant');
// const varyantalt = mongoose.model('varyantalt', varyantaltSchema, 'varyantalt');
// module.exports = {
//   varyant,
//   varyantalt
// };

module.exports = mongoose.model('varyant', varyantSchema, 'varyant');
// const varyantalt = mongoose.model('varyantalt', varyantaltSchema, 'varyantalt');
