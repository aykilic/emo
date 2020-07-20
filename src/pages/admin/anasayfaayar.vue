<template>
    <div class="q-pa-xl row q-gutter-md">
        <q-card class="row q-pa-md col-md-12 col-xs-12 ">
            <anaslidercloud
                
                v-on:refreshlist="slider1listrefresh"
                label="Ana Sayfa Slider"
                class="row col-12"
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
                           Durum: {{ file.__status }} 
                        </q-item-label>

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }} 
                        </q-item-label>
                      </q-item-section>

                      <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                        <img style="object-fit: contain;" :src="file.__img.src" />
                      </q-item-section>

                      <q-item-section  side>
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
            </anaslidercloud>
            <div class="col-12">
              <q-table
                :data="slider1imgdata"
                :columns="slider1columns"
                row-key="_id"
                selection="single"
                no-data-label="Veri Bulunamadı...!"
                grid
                hide-header
                :pagination.sync="sliderpagination"
              >
                <template v-slot:item="props">
                  <!-- <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >-->
                  <div class="q-pa-xs row col-4">
                    <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                    <q-card class="col">
                      <q-card-section class="row">
                        <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->

                        <q-item-label class="q-pt-md">{{props.row.filename}}</q-item-label>
                        <q-space></q-space>
                        <q-btn
                          @click="imagedelete(props.row)"
                          icon="delete"
                          color="grey-7"
                          flat
                          round
                        ></q-btn>
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section @click="slider1sira=true,val=props.row" style="cursor:pointer;position: relative;text-align: center;">
                          <!-- :label="`${props.row.sira}`" -->
                          
                        <q-img
                          :src="props.row.imageurl"
                          spinner-color="primary"
                          spinner-size="82px"
                          style="display: inline-block;text-align:center;"
                          
                          
                        ></q-img><div class="text-h2 text-black  text-weight-medium"  style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)"> {{ props.row.sira }} </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
            </q-card>
            <q-dialog v-model="slider1sira">
                <q-card style="width: 500px; max-width: 80vw;">
                    <q-card-section class="row items-center">
                    <div class="text-h6 text-center">Resim Sıralaması</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>

                    <q-card-section>
                    <q-input
                        class="q-pa-md"
                        outlined
                        v-model="val.sira"
                        label="Sira"
                        :dense="false"
                    />
                    </q-card-section>

                    <q-card-section class="text-right">
                    <q-btn
                        class="q-ma-sm"
                        color="primary"
                        label="Güncelle"
                        @click="updateSlider1()"
                        v-close-popup
                    ></q-btn>
                    <!-- <q-btn
                        class="q-mr-md"
                        color="negative"
                        label="Kapat"
                        
                        v-close-popup
                    ></q-btn> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {mapGetters } from 'vuex';
import gql from "graphql-tag";
import _ from "lodash";
// import { date } from 'quasar'
import moment from 'moment'
import anaslidercloud from "../../components/anaslidercloud.vue";
    export default {
        components: {
            anaslidercloud,
        },
        data() {
            return {
                val:"",
                slider1sira:false,
                slider1imgdata:[],
                slider1columns: [
                    {
                    name: "adi",
                    label: "resim",
                    align: "left",
                    sortable: true,
                    field: row => row.images.imageurl
                    }
                ],
                sliderpagination: {
                    // sortBy: 'ust',
                    // descending: false,
                    page: 1,
                    rowsPerPage: 10,
                    // rowsNumber: 5,q
                    },
            }
        },
        
        watch: {
            
        },
        computed: {

        },
        async mounted () {
            await this.slider1listrefresh()
        },
        methods: {
           async slider1listrefresh(){
                await axios.post("http://localhost:4000/graphql", {
                query: `query slider1list{
                 slider1list{
                      slider1
                          {
                            _id
                            publicid
                            path
                            filename
                            imageurl
                            sira
                            
                        }
                    }
                 }`,
                }).then(async res => {
                        this.slider1imgdata=res.data.data.slider1list[0].slider1
                        this.slider1imgdata = _.orderBy(this.slider1imgdata, ['sira'],['asc']);
                    });  
           },
           async updateSlider1(){
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation anasayfaimageUpdate($id: ID!, $sayi: Float) {
                        anasayfaimageUpdate(id: $id, sayi: $sayi) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: this.val._id,
                    sayi: Number(this.val.sira),
                    }
                })
                .then(async data => {
                    await this.slider1listrefresh()
                })
           },
           async imagedelete(val){
            //    console.log("val",val);
               this.$apollo
                .mutate({
                    mutation: gql`
                    mutation deletehomePageimageSlider1($id: ID!, $imageid: ID, $path: String) {
                        deletehomePageimageSlider1(id: $id, imageid: $imageid, path: $path) {
                        _id
                        }
                    }
                    `,
                    variables: {
                    id: val._id,
                    path: val.publicid,
                    imageid: val._id
                    }
                })
                .then(async data => {
                    console.log("Done");
                    // storageRef.delete()
                    await this.slider1listrefresh()
                    // this.resimlistrefresh();
                });

           }
        },
    }
</script>

<style lang="scss" scoped>

</style>