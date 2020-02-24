<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :reveal-offset="10" reveal >
      <q-toolbar class="text-amber-1 bg-white text-grey-9 text-weight-bold justify-center" >
       
        <div class="row q-pt-lg col-md-8 col-sm-10 col-xs-12 grid ">
        <div class="col-md-4 col-sm-6   one">
          <q-img
          src="statics/Emose_Logo.jpg"
          
          style=" max-width: 140px"
          /></div>
        <div class="col-md-4 col-sm-12 col-xs-12 two self-center justify-center" >

          <q-input rounded outlined dense v-model="search" placeholder="Kategori yada Ürün Ara" >
              <template v-slot:append>
          <q-icon name="search" />
        </template>
          </q-input>

        </div>
        
        <div class="row col-md-4 col-sm-12 col-xs-12 self-center justify-end three">
          
          <div class="title-icons text-center  text-caption"  ><q-icon class="icon-person text-center"   style="font-size: 26px;;"/><q-item-label >Hesabım</q-item-label>  </div>
          <div class="q-ml-lg title-icons text-center   text-caption"><q-icon class="icon-heart text-center"    style="font-size: 26px;"/><q-item-label >Favorilerim</q-item-label></div>
          <div class="q-ml-lg title-icons text-center  text-caption"><q-icon class="icon-cart"   style="font-size: 26px;"><q-badge class="cartbadge" align="top"  floating transparent>2</q-badge></q-icon><q-item-label >Sepetim</q-item-label></div>
        
          </div>
          
        </div>
      
      </q-toolbar>
      <div class="container">
  <svg viewBox="0 5 500 40" preserveAspectRatio="xMinYMin meet">
    <path d="M-0,20 C190,70 280,-25 500,35  L500,00 L0,0 Z" style="stroke: none; fill:white;"></path>
  </svg>
</div>

    </q-header>

  

    
    <q-page-container class="row flex-center">
      
      
      <div class="q-pt-xl col-md-8 col-sm-10 col-xs-12">
      <!-- TODO: slider -->
      
      
      

      
     
      
      
        <router-view />
        </div>
          <q-page-sticky expand position="top">
            <!-- <div> -->
            <q-tabs
            v-model="main_tab"
            :reveal-offset="10000"
            indicator-color="transparent"
            
            dense
            reveal
            class="col-12 bg-pink-12 text-white maintabs"
                    >
                    <!-- </div> -->
                    <div @mouseenter="drophover1= true" @mouseout="drophover1 = false">
            <q-tab name="1" class="1"    label="LOHUSA & HAMİLE ÜRÜNLERİ" >
              
            </q-tab>
            <div class="row col-12 justify-center"  v-if="drophover1" >
              <div  class="col-md-8 " style=display:none;background-color:#ff4081;>
                <p v-for="n in 5" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
          </div>
            </div>
            </div>
            <q-tab name="2" label="GÜNLÜK KULLANIM" />
            <q-tab name="3" label="EN ÇOK SATAN ÜRÜNLER" />
            <q-tab name="4" label="GÜNÜN FIRSATI" />
          </q-tabs>
          <!-- <div class="container">
  <svg viewBox="0 0 500 420" preserveAspectRatio="xMinYMin meet">
    <path d="M-10,10 C70,70 300,-50 500,40  L500,00 L0,0 Z" style="stroke: none; fill:#ff4081;"></path>
  </svg>
</div> ibo-->
        </q-page-sticky>
        
    </q-page-container>
  
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'
import { debounce } from 'quasar'
export default {
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  data () {
    return {
      // maintabs:{
      //   tabs_indicator_color:'white',
      // },
      drophover1:false,
      listhover1:false,
      menuhover1:false,
      slide: 1,
      search: null,
      main_tab:"",
      
        drophover1: false,
      drophoverlist1:false,
      
    }
  },
  computed: {
  // styleObject: function() {
  //   return {
  //     '--indicator-color': this.maintabs.tabs_indicator_color,
      
  //   }
  // }
},
  method:{
    
    
    hesap(){
      console.log("ibo");
      
    },
    
  

}
}
</script>
<style lang="styl" scope>
/* @import '../../node_modules/@quasar/extras/mdi-v4/mdi-v4.css'; */



  .title-icons {
    cursor:pointer;
    
  }
  .title-icons  .icon-person::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    
    font-size: 26px;
    position:absolute;
    content:"\F013";
  }  
  .title-icons:hover .icon-person::after{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    color:#ff4081;
    font-size: 26px;
    content:'\F004';
    animation: toColor 0.5s;
  }
  .title-icons  .icon-heart::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    
    font-size: 26px;
    position:absolute;
    content:"\F2D5";
  }  
  .title-icons:hover .icon-heart::after{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    color:#ff4081;
    font-size: 26px;
    content:'\F2D1';
    animation: toColor 0.5s;
  }
  .title-icons  .icon-cart::before{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
   
    font-size: 26px;
    position:absolute;
    content:"\F111";
    
  }  
  
  .title-icons:hover .icon-cart::before, .title-icons:hover  .icon-heart::before, .title-icons:hover  .icon-person::before{
    content:'';
     
  }
  
  .title-icons:hover .icon-cart::after{
    font-family: "Material Design Icons" ;
    font-weight: normal;
    font-style: normal;
    font-size: 26px;
    color:#ff4081;
    
    content:'\F110';
    animation: toColor 0.5s;
  }

  .title-icons:hover .cartbadge{
    animation: toColor 0.5s;
  }
  @keyframes toColor {
    0%    { -webkit-filter: opacity(0%); filter: opacity(0%); }
    25%   { -webkit-filter: opacity(25%); filter: opacity(25%); }
    50%   { -webkit-filter: opacity(50%); filter: opacity(50%); }
    75%   { -webkit-filter: opacity(75%); filter: opacity(75%); }
    100%  { -webkit-filter: opacity(100%); filter: opacity(100%); }
}

@media only screen and (max-width: 1023px ) {
 .grid{
   display: grid;
 }
    .one   { grid-row: 1 / 2; grid-column: 1 / 2; }
    
    .two   { grid-row: 2 / 3; grid-column: 1 / 3;margin-top:15px; }
    .three { grid-row: 1 / 2; grid-column: 2 / 3; }
}
.q-badge--floating{
  top: -10px !important;
  right: -15px !important;
}
svg {
  display: inline-block;
  position: absolute;
  top:0;
  left: 0;
}
.container {
  display: inline-block;
  position: relative;
  width: 100%;
  
  padding-bottom: 8%;
  vertical-align: middle;
  overflow: hidden;
}
/* .q-tab:hover .q-tab__indicator{
  background-color:  var(--indicator-color) !important;
  color:  var(--indicator-color) !important;
  opacity:1 !important;
  
} */
.q-tab:hover .q-tab__indicator{
  background-color:  white !important;
  /* color:  white !important; */
  opacity:1 !important;
  /* height: 2px !important; */
}
</style>