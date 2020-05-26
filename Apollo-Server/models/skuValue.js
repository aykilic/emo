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
const skuValueSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
    
    },
  varyant_id: {
        type: Schema.ObjectId, 
    },
  varyantValue_id: {
        type: Schema.ObjectId, 
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
 module.exports = mongoose.model('skuValue', skuValueSchema, 'skuValue');