<script>


import Vue from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
import { QUploaderBase } from 'quasar'
export default {
    
name: "cloud",
  mixins: [QUploaderBase],
  props: {
    stokid:"",  
    stokturad:"",
    uploadname:""
  },
  data () {
    return {
      filename:"",
      imageurl:'',
      progressUpload: 0,
      publicid:"",
      path:"",
      loading:0,
      uploadTask: '',
      cuploading: false,
      uploadTasks: []

    }
  },
  computed: {
    
    uploading() {
      return this.cuploading;
    },
    isBusy() {
      return this.cuploading;
    }
  },
  
  methods: {
    upload () {
      if (this.canUpload === false) {
        return;
      }

      // console.log("this.uploadname",this.uploadname);
      // return
      const url='https://res.cloudinary.com/aykilic/image/upload'
      // console.log(this.files);
      const fd = new FormData()
       fd.append('folder', "emose/anasayfa/");
        fd.append('file', this.files[0]);
        fd.append("api_key", '455572328161426');
        fd.append("api_secret", 'mF51plz5LvVB_XPRW_EKpRVKcnY');
        fd.append('upload_preset', 'h8dxadtw');
        // this.$emit('isUploading', true)
            this.cuploading = true;
              // this.$emit('isUploading',true)
        return new Promise((resolve, reject) => {
                //  setTimeout(() => {
                  axios({
                        url: 'https://api.cloudinary.com/v1_1/aykilic/upload',
                        method: 'POST',
                        data: fd,
                             headers: { 
                      //  'Content-Type': 'multipart/form-data',
                       'X-Requested-With': 'XMLHttpRequest',
                  
                       
                      },
                     onUploadProgress: (progressEvent) => {
                       this.uploadSize=progressEvent.total
                       this.uploadedSize=progressEvent.loaded
                let updateProgress=(Math.round((progressEvent.loaded / progressEvent.total) * 100) / 100)
              //  this.$emit('uploadProgress', updateProgress)
              console.log(updateProgress);
              if(updateProgress=1){
              }
            }
            
                      })
                         .then(response=>{
                           console.log("response",response);
                          let data =response.data
                          this.results=response.data;
                          this.filename=data.original_filename
                          this.publicid=data.public_id
                          this.path=url + '/'
                          this.imageurl = data.url
                          this.cuploading = false
                          this.removeFile(this.files[0])
                          this.uploadedSize=0
                          this.uploadSize=0
                        })
                        .then(()=>{

                    
              
              
                          console.log(this.imageurl);
                          /////////****/ uploadname e gore duzenle
                          if(this.uploadname=="slider1"){
                          this.$apollo.mutate({
                            mutation:gql`mutation anasayfaslider1Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfaslider1Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });   
                          }
                        else if(this.uploadname=="slider2"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfaslider2Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfaslider2Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }
                        else if(this.uploadname=="reklam1"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfareklam1Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfareklam1Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }
                        else if(this.uploadname=="etiket1"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfaetiket1Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfaetiket1Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }
                        else if(this.uploadname=="reklam2"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfareklam2Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfareklam2Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }
                        else if(this.uploadname=="reklam3"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfareklam3Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfareklam3Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }
                        else if(this.uploadname=="reklam4"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfareklam4Upload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfareklam4Upload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }
                        else if(this.uploadname=="stamp"){
                            this.$apollo.mutate({
                            mutation:gql`mutation anasayfastampUpload($imageurl: String!, $filename:String!, $publicid:String!, $path:String!,$stokid:ID,$stokturad: String){
                                  anasayfastampUpload(imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path,stokid:$stokid,stokturad: $stokturad) 
                                {
                                    _id
                                }
                              }`,
                            variables: {
                                // id:this.id,
                                filename : this.filename,
                                imageurl : this.imageurl,
                                path: this.path,
                                publicid:this.publicid,
                                stokid:this.stokid,
                                stokturad:this.stokturad
                            },
                      
                            }).then(async data => {
                              console.log('Done');
                              
                                this.$emit('refreshlist')

                            });


                        }

                        });

                // **************************


                // this.$axios.post("https://api.cloudinary.com/v1_1/aykilic/upload",
                //   fd,
                //   {
                //      headers: { 
                //        'Content-Type': 'multipart/form-data',
                //        'X-Requested-With': 'XMLHttpRequest',
                       
                //       },
                   
                //   })
                //   .then(res => {
                //     resolve(File[0])
                //   })
                //   .catch(err => reject(err))
                // }, 2000)
                 })
     }
  }
}
</script>