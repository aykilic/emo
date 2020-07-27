<template>
  <div class="q-pa-xl row q-gutter-md">
    <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12" title>
      <div class="col-12">
        <q-card-section>
          <!-- <div class="text-h6 text-center col-6" >Stok Detay</div> -->
          <div class="row">
            <div class="col-12 text-center text-h6">Stok Detay</div>
            <!-- <q-btn class="col-1 text-right " @click="createStok()" color="primary" label="Kaydet" /> -->
          </div>
        </q-card-section>
        <!--    <q-separator inset />-->

        <q-select
          fill-input
          input-debounce="0"
          hide-selected
          use-input
          @filter="filterFn"
          class="q-pa-md"
          label="Stok Adı"
          outlined
          v-model="edittreemselect"
          :options="options"
          option-value="_id"
          option-label="stokturad"
          @input="selectstokid()"
          auto-select
        ></q-select>
      </div>

      <div class="col-12">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="one" label="Stok Detay"></q-tab>
          <q-tab name="two" label="Varyant"></q-tab>
          <q-tab name="three" label="Resim"></q-tab>
        </q-tabs>

        <q-separator></q-separator>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <div class="row">
              <div class="col-11 text-center text-h6">Stok Ayrıntı</div>
              <q-btn class="col-1 text-right" @click="UpdateStok()" color="primary" label="Kaydet" />
            </div>
            <div class="q-pt-xs row q-col-gutter-md">
              <div class="col-6 row q-gutter-y-md">
                <div class="col-12 q-gutter-y-md">
                  <q-input
                    outlined
                    label="Stok Kodu"
                    class="col-6 hint"
                    v-model="stok.stokkodu"
                    hint="Stok Kodu Girilmez ise Otomatik Oluşturulacaktır...!"
                  />
                  <q-input 
                  outlined 
                  label="Kdv" 
                  v-model="stok.kdv" 
                  class="col-6 hint" 
                  hint="Kdv Oranını Giriniz...!" 
                  />

                  <q-input
                    outlined
                    v-model="stok.fiyat1"
                    @input="ufhesap()"
                    suffix="TL"
                    mask="#"
                    fill-mask="0"
                    reverse-fill-mask
                    label="Fiyat"
                    class="col-6 hint"
                    hint="Ana Fiyatı Giriniz...!"
                  />
                  <q-input
                    outlined
                    @input="ufhesap()"
                    v-model="stok.indirim"
                    suffix="%"
                    fill-mask="0"
                    reverse-fill-mask
                    label="indirim Oranı"
                    class="col-6 hint"
                    hint="indirim Oranı Giriniz...! (%)"
                  />
                  <q-input 
                  outlined 
                  label="Uygulanacak fiyat" 
                  v-model="stok.hesaplama" 
                  class="col-6 hint" 
                  hint="Uygulanacak fiyat"
                  suffix="TL"
                  readonly 
                  />
                </div>
              </div>
              <div class="col-6 row q-gutter-y-md">
                <div class="col-12 q-gutter-y-md">
                  <q-input
                    outlined
                    type="textarea"
                    label="Açıklama"
                    class="col-6 hint"
                    hint="Açıklama Giriniz...!"
                    v-model="stok.description"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- TODO: VARYANT ----------------------------------------------------------------------------------------------------->
          <q-tab-panel name="two">
            <div class="row" v-if="edittreemselect._id ">
              <div class="col text-h6 text-center">Varyantlı Stok Oluşturma</div>
              <q-space />
              <q-btn
                v-if="varyantlist.length > 0"
                class="text-right"
                @click="create_skus()"
                color="primary"
                label="Oluştur"
              />
            </div>

            <q-option-group
              :options="checklist"
              v-model="varyantgroup"
              type="checkbox"
              @input="altsel()"
              class="row"
            />
            <q-separator v-if="checklist.length >0 " class="col-12 q-mt-md q-mb-md" />
            <q-table
              :data="varyantlist"
              :columns="columns"
              row-key="_id"
              selection="multiple"
              :selected.sync="selected"
              grid
              hide-header
              hide-bottom
              
            >
              <template v-slot:item="props">
                <div
                  class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                  :style="props.selected ? 'transform: scale(0.95);' : ''"
                >
                  <q-card :class="props.selected ? 'bg-grey-2' : ''">
                    <q-list dense>
                      <q-table
                        :data="props.row.varyant_options"
                        :columns="altcolumns"
                        selection="multiple"
                        row-key="_id"
                        :selected.sync="varyantselected"
                        hide-bottom
                        :pagination.sync="paginationaa"
                      />
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>
            <q-separator v-if="varyantlist.length >0 " class="col-12 q-mt-md q-mb-md" />
            <div v-if="edittreemselect._id && hasvaryantsatirlists.length>0" class="row">
              <div
                class="col-12 q-mb-md text-center text-h6 text-secondary"
              >Kaydedilmiş Stok Varyantları</div>
              <!-- <q-separator class=" col-12 q-mt-md q-mb-md" /> -->
              <div class="row" v-for="(hasvaryantsatirlist,key) in hasvaryantsatirlists" :key="key">
                <q-item class="vertical-middle">
                  <q-item-section class="vertical-middle">
                    <q-item-label style="width:25px;" class="vertical-middle">{{key + 1}} -</q-item-label>
                  </q-item-section>
                </q-item>

                <q-input
                  outlined
                  v-model="edittreemselect.stokturad"
                  label="Stok Ad"
                  class="q-mb-md q-mr-md col-2 hint"
                  readonly
                />
                <q-separator class="q-mr-md" vertical />
                <q-input
                  outlined
                  v-model="hasvaryantsatirlists[key].varyant_option1_name"
                  label="Birinci Ad"
                  class="q-mb-md col-2 hint"
                  readonly
                />
                <q-item class="vertical-middle">
                  <q-item-section class="vertical-middle">
                    <q-item-label class="vertical-middle">&&</q-item-label>
                  </q-item-section>
                </q-item>

                <q-input
                  outlined
                  v-model="hasvaryantsatirlists[key].varyant_option2_name"
                  label="İkinci Ad"
                  class="q-mb-md q-mr-md col-2 hint"
                  readonly
                />
                <q-separator class="q-mr-md" vertical />

                <!-- <q-input
                  outlined
                  v-model="hasvaryantsatirlists[key].fiyat1"
                  label="Fiyat1"
                  suffix="TL"
                  class="q-mb-md q-mr-md col-1 hint"
                  readonly
                />

                <q-input
                  outlined
                  v-model="hasvaryantsatirlists[key].fiyat2"
                  suffix="TL"
                  label="Fiyat2"
                  class="q-mb-md q-mr-md col-1 hint"
                  readonly
                /> -->

                <q-input
                  outlined
                  v-model="hasvaryantsatirlists[key].miktar"
                  label="Miktar"
                  class="q-mb-md q-mr-md col hint"
                  readonly
                />
              </div>
            </div>

            <q-separator v-if="satirlists.length > 0" class="q-mt-lg" />
            <div v-if="satirlists.length > 0">
              <div class="q-mt-md q-mb-md row">
                <div class="col-12 text-center text-h6 text-positive">Eklenecek Varyant Satırları</div>
              </div>
              <div class="row" v-for="(satirlist,key) in satirlists" :key="key">
                <q-item class="vertical-middle">
                  <q-item-section class="vertical-middle">
                    <q-item-label style="width:25px;" class="vertical-middle">{{key + 1}} -</q-item-label>
                  </q-item-section>
                </q-item>

                <q-input
                  outlined
                  v-model="satirlist.stokname"
                  label="Stok Ad"
                  class="q-mb-md q-mr-md col-2 hint"
                  readonly
                />
                <q-separator class="q-mr-md" vertical />
                <q-input
                  outlined
                  v-model="satirlists[key].varyant_option1_name"
                  label="Birinci Ad"
                  class="q-mb-md col-2 hint"
                />
                <q-item class="vertical-middle">
                  <q-item-section class="vertical-middle">
                    <q-item-label class="vertical-middle">&&</q-item-label>
                  </q-item-section>
                </q-item>

                <q-input
                  outlined
                  v-model="satirlists[key].varyant_option2_name"
                  label="İkinci Ad"
                  class="q-mb-md q-mr-md col-2 hint"
                />
                <q-separator class="q-mr-md" vertical />

                <!-- <q-input
                  outlined
                  v-model="satirlist.fiyat1"
                  label="Fiyat"
                  suffix="TL"
                  class="q-mb-md q-mr-md col hint"
                />

                <q-input
                  outlined
                  v-model="satirlist.miktar"
                  label="Miktar"
                  class="q-mb-md q-mr-md col hint"
                /> -->
              </div>
            </div>

            <q-card-actions align="right" class="text-primary">
              <q-btn
                v-if="satirlists.length > 0"
                class="text-right"
                @click="create_varyantsatir()"
                color="primary"
                label="Kaydet"
              />
            </q-card-actions>
          </q-tab-panel>
          <!-- TODO: VARYANT --------------------------------------------------------------------------------------------->
          <q-tab-panel name="three">
            <div class="q-pt-lg row">
             
              <cloud
                :stokid="edittreemselect._id"
                label="Ana Resim Yükleme"
                class="col-12"
                v-on:refreshlist="resimlistrefresh"
                multiple
                color="white"
                text-color="black"
              >
                <template v-slot:list="scope">
                  <q-list separator>
                    <q-item v-for="file in scope.files" :key="file.name">
                      <q-item-section>
                        <q-item-label class="full-width ellipsis">{{ file.name }}</q-item-label>

                        <q-item-label caption>
                          <!-- Durum: {{ file.__status }} -->
                        </q-item-label>

                        <q-item-label caption>
                          <!-- {{ file.__sizeLabel }} / {{ file.__progressLabel }} -->
                        </q-item-label>
                      </q-item-section>

                      <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>

                      <q-item-section top side>
                        <q-btn
                          class="gt-xs"
                          size="14px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
              </cloud>
            </div>
            <div class="col-12">
              <q-table
                :data="imgdata"
                :columns="resimcolumns"
                row-key="name"
                selection="single"
                :selected.sync="selected"
                :pagination.sync="pagination"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card>
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.images.filename}}</q-item-label>
                        <q-space></q-space>
                        <q-btn
                          @click="imagedelete(props.row.images)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section>
                        <q-img
                          :src="props.row.images.imageurl"
                          spinner-color="primary"
                          spinner-size="82px"
                        ></q-img>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
//   import varyantkategori from '../../components/varyantkategori.vue'
// import QFirebaseUploaderBase from '../../components/QFirebaseUploaderBase.vue'
import cloud from "../../components/cloudinary.vue";
import altcloud from "../../components/altcloudinary.vue";
//   import firebase from '../../services/fireinit'
//   import {storage} from '../../services/fireinit'
import _ from "lodash";
import * as is from "../../../node_modules/is_js";
import { Loading } from "quasar";

//   import * as is from 'is_js'
export default {
  //  mixin:{
  //    methods:{
  //      resimlist(){
  //       this.resimlistrefresh()
  //       }
  //  }
  //  },

  props: ["value,label"],
  name: "stokekle",
  components: {
    cloud,
    altcloud
  },

  //     apollo: {
  // // Query with parameters
  //       ping: {
  //         query: gql`query PingMessage($message: String!) {
  //           ping(message: $message)
  //         }`,
  //         // Reactive parameters
  //         variables () {
  //           // Use vue reactive properties here
  //           return {
  //               message: this.pingInput,
  //           }
  //         },
  //       },
  //     },

  data() {
    return {
      loading: 0,
      etiketkey: 0,

      imgdata: [],
      imgdatares: [],
      resimcolumns: [
        {
          name: "adi",
          label: "resim",
          align: "left",
          sortable: true,
          field: row => row.images.imageurl
        }
      ],
      columns: [
        {
          name: "adi",
          label: "resim",
          align: "left",
          sortable: true,
          field: row => row.varyantname
        }
      ],
      altcolumns: [
        {
          name: "adi",
          label: "",
          align: "left",
          sortable: true,
          field: row => row.varyantname
        }
      ],

      //TODO:VARYANT DATA
      selected: [],
      sonselected: [],
      varyantselected: [],
      allvaryantlist: [],
      varyantlist: [],
      varyantgroup: [],
      checklist: [],
      satirlists: [],
      satirlist: [],
      hasvaryantsatirlists: [],
      //TODO:VARYANT DATA
      options: [],
      paginationaa: {
          // sortBy: 'ust',
          // descending: false,
          page: 1,
          rowsPerPage: 100,
          // rowsNumber: 5,q
        },
      ustkategori: { _id: null },
      denemem: [],
      treem: [],
      treemselect: [],

      edittreemselect: "",
      tab: "one",

      attrr: "",

      stok: {
        stokkodu: "",
        kdv: "",
        birim: "",
        fiyat1: "",
        miktar:"",
        indirim:"",
        doviz: "",
        description: "",
        hesaplama:""
      },
      birimselect: "",
      birimList: [],
      pagination: {
        rowsPerPage: 26
      },
      prompt: false,

      //TODO:

      liste: [],

      mask: {
        mask: "{8}000000",
        lazy: false
      },
      onAccept(e) {
        const maskRef = e.detail;
        console.log("accept", maskRef.stok.fiyat1);
      },
      onComplete(e) {
        const maskRef = e.detail;
        console.log("complete", maskRef.unmaskedValue);
      }
    };
  },
  // watch:{
  //     vselected(){

  //     }
  // },
  updated() {
    // this.$refs.nodes.expandAll();
  },
  watch: {},
  computed: {
    //     varyant() {
    //   return this.varyantlist.map(e => ({
    //      value:e.value,
    //      color:e.color.split("\n"),
    //      miktar:e.miktar.split("\n"),
    //      fiyat1:e.fiyat1.split("\n"),
    //      fiyat2:e.fiyat2.split("\n")
    //      })
    //   );
    // },
  },

  async mounted() {
    // this.denemem = await this.$apollo.query({query: variantselectQuery})
    // console.log(this.varyantlist.length);
    // Loading.show()

    const res = await axios.post('http://'+ process.env.API +':4000/graphql', {
      query: `{
                    Query {
                              stokturad
                              _id
                              parentid
          }
        }`,
      loadingKey: "loading"
    });

    const birim = await axios.post('http://'+ process.env.API +':4000/graphql',{
      query: `{
                    birimList {
                              _id
                              birimad
          }
        }`
    });

    this.denemem = res.data.data.Query;
    this.birimList = birim.data.data.birimList;
    // console.log(this.varyantschema);

    // this.varyantlist=[this.varyantlist]
    // console.log(this.varyantlist);
    // this.varyanlistguncelle()
    this.parseTree(this.denemem);

    let dem = [];
    this.treemselected(dem);
    // console.log(this.simple);
    // Loading.hide()
    this.$nextTick(function() {
      // this.$refs.nodes.expandAll();
    });
  },
  methods: {
    ufhesap(){
     this.stok.hesaplama=Number(this.stok.fiyat1) - (Number(this.stok.fiyat1) * (Number(this.stok.indirim)/100))
     this.stok.hesaplama=this.formatPrice(this.stok.hesaplama)
    },
    async create_varyantsatir() {
      this.satirlist = this.satirlists.map(item => ({
        stokid: item.stok_id,
        stokname: item.stokname,
        varyant1_id: item.varyant1_id,
        varyant1_name: item.varyant1_name,
        varyant2_id: item.varyant2_id,
        varyant2_name: item.varyant2_name,
        varyant_option1_id: item.varyant_option1_id,
        varyant_option1_name: item.varyant_option1_name,
        varyant_option2_id: item.varyant_option2_id,
        varyant_option2_name: item.varyant_option2_name,
        // fiyat1:Number(item.fiyat1) ,
        fiyat1: Number(item.fiyat1),
        miktar: Number(item.miktar),
        color:item.color,
        sira:item.sira
      }));
      // console.log("satirlist",this.satirlist);
      this.satirlist = _.orderBy(this.satirlist, ['sira'],['asc']);
      // console.log("satirlist",this.satirlist);
      // return
      // this.satirlist = _.sortBy(this.satirlist, "sira");
      //  console.log("satirlist",this.satirlist);
    // return
     await this.$apollo
        .mutate({
          mutation: gql`
            mutation createVaryantsatir($satirlist: [varyantlistInput]) {
              createVaryantsatir(satirlist: $satirlist) {
                _id
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            satirlist: this.satirlist
          }
        })
        .then(async data => {
          // this.varyantlist();
          //  setTimeout(() => {
          //   Loading.hide()
          // }, 3)
          this.$q.notify({
            type: "positive",
            message: `Kayıt Başarılı...`,
            // color:'primary'
            position: "top-right"
          });
         await this.selectstokid()
          //  this.group1=""
          //  this.varyantvalinput=""
        });
    },
    listele(liste) {
      // console.log("hasvaryantsatirlists", this.hasvaryantsatirlists);
        // console.log("liste", liste);
        // console.log("varyantselected", this.varyantselected);

      let selectsat = [];

      liste.forEach((item, i) => {
        // console.log("item", item);
        this.varyantselected.forEach((altitem, index) => {
          if (i > index && item.varyant_id != altitem.varyant_id) {
            // this.hasvaryantsatirlists.forEach((olditem,oldi)=>{
            // if( olditem.varyant_option1_id != altitem._id && olditem.varyant_option2_id != item._id ){
            // console.log(olditem.varyant_option1_name, olditem.varyant_option2_name);
            let obj = {};

            obj.stok_id = this.edittreemselect._id;
            obj.stokname = this.edittreemselect.stokturad;
            obj.varyant1_id = altitem.varyant_id;
            this.checklist.forEach(varyantvalue => {
              if (altitem.varyant_id == varyantvalue.value) {
                obj.varyant1_name = varyantvalue.label;
              } else if (item.varyant_id == varyantvalue.value) {
                obj.varyant2_name = varyantvalue.label;
                
              }
            });

            // console.log("item.color",item.color);
            // console.log("item.color",altitem.color);

            obj.varyant2_id = item.varyant_id;

            obj.varyant_option1_id = altitem._id;
            obj.varyant_option2_id = item._id;
            obj.varyant_option1_name = altitem.varyantname;
            obj.varyant_option2_name = item.varyantname;
            obj.fiyat1 = "";
            obj.miktar = "";
            obj.color=altitem.color;
            obj.sira=item.sira;
            selectsat.push(obj);
            // selectsat = _.sortBy(selectsat, "sira");
            // console.log("sat",sat);
            // }
            // })
          } else {
            // console.log("altitem",altitem);
          }
        });
      });

      let sat = selectsat.filter(
        aItem =>
          !this.hasvaryantsatirlists.find(
            bItem =>
              aItem.varyant_option1_id === bItem.varyant_option1_id &&
              aItem.varyant_option2_id === bItem.varyant_option2_id
          )
      );

      if (sat.length == 0) {
        const dialog = this.$q
          .dialog({
            title: "Hata",
            message: "Yanlış Seçim...!"
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            clearTimeout(timer);
            // console.log('I am triggered on both OK and Cancel')
          });

        const timer = setTimeout(() => {
          dialog.hide();
        }, 3000);
      }
      // console.log(this.hasvaryantsatirlists);
      // console.log(selectsat);
      //  console.log("sat", sat);
      this.satirlists = sat;
    },
    altsel() {
      // console.log(this.group);
      this.varyantlist = [];
      this.allvaryantlist.filter(item => {
        this.varyantgroup.forEach(value => {
          if (value == item._id) {
            this.varyantlist.push(item);
          }
        });
      });
    },
    async create_skus() {
      let arrayim = [];

      this.allvaryantlist.forEach(item => {
        this.varyantselected.forEach(altitem => {
          if (item._id == altitem.varyant_id) {
            // console.log(altitem);
            arrayim.push(altitem);
          }
        });
      });
      // console.log("arrayim",arrayim);
      //  arrayim = _.sortBy(arrayim, "sira");
      this.varyantselected = arrayim;
     await this.listele(this.varyantselected);

      
    },
    //TODO:
    UpdateStok() {
      // console.log(this.liste,this.edittreemselect);
      if (this.edittreemselect == "") {
        const dialog = this.$q
          .dialog({
            title: "Hata",
            message: "Stok Seçilmedi..!"
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            clearTimeout(timer);
            // console.log('I am triggered on both OK and Cancel')
          });

        const timer = setTimeout(() => {
          dialog.hide();
        }, 3000);
      } else {
        Loading.show();
        let self = this;
        this.$apollo
          .mutate({
            mutation: gql`
              mutation updateStokturu(
                $id: String!
                $parentid: String
                $stokkodu:String
                $stokturad: String
                $fiyat1: Float
                $indirim: Float
                $kdv:Float
                $description:String
              ) {
                updateStokturu(
                  id: $id
                  parentid: $parentid
                  stokkodu: $stokkodu
                  stokturad: $stokturad
                  fiyat1: $fiyat1
                  indirim: $indirim
                  kdv:$kdv
                  description:$description
                ) {
                  _id
                }
              }
            `,
            // loadingKey: 'loading',
            variables: {
              id: this.edittreemselect._id,
              stokturad: this.edittreemselect.stokturad,
              stokkodu: this.stok.stokkodu,
              parentid: this.edittreemselect.parentid,
              fiyat1: Number(this.stok.fiyat1),
              indirim: Number(this.stok.indirim),
              kdv:Number(this.stok.kdv),
              description:this.stok.description,
            }
          })
          .then(data => {
            //  console.log(data);
            setTimeout(() => {
              Loading.hide();
            }, 3);
            this.$q.notify({
              type: "positive",
              message: `Kayıt Başarılı...`,
              // color:'primary'
              position: "top-right"
            });

            //  this.group1=""
            //  this.varyantvalinput=""
          });
      }
    },
    // ******************************************
    formatPrice(value) { //tr ye çevir
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatNumber(value) { //us e cevir
      let val = value;
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async hasvaryantsatirliste() {
      await axios
        .post('http://'+ process.env.API +':4000/graphql',{
          query: `query hasvaryantsatirQuery($id: ID! ){
                 hasvaryantsatirQuery(id: $id){
                      _id
                      varyant_option1_id
                      varyant_option1_name
                      varyant_option2_id
                      varyant_option2_name
                      fiyat1
                      indirim
                      kdv
                      description
                      miktar
                      sira
                      
                    }
                 }`,

          variables: {
            id: this.edittreemselect._id
          }
        })
        .then(data => {
          this.hasvaryantsatirlists = data.data.data.hasvaryantsatirQuery;
          this.hasvaryantsatirlists = _.sortBy(this.hasvaryantsatirlists, "sira");
          // console.log(data.data.data.hasvaryantsatirQuery);
        });
    },
    async selectstokid() {
      this.selected = [];
      this.sonselected = [];
      this.varyantselected = [];
      this.allvaryantlist = [];
      this.varyantlist = [];
      this.varyantgroup = [];
      this.checklist = [];
      this.satirlists = [];
      this.satirlist = [];
      this.hasvaryantsatirlists = [];

      await this.hasvaryantsatirliste();
      await this.varyantlists();

      await this.resimlistrefresh();
      Loading.show()
      await axios
        .post('http://'+ process.env.API +':4000/graphql',{
          query: `query StokturuQuery($id: ID! ){
                 StokturuQuery(id: $id){
                      _id
                      parentid
                      stokkodu
                      fiyat1
                      kdv
                      indirim
                      description
                    }
                 }`,

          variables: {
            id: this.edittreemselect._id
          }
        })
        .then(data => {
          this.stok.fiyat1 = data.data.data.StokturuQuery[0].fiyat1;
          this.stok.stokkodu = data.data.data.StokturuQuery[0].stokkodu;
          this.stok.indirim = data.data.data.StokturuQuery[0].indirim;
          this.stok.kdv = data.data.data.StokturuQuery[0].kdv;
          this.stok.description = data.data.data.StokturuQuery[0].description;
        });
        Loading.hide()
    },
    //TODO: varyant listeleri

    // ********************************************
    async imagedelete(obj) {
      console.log("obj:", obj);

      if (!this.edittreemselect._id) {
        const dialog = this.$q
          .dialog({
            title: "Hata",
            message: "Stok Seçilmedi...!"
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            clearTimeout(timer);
            // console.log('I am triggered on both OK and Cancel')
          });

        const timer = setTimeout(() => {
          dialog.hide();
        }, 3000);
      } else {
        console.log("resim silindi");
        this.$apollo
          .mutate({
            mutation: gql`
              mutation deleteimage($id: ID!, $imageid: ID, $path: String) {
                deleteimage(id: $id, imageid: $imageid, path: $path) {
                  _id
                }
              }
            `,
            variables: {
              id: this.edittreemselect._id,
              path: obj.publicid,
              imageid: obj.id
            }
          })
          .then(async data => {
            console.log("Done");
            // storageRef.delete()

            await this.resimlistrefresh();
          });
      }
    },

    //TODO: sON tab
    async resimlistrefresh() {
      const resimlist = await axios.post("http://localhost:4000/graphql", {
        query: `query imgurlQuery($id: ID! ){
                 imgurlQuery(id: $id){
                      vars
                        {
                          images
                          {
                            publicid
                            path
                            filename
                            imageurl
                            id
                          }
                        }
                    }
                 }`,

        variables: {
          id: this.edittreemselect._id
        }
      });
      // console.log("resimlist",resimlist.data.data.imgurlQuery);
      if (resimlist.data.data.imgurlQuery[0].vars == null) {
        this.imgdata = [];
        console.log("boşşşşşşşşşşşşş");
      } else {
        console.log("var");
        this.imgdata = resimlist.data.data.imgurlQuery[0].vars;
      }

      //  console.log(this.imgdatares);
    },

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
        if (value.children) {
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
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.treemselect.filter(v =>
          v.stokturad.toLowerCase().includes(needle)
        );
      });
    },
    async varyantlists() {
      Loading.show()
      await axios
        .post('http://'+ process.env.API +':4000/graphql',{
          query: `query allvaryantQuery{
                 allvaryantQuery{
                      _id
                      varyantname
                      color
                      sira
                      varyant_options{
                        _id
                        varyantname
                        varyant_id
                        color
                        sira
                      }
                    }
                 }`,

          variables: {}
        })
        .then(data => {
          // console.log(data.data.data.allvaryantQuery);
          this.allvaryantlist = data.data.data.allvaryantQuery;
          this.checklist = data.data.data.allvaryantQuery.map(item => ({
            value: item._id,
            label: item.varyantname
          }));
        });
        Loading.hide()
    }
  }
};

// lang="styl"
</script>

<style scoped>
.grid-style-transition {
  transition: transform 0.28s, background-color 0.28s;
}
</style>
