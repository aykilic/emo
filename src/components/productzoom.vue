<template>
    
        
        <div   class="app-figure mzc-img" id="zoom-fig">

            <a  id="Zoom-1" class="MagicZoom mzc-img" title="ürün detay" data-options="rightClick: false; zoomPosition: inner; variableZoom: true; textHoverZoomHint:  ;textClickZoomHint:  ;textExpandHint:  ; selectorTrigger: click;"
                :href="images.thumbs[0].dataimage+images.thumbs[0].publicid+'.jpg'" 
            >
                <img  class="mzc-img" 
                :src="images.thumbs[0].dataimage+images.thumbs[0].publicid+'.jpg'" 
                
                alt=""/>
            </a>
            <div id="Zoom-5" class="selectors ">
            <a v-for="(image, key) in images.thumbs" :key="key "
            
                    data-zoom-id="Zoom-1"
                    :href="image.dataimage  +  image.publicid +'.jpg'"
                    :data-image="image.dataimage  +  image.publicid +'.jpg'"
                >
                    <!-- <img v-if="image.dataimage"  :src="image.dataimage + 'c_scale,w_80/' + image.publicid " /> -->
                    <img v-if="image.dataimage" 
                    
                    :src="image.dataimage + 'c_scale,w_60/' + image.publicid+'.jpg'" 
                    
                    />
                    <!-- :srcset="image.dataimage  + image.publicid+'.jpg' " -->
                    <!-- <img :srcset="image.dataimage + 'c_scale,w_56/' + image.publicid " :src="image.dataimage + 'c_scale,w_56/' + image.publicid"/> -->
                </a>
                
            </div>

        
    </div>
    
</template>
<script>
import * as zoom from "../assets/productzoom/magiczoomplus.js"
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll;
var mzOptions = {
textHoverZoomHint: "wdsdsds",
textExpandHint:  "sdsdsd",
textClickZoomHint: "sdsdsd"
};
export default {
    
    props:["images"],
    data() {
        return {
            mzOptions:""
        }
    },
    mounted() {
this.mzOptions = {
textHoverZoomHint: "wdsdsds",
textExpandHint:  "sdsdsd",
textClickZoomHint: "sdsdsd"
};
        if(this.images.thumbs[0].id==="Zoom-1"){
        
        }else{
             MagicZoom.start();
             // scrool hareket
            //  const ele = document.getElementById('Zoom-1') // You need to get your element here
            //     const target = getScrollTarget(ele)
            //     // console.log(target);
            //     const offset = ele.offsetTop - ele.scrollHeight
            //      console.log("offset",offset);
            //     const duration = 100
            //     setScrollPosition(target, 170, duration)
        }
            

                   
    },
    methods: {
        Magiczoom(){
            MagicZoom.start('Zoom-1');
        }
    },
   

     }
</script>

<style lang="css" scoped>
    @import './../assets/productzoom/magiczoomplus.css';
    .selectors { margin-top: 10px; }
    .selectors .mz-thumb img { max-width: 60px; }
    .mzc-img{
        border-radius: 18px;
    }
        
    
    /* .selectors{
        
    } */
    .mz-thumb{margin-left: 6px;}
    .app-figure{text-align: center;}
    /* .MagicZoom {
        object-fit:contain !important;
        height:500px !important;
    } */
  
   
</style>
