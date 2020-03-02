const mongoose = require('mongoose');
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
const attrSchema = new Schema({
  
  size: {
    
    type: String,
    default: null,
  }
});
const stokvarsSchema = new Schema({
   _id: {
     type: Schema.ObjectId,
   },
  images: imagesSchema,
  // attr:attrSchema
})
const stokturuSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  stokturad: {
    type: String,
    required: true
  },
  parentid:{
    type: Schema.ObjectId,
     default: null,
  },

  vars:
    [
      { images: imagesSchema }
    ]
    
  
  
  
  
  ,
    
        
  
  
  
  
  isvariant: {
    type: String,
    default: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const stokturu = mongoose.model('stokturu', stokturuSchema, 'stokturu');
 const stokvars = mongoose.model('stokvars', stokvarsSchema,'stokvars');
 module.exports = {
   stokturu,
   stokvars
 };
