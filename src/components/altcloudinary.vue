
<script>


import Vue from 'vue'
import axios from 'axios'
import gql from 'graphql-tag'
import { QUploaderBase } from 'quasar'
// import webp from 'webp-converter'
export default {
    
name: "altcloud",
  mixins: [QUploaderBase],
  props: {
    stokid:"",
    varyantid:"",  
      
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
  mounted(){
    // console.log("ilkvar::::",this.ilkvaryantid);
    // console.log("altvar::::",this.altvaryantid);
    
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
     
      const url='https://res.cloudinary.com/aykilic/image/upload/'
      // console.log(this.files);
      const fd = new FormData()
        fd.append('folder', "emose/varyant/58x58");
        fd.append('file', this.files[0]);
        fd.append("api_key", '455572328161426');
        fd.append("api_secret", 'mF51plz5LvVB_XPRW_EKpRVKcnY');
         fd.append('upload_preset', 'deneme');
        // fd.append('tags', 'signed');
        // fd.append('upload_preset', 'h8dxadtw');
        // fd.append('options=',{format:"webp"})
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
              

              // console.log("burda");
              
              }
            }
            
                      })
                         .then(response=>{
                           console.log(response);
                           
                          let data =response.data
                          this.results=response.data;
                          this.filename=data.original_filename
                          this.publicid=data.public_id
                          this.path=url+'emose/varyant/58x58'
                          console.log(response.data);
                          console.log("public_id", this.results.public_id);
                          this.imageurl = data.url
                          this.cuploading = false
                          this.removeFile(this.files[0])
                          this.uploadedSize=0
                          this.uploadSize=0
                          
                        })
                       .then(()=>{

                    
              
              
                          // console.log(this.imageurl);
                          /////////****/

                          this.$apollo.mutate({
                                mutation:gql`mutation updatevaryantimageurl($id:ID!, $imageurl: String,$filename:String,$publicid:String,$path:String){
                                        updatevaryantimageurl(id:$id, imageurl: $imageurl, filename: $filename, publicid:$publicid, path:$path) 
                                      {
                                          varyantname
                                      }
                                    }`,
                                variables: {
                                    filename : this.filename,
                                    imageurl : this.imageurl,
                                    path: this.path,
                                    publicid:this.publicid,
                                    id:this.varyantid,
                                    
                                },
                      
                    }).then(async data => {
                      console.log('Done_altcloud');
                      
                         this.$emit('varyantrefreshlist')

                    });   



                        })
                      ;

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


