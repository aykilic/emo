<template>
    <div class="q-pa-xl row q-gutter-md justify-center">
        <q-card class="col-md-10 row  col-sm-10  col-xs-12 justify-center">
            <q-card-section class="row">
                <div class="text-h6">Stok Açılış Fişi</div>
                
            </q-card-section>
            <q-separator inset />
            <q-select
          fill-input
          input-debounce="0"
          hide-selected
          use-input
          @filter="filterFn"
          class="q-pa-md col-6"
          label="Stok Adı"
          outlined
          v-model="edittreemselect"
          :options="selectoptions"
          option-value="_id"
          option-label="stokturad"
          @input="selectstokid()"
          auto-select
        ></q-select>


        
        </q-card>
        <q-card class="col-md-10 row  col-sm-10  col-xs-12 ">
            <q-table
            title="Varyant Tablosu"
            :data="hasvaryantsatirlists"
            :columns="columns"
            row-key="_id"
            :pagination.sync="pagination"
            class="col-12"
          >
            <template v-if="hasvaryantsatirlists.length > 0" v-slot:top-right>
                <!-- <q-input borderless dense debounce="300" v-model="arama" placeholder="Bul"> -->
                    <q-btn @click="dialog=true">Düzenle</q-btn>
            </template>
            <template v-slot:body="props" >
              <q-tr :props="props"  class="" >
                <q-td key="adi" :props="props"  >
                  {{props.row.varyant_option1_name}} - {{props.row.varyant_option2_name}}
                </q-td>
                <q-td key="miktar" :props="props"  >
                  {{props.row.miktar}} 
                </q-td>
              </q-tr>


            </template>
          </q-table>
        </q-card>
        <q-dialog
            v-model="dialog"
        >
            <q-card  style="width: 550px">
              <q-card-section >
                <div class="text-h6 text-center">({{edittreemselect.stokturad}}) - Düzenle</div>
              </q-card-section>
                <q-separator inset />
                    <q-card-section class="row " style="margin-top:-10px;margin-bottom:-30px;" v-for="(list,index) in hasvaryantsatirlists" :key="index">
                        <q-item-label  class="self-center col q-mr-md">{{index+1 }} -</q-item-label>
                        <q-item-label  class="col q-mr-md self-center">{{list.varyant_option1_name}} - {{list.varyant_option2_name}}</q-item-label>
                        <q-input class="col-3 q-mr-md " outlined v-model="list.miktar" label="Stoktaki Miktar" dense readonly/>
                        <q-input class="col-3 q-mr-md " outlined v-model="list.ymiktar" label="Miktar Ekle" dense />
                        <!-- <q-input class="col-3 " outlined v-model="list.emiktar" label="Miktar Çıkart" dense /> -->
                        <q-separator class="q-mt-xs"  inset />
                    </q-card-section>
                
              <q-card-section  class="text-right">
                <q-btn class="q-ma-sm"  color="primary" @click="edit()" label="Güncelle"  v-close-popup ></q-btn>
                <q-btn class="q-mr-md"   label="Kapat"  v-close-popup ></q-btn>
              </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import _ from "lodash";
import Cookies from 'js-cookie';
import { Loading } from "quasar";
import {mapGetters } from 'vuex';
    export default {
        data() {
            return {
                list:{ymiktar:0,
                       
                    },
                dialog:false,
                edittreemselect: [],
                selectoptions:[],
                hasvaryantsatirlists:[],
                array:[],
                treemselect:[],
                treem:[],
                columns: [
                    {name: 'adi', label: 'Ürün Adı', align: 'left', sortable: true,
                      field: row =>row.varyant_option1_name + row.varyant_option2_name
                    },
                    {name: 'miktar', label: 'Miktar', align: 'left', sortable: true,field: row => row.miktar},
          ],
          pagination: {
            //  sortBy: 'adi',
        //    ascending: false,
          page: 1,
          rowsPerPage: 20,
          // rowsNumber: 5,q
        },
            }
        },
        watch: {
            anakategorilists(val){
                this.fonk(val)
        }
        },
        computed: {
            ...mapGetters([
                'anakategorilists',
                'geturunlists',
                // 'getvaryantlist',
                ]),
        },
        mounted () {
            // this.fonk(this.anakategorilists)
        },
        methods: {
            
            async fonk(val){
                // let vm =this
                this.treemselect=[]
                let dem = [];
                await this.parseTree(val)
                
                await this.treemselected(dem)
                //   console.log(this.treemselect);
                this.$store.dispatch("urunlist",this.treemselect)
            // console.log(this.treemmenu);
            
            
            // console.log(val);
            },

            edit(){
                
                
                  
               let array=[]
                    //    console.log(this.hasvaryantsatirlists);
                 this.hasvaryantsatirlists.forEach(item=>{
                     let obj = {}
                    var sayi=Number
                    if(item.ymiktar == undefined || item.ymiktar == ""){
                        sayi=0
                    }else{
                        sayi=Number(item.ymiktar)
                    }
                    
                     obj.miktar= Number(item.miktar) + Number(sayi),
                     obj.id=item._id
                    //  console.log(obj);
                    array.push(obj)
                 })
                 this.array=array
                //    console.log(array);
                 Loading.show()
                  this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation updateVaryantMiktar($veri: [varyantlistInput]) {
                            updateVaryantMiktar(veri: $veri) {
                                _id
                                res
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                            veri: this.array
                        }
                        })
                        .then(data => {
                            // console.log(data);
                        // this.varyantlist();
                        //  setTimeout(() => {
                           Loading.hide()
                        // }, 3)
                        this.$q.notify({
                            type: "positive",
                            message: `Kayıt Başarılı...`,
                            // color:'primary'
                            position: "top-right"
                        });
                        this.selectstokid()
                        }).catch(err=>{
                            Loading.hide()
                        });
            },
            // save(){
            //     console.log(this.array);
            // },
           async selectstokid() {
                // console.log(this.edittreemselect);
                await axios
                    .post( process.env.API +':4000/graphql',{
                    query: `query hasvaryantsatirQuery($id: ID! ){
                            hasvaryantsatirQuery(id: $id){
                                _id
                                varyant_option1_id
                                varyant_option1_name
                                varyant_option2_id
                                varyant_option2_name
                                fiyat1
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
                // this.hasvaryantsatirlists = _.orderBy(this.hasvaryantsatirlists, ['varyant_option1_name','varyant_option2_name'],['asc']);
                });
            },

            filterFn(val, update, abort) {
                update(() => {
                    const needle = val.toLowerCase();
                    this.selectoptions = this.geturunlists.filter(v =>
                    v.stokturad.toLowerCase().includes(needle)
                    );
                });
                },

        
        parseTree(selfQ, parentID = null) {
            // console.log("1");
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
        }
    }
</script>

<style lang="scss" scoped>

</style>