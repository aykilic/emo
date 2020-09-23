<template>
  <q-layout view="lHh Lpr lFf" :key="layoutkey">
    <q-header reveal :reveal-offset="20">
      <q-toolbar class="q-pb-lg text-amber-1 bg-white text-grey-9 text-weight-bold justify-center">
        <div class="row q-pt-lg col-md-8 col-sm-10 col-xs-12 grid desktop-had">
          <div class="col-md-4 col-sm-6 one">
            <router-link to="/">
              <q-img src="statics/Emose_Logo.jpg" style=" max-width: 140px" />
            </router-link>
          </div>
          <div class="col-md-4 col-sm-12 col-xs-12 two self-center justify-center">
            <div v-if="anakategorilists.length==0"></div>
            <search v-else :list="anakategorilists" />
          </div>
          <!-- ---------------------------------------------------------desktop başlık -->
          <div class="row col-md-4 col-sm-12 col-xs-12 self-center justify-end three">
            <div class="title-icons text-center text-caption">
              <q-icon class="icon-heart text-center" style="font-size: 26px;" />
              <q-item-label>Favorilerim</q-item-label>
            </div>
            <div class="q-ml-lg title-icons text-center text-caption" @click="sepet()">
              <q-icon class="icon-cart" style="font-size: 26px;">
                <q-badge class="cartbadge" align="top" floating transparent>{{sepet_count}}</q-badge>
              </q-icon>
              <q-item-label>Sepetim</q-item-label>
            </div>
            <div
              v-if="this.get_uid =='' "
              class="q-ml-lg title-icons text-center text-caption"
              @click="login()"
            >
              <q-icon class="icon-person text-center" style="font-size: 26px;" />
              <q-item-label>login</q-item-label>
            </div>
            <div
              ref="hesap"
              v-else
              class="q-ml-lg title-icons text-center text-caption"
              @mouseover="hesapOver = true"
              @mouseout="hesapOver = false"
            >
              <q-icon class="icon-person text-center" style="font-size: 26px;" />
              <q-item-label>Hesabım</q-item-label>
              <!-- :class="hesap ? 'icon-personn' : 'icon-person' " -->
              <q-menu
                @mouseover="hesaplistOver = true"
                @mouseout="hesaplistOver = false"
                :offset="[15, 10]"
              >
                <!-- <q-menu v-if="hesap" @hesapOver= "hesaplistOver = true" @mouseout= "hesaplistOver = false" :offset="[15, 15]"> -->

                <q-list v-if="hesap" style="min-width: 100px;">
                  <q-item v-if="user.role=='superuser'" @click="admin()" clickable q-close-popup>
                    <q-item-section>Admin</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable q-close-popup>
                    <q-item-section>Hesap Ayarları</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable q-close-popup>
                    <q-item-section @click.prevent="logout()">Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <!-- </q-menu> -->
            </div>
          </div>
          <!-- --------------------------------------------------------- mobil başlık -->
        </div>
        <!-- ----------------------------------------------------------- -->

        <div class="row q-pt-lg col-12 mobil-had">
          <div class="row col-12 ">
            <div class="col-4">
              <q-btn flat @click="drawer = !drawer" round dense icon="menu" size="md" />
            </div>
            <div class="col-3 text-center" style="margin-top:-5px;">
              <router-link to="/">
                <q-img src="statics/Emose_Logo.jpg" style=" max-width: 100px;" />
              </router-link>
            </div>

            <div class="row col-5 justify-end">
              <!-- <div class="q-pr-md title-icons text-center  text-caption"><q-icon class="icon-heart text-center"    style="font-size: 26px;"/><q-item-label >Favoriler</q-item-label ></div> -->
              <div class="title-icons text-center text-caption" @click="sepet()">
                <q-icon class="icon-cart" style="font-size: 26px;">
                  <q-badge class="cartbadge" align="top" floating transparent>{{sepet_count}}</q-badge>
                </q-icon>
                <q-item-label>Sepetim</q-item-label>
              </div>
              <div
                v-if="this.get_uid == '' || this.get_uid == null || this.get_uid == 'undefined' "
                class="q-pl-md title-icons text-center text-caption"
                @click="login()"
              >
                <q-icon class="icon-person text-center" style="font-size: 26px;" />
                <q-item-label>login</q-item-label>
              </div>
              <div
                v-else
                class="q-pl-md title-icons text-center text-caption"
                @mouseover="hesapOver = true"
                @mouseout="hesapOver = false"
              >
                <q-icon class="icon-person text-center" style="font-size: 26px;" />
                <q-item-label>Hesabım</q-item-label>
                <!-- :class="hesap ? 'icon-personn' : 'icon-person' " -->
                <q-menu
                  @mouseover="hesaplistOver = true"
                  @mouseout="hesaplistOver = false"
                  :offset="[10, 10]"
                >
                  <!-- <q-menu v-if="hesap" @hesapOver= "hesaplistOver = true" @mouseout= "hesaplistOver = false" :offset="[15, 15]"> -->

                  <q-list v-if="hesap" style="min-width: 100px;">
                    <q-item v-if="user.role=='superuser'" @click="admin()" clickable q-close-popup>
                      <q-item-section>Admin</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable q-close-popup>
                      <q-item-section>Hesap Ayarları</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable q-close-popup>
                      <q-item-section @click.prevent="logout()">Logout</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
                <!-- </q-menu> -->
              </div>
            </div>
          </div>
          <div class="q-pt-md q-pb-md col-xs-12 self-center justify-center">
            <div v-if="anakategorilists.length==0"></div>
            <search v-else :list="anakategorilists" />
          </div>
          <!-- ---------------------------------------------------------desktop başlık -->

          <!-- --------------------------------------------------------- mobil başlık -->
        </div>

        <!-- ----------------------------------------------------------- -->
      </q-toolbar>
      <!-- <div class="container"> -->
        <!-- <svg viewBox="0 5 500 40" preserveAspectRatio="xMinYMin meet">
          <path
            d="M-0,15 C190,70 220,-25 500,35  L500,00 L0,0 Z"
            style="stroke: none; fill:white;"
          />
        </svg> -->
      <!-- </div> -->
      <!-- TODO: -->
    </q-header>
    <!-- <mobil-menu :drawer="drawer" :nodes="treemmenu"></mobil-menu> -->
    <q-drawer v-model="drawer" :width="350">
      <q-scroll-area style="height: 100% ;  border-right: 1px solid #ddd;">
        <q-item class="bg-pink-5">
          <q-item-section class="row text-center text-white">
            Menu
            <!-- <q-space /> -->
          </q-item-section>
          <q-btn class="text-white col-1" icon="close" flat dense @click="drawer=false" />
        </q-item>
        <mobil-menu :nodes="treemmenu" :depth="0"></mobil-menu>
        <!-- </q-list> -->
        <!-- <q-separator dark /> -->
      </q-scroll-area>
    </q-drawer>
    <!-- <q-drawer
        v-model="drawer"
        :width="200"
      >
        <q-scroll-area  style="height: 100% ;  border-right: 1px solid #ddd;">
          <q-list  v-for="(list ,index) in treemmenu" :key="index" >
            <q-item  clickable v-ripple>
              
              <q-item-section class="row col-12" @click="drawer1 = !drawer1">
                <q-item-label class="col-6 text-weight-bold">{{list.stokturad}}</q-item-label> 
                <q-item-label class="col-6 text-weight-bold text-right "><q-icon name="mdi-arrow-right-circle"></q-icon> </q-item-label> 
              </q-item-section>
            
            
            </q-item>
          </q-list>
        </q-scroll-area>

        
    </q-drawer>-->

    <q-page-container class="row flex-center">
      <!-- <div  class="q-pt-xl col-md-8 col-sm-10 col-xs-12"> -->

      <!-- </div> -->

      <!-- <div class=" col-md-8 col-sm-10 col-xs-12 desktop-hada " >
      
        <keep-alive>
          <router-view ></router-view>
        </keep-alive>
      
      </div>-->
      <div class="col-md-8 col-sm-10 col-xs-12">
        <!-- <transition name="fade"> -->
        <keep-alive>
          <!-- <load v-if="$root.loading"></load> -->
          <router-view class="anamargin"></router-view>
        </keep-alive>
        <!-- </transition> -->
      </div>
      <!-- ------------------------------------------------------------------------------------------- -->
      <q-page-sticky expand position="top" style="z-index:1" class="">
        <!-- <div> -->
        <!-- TODO:desktop tabs -->
        <!-- <q-header class="mobil-tab" elevated>      -->
        <!-- <q-toolbar class="bg-pink-12 text-white mobil-tab" style="margin-top:-14px;">
              
        </q-toolbar>-->
        <!-- </q-header>  -->

        <!-- <mobil-menu class="mobil-tab">  </mobil-menu> -->

        <q-tabs
          v-model="main_tab"
          indicator-color="transparent"
          
          align="center"
          reveal
          class=" col-12 bg-pink-12 text-white desktop-tab"
          style="margin-top:-1px;"
          
        >
        <div class="row">
        <!-- <div class="row justify-between col-8">  panel full tabs--> 
          <q-tab
          class="q-mr-md text-weight-medium"
          style="font-size:15px"
            name="a"
            @click="menu = !menu"
            @mouseover="menuOver = true"
            @mouseout="menuOver = false"
            
            label=""
          >LOHUSA & HAMİLE ÜRÜNLERİ
          </q-tab>
          <q-tab
          class="q-mr-md text-weight-medium"
          style="font-size:15px"
            name="b"
            @click="menu = !menu"
            @mouseover="menuOver1 = true"
            @mouseout="menuOver1 = false"
            label=""
          >
            GÜNLÜK KULLANIM
          </q-tab>
          <q-tab
          class="text-weight-medium"
            name="c"
            style="font-size:15px"
            @click="menu = !menu"
            @mouseover="menuOver2 = true"
            @mouseout="menuOver2 = false"
            label=""
          >
          EN ÇOK SATAN ÜRÜNLER
          </q-tab>
          </div>
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
          class="row col-md-8 col-sm-10 col-xs-12 shadow-10"
          @mouseover="listOver = true"
          @mouseout="listOver = false"
        >
          <q-tab-panel class name="a" style="padding-left:0; ">
            <a-tabs class="text-center" style @menu="menuOver=$event, listOver=$event">
              <a-tab
                v-for="(anakategorilist,index) in treemmenu"
                :key="index"
                :title="(anakategorilist.stokturad)"
                :titleid="(anakategorilist._id)"
                class="row col-12"
              >
                <div class="col-md-3 col-xs-6 q-pl-md">
                  <ul
                    class="ullistchild"
                    v-for="(altkategorilist,iindex) in anakategorilist.children"
                    :key="iindex"
                  >
                    <li
                      class="listchild"
                      @click="link(altkategorilist.stokturad,altkategorilist._id),menuOver=false,listOver=false"
                    >
                      <!-- {{altkategorilist.stokturad}} -->
                      {{ altkategorilist.stokturad.split('-').join(' ') }}
                      <!-- {{ altkategorilist.stokturad.split('-').reverse().join(' ') }} -->
                      <!-- {{ altkategorilist.stokturad.split('-').join(' ') }} -->
                    </li>
                  </ul>
                </div>
                <div class="col-md-3 col-xs-6 q-pl-md">
                  <ul class="ullistchild">
                    <li class="listchild">Aksesuar</li>
                  </ul>
                </div>
                <div class="col-md-6 header_resim">
                  <q-intersection once transition="fade" class>
                    <div class="row items-start q-col-gutter-x-md">
                      <q-card flat class="my-card col-6">
                        <q-img src="../statics/emose2_h200.jpg" style=" height: 400px;"></q-img>
                      </q-card>
                      <q-card flat class="my-card col-6">
                        <q-img flat src="../statics/emose1_h200.jpg" style=" height: 400px;"></q-img>
                      </q-card>
                    </div>
                  </q-intersection>
                </div>
              </a-tab>
            </a-tabs>
          </q-tab-panel>

          <q-tab-panel name="b">
            <div class="text-h6">Günlük Kullanım</div>Yapım Aşamasında
          </q-tab-panel>

          <q-tab-panel name="c">
            <div class="text-h6">En çok Satan ürünler</div>Yapım Aşamasında
          </q-tab-panel>
        </q-tab-panels>
      </q-page-sticky>
    </q-page-container>

    <div class="footer">
      <hr>
      <div class="row  q-pa-none q-pa-md q-col-gutter-md">
        <!-- <q-item-section  class="row col-12 q-pa-none text-center"> -->
        <!-- <div class="row bg-pink-5 text-white q-pa-none"> -->
          
            <div class="q-pt-xl col-xs-12 col-md-4 col-lg-4  text-center q-col-gutter-md">
              <div class="text-weight-bold">www.emosetekstil.com</div>
              <!-- <div class="link cursor-pointer">Hakkımızda</div> -->
              <!-- <ul class="row justify-center">
                <li class="justify-center"> -->
                  
                  <q-item-label class="">
                  <!-- <q-icon name="mdi-credit-card-outline" size="xs"/>  -->
                  Taksit Seçenekleri
                  
                </q-item-label>
                  
                  <q-item-label class="">
                  <!-- <q-icon name="mdi-" size="xs"/>  -->
                  Kapıda Ödeme
                  
                </q-item-label>
                  <q-item-label class="">
                  <!-- <q-icon name="mdi-chan" size="xs"/>  -->
                  Havale ile Ödeme
                  
                </q-item-label>
                <q-item-label class="">
                  
                  7/24 Güvenli Alışveriş
                  
                </q-item-label>
                <q-icon name="mdi-shield-check" size="md"/> 
                <!-- </li>
              </ul> -->
              
            </div>
            
            
            <div class="q-pt-xl q-pl-md col-xs-12 col-md-4 col-lg-4  text-center q-col-gutter-md">
              <div class="text-weight-bold">Destek Merkezi</div>
              
                
              <!-- <div class="link cursor-pointer" to="/destekMerkezi" exact>Gizlilik ve Güvenlik</div> -->
              <router-link class="link cursor-pointer" to="/destekMerkezi" tag="div">Gizlilik ve Güvenlik</router-link>
              <router-link class="link cursor-pointer" to="/destekMerkezi" tag="div">Mesafeli Satış Sözleşmesi</router-link>
              <router-link class="link cursor-pointer" to="/destekMerkezi" tag="div">İade İşlemleri</router-link>
              <router-link class="link cursor-pointer" to="/destekMerkezi" tag="div">K.V.K.K</router-link>
              <router-link class="link cursor-pointer" to="/destekMerkezi" tag="div">Sık Sorulan Sorular</router-link>
              <!-- <div class="link cursor-pointer">Mesafeli Satış Sözleşmesi</div>
              <div class="link cursor-pointer">İade İşlemleri</div>
              <div class="link cursor-pointer">Sık Sorulan Sorular</div>
              <div class="link cursor-pointer">K.V.K.K</div> -->
              

            </div>
            <div class="q-pt-xl col-xs-12 col-md-4 col-lg-4 text-center q-col-gutter-md">
              <div class=" text-weight-bold">İletişim</div>
              
              <div class="q-mt-xs q-col-gutter-md">
                
                  <a href="" style="text-decoration:none;">
                    <q-icon class="cursor-pointer icon-link" name="mdi-facebook" size="xl"  style="color:#385898" />
                    
                    </a>
                  <!-- <q-icon class="cursor-pointer" name="mdi-facebook" size="md"  style="color:#385898" href="http://www.emosetekstil.com.tr"></q-icon> -->
                
                  
                <!-- <q-icon name="mdi-twitter" size="md" style="color:#1DA1F2;"/> -->
                <a class="cursor-pointer link" onclick="window.open('https://www.instagram.com/emosepijama/', '_blank')" style="text-decoration:none;">
                <!-- <q-icon name="mdi-instagram" size="xl" style="color:#E1306C;"/> -->
                <q-img
          
                      src="statics/instagram.png"
                      
                      style=" max-width: 40px;"
                  />
                </a>
                
              </div>
              <div class="text-h5">
                
              </div>
              <q-item-section class="">
                
                <q-item-label class="text-h6">
                  <q-icon name="mdi-phone-outline" size="md"/> 
                  0532 637 64 75
                  
                </q-item-label>
                <q-item-label class="text-h6">
                  <q-icon name="mdi-email-outline" size="md"/> 
                  info@emosetekstil.com.tr
                  
                </q-item-label>
                
              </q-item-section>
              <div>
                <q-img
          
                  src="statics/3DSecure.gif"
                  spinner-color="white"
                  style=" max-width: 190px;"
                  />
                
              </div>
            </div>
          
          
        <!-- </q-item-section> -->
      </div>
      
      <!-- <q-item class="row col-12 q-pt-xl q-pb-lg text-center " >
        <q-item-section class="row  justify-center  "  >
          <div class="text-center ">
            &nbsp;
          <q-img
          
          src="statics/comodo.png"
          spinner-color="white"
          style=" max-width: 150px;"
          />
          <q-img
          
          src="statics/mastercard_securecode.png"
          spinner-color="white"
          style=" max-width: 150px;"
          />
          <q-img
          src="statics/pci_dss.png"
          spinner-color="white"
          style=" max-width: 150px;"
          />
          <q-img
          src="statics/verified_by_visa.png"
          spinner-color="white"
          style=" max-width: 150px;"
          />
        </div>
        </q-item-section>
        
      </q-item>  -->
      
      <q-item class=" q-pb-md text-center text-weight-bold">
        <q-item-section>
          <!-- <q-item-lable> -->
            Copyright © 2020 Çelik Konfeksiyon San. ve Tic. Ltd. Şti.
          <!-- </q-item-lable> -->
            
        </q-item-section>
      
      </q-item>
      
    </div>
    <!-- <div>&nbsp;</div> -->
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'
import Vue from "vue";
import { scroll } from "quasar";
const { getScrollPosition, setScrollPosition } = scroll;
import { debounce } from "quasar";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import router from "../router";
import menuTab from "../components/menu/tab.vue";
import menuTabs from "../components/menu/tabs.vue";
import mobilMenu from "../components/menu/mobilMenu.vue";
import aTab from "../components/menu/atab.vue";
import aTabs from "../components/menu/atabs.vue";
import load from "../pages/skeleton/deneme.vue";
import axios from "axios";
import gql from "graphql-tag";
import search from "../components/search";
// import { Notify } from 'quasar'
import { Cookies } from "quasar";
export default {
  name: "MainLayout",

  components: {
    aTab,
    aTabs,
    menuTab,
    menuTabs,
    load,
    mobilMenu,
    search,
  },

  data() {
    return {
      drawer: false,
      // --------
      menu: false,

      menuOver: false,
      listOver: false,
      menuOver1: false,
      menuOver2: false,
      // --------
      hesap: false,
      hesapOver: false,
      hesaplistOver: false,
      // --------
      // splitterModel: 20,
      slide: 1,
      search: null,
      main_tab: "",
      // anakategorilists:[],
      innerTab: "gecelik",
      // splitterModel: 10,
      treemmenu: [],
      basketlist: [],
      ubasketlist: [],

      sepet_count: "",
      user: {},
      layoutkey: 0,
      // getScrollPosition:""
      // selected: { default: false},
      //  isActive: false
    };
  },
  // created() {
  //   this.handleDebouncedScroll = debounce(this.handleScroll, 100);
  //   window.addEventListener('scroll', this.handleDebouncedScroll);
  // },
  watch: {
    // drawer(v){
    //   v==false ? this.dra=v : ""
    // },
    menu(val) {
      // console.log(val);
    },
    menuOver(val) {
      this.main_tab = "a";
      this.debounceFunc();
    },
    listOver(val) {
      this.debounceFunc();
    },
    menuOver1(val) {
      this.main_tab = "b";
      this.debounceFunc1();
    },
    menuOver2(val) {
      this.main_tab = "c";
      this.debounceFunc2();
    },

    hesapOver(val) {
      this.debounceFunc3();
    },
    hesaplistOver(val) {
      this.debounceFunc3();
    },
    anakategorilists(val) {
      this.parseTree(val);
      // console.log(this.treemmenu);
    },
    get_basketlist(val) {
      this.sepet_count = val.length;
      // console.log("watch:get_basketlist",val);
    },
    get_ubasketlist(val) {
      // console.log("main-val",val);
      if (val != null) {
        this.sepet_count = val.length;
      }
      // console.log("watch:get_ubasketlist",val);
    },
    get_user(val) {
      // console.log("get_user",val);
      this.user = val;
      // this.$store.dispatch('search_getuser',Cookies.get('uid'))
      this.layoutkey++;
    },
  },
  updated() {},

  computed: {
    // get_basketlist(){
    //   console.log("sdsdsdsdsdsd");
    // },
    ...mapGetters([
      "anakategorilists",
      "anakategorizelists",
      "get_guid",
      "get_basketlist",
      "get_ubasketlist",
      "get_uid",
      "get_user",
    ]),
    // sepet_count () {
    //   if(Cookies.get("uid") != null || Cookies.get("uid") != "" || Cookies.get("uid") != undefined){
    //     return this.get_ubasketlist.length
    //   }else{
    //      return this.get_basketlist.length
    //   }
    //  return Cookies.get("uid")
    // if(Cookies.get("uid") != null){
    //   return this.get_basketlist.length
    // }else{
    //  return this.get_ubasketlist.length
    // }

    // }
  },

  async mounted() {
    //  console.log("mounted");
    this.$store.dispatch("anafunction");
    // await this.$store.dispatch('search_getuser')
    //  console.log("uid",this.get_guid);
    // let guid =Cookies.get('guid');
    //  console.log(Cookies.get('guid'));
    //  console.log("uid",this.get_uid);
    //  console.log("guid",this.get_guid);
    this.userid_function();
    // console.log("path", this.$route.path);
    // console.log(this.anaktegorilists);
    // this.parseTree(this.anakategorilists)
    // console.log(this.get_ubasketlist);
    //  console.log(this.get_basketlist);
    //  await console.log("get_basketlist",this.get_basketlist);
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
  // computed: {

  //   // mix the getters into computed with object spread operator
  //   ...mapGetters([
  //     'anakategorilists',

  //   ]),
  // anakategorilists(){
  //   return this.$store.state.stok.anakategorilist
  // }

  // anakategorilists: {
  //   get () {
  //     return this.$store.state.stok.anakategorilist
  //   },

  //  }
  // },
  methods: {
    activeAlert(text) {
      alert(text);
    },

    async userid_function() {
      //  console.log(Cookies.get('uid'));
      if (Cookies.get("uid") == null) {
        if (Cookies.get("guid") == null) {
          //  console.log("guid cookie yoksa");
          await this.$apollo
            .mutate({
              mutation: gql`
                mutation createguid_mutation {
                  createguid_mutation {
                    _id
                  }
                }
              `,
            })
            .then((data) => {
              // Cookies.set('guid', data.data.createguid_mutation._id, { expires: 30, path: '' });
              this.$store.dispatch(
                "add_guid",
                data.data.createguid_mutation._id
              );
            });

          // console.log("m1");
          // this.$store.dispatch('add_guid')

          // cookies guid yoksa
        } else {
          // console.log("cookies guid varsa");

          this.$store.dispatch("add_guid", Cookies.get("guid"));
          // this.$store.dispatch('search_basketlist',Cookies.get('guid'))
          this.$store.dispatch("search_basketlist", Cookies.get("guid"));
        }
      } else {
        //  console.log("m,burda");

        this.$store.dispatch("add_uid", Cookies.get("uid"));
        this.$store.dispatch("search_ubasketlist", Cookies.get("uid"));
        this.$store.dispatch("search_getuser", Cookies.get("uid"));
        // this.$router.go(-1)
        // this.$store.dispatch('set_login',this.get_guid)
        // Cookies.remove('guid')
        // this.$store.dispatch('add_uid')
      }
      // console.log(Cookies.get('uid'));
      //     if(Cookies.get('uid')){
      //       // setTimeout(() => {
      //     console.log("uid varrr");
      //     // this.$refs.hesap.click()
      // // }, 2000);
      //       this.$store.dispatch('search_ubasketlist',Cookies.get('uid'))
      //     }else{
      //       this.$store.dispatch('search_basketlist',Cookies.get('guid'))
      //     }
      // his.$refs.navbarToggle.$el.click()

      // console.log(this.get_ubasketlist);
    },
    login() {
      this.$router.push({ path: "/login" });
    },
    async logout() {
      this.layoutkey++;
      this.$router.push({ name: "Home" });
      await this.$store.dispatch("logout", this.$route.path);
      // console.log("logout");
      this.$router.push({ name: "Home" });
      // await Cookies.remove('uid',{ path: '/' });
      // await Cookies.remove('token',{ path: '/' });
      this.userid_function();
      // this.$router.push({ path: '/' })
      // location.reload()

      // window.location.href = "http://siwei.me"
    },
    debounceFunc: debounce(function () {
      this.checkMenu();
    }, 1),
    debounceFunc1: debounce(function () {
      this.checkMenu1();
    }, 1),
    debounceFunc2: debounce(function () {
      this.checkMenu2();
    }, 1),
    // debouncemenulist: debounce(function(val){
    //   this.parseTree(val)
    // },1000),
    debounceFunc3: debounce(function () {
      this.checkhesap();
    }, 100),
    checkhesap() {
      if (this.hesapOver || this.hesaplistOver) {
        // this.$refs.hesap.click()
        this.hesap = true;
        // console.log("hesapOver",this.hesapOver);
        // console.log("hesaplistOver",this.hesaplistOver);
        // console.log("hesap",this.hesap);
      } else {
        // this.$refs.hesap.click()
        this.hesap = false;
        //   console.log("hesapOver",this.hesapOver);
        //   console.log("hesaplistOver",this.hesaplistOver);
        //   console.log("hesap",this.hesap);
      }
    },

    checkMenu() {
      if (this.menuOver || this.listOver) {
        this.menu = true;
      } else {
        this.menu = false;
      }
    },
    checkMenu1() {
      if (this.menuOver1) {
        this.menu = true;
      } else {
        this.menu = false;
      }
    },
    checkMenu2() {
      if (this.menuOver2) {
        this.menu = true;
      } else {
        this.menu = false;
      }
    },
    link(a, b) {
      this.menu = false;
      this.$router.push({
        name: "stoklist",
        params: { parentname: a, parentid: b },
      });
      //  this.$router.push({ path: '/', query:   a })
      // this.$router.push({ path: `${a}` })
      // console.log(a,b);
    },
    parseTree(selfQ, parentID = null) {
      //  console.log(selfQ);

      let treemmenu = [];

      selfQ.forEach((value, index) => {
        if (value.parentid === parentID) {
          // console.log(value);
          const children = this.parseTree(selfQ, value._id);

          if (children.length > 0) {
            // value.children = children;

            Vue.set(value, "children", children);
          } else {
            Vue.set(value, "children", []);
          }

          treemmenu.push(value);
        }
      });

      this.treemmenu = treemmenu;
      // console.log(this.treemmenu);
      return this.treemmenu;
    },
    sepet() {
      this.$router.push({ path: "/sell" });
    },
    admin() {
      this.$router.push({ path: "/admin" });
    },
  },
};
</script>
<style lang="stylus" scope>
/* @import '../../node_modules/@quasar/extras/mdi-v4/mdi-v4.css'; */
.q-layout__section--marginal {
  background-color: #ff4081;
}

.title-icons {
  cursor: pointer;
}

.title-icons .icon-person::before {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 26px;
  position: absolute;
  content: '\F013';
}

.title-icons:hover .icon-person::after {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  color: #ff4081;
  font-size: 26px;
  content: '\F004';
  animation: toColor 0.5s;
}

.icon-personn {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  color: #ff4081;
  font-size: 26px;
  content: '\F013';
  // animation: toColor 0.5s;
}

.title-icons .icon-heart::before {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 26px;
  position: absolute;
  content: '\F2D5';
}

.title-icons:hover .icon-heart::after {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  color: #ff4081;
  font-size: 26px;
  content: '\F2D1';
  animation: toColor 0.5s;
}

.title-icons .icon-cart::before {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 26px;
  position: absolute;
  content: '\F111';
}

.title-icons:hover .icon-cart::before, .title-icons:hover .icon-heart::before, .title-icons:hover .icon-person::before {
  content: '';
}

.title-icons:hover .icon-cart::after {
  font-family: 'Material Design Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 26px;
  color: #ff4081;
  content: '\F110';
  animation: toColor 0.5s;
}

.title-icons:hover .cartbadge {
  animation: toColor 0.5s;
}

@keyframes toColor {
  0% {
    -webkit-filter: opacity(20%);
    filter: opacity(30%);
  }

  25% {
    -webkit-filter: opacity(25%);
    filter: opacity(40%);
  }

  50% {
    -webkit-filter: opacity(50%);
    filter: opacity(50%);
  }

  75% {
    -webkit-filter: opacity(75%);
    filter: opacity(75%);
  }

  100% {
    -webkit-filter: opacity(100%);
    filter: opacity(100%);
  }
}

@media only screen and (max-width: 1023px) {
  // .anamargin{
  // margin-top:175px;
  // }
  .header_resim {
    display: none;
  }

  .grid {
    display: grid;
  }

  .one {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .two {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    margin-top: 15px;
  }

  .three {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}

@media only screen and (max-width: 655px) {
  .desktop-tab {
    display: none;
  }

  .container {
    display: none;
  }

  svg {
    // display: none;
  }

  .hed {
    height: 160px;
  }

  .desktop-had {
    display: none;
  }
}

@media only screen and (min-width: 656px) {
  .anamargin {
    margin-top: 40px;
  }

  .mobil-tab {
    display: none;
  }

  .mobil-had {
    display: none;
  }

  // .container {
    // padding-top:100px;
    // display: inline-block;
    // position: relative;
    // width: 100%;
    // padding-bottom: 8%;
    // vertical-align: middle;
    // overflow: hidden;
  // }

  svg {
    display: inline-block;
    position: absolute;
    // top:0;
    // left: 0;
  }
}

.cartbadge {
  background-color: #ff4081;
}

.q-badge--floating {
  top: -10px !important;
  right: -15px !important;
}

/* .q-tab:hover .q-tab__indicator{
  background-color:  var(--indicator-color) !important;
  color:  var(--indicator-color) !important;
  opacity:1 !important;
  
} */
.q-tab:hover .q-tab__indicator {
  background-color: white !important;
  /* color:  white !important; */
  opacity: 1 !important;
  /* height: 2px !important; */
}

a.menu_link:link {
  color: #1d1d1d;
  text-decoration: none;
}

a.menu_link:visited {
  color: #1d1d1d;
  text-decoration: none;
}

a.menu_link:hover {
  color: #1d1d1d;
  text-decoration: underline;
}

a.menu_link:active {
  color: #1d1d1d;
  text-decoration: underline;
}

a.menu_link+div {
  display: none;
}

a.menu_link:hover + div {
  display: block;
}

.main_search .q-field__control {
  color: #ff4081;
}

/* a.menu_link:first-child:hover{
  display:block;
} */
.ullistchild {
  margin-top: 0px;
  margin-left: 0px;
  padding-left: 20px;
}

// ul.ullistchild:hover{
// font-weight: bold;

// }
.listchild:hover {
  font-weight: bold;
}

.listchild:first-child {
  padding-top: 0px;
}

.listchild {
  list-style: none;
  background: none !important;
  padding-top: 10px;
  padding-left: 0px;
}

.footer {
  // // min-height: fit-content;
  position: relative;
  width: 100%;
}
.link {
  // color: #1d1d1d;
  text-decoration: none;
}
.icon-link {
  // color: #1d1d1d;
  text-decoration: none;
}
// .link:link {
//   // color: #1d1d1d;
//   text-decoration: none;
// }

// .link:visited {
//   // color: #1d1d1d;
//   text-decoration: none;
// }

.link:hover {
  // color: #1d1d1d;
  text-decoration: underline;
}
.icon-link:hover {
  // color: #1d1d1d;
  // text-decoration: underline;
}

// .link:active {
//   // color: #1d1d1d;
//   text-decoration: underline;
// }
</style>