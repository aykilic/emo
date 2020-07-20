const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const imagesSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
    
    },
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
  },
  sira:{
    type: Number,
    default:1
  },
});
const homePageSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
    
    },
  
  slider1:
    [ 
       imagesSchema 
    ]
  ,
  createdAt: {
    type: Date,
    default: Date.now
    }

});
 module.exports = mongoose.model('homePage', homePageSchema, 'homePage');