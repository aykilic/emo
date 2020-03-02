const mongoose=require('mongoose');
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
const varyantaltSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
    ref:'varyant'
    },
  varyantid: {
        type: Schema.ObjectId, 
    },
  altvaryantname: {
      type: String,
  },
  color: {
    type: String,
    default:""
  },
  vars:
    [ 
      { images: imagesSchema }
    ]
  ,
  createdAt: {
    type: Date,
    default: Date.now
    }

});
 module.exports = mongoose.model('varyantalt', varyantaltSchema, 'varyantalt');