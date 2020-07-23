<template>
  <q-page class="row flex flex-center col-12">
    <div v-if="anakategorilists.length < 1">Loading...</div>
    <div v-else-if="get_slider1list.length < 1">Loading...</div>
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
      <div v-else class="q-pt-xs q-pb-xs col-12">
      <VueSlickCarousel  style="cursor:pointer;"  v-bind="settings1">
        
        <div v-for="(list ,index) in get_slider1list" :key="index"  class="text-center" >
          <img   :src="list.path + list.publicid+'.jpg'"  class="fit" style="cursor:pointer;object-fit:container" @click="select(list.stokturad,list.stokid)">
          </div>
        
      </VueSlickCarousel>
      </div>
      <div class="q-pt-lg q-pb-lg col-12">
      <VueSlickCarousel   v-bind="settings2">
        <div class="text-center"><h4>1</h4></div>
        <div class="text-center"><h4>2</h4></div>
        <div class="text-center"><h4>3</h4></div>
        <div class="text-center"><h4>4</h4></div>
        <div class="text-center"><h4>5</h4></div>
        <div class="text-center"><h4>6</h4></div>
      </VueSlickCarousel>
      </div>
      <p v-for="n in 15" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
        dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
      </p>
    
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
      // --------- 
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
        "autoplaySpeed": 1500,
        "focusOnSelect": true,
        "infinite": true,
        "speed": 700,
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "touchThreshold": 5
      }
      
    }
    },
    watch: {
      get_slider1list(val){
         this.slider1list=val
        
      }
    },
    computed: {
      ...mapGetters([
      'get_slider1list',
      'anakategorilists',
      'anakategorizelists',
      
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
</style>