const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Decimal = require('mongoose-float').loadType(mongoose, 2);
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
const votesSchema = new Schema({
  
  _id: {
    type: Schema.ObjectId,
  },
  userid: {
    type: Schema.ObjectId,
  },
  vote:{
    type: Number,
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
});
// const userSchema = new Schema({
  
//   _id: {
    
//     type: Schema.ObjectId,
//   },
//   username:{
//     type: String,
//   }
// });
const yorumSchema = new Schema({

  _id: {
    type: Schema.ObjectId,
    required: true
  },
  parentid:{
    type: Schema.ObjectId,
     default: null,
  },
  userid:{
    type: Schema.ObjectId,
    //  default: null,
  },
  yorum: {
    type: String,
    required: true
  },
  votes:[
    
    votesSchema
  
],
  createdAt: {
    type: Date,
    default: Date.now
  }
//   User:[
    
//     userSchema
  
// ],
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
  fiyat1:{
    type: Decimal,
    default:null
  },
  stokkodu:{
    type: String,
    default:null
    // type: Number
  },
  indirim:{
    type: Number,
    // type: Number
  },
  
  kdv:{
    type: Number,
    default:0
    // type: Number
  },
  description: {
    type: String,
    
  },
  vars:
    [
      { images: imagesSchema }
    ],
  yorumlar:[
    
      yorumSchema
    
  ],
  
  // slider1:
  //   [ 
  //      imagesSchema 
  //   ],
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
