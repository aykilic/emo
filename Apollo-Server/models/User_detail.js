const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const User_detailSchema = new Schema({
  _id:{
    type: Schema.ObjectId,
    auto: true,
  },
  uid:{
    type: Schema.ObjectId,
    
  },
  baslik:{
    type: String,
  },
  ad_soyad: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  cep: {
    type: String,
    
  },
  tc_v_no: {
    type: String,
    
  },
  v_daire: {
    type: String,
    
  },
  adres: {
    type: String,
    
  },
  p_kodu:{
      type:String
  },
  il:{
      type:String
  },
  ilid:{
      type:String
  },
  
  ilce:{
      type:String
  },
  ilceid:{
      type:String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('User_detail', User_detailSchema, 'User_detail');