<template>
  <q-page class="row q-pt-md items-start q-col-gutter-md">
    <div style="min-width: 350px;" class="col-md-6 col-sm-6 col-xs-12">
      <q-card class>
        <product-zoomer :key="zoomerKey" :images="images"></product-zoomer>
      </q-card>
    </div>

    <div class="col-md-6 col-sm-6 col-xs-12">
      <q-card class>
        <q-item class>
          <q-item-section class="col-12" align="center">
            <div class="text-h6">{{stokad}}</div>
          </q-item-section>
        </q-item>
        <q-separator inset />

        <q-item v-if="varyantname.length > 0" class v-for="(value,i) in varyantname" :key="i">
          <div class="row col-12">
            <div class="col" style="text-transform: unset">{{value.varyantname}}:</div>
            <div class="col-10" style="margin-left:15px;" :id="'varyant'+i"></div>
            <div v-for="(altvalue, index) in value.varyant_option1" :key="index">
              <div v-if="altvalue.length > 0">
              </div>
              <div class="col-12">
                <ul class="row" style="list-style-type:none;padding-left:0px;">
                  <li
                    :id="altvalue.varyant_option1.varyant_option1_name "
                    @click.prevent="selectvar(value.varyant_option1,index,i,altvalue)"
                    style="border-radius:31px;"
                    :style="{'background-color':altvalue.varyant_option1.color}"
                    :class="altvalue.varyant_option1.miktar > 0 ? [{ active:altvalue.selected },'firstvar'] : 'secilmez'"
                  ></li>
                </ul>
              </div>
            </div>
            <div class="col-12" v-if="varyantname.length > 1">
              <div class="row">
                <ul
                  v-for="(altvalue, index) in value.varyant_option2"
                  :key="index"
                  class
                  style="list-style-type:none;padding-left:0px;"
                >
                  <li
                  
                    class="q-pa-xs"
                    :id="altvalue.varyant_option2.varyant_option2_name "
                    @click.prevent="selectvar(value.varyant_option2,index,i,altvalue)"
                    style="border-radius:21px;text-align:center;padding-top:20px"
                    :class="(altvalue.varyant_option2.miktar == 0) ? [{ active:altvalue.selected },'firstvar1'] : 'secilmez1'"
                    
                  >{{altvalue.varyant_option2.varyant_option2_name}}</li>
                </ul>
              </div>
            </div>
            
          </div>
        </q-item>
        <q-item v-if="varyantname.length<1">
          <div class="row col-12">
            <div class="col" style="text-transform: unset">Bu Ürün Geçici Bir Süre Stoklarımızda Bulunmamaktadır...</div>
          </div>
        </q-item>
        <!-- <q-item class="" v-for="(value,i) in varyanttree" :key="i">
                   <div class="row">
                    <div   class=" col-2" style="text-transform: unset">{{value.varyantname}}: </div>
                    <div  class="col-9" style="margin-left:15px;"  :id="'varyant'+i" ></div>
                    
                    <div  v-for="(altvalue, index) in value.children" :key = "index">
                        
                    <div  v-if="altvalue.vars.length > 0">
                        <ul   style="list-style-type:none;padding-left:0px;" v-for="(vars, key) in altvalue" :key = "key">
                            
                            <li  style="border-radius:10px" :id="value.varyantname + index" :class="[{ active:altvalue.selected },'firstvar']"

                            @click.prevent="ibo(value.children,index,i,altvalue)"
                            >
                            
                                <img class="varyantimg" :src="vars.images.imageurl "/>
                                </li>
                        </ul>
                    </div>
                      <div class="col-12" v-else-if="altvalue.color">
                        <ul class="row" style="list-style-type:none;padding-left:0px;">
                          <li :id="value.varyantname + index"  
                          @click.prevent="selectvar(value.children,index,i,altvalue,value)" 
                          style="border-radius:31px;" :style="{'background-color':altvalue.color}"   
                          :class="[{ active:altvalue.selected },'firstvar']">
                            
                          </li>
                        </ul>
                      </div>
                      <div class="col-12" v-else>
                        <ul class="row" style="list-style-type:none;padding-left:0px;">
                          <li :id="value.varyantname + index"  
                          @click.prevent="selectvar(value.children,index,i,altvalue)" 
                          style="border-radius:21px;text-align:center;padding-top:20px"    
                          :class="[{ active:altvalue.selected },'firstvar1']">
                            {{altvalue.varyantname}}
                          </li>
                        </ul>
                      </div>
                </div>
                </div>
                
        </q-item>-->
        <q-separator inset />
        <!-- <q-item>
                 <q-item-section class="col-12 " align="center">
                    <div  class="  text-h6 " >...{Ürün-Açıklaması...}...</div>
                    
                </q-item-section>
        </q-item>-->
      </q-card>
    </div>
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

export default {
  components: { ProductZoomer },
  props: ["stokad"],
  data() {
    return {
      zoomerKey: 0,
      urunad: "",
      urundetay: "",
      varyantlists: [],
      varyanttree: [],
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
      varyantname: [],
      selectid:""
      // -----------------------------------------
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
    stokad(val) {
      this.stokad = val;

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
    }
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
      "getvaryantlist"
    ])
  },
  mounted() {
    //    console.log("mounted",this.anakategorilists);
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
    async stok() {
      // -------------------------------------------------------
      // console.log(this.anakategorilists);

      // -------------------------------------------------------
      this.urundetay = this.anakategorilists.filter(item => {
        if (item.stokturad === this.stokad) {
          //    console.log(item.hasOwnProperty("children"));

          return item;
        }
      });
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
    selectvar(a, i, ii, aa) {
       console.log("a",a);
      // console.log("i",i);
      // console.log("ii",ii);
      let d =""
      let varyantname=this.varyantname
      let iii = ii + 1;
      let class_varyant_option = "varyant_option" + iii;
      let class_varyant_option_name = "varyant_option" + iii + "_name";
      let varyant_option = ""
      let varyant_option_name = ""
      let varyant_option_id = "varyant_option" + iii + "_id";
      const varyant = "varyant" + ii;
      const id=aa[class_varyant_option][varyant_option_id]
      this.selectid=id
      a.forEach((value, index) => {
        if (!value.selected || value.selected === false || value.selected === undefined) {
          if (i == index) {
            Vue.set(value, "selected", true);

            document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name];
            // document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name];
            } else {
          }
        } else {
          value.selected = !value.selected;

          i == index ? (document.getElementById(varyant).innerHTML = "") : (document.getElementById(varyant).innerHTML = aa[class_varyant_option][class_varyant_option_name]);
          //
        }
      });
      // ------------------hesaplama, varmı yokmu
      // console.log((ii));
      let varyant_optionvar_id=""
      if(ii==0){
         d = 1
          varyant_option = "varyant_option2"
          varyant_option_name = "varyant_option2_name"
          varyant_optionvar_id = "varyant_option2_id"

        //  console.log("d",d);
      }else if(ii==1){
         d = 0
          varyant_option = "varyant_option1"
         varyant_option_name = "varyant_option1_name"
         varyant_optionvar_id = "varyant_option1_id"
        //  console.log("d",d)
      }
      //  console.log(this.varyantname[d],varyant_option);
      
        
          
          // console.log(varyant_option_id);
            this.varyantname[d][varyant_option].forEach((item,u)=>{
               console.log(id);
               console.log(item[varyant_option][varyant_optionvar_id]);
              if(id==item[varyant_option][varyant_optionvar_id]){
                console.log(item[varyant_option][varyant_option_name]);
              }
            //   item[varyant_option].forEach((uitem,uu)=>{
            //     console.log(uitem);
            // })
          })
          // console.log(this.varyantname);
        
      // for(var[ key , value] in varyantname){
      //     console.log(value);
      //   }

      // console.log(id);
      // console.log("a",a)
      // console.log("i",i);
      // console.log("ii",ii);
      // console.log("aa", aa);
      // console.log("varyantname",this.varyantname);
      // console.log("bb",bb)
      // ------------------hesaplama
    },

    async hasvaryantsatirliste() {
      await axios
        .post("http://localhost:4000/graphql", {
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
            varyant_option1 = _(varyants)
              .groupBy("varyant_option1_name")
              .map((varyantname, varyant_option1_name) => ({
                varyant_option1: _.find(varyantname, p => ({
                  varyant_option1: p.varyant_option1_id
                }))
              }))
              .value();
            varyant_option2 = _(varyants)
              .groupBy("varyant_option2_name")
              .map((varyantname, varyant_option2_name) => ({
                varyant_option2: _.find(varyantname, p => ({
                  varyant_option2: p.varyant_option2_id
                }))
              }))
              .value();

            varyant_name[0] = Object.assign(varyant_name[0], {
              varyant_option1: varyant_option1
            });
            varyant_name[1] = Object.assign(varyant_name[1], {
              varyant_option2: varyant_option2
            });
          }
          this.varyantname = varyant_name;
          console.log(varyant_name);
        });
    }
  }
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
}
.secilmez{
  border: 1px dashed #ccc;
  pointer-events: none;
  box-sizing: content-box;
  min-width: 58px;
  height: 58px;
  pointer-events: none;
  margin-left: 5px;
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