const ObjectID = require("mongodb").ObjectID;
const yorumlar = {

  User: async (parent, args, context,info)=> {
    // info.forEach(function(element) {
    //   console.log(element.parentid);
    // });
    // console.log(parent.parentid="ibo",parent.stokturad="Yok");
  //  let sonuc = await context.Models.stokturu.findOne
  //   (
  //       parent
  //   );
  return await context.Models.User.findById(parent.userid);
  // return await context.Models.User.find({_id:ObjectID(parent.userid)});
     
  },
  
};
module.exports = yorumlar;
