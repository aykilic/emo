<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :reveal-offset="10" reveal >
      <q-toolbar class="text-amber-1 bg-white text-grey-9 text-weight-bold justify-center" >
       
        <div class="row q-pt-lg col-md-8 col-sm-10 col-xs-12 grid ">
        <div class="col-md-4 col-sm-6   one">
          <router-link to="/">
          <q-img
          src="statics/Emose_Logo.jpg"
          style=" max-width: 140px"
          />
          </router-link>
          </div>
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
      
      <!-- <transition name="fade"> -->
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      <!-- </transition> -->
        </div>
          <q-page-sticky expand position="top">
            <!-- <div> -->
                
            <q-tabs
              v-model="main_tab"
              
              indicator-color="transparent"
              dense
              reveal
              class="col-12 bg-pink-12 text-white "
            >
                    
              <q-tab  name="a"  @mouseover= "menuOver = true" @mouseout= "menuOver = false"     label="LOHUSA & HAMİLE ÜRÜNLERİ" />
              <q-tab  name="b" @mouseover= "menuOver1 = true" @mouseout= "menuOver1 = false" label="GÜNLÜK KULLANIM" />
              <q-tab  name="c" @mouseover= "menuOver2 = true" @mouseout= "menuOver2 = false" label="EN ÇOK SATAN ÜRÜNLER" />
            
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
          class="row col-md-8 col-sm-10 col-xs-12 shadow-10	"
          @mouseover= "listOver = true" @mouseout= "listOver = false"
          
        >
          <q-tab-panel  name="a" style="padding-left:0; " >
           <!--  <ul class="ibo"  style="width:15%;float:left;height:300px;border-right: 5px solid rgb(240,240,240) ;margin-bottom:10px">
              <li v-for="(anakategorilist,index) in anakategorilists" :key="index" @mouseover="selected(true)">
                {{anakategorilist.stokturad}}
                
              </li>
            </ul>


            <div v-for="(anakategorilist,index) in anakategorilists" :key='index'>
              <div label="{anakategorilist.stokturad}" v-show="isActive">
                {{anakategorilist.id}}
              </div>
            </div> -->
            <!-- <menu-tab >

            </menu-tab> -->
            <!-- <menu-tabs >
              
              <menu-tab  name="Services" :selected="true">
                 <div class=" "> <h6>asdasdasd</h6></div>
              </menu-tab>
                
            </menu-tabs> -->
            <a-tabs  style= "" @menu="menu=$event">
              <a-tab v-for="(anakategorilist,index) in treemmenu" :key='index' :title="(anakategorilist.stokturad)" :titleid="(anakategorilist._id)" class="row col-12"  >
                
                <div  class="col-3 q-pl-md" >
                  <ul class= "ullistchild"  v-for="(altkategorilist,iindex) in anakategorilist.children" :key='iindex' >
                      <li  class="listchild" @click="link(altkategorilist.stokturad,altkategorilist._id)">
                        <!-- {{altkategorilist.stokturad}} -->
                        {{ altkategorilist.stokturad.split('-').reverse().join(' ') }}
                        </li> 
                      
                    </ul>
                </div>
                <div class="col-3 q-pl-md">
                  <ul class= "ullistchild " >
                      <li class="listchild">Lohusa Aksesuar</li>
                    </ul>
                </div>
                <div class=" col-6 ">
                  
                <q-intersection
                once
                transition="fade"
                class=""
                >
                <div class="row items-start q-col-gutter-x-md">
                <q-card flat class="my-card col-6 ">
                  
                  <q-img
                      
                      src="../statics/emose_h200.jpg"
                      style=" height: 400px;"
                    >
                  </q-img>
                  
                </q-card>
                <q-card flat class="my-card col-6 ">
                  
                  <q-img 
                      flat
                      src="../statics/emose1_h200.jpg"
                      style=" height: 400px;"
                    >
                  </q-img>
                  
                </q-card>
                </div>
                </q-intersection>
                
                </div>
              </a-tab>
              <!-- /////////********************////////////////////// */ -->
              <!-- <a-tab title="Gecelik">Hello From Tab 2</a-tab>
              <a-tab title="Pijama">Hello From Tab 3</a-tab>
              <a-tab title="Günlük">Hello From Tab 4</a-tab> -->
              <!-- <div v-for="(anakategorilist,index) in treemmenu" :key='index' class=" "> -->
                
                <!-- <a-tab v-bind:title="anakategorilist.stokturad" class="">
                  
                  <div v-for="(anakategorichildlist,index) in anakategorilist.children" :key="index" class="row col-6" >
                    <div class="">
                    <ul class= "ullistchild " >
                      <li class="listchild">{{anakategorichildlist.stokturad}}</li>
                    </ul>  
                    </div>
                    
                  </div>
                  <q-img
                      src="https://placeimg.com/500/300/nature"
                      style="max-width: 200px; height: 100px;"
                    >
                  </q-img>
                  </a-tab> -->
              <!-- </div> -->
              
            </a-tabs>
            
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
import Vue  from 'vue'
import {debounce} from 'quasar'
import {mapState} from 'vuex'
import {mapGetters } from 'vuex'
import router from "../router"
import menuTab from '../components/menu/tab.vue'
import menuTabs from '../components/menu/tabs.vue'
import aTab from '../components/menu/atab.vue'
import aTabs from '../components/menu/atabs.vue'
export default {
  name: 'MainLayout',

  components: {
    aTab,
    aTabs,
    menuTab,
    menuTabs,

  },

  data () {
    return {
      menu: false,
      menuOver: false,
      listOver: false,
      menuOver1: false,
      menuOver2: false,
      // splitterModel: 20,
      slide: 1,
      search: null,
      main_tab:"",
      // anakategorilists:[], 
      innerTab: 'gecelik',
      // splitterModel: 10,
      treemmenu:[]
      //menu child

      // selected: { default: false},
      //  isActive: false
    }
  },
//   watch: {
    
// },
  // computed: {
  //   ...mapState([
  //     'stokListData.anakategori'
  //   ])
  // },
  async beforeCreate(){
      await this.$store.dispatch('anakategori')
    // this.anakategorilists=this.$store.state.stok.anakategorilist
    
  },
 async mounted(){
  //  this.anakategorilists=this.$store.state.stok.anakategorilist
   
  //  this.isActive = this.selected;
    //  await this.$store.dispatch('anakategori')
      //  console.log(this.anakategorilists);
      //  this.anakategorilists=this.$store.state.stok.anakategorilist
    //  console.log(this.anakategorilists);
        // if(this.anakategorilists){
          // this.parseTree(this.anakategorilists)
        // }
    //  this.debouncemenulist(this.anakategorilists)
   
    //  console.log(this.$store.state.stok.anakategorilist);
      // console.log(this.treemmenu);
  }, 
  computed: {
    
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'anakategorilists',
      
    ]),
    // anakategorilists(){
    //   return this.$store.state.stok.anakategorilist
    // }
  
    // anakategorilists: {
    //   get () {
    //     return this.$store.state.stok.anakategorilist
    //   },
      
    
    //  } 
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
      // debouncemenulist: debounce(function(val){
      //   this.parseTree(val)
      // },1000),
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
    link(a,b){
      this.menu=false
        this.$router.push({ name: 'stoklist', params: { parentname: a, parentid : b }})
      //  this.$router.push({ path: '/', query:   a })
      // this.$router.push({ path: `${a}` })
      console.log(a,b);
        
    },
     parseTree(selfQ, parentID=null){
      //  console.log(selfQ);
          let treemmenu = [];

          selfQ.forEach((value, index) => {

            if(value.parentid === parentID){
              // console.log(value);
              const children = this.parseTree(selfQ, value._id);

              if (children.length > 0) {
                // value.children = children;

                Vue.set(value, 'children', children);

              }else{
                Vue.set(value,'children',[])
              }

              treemmenu.push(value);

            }
          });

          this.treemmenu=treemmenu;
          // console.log(this.treemmenu);
            return this.treemmenu




        },
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
    anakategorilists(val) {
      this.parseTree(val)
      
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
  // top:0;
  // left: 0;
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
// menu tab 
// ul, li{ list-style: none; padding:0; margin:0; }
      
      .ullistchild{
        margin-top:0px; 
        margin-left:0px; 
        padding-left:20px;
        
        } 
    //  ul.ullistchild:hover{
    //     font-weight: bold;
        
    //     } 
    .listchild:hover{
      font-weight: bold;
      }
      .listchild:first-child{
        padding-top:0px;
        }
     .listchild{
      list-style: none;
      background :none !important;
      padding-top:10px;
      padding-left:0px;
      
      }
     
    
      
// li{border-right: 2px solid rgb(240,240,240) ;}
// nav { position: relative;}
// li{ width: 20%; height: 40px; padding-left:15px; padding-top:10px;}
// li:hover { cursor:pointer; text-decoration: underline; background-color:rgb(240,240,240) ;}
// li:hover section{ display: block; }
// section{ display: block ; width: 80%; height:100%; position: absolute; right:1.5%; top:-9999px; text-align: center;   margin-left:-9999px}
// li[data-role="thumb-1"], section[data-role="content-1"] { z-index:1; top:0.1%}


// li[data-role="thumb-2"]:hover section[data-role="content-2"]{ top:0.01% }
// li[data-role="thumb-3"]:hover section[data-role="content-3"]{ top:0.01% }
// li[data-role="thumb-4"]:hover section[data-role="content-4"]{ top:0.01% }

  // nav {  position: relative}
  // li{ border-right: 5px solid rgb(240,240,240) ; width: 20%; height: 40px; padding-left:15px; padding-top:10px;}
  // li:hover { cursor:pointer; background:rgb(240,240,240); text-decoration: underline; }
  // li:hover section{ display: block;}  
  // section{ display: none; width: 80%; height:100%; position: absolute; right:1%; top:-9999px; text-align: center; 

  // // background: rgb(255,255,255); z-index: 10; margin-left:-9999px}
  //  z-index: 1; margin-left:-9999px}
  // li[data-role="thumb-1"], section[data-role="content-1"] { z-index=1; top:2% }
  
  // li[data-role="thumb-2"]:hover section[data-role="content-2"]{ top:2% }
  // li[data-role="thumb-3"]:hover section[data-role="content-3"]{ top:2% }
  // li[data-role="thumb-4"]:hover section[data-role="content-4"]{ top:2% }
  // li{  width: 100%;   }
  
</style>