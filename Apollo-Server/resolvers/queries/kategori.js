const kategori = {

  children: async (parent, args, context,info)=> {
    // info.forEach(function(element) {
    //   console.log(element.parentid);
    // });
    // console.log(parent.parentid="ibo",parent.stokturad="Yok");
   let sonuc = await context.Models.stokturu.findOne
    (
        parent.parentid
    );
    // console.log(parent.parentid);
    if(parent.parentid===null){

      return sonuc={stokturad:"ANA KATEGORİ"}

    }else{

      return sonuc

    }
// console.log(ust)
   // return stokturu.findOne(console.log(parent.id,parent.parentid))
   //   return stokturu.findById(parent.parentid=parent.id)
   //      return console.log({_id:kategori.})
// function (){
//   if (parent.id = "5d88f55f3f329b02b4afdc46") {
//     console.log("tamam")
//
//
//   } else {
//     console.log("yıııı")
//
//   }
//
// }



      // function()
    // {
      // if(parent.id === parent.parentid)
      // {
      //   console.log("evet");
      //   return parent.id = parent.parentid
      //   ;
      // }else{
      //   console.log("hayır");
      //
      // }
    // }

  },
  
};
module.exports = kategori;
