<template>
  <q-page class="row flex flex-center col-12">
    <!-- <div v-if="anakategorilists.length < 1">Loading...</div> -->
    <!-- <div v-else-if="slider1list.length < 1 && slider2list.length < 1 && reklam1list.length < 1">Loading...</div> -->
    
      <!-- <q-carousel
                  class="q-pt-md col-12 karousel"
                  animated
                  v-model="slide"
                  
                  infinite
                  autoplay
                  arrows
                  transition-prev="slide-right"
                  transition-next="slide-left"     
            >
        <q-carousel-slide v-for="(list ,index) in get_slider1list" :key="index" :name="index" class="q-pa-none "  >
          <img   :src="list.path + list.publicid+'.jpg'"  class="fit" style="cursor:pointer;object-fit:container" @click="select(list.stokturad,list.stokid)">
        </q-carousel-slide>
      </q-carousel> -->
      <div  class="q-pt-md q-pb-xs col-12">
      <VueSlickCarousel v-if="get_slider1list.length > 0" style="cursor:pointer;"  v-bind="settings1">
        
        <div v-for="(list1 ,index) in get_slider1list" :key="index"  class=" text-center" >
          <img   :src="list1.path + list1.publicid+'.jpg'"  class="fit " style="object-fit:contain" @click="select(list1.stokturad,list1.stokid)">
          </div>
        
      </VueSlickCarousel>
      </div>
      <div class="text-center q-pt-md col-12">
      <VueSlickCarousel v-if="get_slider2list.length > 0" style=" cursor:pointer;" v-bind="settings2">

        <div v-for="(list2 ,index) in get_slider2list" :key="index" class="slider2 " >
          <img   :src="list2.path + list2.publicid+'.jpg'"  class="fit" style="" @click="select(list2.stokturad,list2.stokid)">
        </div>
      </VueSlickCarousel>
      </div>
      <!-- row içine çoklu resim -->
      <!-- <div class="row cursor-pointer" v-if="reklam1list.length > 0">
        <div   class="row q-gutter-md " >
          <div v-for="(list ,index) in reklam1list" :key="index" class="q-pt-md col " style="">
            <img   :src="list.path + list.publicid+'.jpg'"  class="fit " style="object-fit:contain" @click="select(list.stokturad,list.stokid)">
          </div>
        </div>
      </div> -->
      <div class="row cursor-pointer" v-if="reklam1list.length > 0">
          <div v-for="(list3 ,index) in reklam1list" :key="index" class="col-6  q-pt-md " style="">
            <img   :src="list3.path + list3.publicid+'.jpg'"  class="fit q-pa-xs" style="object-fit:contain" @click="select(list3.stokturad,list3.stokid)">
          </div>
      </div>
      <div class="row cursor-pointer" v-if="etiket1list.length > 0">
        <div   class="row  " >
          <div v-for="(list4 ,index) in etiket1list" :key="index" class="q-pt-md col" style="">
            <img   :src="list4.path + list4.publicid+'.jpg'"  class="fit" style="object-fit:contain" @click="select(list4.stokturad,list4.stokid)">
          </div>
        </div>
      </div>
      <div class="row  cursor-pointer " v-if="get_reklam2list.length > 0">
          <div v-for="(list5 ,index) in get_reklam2list" :key="index" class="col-6  q-pt-md  " style="">
            
            <!-- <img  v-if="index % 2 != 0" :src="list.path + list.publicid+'.jpg'"  class="fit q-pl-md" style="object-fit:contain" @click="select(list.stokturad,list.stokid)"> -->
            
              <img  :src="list5.path + list5.publicid+'.jpg'"  class="fit q-pa-xs" style="object-fit:contain" @click="select(list5.stokturad,list5.stokid)">
            
          </div>
          
      </div>
      <div class="row cursor-pointer q-pl-xs q-pr-xs" v-if="get_reklam3list.length > 0">
        <div   class="row q-gutter-xs " >
          <div v-for="(list6 ,index) in get_reklam3list" :key="index" class="q-pt-md col " style="">
            <img   :src="list6.path + list6.publicid+'.jpg'"  class="fit " style="object-fit:cover" @click="select(list6.stokturad,list6.stokid)">
          </div>
        </div>
      </div>
      <!-- -*-*-*-*-*-*-*-*-*-*-*-*-*- -->
      <div class="row q-pt-md">
      <div class="row col-6  cursor-pointer q-pl-xs " v-if="get_reklam4list.length > 0">
          <div v-for="(list7 ,index) in get_reklam4list" :key="index" class="row   " style="">
            <div v-if="index==0" class="">
              <img  :src="list7.path + list7.publicid+'.jpg'"  class="fit " style="object-fit:contain" @click="select(list7.stokturad,list7.stokid)">
              </div>
            <!-- <img  v-if="index % 2 != 0" :src="list.path + list.publicid+'.jpg'"  class="fit q-pl-md" style="object-fit:contain" @click="select(list.stokturad,list.stokid)"> -->
            
              
            
          </div>
          
      </div>
      <div class="col cursor-pointer q-pl-xs q-pr-xs self-center" v-if="get_reklam4list.length > 0">
          <div v-for="(list8 ,index) in get_reklam4list" :key="index" class="row col-6   " style="">
            <div v-if="index!==0 " class="">
            <div v-if="index % 2 != 0 " class="">
              <img  :src="list8.path + list8.publicid+'.jpg'"  class="fit " style="object-fit:contain" @click="select(list8.stokturad,list8.stokid)">
            </div>
            <div v-if="index % 2 != 1 "  class="" >
              <img  :src="list8.path + list8.publicid+'.jpg'"  class="fit " style="object-fit:contain" @click="select(list8.stokturad,list8.stokid)">
            </div>
            </div>
            <!-- <img  v-if="index % 2 != 0" :src="list.path + list.publicid+'.jpg'"  class="fit q-pl-md" style="object-fit:contain" @click="select(list.stokturad,list.stokid)"> -->
            
          </div>
      </div>
      </div>
      <!-- *-*-*-*-*-*-*-*-*-*-*-*-*- -->
      <div class="row cursor-pointer q-pl-xs q-pr-xs q-mt-md q-mb-xl" v-if="get_stamplist.length > 0">
        <div   class="row q-gutter-xs " >
          <div v-for="(list9 ,index) in get_stamplist" :key="index" class="q-pt-md col " style="">
            <img   :src="list9.path + list9.publicid+'.jpg'"  class="fit " style="object-fit:contain" @click="select(list9.stokturad,list9.stokid)">
          </div>
        </div>
      </div>
      <!-- <p v-for="n in 15" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
        dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
      </p> -->
    
  </q-page>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'
import router from "../router"
import {mapGetters } from 'vuex'
import {Loading} from 'quasar'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  // get_slider1listrefresh
  name: 'PageIndex',
  components: { VueSlickCarousel },
  data () {
    return {
      slide:1,
      kategoriliste:[],
      treeem:[],
      result:[],
      activestokid:"",
      slider1list:[],
      slider2list:[],
      reklam1list:[],
      etiket1list:[],
      // --------- 
      usermail:"",
      settings1:{

        "lazyLoad": "ondemand",
        "fade": true,
        "arrows": false,
        "autoplay": true,
        "autoplaySpeed": 4000,
        "focusOnSelect": false,
        "infinite": true,
        "speed": 3000,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "touchThreshold": 1
      },
      settings2:{
        "arrows": false,
        "autoplay": true,
        "autoplaySpeed": 2500,
        "infinite": true,
        "speed": 1500,
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "touchThreshold": 5
      }
      
    }
    },
    watch: {
      get_slider1list(val){
         this.slider1list=val
        // console.log("this.slider1list",this.slider1list);
      },
      get_slider2list(val){
         this.slider2list=val
        // console.log("this.slider2list",this.slider2list);
      },
      get_reklam1list(val){
         this.reklam1list=val
        // console.log("this.reklam1list",this.reklam1list);
      },
      get_etiket1list(val){
         this.etiket1list=val
        // console.log("this.etiket1list",this.etiket1list);
      },
      get_user(val){
        this.usermail=val
      }
    },
    computed: {
      ...mapGetters([
      'get_slider1list',
      'get_slider2list',
      'get_reklam1list',
      'get_etiket1list',
      'get_reklam2list',
      'get_reklam3list',
      'get_reklam4list',
      'get_stamplist',
      'anakategorilists',
      'anakategorizelists',
      'get_user',
      
    ]),
    },
    async mounted(){
     await this.$store.dispatch('search_slider1listrefresh')
     
      // console.log("get_slider1listrefresh",this.get_slider1list);
      // await console.log("anakategorilists",this.anakategorilists);
      
     
    },  
    methods: {
      select(a,b){
              let self= this
              // console.log("b",b);
              let c=this.anakategorizelists
              rota(this.anakategorizelists,b)

               function rota(c,b){

                 c.forEach(item=>{
                  let parentname=item.stokturad
                  if(item._id==b){
                    if(item.children.length > 0){
                      self.$router.push({ name: 'stoklist', params: { parentname: parentname, parentid : b }})
                    }else{
                      self.$store.dispatch('stoklistid',b)
                      self.$router.push({ name: 'sales', params: { parentname:parentname, stokid: item._id, stokad:item.stokturad }})
                    }
                  }else{
                    item.children.forEach(subitem=>{
                        rota(subitem.children,b)
                    })
                  }
                 })
              }
        
        
        return
                  // stoklistid
                  
                  // this.$store.dispatch('stoklistid',b)
                  // this.$router.push({ name: 'sales', params: { stokad: a, stokid:b }})
              },
              
    
    }

}
</script>
<style lang="stylus" scope>
.slidir{
  // object-fit: contain !important
  width:400px;

}
@media only screen and (max-width: 601px ) {
.karousel{
max-height:230px;
width:100%;
}
}
@media only screen and (min-width: 1280px ) {
.karousel{
min-height:450px;
width:100%;
}
}
@media only screen and (min-width: 1600px ) {
.karousel{
min-height:550px;
width:100%;
}
}
.slider2{
 max-width:200px;
}
.slider2 img{
max-width:200px;
border-radius: 100px;
}
// .reklam1{
//   max-width:500px
// }
</style>