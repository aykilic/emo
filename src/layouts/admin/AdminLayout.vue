<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary" elevated>
      <q-toolbar >
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          dense
          flat
          round
        >
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>

        </q-toolbar-title>
        <!-- <q-btn :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
               @click="$q.fullscreen.toggle()"
               flat>
          <q-icon></q-icon>
        </q-btn> -->
        <q-btn round>
          <q-avatar size="42px">
            <img src="../../statics/Emose_Logo.jpg">
          </q-avatar>
          <q-menu :offset="[0, 5]">
            <q-list style="min-width: 100px;">
              <q-item clickable q-close-popup>
                <q-item-section
                  @click="logout()"
                >Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      content-class="bg-black-1"
      v-model="leftDrawerOpen"
    >
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title
          class=“absolute-center”
        >
          <span>Pa<b>N</b>EL</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-list>
        <q-img  style="height: 150px;color: black">
          <div class="absolute-center bg-transparent">

            <div class="text-center">
              <q-avatar class="q-mb-sm  " size="60px">
                <img src="../../statics/Emose_Logo.jpg">
              </q-avatar>
            </div>
            <div class=" text-weight-bold text-center bg-transparent"></div>
            <div class=" bg-transparent"></div>
          </div>
        </q-img>
        <q-item-label header>Ana Menü</q-item-label>
        <q-item  to="/admin" exact>
          <q-item-section  avatar>
            <q-icon  name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Ana Sayfa</q-item-label>
          </q-item-section>
        </q-item>
        
         <q-item  to="/faturalist" exact>
          <q-item-section avatar>
            <q-icon name="mdi-file-multiple-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Fatura Listesi</q-item-label>
          </q-item-section>
        </q-item>
         <q-item  to="/siparislist" exact>
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Sipariş Listesi</q-item-label>
          </q-item-section>
        </q-item>
        
          
          <q-item  to="/stokdevir" exact>
            <q-item-section avatar>
              <q-icon name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label >Stok Fişi</q-item-label>
            </q-item-section>
          </q-item>
                <q-expansion-item
                label="Tanımlamalar"
                icon="build"
                >
                  <q-item to="/admin" exact>
                    <q-item-section avatar>
                      <q-icon name="build" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Birim</q-item-label>
                    </q-item-section>
                  </q-item>
                        <q-item to="/kategori" exact>
                          <q-item-section avatar>
                            <q-icon name="" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Stok Ekle</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item to="/stokekle" exact>
                          <q-item-section avatar>
                            <q-icon name="" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Stok Detay</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item to="/varyantekle" exact>
                          <q-item-section avatar>
                            <q-icon name="" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Varyant Tanımlama</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-expansion-item>
        <q-item  to="/admin" exact>
          <q-item-section avatar>
            <q-icon name="input" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Çıkış</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from "vue";
  import {openURL} from 'quasar'
  import Cookies from 'js-cookie'
//   import store from "../store";
  import router from "../../router"
  import {mapGetters } from 'vuex'
//   import { auth } from '../services/fireinit.js'
  import { AppFullscreen } from 'quasar'

  export default {
    name: 'MyLayout',

    data() {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        loading:0,
        treem:[],
        treemselect:[]
        // userdetay: {
        //   userid:localStorage.getItem('userid'),
        //   username:localStorage.getItem('username'),
        //   usermail:localStorage.getItem('usermail'),
        //   userfirma:localStorage.getItem('userfirma')
        // },
      }
    },
    watch: {
      anakategorilists(val){
        this.fonk(val)
      }
    // treem(val){
    //   let dem = [];
    //   this.treemselected(dem);
    // }
    },
    computed: {
      ...mapGetters([
      'anakategorilists',
      'anakategorizelists',
    ]),
    },
    async mounted () {
      await this.$store.dispatch('anafunction');
      // this.fonk(this.anakategorilists)
      // this.parseTree(this.anakategorilists);
      // let dem = [];
      // this.treemselected(dem);
      // console.log(this.treemselect);
    },
    methods: {
      openURL,
      async fonk(val){
        let dem = [];
        this.parseTree(val)
        
       await this.treemselected(dem)
        // console.log(this.treemselect);
        this.$store.dispatch("urunlist",this.treemselect)
      // console.log(this.treemmenu);
       
       
      // console.log(val);
      },
    //   logout(){

    //     console.log("çıkış yapıldı");
    //      auth.signOut().then(function() {
    //     //   console.log("çıkış yapıldı")
    //        store.dispatch("setAuth", false);
    //        localStorage.setItem('login', false);
    //        Cookies.remove("login");
    //        router.push('/login');
    //      })
    //       .catch(function(error) {
    //         console.log(error)
    //       });

    //   }
    parseTree(selfQ, parentID = null) {
      let treem = [];

      selfQ.forEach((value, index) => {
        if (value.parentid === parentID) {
          // console.log(value);
          const children = this.parseTree(selfQ, value._id);

          if (children.length > 0) {
            // value.children = children;

            Vue.set(value, "children", children);
          }

          treem.push(value);
        }
      });

      this.treem = treem;

      return this.treem;
    },
    treemselected(dem) {
      // let treemm=[];
      if (dem.length < 1) {
        dem = this.treem;
      }

      // console.log(dem)
      dem.forEach((value, index) => {
        // console.log(value.children)
        if (value.children.length > 0 ) {
          // console.log(value.children)
          this.treemselected(value.children);
        } else {
          // Vue.set(value, '', children);
          this.treemselect.push(value);
          // console.log(treemm)
        }
      });

      return this.treemselect;
      // return this.treemselect
    },
    },
    // created() {
        // this.userdetay.userid=localStorage.getItem('userid');
        // this.userdetay.username=localStorage.getItem('username');
        // this.userdetay.usermail=localStorage.getItem('usermail');
        // this.userdetay.userfirma=localStorage.getItem('userfirma');
    //   console.log(this.userdetay.userfirma);

    // }
  }
</script>

<style lang="stylus" >
$primary   = #1976D2
$black ?= black
$black-1 ?= #222D32


.bg-black
  background $black
.bg-black-1
  background $black-1

.q-list a, .q-list .q-expansion-item
  color #b8c7ce !important
.q-list a:hover *
  color white !important
.q-item.q-router-link--active
    > .q-focus-helper
      background-color currentColor
      opacity .07

.q-list .q-expansion-item a
  margin-left 20px

</style>
