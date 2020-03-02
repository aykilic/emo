module.exports = {
  createBirim: async (parent,{birimad}, {Models}) => {
    // const Birim = await birim.findOne({ birimad });

     const birim = Models.birim
    //  const birimad = Models.birim.birimad
    
  //   if(birim){
  //     throw new Error('Kullanıcı adı kullanımda')
  //   }
    return await new birim({
      birimad
    }).save((error)=>{
      if(error){
        throw error;
      }
    });
  },
  updateBirim: async (root, { id, birimad }, { Models }) => {
    const birim = Models.birim
    // console.log(_id,stokturad);
   return await birim.findByIdAndUpdate({_id:id},{birimad:birimad},{new: true});
   // collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
 },
  deleteBirim: async (root, { id }, { Models }) => {
    const birim = Models.birim
    // console.log(id);
    return await birim.findByIdAndDelete(id);
  },
  };
  