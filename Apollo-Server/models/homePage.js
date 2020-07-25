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
  stokturad:{
    type: String
  },
  stokid:{
    type: Schema.ObjectId,
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
    ],
  slider2:
    [ 
       imagesSchema 
    ],
  reklam1:
    [ 
       imagesSchema 
    ],
  etiket1:
    [ 
       imagesSchema 
    ],
  reklam2:
    [ 
       imagesSchema 
    ],
  reklam3:
    [ 
       imagesSchema 
    ],
  reklam4:
    [ 
       imagesSchema 
    ],
  createdAt: {
    type: Date,
    default: Date.now
    }

});
 module.exports = mongoose.model('homePage', homePageSchema, 'homePage');