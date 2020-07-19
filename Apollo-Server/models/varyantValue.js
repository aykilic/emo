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
const varyantValueSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
    
    },
  varyant_id: {
        type: Schema.ObjectId, 
    },
  varyantname: {
      type: String,
  },
  color: {
    type: String,
    default:""
  },
  sira:{
    type: Number,
    default:1
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
 module.exports = mongoose.model('varyantValue', varyantValueSchema, 'varyantValue');