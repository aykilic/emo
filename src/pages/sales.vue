
<template >
  <q-page  class="row q-pt-md items-start">
    
    <load v-if="option_2=='' && option_1=='' "></load>
    <q-card v-else class="row col-12">
    <div  style="min-width: 350px;" class="row col-md-6 ">
      <div class="row col-12">
        <product-zoomer  :key="zoomerKey" :images="images"></product-zoomer>
      </div>
    </div>
    <q-separator vertical />
    <q-item v-if="varyantname.length<1">
          <div class="row col-12">
            <div class="col" style="text-transform: unset">Bu Ürün Geçici Bir Süre Stoklarımızda Bulunmamaktadır...</div>
          </div>
        </q-item>
    <div v-else class=" col">
      <div >
        <q-item >
          <!-- <q-item-section class="col-12" align="center"> -->
          <q-item-section class="col-12" >
            <div class="text-h6">{{stokad}}</div>
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item >
          <!-- <q-item-section class="col-12" align="center"> -->
          <div class="row col-12"  >
            <div class="row col-2  items-center justify-center  " >
              <q-badge class="text-h6 text-pink-12 bg-grey-12">
                %{{indirim}} 
              </q-badge>
                   
              
            </div>
            <div class="q-ml-md col" >
              <!-- <div class="text-subtitle2 text-strike text-grey ">89,99 TL</div> -->
              <div class="text-subtitle2 text-strike text-grey "> {{ fiyat }} TL</div>
              <div class="text-h5 text-grey">{{indirimli_fiyat}} TL</div>
            </div>
            
          </div>
        </q-item>

        <q-separator inset />
        <q-item v-if="varyantname.length > 0" class v-for="(value,i) in varyantname" :key="i">
          <div class="row col-12">
            <div class="col-2" style="text-transform: unset"> {{value.varyantname}}:</div>
             <div class="col-10 col-lg-10 "  :id="'varyant'+i"></div>
             
            <div v-if="i==0" v-for="(altvalue, index) in option_1" :key="index">
              <div v-if="altvalue.length > 0">
              </div>
              <div class="">
                <ul class="row" style="list-style-type:none;padding-left:0px;">
                  <li
                    :id="altvalue.varyant_option1.varyant_option1_name "
                    @click.prevent="selectvar1(option_1,index,i,altvalue)"
                    style="border-radius:31px;"
                    :style="{'background-color':altvalue.varyant_option1.color}"
                    :class="(altvalue.toplam < 1  ) ? 'secilmez': [{ active:altvalue.selected },'firstvar'] "
                  ></li>
                </ul>
              </div>
            </div>
            
            <div v-if="i==1" class="col-12" >
              <div class="row">
                <ul
                  v-for="(altvalue, index) in option_2  "
                  :key="index"
                  class
                  style="list-style-type:none;padding-left:0px;"
                >
                  <li
                    
                    class="q-pa-xs"
                    :id="altvalue.varyant_option2.varyant_option2_name "
                    @click.prevent="selectvar2(option_2,index,i,altvalue)"
                    style="border-radius:21px;text-align:center;padding-top:20px"
                    :class=" (altvalue.toplam < 1  ) ? 'secilmez1':  [{ active:altvalue.selected },'firstvar1'] "
                    
                  >{{altvalue.varyant_option2.varyant_option2_name}}</li>
                  <!-- v-bind:style= "[condition_1 ? condition_2 ? {styleA} : {styleB} : {styleC}]" -->
                </ul>
              </div>
            </div>
            
          </div>
        </q-item>
        
        <q-item>
        <div class="row">
          <q-item-section class="col" >
                    <div class="col" style="text-transform: unset">MİKTAR:</div>
                        <q-btn
      v-model="miktar"
      @click="eksi"
      color="white"
      push
      round
      class=" text-grey"
      icon="remove"
    ></q-btn>
    <span class="q-mx-md">
      {{miktar}}
    </span>
    <q-btn
      v-model="miktar"
           @click="arti"
      color="white"
      push
      round
           class="text-grey"
      icon="add"
    ></q-btn>
                    </q-item-section>
        </div>
        </q-item>
        <q-separator inset />
        <!-- <q-icon name="shopping_cart" /> -->
                 <div class=" q-pa-md q-mt-lg q-mb-lg text-center row" align="center">
                    <!-- <div  class="  text-h6 " >...{Ürün-Açıklaması...}...</div> -->
                    <!-- <q-btn push size="lg" class="bg-pink-12 text-white text-h5" icon="shopping_cart"  no-caps>Sipariş Ver </q-btn> -->
                    
                    <!-- <q-btn  size="lg" class="col-4  q-ma-xs"   color="pink-12"  rounded no-caps><q-icon name="shopping_cart"  style="font-size: 24px;" />  Sepete Ekle </q-btn> -->
                <q-btn class="col-2 items-center" size="md" outline round color="pink-12" @click="sell(false)" icon="add_shopping_cart" style="font-size: 10px;"/>
                <q-btn class="col q-ml-md q-mr-md " size="lg"   color="pink-12" @click="sell(true)"  rounded no-caps>Sipariş Ver </q-btn>
                <q-btn class="col-2 items-center" size="md" outline round color="pink-12" icon="favorite" style="font-size: 14px;"/>
                </div>
        
      </div>
      </div>

    </q-card>
  </q-page>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
// import {store} from '../store/index'
import { mapState, mapGetters } from "vuex";
import { Loading } from "quasar";
import _ from "lodash";
import ProductZoomer from "../components/productzoom";
import cloudinaryVue from '../components/cloudinary.vue';
import load from '../pages/skeleton/deneme.vue'
import { Cookies } from "quasar";

export default {
  components: { ProductZoomer,load },
  props: ["stokad"],
  route: {
            data: function (transition) {
                this.hasvaryantsatirliste();
            }
        },
  data() {
    return {
      zoomerKey: 0,
      urunad: "",
      urundetay: "",
      varyantlists: [],
      varyanttree: [],
      fiyat:"",
      indirim:1,
      indirimli_fiyat:"",
      d_indirimli_fiyat:"",
      stok_path:"",
      stok_publicid:"",
      images: {
        thumbs: [
          {
            id: "Zoom-1",
            href: "https://via.placeholder.com/450",
            "data-image": "https://via.placeholder.com/450",
            dataimage: "https://via.placeholder.com/",
            publicid: "450"
          }
        ]
      },
      // -----------------------------------------

      varyants:[],
      varyantname: [],
      selectid:"",
      option_1:[],
      option_2:[],
      varyant_option1_name:"",
      varyant_option2_name:"",
      id1:"",
      id2:"",
      id:"",
      //innertext
      // varyant0:"",
      // varyant1:"",
      // -----------------------------------------
      miktar:1,
      //  parentname:this.$route.params.parentname
    };
  },
  async beforeCreate() {
    //   await this.$store.dispatch('varyantlist')
    // this.anakategorilists=this.$store.state.stok.anakategorilist
  },
  watch: {
    // getvaryantlist(val){
    //      this.stok()
    // },
    miktar(val){
      if(val < 1){
        this.miktar= 1
      }
    },
    stokad(val) {
      this.stokad = val;
      document.getElementById('varyant0').innerHTML = ""
      document.getElementById('varyant1').innerHTML = ""
      this.id1="",
      this.id2="",
      this.id="",
      this.stok();
      this.hasvaryantsatirliste();
    },
    anakategorilists(val) {
      // console.log(val);

      this.stok();
      this.hasvaryantsatirliste();
    },
    getvaryantlist(val) {
      // this.stok()
    },
    // option_2(val){
    //   this.option_2=val
    // }
  },
  computed: {
    // stokad:{
    //     get(){
    //         //  console.log(this.stokad);
    //     },
    //     set(val){
    //         console.log(val);
    //         return val
    //     }
    // },
    ...mapGetters([
      "anakategorilists",
      "anakategorizelists",
      "activestoklistids",
      "getvaryantlist",
      "get_basketlist",
      "get_ubasketlist",
      'get_guid',
      'get_uid'
    ])
  },
  mounted() {
    // document.getElementById('varyant0').innerHTML = ""
    // document.getElementById('varyant1').innerHTML = ""
      
    // setTimeout(function() {
    //   console.log("mounted",this.anakategorilists);
    // }, 5000);
        
    // this.stok()

    if (this.anakategorilists.length > 0) {
      this.stok();
      this.hasvaryantsatirliste();
    }
    if (this.activestoklistids === "") {
      // this.stokad
    }
  },

  methods: {
    eksi () {
      
      this.miktar--
    },

    arti () {
      this.miktar++
    },
    async stok() {
     

      this.urundetay = this.anakategorilists.filter(item => {
        if (item.stokturad === this.stokad) {
          //    console.log(item.hasOwnProperty("children"));

          return item;
        }
      });
        // console.log(this.urundetay[0].vars[0].images);
      
      //  ---------------------
      if(this.urundetay[0].fiyat1 !='' && this.urundetay[0].fiyat1!=null){
        let fiyat= (this.urundetay[0].fiyat1).toFixed(2).replace('.', ',')
        this.fiyat= fiyat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      //  ---------------------
        this.indirim=Number(this.urundetay[0].indirim)
      // console.log("indirim",this.indirim);
      //  ---------------------
      // if(this.urundetay[0].indirim || (this.urundetay[0].indirim !="") || (this.urundetay[0].indirim !=null)|| (this.urundetay[0].indirim !=undefined)){
       let indirimli_fiyat = this.urundetay[0].fiyat1 - (this.urundetay[0].fiyat1 * (this.indirim/100) )//(1 + (this.indirim/100)).toFixed(2)
      // indirimli_fiyat=indirimli_fiyat.toFixed(2)

      // --------------------
      // console.log("locale",indirimli_fiyat.toLocaleString()); 
      this.d_indirimli_fiyat=indirimli_fiyat
      // --------------------
        indirimli_fiyat=indirimli_fiyat.toFixed(2).replace('.', ',')
        this.indirimli_fiyat=indirimli_fiyat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

      //  console.log(this.indirimli_fiyat);
      // }
      // -------------------------------------------------------
        
    
      // this.fiyat = urundetay[0].fiyat1.toLocaleString()
        // console.log(this.urundetay);

      // console.log(this.urundetay[0]._id);

      let images = {};
      let thumbs = [];
      let normal_size = [];
      let large_size = [];
      // property hatası
      for (var key in this.urundetay[0].vars) {
        //    console.log(key);
        var value = this.urundetay[0].vars[key];

        thumbs.push({
          id: value.images.id,
          href: value.images.imageurl,
          dataimage: value.images.path,
          publicid: value.images.publicid
        });
        normal_size.push({
          id: value.images.id,
          url: value.images.imageurl
        });
        large_size.push({
          id: value.images.id,
          url: value.images.imageurl
        });
      }
      // property hatası
      images = Object.assign(
        { thumbs: thumbs },
        { normal_size: normal_size },
        { large_size: large_size }
      );

      this.images = images;

      // console.log("varyantlists",this.getvaryantlist);
      // console.log("varyantlist",varyantlist);
      this.stok_path=this.urundetay[0].vars[0].images.path
      this.stok_publicid=this.urundetay[0].vars[0].images.publicid
      this.zoomerKey++;
    },
    childtree(childarr, parentID = null) {
      // console.log(childarr);

      const childtreem = [];
      childarr.forEach((value, index) => {
        //  console.log(value);

        if (value.parentid === parentID) {
          const children = this.childtree(childarr, value._id);

          if (children.length > 0) {
            Vue.set(value, "children", children);
          }

          childtreem.push(value);
        }
      });
      this.varyanttree = childtreem;

      return this.varyanttree;
    },
    selectvar1(a, i, ii, aa) {
      // console.log(a);
      // console.log(i);
      // console.log(ii);
      // console.log(aa);
      // console.log("a",a);
      
      let id1 
      let id2 
      let varyantname=this.varyantname
      let iii = ii + 1;
      let class_varyant_option = "varyant_option" + iii;
      let class_varyant_option_name = "varyant_option" + iii + "_name";
      // let varyant_option = ""
      // let varyant_option_name = ""
       let varyant_option_id = "varyant_option" + iii + "_id";
      
      const varyant = "varyant" + ii;
       
       

      if (ii==0) {
         id1=aa[class_varyant_option][varyant_option_id]
         this.id1=id1
      }
      // if (ii==1) {
      //     id2=aa[class_varyant_option][varyant_option_id]
      // }
      // else if(ii==1){
      //   // console.log("aa",aa);
      //     id2=aa[class_varyant_option][varyant_option_id]
      //     //  console.log("id2",id2);
      // }
      //  console.log("id1",id1);
        //  console.log("id1",id1,"id2",id2);
      // this.selectid=id
      a.forEach((value, index) => {
        if (!value.selected || value.selected === false || value.selected === undefined) {
          if (i == index) {
            Vue.set(value, "selected", true);
    // console.log("i",i,"index",index);
            document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name];
            // document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name];
            
            } else {
              
          }
        } else {
            // console.log("ibo");
            // console.log("id1",this.id1,"id2",this.id2);
           value.selected = !value.selected;

          i == index ? (document.getElementById(varyant).innerHTML = "") : (document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name]);
          if (i==index) {
             this.id1=""
           }
          // console.log("id1",this.id1,"id2",this.id2);
          
          // this.hasvaryantsatirliste();
        }
      });
        // console.log("id1",id1);
        // console.log("id2",id2);
        
      if ((this.id1=="") || (id1==null) || (id1==undefined)) {
        // console.log("option_2",this.option_2);
        let option_2=[]
        this.varyantname.forEach((item,key)=>{
            //  console.log(item);
            if(item.varyant_option2){
            item.varyant_option2.forEach((value,index)=>{
                option_2.push(value)
              
          })

          
            //  console.log("hasoption_2",option_2);
          }
          })
        this.option_2=option_2
        


      }else{
          let arra=[]
          let option_2
          
         this.varyants.forEach((value,i)=>{
           let toplam=0
                let varyant_option2={}
                let sel=false
                // console.log("id1",this.id1,"id2",this.id2);
          if(value.varyant_option1_id==id1) {
            if((value.varyant_option2_id==this.id2) ) {
                 sel=true
           
            }
            toplam +=  value.miktar
              Object.assign(varyant_option2, {
                varyant_option2: value,
                toplam:toplam,
                selected:sel
              });
              arra.push(varyant_option2)
          }
         })
              
            //  this.option_2=_.sortBy(arra, ['desc']);
            this.option_2=_.orderBy(arra, 'varyant_option2.varyant_option2_name', 'desc')
                
      }
      // let arra=[]
      //   let option_1=[]
      //   this.varyants.forEach((value,i)=>{
      //   let varyant_option1={}
      //   let toplam=0
      //   let sel=false
      //     if(value.varyant_option2_id==id2) {
      //       if(value.varyant_option1_id==this.id1){
      //         sel=true
      //       }
      //       toplam +=  value.miktar
      //        Object.assign(varyant_option1, {
      //         varyant_option1: value,
      //         toplam:toplam,
      //         selected:sel
      //     });
      //     arra.push(varyant_option1)
      //     }
      //    })
      //      this.option_1=arra
      // if(this.id1!="" && this.id2!=""){
      //   // this.option_2=this.
      // }
      },
      selectvar2(a, i, ii, aa) {
      // console.log(a);
      // console.log(i);
      // console.log(ii);
      // console.log(aa);
      // console.log("a",a);
      
      let id1 
      let id2 
      let varyantname=this.varyantname
      let iii = ii + 1;
      let class_varyant_option = "varyant_option" + iii;
      let class_varyant_option_name = "varyant_option" + iii + "_name";
      // let varyant_option = ""
      // let varyant_option_name = ""
       let varyant_option_id = "varyant_option" + iii + "_id";
      
      const varyant = "varyant" + ii;
       
       
      // if (ii==0) {
      //     id1=aa[class_varyant_option][varyant_option_id]
      // }
       if(ii==1){
        
          id2=aa[class_varyant_option][varyant_option_id]
          this.id2=id2
          //  console.log("id2",id2);
      }
      //  console.log("id1",id1);
        //  console.log("id1",id1,"id2",id2);
      // this.selectid=id
      a.forEach((value, index) => {
        if (!value.selected || value.selected === false || value.selected === undefined) {
          if (i == index) {
            // console.log(a);
            Vue.set(value, "selected", true);
            // console.log("i",i,"index",index);
            document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name];
            // document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name];
            
            } else {
              
          }
        } else {
          // console.log("ibo2");
          
          value.selected = !value.selected;

          i == index ? (document.getElementById(varyant).innerHTML = "") : (document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name]);
           if (i==index) {
             this.id2=""
           } 
          //  console.log("id1",this.id1,"id2",this.id2);
          // let option_2=[]
          // this.varyantname.forEach((item,key)=>{
          //   //  console.log(item);
          //   if(item.varyant_option2){
          //   item.varyant_option2.forEach((value,index)=>{
          //       option_2.push(value)
              
          // })
          // this.option_2=option_2
          //   console.log("option_2",this.option_2);
          // }
          // })
          // this.hasvaryantsatirliste();
        }
      });
        // console.log("id1",id1);
        // console.log("id2",id2);
        
      
      if ((this.id2=="") || (id2==null) || (id2==undefined)){
        let option_1=[]
          this.varyantname.forEach((item,key)=>{
            if(item.varyant_option1){
            item.varyant_option1.forEach((value,index)=>{
                option_1.push(value)
          })
          
              
          }
          })
        this.option_1=option_1
        // console.log("burda");
      }else{
        let arra=[]
        let option_1=[]
        
        this.varyants.forEach((value,i)=>{
        let varyant_option1={}
        let toplam=0
        let sel=false
            //  toplam =value.miktar
          // console.log("value.miktar",value.miktar);
          if(value.varyant_option2_id==id2) {
            if(value.varyant_option1_id==this.id1){
              sel=true
            }
            toplam +=  value.miktar
             Object.assign(varyant_option1, {
              varyant_option1: value,
              toplam:toplam,
              selected:sel
          });
          arra.push(varyant_option1)
          }
         })
           this.option_1=arra
      }
      // console.log("option_2",this.option_2);
        
      },
    async hasvaryantsatirliste() {
      await axios.post(
        'http://'+ process.env.API +':4000/graphql', {
          query: `query hasvaryantsatirQuery($id: ID! ){
                 hasvaryantsatirQuery(id: $id){
                      _id
                      varyant1_name
                      varyant1_id
                      varyant2_name
                      varyant2_id
                      varyant_option1_id
                      varyant_option1_name
                      varyant_option2_id
                      varyant_option2_name
                      fiyat1
                      fiyat2
                      miktar
                      color
                    }
                 }`,

          variables: {
            id: this.urundetay[0]._id
          }
        })
        .then(data => {
          // this.hasvaryantsatirlists = data.data.data.hasvaryantsatirQuery;
          let varyant_name = [];
          let varyant_option1 = [];
          let varyant_option2 = [];
          let deneme = [];
          let varyants = data.data.data.hasvaryantsatirQuery;
          varyants=_.sortBy(varyants, 'varyant_option1_name');
        //  arra= _(arra.varyant_option1.varyant_option1_name).sort()
            // console.log("varyants",varyants);
          this.varyants=varyants

          // ---------- tanımlamalar
          if (varyants.length > 0) {
            varyants.map((item, i) => {
              if (i == 0) {
                varyant_name.push({
                  varyantname: item.varyant1_name,
                  varyantid: item.varyant1_id
                });
                varyant_name.push({
                  varyantname: item.varyant2_name,
                  varyantid: item.varyant2_id
                });
              }
            });
            //  console.log("varyants",varyants);
            varyant_option1 = _(varyants)
              .groupBy("varyant_option1_name")
              .map((varyantname, varyant_option1_name) => ({
                toplam: _.sumBy(varyantname, 'miktar'),
                varyant_option1: _.find(varyantname, p => ({
                  varyant_option1: p.varyant_option1_id
                })),
                
              }))
              .sortBy('varyant_option1.varyant_option1_name')
              .value();
              //  console.log("varyant_option1",varyant_option1);
            varyant_option2 = _(varyants)
              .groupBy("varyant_option2_name")
              .map((varyantname, varyant_option2_name) => ({
                toplam: _.sumBy(varyantname, 'miktar'),
                varyant_option2: _.find(varyantname, p => ({
                  varyant_option2: p.varyant_option2_id
                })),
                
              }))
              .sortBy('varyant_option2.varyant_option2_name').reverse()
              .value();
              // console.log("varyant_option2",varyant_option2);
            // _.sortBy(varyant_option1, [ 'varyant_option1.varyant_option1_name']);
            varyant_name[0] = Object.assign(varyant_name[0], {
              varyant_option1: varyant_option1
            });
            varyant_name[1] = Object.assign(varyant_name[1], {
              varyant_option2: varyant_option2
            });
          }
          this.varyantname = varyant_name;
              // console.log("this.varyantname[0]",this.varyantname[0]);
          let option_1=[]
          let option_2=[]
          this.varyantname.forEach((item,key)=>{
            //  console.log(item);
            if(item.varyant_option1){
            item.varyant_option1.forEach((value,index)=>{
              // console.log("miktar", value.varyant_option1.miktar);
              //  console.log("value", value);
                option_1.push(value)
              
          })
          
          this.option_1=option_1
              //  console.log("hasoption_1",option_1);
          }
          })
          
          this.varyantname.forEach((item,key)=>{
            //  console.log(item);
            if(item.varyant_option2){
            item.varyant_option2.forEach((value,index)=>{
                option_2.push(value)
              
          })

          this.option_2=option_2
            //  console.log("hasoption_2",option_2);
          }
          })
        });
    },
    sell(sell){
     
    let id1=this.id1
    let id2=this.id2
    let id
    let is_sepet=false
    let basketlist=[]
    //-----------------
    if(id1 !="" && id2 !="" ){
    this.varyants.filter(item=>{
      // console.log(item);
        if(id1===item.varyant_option1_id && id2===item.varyant_option2_id){
          id=item._id
          this.id=id
          this.varyant_option1_name=item.varyant_option1_name
          this.varyant_option2_name=item.varyant_option2_name
          
          // console.log(this.id);
          
          
        }
      })
      if(this.get_basketlist.length > 0) {
                this.get_basketlist.forEach(item=>{
                if(item.varyantid == this.id){
                  is_sepet=true
                  basketlist=this.get_basketlist
                  return false
                }
                
              })
      }
      if(this.get_ubasketlist.length > 0) {
        this.get_ubasketlist.forEach(item=>{
        if(item.varyantid == this.id){
          is_sepet=true
          basketlist=this.get_ubasketlist
          return false
        }
        // console.log(is_sepet);
      })
      }
      // if(sell){
      //   console.log("var dendi");
      //           // this.$router.push({ path: '/shopping' })
      //         }
        let guid=this.get_guid
        let uid = this.get_uid
          console.log("uid",uid,"guid",guid);
          console.log("uid",Cookies.get('uid'),"guid",Cookies.get('guid')); // uid=null
          
            
          if (uid != "") {
            console.log("uid boş değil")
            if(this.get_ubasketlist.length > 0 && is_sepet) {
                // const dialog = this.$q.dialog({
                //           title: "Uyarı",
                //           message: "Ürün Sepetinizde bulunmaktadır..!"
                //         })
                //         .onOk(() => {
                //           // console.log('OK')
                //         })
                //         .onCancel(() => {
                //           // console.log('Cancel')
                //         })
                //         .onDismiss(() => {
                //           clearTimeout(timer);
                //           // console.log('I am triggered on both OK and Cancel')
                //         });

                //       const timer = setTimeout(() => {
                //         dialog.hide();
                //       }, 2000);
                                      
              }else{
                console.log("listeye ürün ekleme","mutation")
                                            this.$apollo.mutate({
                                              mutation: gql`
                                                mutation createsepet_mutation(
                                                  $uid: String,
                                                  $guid: String,
                                                  $stokid: ID,
                                                  $stokad:String,
                                                  $varyantid:ID,
                                                  $varyantoption1:String,
                                                  $varyantoption2:String,
                                                  $fiyat:Float
                                                  $path:String,
                                                  $publicid:String,
                                                  $count:Int) {
                                                  createsepet_mutation(
                                                    uid: $uid,
                                                    guid: $guid, 
                                                    stokid: $stokid,
                                                    stokad:$stokad,
                                                    fiyat:$fiyat,
                                                    varyantid:$varyantid,
                                                    varyantoption1:$varyantoption1,
                                                    varyantoption2:$varyantoption2,
                                                    path:$path,
                                                    publicid:$publicid,
                                                    count:$count)
                                                    {
                                                      
                                                      _id
                                                    
                                                  }
                                                }
                                              `,
                                              variables: {
                                                uid:uid,
                                                guid:guid,
                                                stokid: this.urundetay[0]._id,
                                                stokad: this.stokad,
                                                varyantid: this.id,
                                                varyantoption1: this.varyant_option1_name,
                                                varyantoption2: this.varyant_option2_name,
                                                fiyat:this.d_indirimli_fiyat,
                                                path: this.stok_path,
                                                publicid: this.stok_publicid,
                                                count: this.miktar
                                              }
                                            })
                                            .then(data => {
                                              console.log("sepete ürün eklendi");
                                              this.$store.dispatch('search_ubasketlist',uid)
                                              if(sell){
                                                this.$router.push({ path: '/shopping' })
                                              }
                                            })

              }

          }else{
            console.log("guid boş değil")
              if(this.get_basketlist.length > 0 && is_sepet) {
                this.$apollo.mutate({
                                              mutation: gql`
                                                mutation createsepet_mutation(
                                                  $uid: String,
                                                  $guid: String,
                                                  $stokid: ID,
                                                  $stokad:String,
                                                  $varyantid:ID,
                                                  $varyantoption1:String,
                                                  $varyantoption2:String,
                                                  $fiyat:Float,
                                                  $path:String,
                                                  $publicid:String,
                                                  $count:Int) {
                                                  createsepet_mutation(
                                                    uid: $uid,
                                                    guid: $guid, 
                                                    stokid: $stokid,
                                                    stokad:$stokad,
                                                    varyantid:$varyantid,
                                                    varyantoption1:$varyantoption1,
                                                    varyantoption2:$varyantoption2,
                                                    fiyat:$fiyat,
                                                    path:$path,
                                                    publicid:$publicid,
                                                    count:$count)
                                                    {
                                                      
                                                      _id
                                                    
                                                  }
                                                }
                                              `,
                                              variables: {
                                                uid:uid,
                                                guid:guid,
                                                stokid: this.urundetay[0]._id,
                                                stokad: this.stokad,
                                                varyantid: this.id,
                                                varyantoption1: this.varyant_option1_name,
                                                varyantoption2: this.varyant_option2_name,
                                                fiyat:this.d_indirimli_fiyat,
                                                path: this.stok_path,
                                                publicid: this.stok_publicid,
                                                count: this.miktar
                                              }
                                            })
                                            .then(data => {
                                              console.log("sepete ürün eklendi");
                                              this.$store.dispatch('search_basketlist',guid)
                                              if(sell){
                                                this.$router.push({ path: '/shopping' })
                                              }
                                            })
                // const dialog = this.$q.dialog({
                //           title: "Uyarı",
                //           message: "Ürün Sepetinizde bulunmaktadır..!"
                //         })
                //         .onOk(() => {
                //           // console.log('OK')
                //         })
                //         .onCancel(() => {
                //           // console.log('Cancel')
                //         })
                //         .onDismiss(() => {
                //           clearTimeout(timer);
                //           // console.log('I am triggered on both OK and Cancel')
                //         });

                //       const timer = setTimeout(() => {
                //         dialog.hide();
                //       }, 2000);
                                      
              }else{
                console.log("listeye ürün ekleme","mutation")
                                            this.$apollo.mutate({
                                              mutation: gql`
                                                mutation createsepet_mutation(
                                                  $uid: String,
                                                  $guid: String,
                                                  $stokid: ID,
                                                  $stokad:String,
                                                  $varyantid:ID,
                                                  $varyantoption1:String,
                                                  $varyantoption2:String,
                                                  $fiyat:Float,
                                                  $path:String,
                                                  $publicid:String,
                                                  $count:Int) {
                                                  createsepet_mutation(
                                                    uid: $uid,
                                                    guid: $guid, 
                                                    stokid: $stokid,
                                                    stokad:$stokad,
                                                    varyantid:$varyantid,
                                                    varyantoption1:$varyantoption1,
                                                    varyantoption2:$varyantoption2,
                                                    fiyat:$fiyat,
                                                    path:$path,
                                                    publicid:$publicid,
                                                    count:$count)
                                                    {
                                                      
                                                      _id
                                                    
                                                  }
                                                }
                                              `,
                                              variables: {
                                                uid:uid,
                                                guid:guid,
                                                stokid: this.urundetay[0]._id,
                                                stokad: this.stokad,
                                                varyantid: this.id,
                                                varyantoption1: this.varyant_option1_name,
                                                varyantoption2: this.varyant_option2_name,
                                                fiyat:this.d_indirimli_fiyat,
                                                path: this.stok_path,
                                                publicid: this.stok_publicid,
                                                count: this.miktar
                                              }
                                            })
                                            .then(data => {
                                              console.log("sepete ürün eklendi");
                                              this.$store.dispatch('search_basketlist',guid)
                                              if(sell){
                                                this.$router.push({ path: '/shopping' })
                                              }
                                            })

              }
          }
                            
    } else{
      console.log("Ürün Seçimini Tamamlamadınız.. yinede devam etmek istermisiniz");
      if(sell){
        this.$q.notify({
              type: 'negative',
                  message: `Ürün Seçimini Tamamlamadınız...`
              })
                // this.$router.push({ path: '/shopping' })
              }
    }
    
  }
  },
  
};
</script>

<style lang="scss" scoped>
.secilmez1{
  border: 1px dashed #ccc;
  pointer-events: none;
  box-sizing: content-box;
  min-width: 38px;
  height: 38px;
  pointer-events: none;
  margin-left: 5px;
  opacity: 0.9;
}
.secilmez{
  border: 1px dashed #ccc;
  pointer-events: none;
  box-sizing: content-box;
  min-width: 58px;
  height: 58px;
  pointer-events: none;
  margin-left: 5px;
  opacity: 0.3;
}
.firstvar {
  border: 2px solid rgb(216, 216, 216);
  /* border-radius: 4px; */
  box-sizing: content-box;
  width: 58px;
  height: 58px;
  cursor: pointer;
  margin-left: 5px;
}
.firstvar1 {
  border: 2px solid rgb(216, 216, 216);
  /* border-radius: 4px; */
  box-sizing: content-box;
  min-width: 38px;
  height: 38px;
  cursor: pointer;
  margin-left: 5px;
}
.firstvar1:hover {
  border: 2px solid #f00;
  border-radius: 10px;
}
.firstvar:hover {
  border: 2px solid #f00;
  border-radius: 10px;
}
.active {
  border: 2px solid #f00;
  border-radius: 10px;
  text-transform: unset;
}
</style>