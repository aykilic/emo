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

          <q-input rounded outlined dense v-model="search" class="main_search" placeholder="Kategori yada Ürün Ara" >
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
    <path d="M-0,15 C190,70 220,-25 500,35  L500,00 L0,0 Z" style="stroke: none; fill:white;"></path>
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
                    
            <q-tab  name="a"  @mouseover= "menuOver = true" @mouseout= "menuOver = false"     label="LOHUSA & HAMİLE ÜRÜNLERİ" >
              
              
            </q-tab>
            
            <q-tab name="b" @mouseover= "menuOver1 = true" @mouseout= "menuOver1 = false" label="GÜNLÜK KULLANIM" />
            <q-tab name="c" @mouseover= "menuOver2 = true" @mouseout= "menuOver2 = false" label="EN ÇOK SATAN ÜRÜNLER" />
            
         </q-tabs>
          <!-- <div class="container">
  <svg viewBox="0 0 500 420" preserveAspectRatio="xMinYMin meet">
    <path d="M-10,10 C70,70 300,-50 500,40  L500,00 L0,0 Z" style="stroke: none; fill:#ff4081;"></path>
  </svg>
</div> ibo-->
<q-tab-panels
          v-if="menu"
          v-model="main_tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="col-8 shadow-10	"
          @mouseover= "listOver = true" @mouseout= "listOver = false"
        >
        
          <q-tab-panel name="a" >
            
            <div class="row col-md-3 q-ma-lg  text-subtitle2 " >
              <a class="menu_link" href="/">Lohusa Gecelik</a>
              <div> &nbsp; > </div>
               
            </div>
            <div class="row col-md-3 q-ma-lg text-subtitle2 ">
              <a class="menu_link" href="/">Lohusa Gecelik</a>
              <div> &nbsp; > </div>
            </div>
            <div class="row col-md-3 q-ma-lg text-subtitle2 ">
              <a class="menu_link" href="/">Lohusa Gecelik</a>
              <div> &nbsp; > </div>
            </div>
            <div class="row col-md-3 q-ma-lg text-subtitle2 ">
              <a class="menu_link" href="/">Lohusa Gecelik</a>
              <div> &nbsp; > </div>
            </div>
            <q-separator vertical />
          </q-tab-panel>

          <q-tab-panel name="b">
            <div class="text-h6">Alarms</div>
            Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
          </q-tab-panel>

          <q-tab-panel name="c">
            <div class="text-h6">Movies</div>
            Nostrum necessitatibus expedita dolores? Voluptatem repudiandae magni ea.
          </q-tab-panel>
        </q-tab-panels>
        </q-page-sticky>
        
    </q-page-container>
  
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'
import {debounce} from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  data () {
    return {
      menu: false,
      menuOver: false,
      listOver: false,
      menuOver1: false,
      menuOver2: false,
      splitterModel: 20,
      slide: 1,
      search: null,
      main_tab:"",
      
    }
  },

  methods:{
    debounceFunc: debounce(function () {
        
        this.checkMenu()
      }, 1) ,
    debounceFunc1: debounce(function () {
        
        this.checkMenu1()
      }, 1) ,
    debounceFunc2: debounce(function () {
        
        this.checkMenu2()
      }, 1) ,
      
    checkMenu () {
      if (this.menuOver || this.listOver) {
        this.menu = true
      }
      else {
        this.menu = false
      }
    },
    checkMenu1 () {
      if (this.menuOver1 ) {
        this.menu = true
      }
      else {
        this.menu = false
      }
    },
    checkMenu2 () {
      if (this.menuOver2 ) {
        this.menu = true
      }
      else {
        this.menu = false
      }
    },
    // ibo(){
    //   console.log("object");
    // }
},
watch: {
    menuOver (val) {
      this.main_tab="a"
      this.debounceFunc()
    },
    listOver (val) {
      this.debounceFunc()
    },
    menuOver1 (val) {
      
      this.main_tab="b"
      this.debounceFunc1()
    },
    menuOver2 (val) {
      this.main_tab="c"
      this.debounceFunc2()
    },
   
  },
}
</script>
<style lang="stylus" scope>
/* @import '../../node_modules/@quasar/extras/mdi-v4/mdi-v4.css'; */

  .q-layout__section--marginal{
    background-color: #ff4081;
    }
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
.cartbadge{
  background-color:#ff4081;
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
a.menu_link:link{
   color:#1d1d1d;
   text-decoration: none;
  }
a.menu_link:visited{
   color:#1d1d1d;
   text-decoration: none;
  }
a.menu_link:hover{
   color:#1d1d1d;
   text-decoration: underline;
  }
a.menu_link:active{
   color:#1d1d1d;
   text-decoration: underline;
  }
a.menu_link+div {
  display:none;
}
a.menu_link:hover + div{
  display:block ;
}
.main_search .q-field__control{
  color :#ff4081;
}
/* a.menu_link:first-child:hover{
  display:block;
} */
</style>