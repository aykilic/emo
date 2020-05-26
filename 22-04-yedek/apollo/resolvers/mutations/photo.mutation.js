const { createWriteStream } = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CAPI_KEY,
  api_secret: process.env.CAPI_SECRET
})
// const storeUpload = async ({ createReadStream, filename }) =>
//   //  console.log(stream, filename);
//     new Promise((resolve, reject) =>
//     createReadStream
//       .pipe(createWriteStream(filename))
//       .on("finish", () => resolve())
//       .on("error", reject));
module.exports = {
   
  uploadFile: async (_, { file }) => {
      
      
      
    const { filename, mimetype, createReadStream } = await file;
    const veri =await Promise.all(file).then(response => {
    
         
    //   // response[0].createReadStream()
    //   //   .pipe(
    //   //     createWriteStream(
    //   //       path.join(__dirname, "./zimage", response[0].filename)
    //   //     )
    //   //   )
    //   //   .on("close", res)
      return response
      
    })
    // console.log(veri[0].createReadStream());
    

    try {
      cloudinary.v2.uploader.upload(veri, 
  { folder: "panel/", 
     },
  function(error, result) {console.log(result, error); });
      // const result = await new Promise((resolve, reject) => {
      //   veri[0].createReadStream().pipe(
      //     cloudinary.uploader.upload_stream((error, result) => {
      //       if (error) {
      //         reject(error)
      //       }

      //       resolve(result)
      //     })
      //    )
      // })
    //   const result = await new Promise((resolve, reject) => {
    //      veri[0].createReadStream().pipe(
    //       cloudinary.uploader.upload_stream( 
    //         (error, result) => {
    //         if (error) {
    //           reject(error)
    //         }

    //         resolve(result)
    //       })
    //       )
    //   })
    //   // const newPhoto = { filename, path: result.secure_url }
      
    //    console.log(result.url)
    //   // console.log({file,filename:sdsdf.jpg});
      
    //   // photos.push(newPhoto)

    //   // return newPhoto
     } catch (err) {
    //   console.log(err)
     }
  

  
     console.log(veri[0].filename)

    // return {createReadStream:veri[0].createReadStream, filename:veri[0].filename, mimetype:veri[0].mimetype, encoding:veri[0].encoding};
     return {filename:veri[0].filename}
  },
    createPhoto: async (root,{ photoname, photourl },{Models}) => {
      // const Stokturu = await Stokturu.findOne({ username });
  
      // console.log("dgfdg");
    //   const photos = []
      const photo = Models.photo
      return await new photo({
  
        photoname,
        photourl
  
  
      }).save((error)=>{
        if(error){
          throw error;
        }
      });
    //   photos.push(newPhoto)

    //     return newPhoto
    },
    updatePhoto: async (root, { id, photoname, photourl }, { Models }) => {
      const photo = Models.photo
       // console.log(_id,stokturad);
      return await photo.findByIdAndUpdate({_id:id},{photoname:photoname, photourl:photourl},{new: true});
      // collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
    },
    deletePhoto: async (root,{ id },{Models}) => {
      // console.log(id);
      const photo = Models.photo
      return await photo.findByIdAndDelete(id);
    },
    
    
    
  };
  