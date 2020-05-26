<template>
  <div class="q-pa-xl row q-gutter-md">

    <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12 "
            title=""
    >

        <div class="col-12">
          <q-card-section >
            <!-- <div class="text-h6 text-center col-6" >Stok Detay</div> -->
            <div class="row">
            <div class="col-12 text-center text-h6" >Stok Detay</div>
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
              class="q-pa-md "
              label="Stok Adı"
              outlined
              v-model="edittreemselect"
              :options="options"
              option-value="_id"
              option-label="stokturad"
              @input="selectstokid()"
              auto-select
            >
              
            </q-select>



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
          <q-tab name="one"   label="Stok Detay" ></q-tab>
          <q-tab name="two"   label="Varyant" ></q-tab>
          <q-tab name="three" label="Resim" ></q-tab>
        </q-tabs>

        <q-separator ></q-separator>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <!-- <q-badge color="red" class="text-h6 ">
                  Kategori Listesinden Seçiniz !...
                </q-badge> -->
                <div class="row">
            <div class="col-11 text-center text-h6" >Stok Ayrıntı</div>
            <q-btn class="col-1 text-right " @click="UpdateStok()" color="primary" label="Kaydet" />
            </div>
            <div class="q-pt-xs row  q-col-gutter-md ">
              <!-- <div class="col-2 text-h6" >Birim :</div> -->
              
              <div class="col-6 row q-gutter-y-md">
                
                  <div class="col-12 q-gutter-y-md">
                <q-input 
                              outlined
                              label="Stok Kodu"
                              class="col-6 hint"
                              hint="Stok Kodu Girilmez ise Otomatik Oluşturulacaktır...!"
                              />
                <q-input 
                              outlined
                              label="Kdv"
                              class="col-6 hint"
                              hint="Kdv Oranını Giriniz...!"
                              />
                
                <q-select 
                class="col-6 hint"
                outlined
                v-model="birimselect" 
                :options="birimList"
                option-value="_id"
                option-label="birimad"
                hint="Birim Seçiniz...!" 
                label="Birim" />
                
                <q-input 
                              outlined
                              v-model="stok.fiyat1"
                              suffix="TL"
                              mask=" #.##"
                              fill-mask="0"
                              reverse-fill-mask
                              label="Fiyat 1"
                              class="col-6 hint"
                              hint="Ana Fiyatı Giriniz...!"
                              />
                <!-- <imask-input
                    v-model="stok.fiyat1"
                    :mask="Number"
                    radix="."
                    :unmask="true"
                    
                    @accept="onAccept"
                    
                    placeholder='Enter number here'
                  /> -->
                  
                <q-input 
                              outlined
                              v-model="stok.fiyat2"
                              suffix="TL"
                              mask=" #.##"
                              fill-mask="0"
                              reverse-fill-mask
                              label="Fiyat 2"
                              class="col-6 hint"
                              hint="ikincil Fiyatı Giriniz...!"
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
                              />
                  </div>
              </div>      
              
            <!-- <q-select
              
                class="q-pa-md "
                label="Stok Adı"
                outlined
                v-model="edittreemselect"
                :options="options"
                option-value="_id"
                option-label="stokturad"
              > -->
                <!--      option-value="id"-->
                <!--      option-label="stokturad"-->
                <!--      :display-value ="`${ustkategori.stokturad ? ustkategori.stokturad : 'Yok'}`"-->
              <!-- </q-select> -->


              <!-- <div class="col-2 " >
                <q-input  label="Birim"   outlined dense />
              </div> -->
            </div>
<!--            <div class="q-pt-xs row">-->
<!--              <div class="col-2 text-h6" >Birim1 :</div>-->
<!--              <div class="col-2 " >-->
<!--                <q-input    outlined dense />-->
<!--              </div>-->
<!--            </div>-->

          </q-tab-panel>

          

          <q-tab-panel name="two">
            
              <div class="col-12 text-h6 text-center" >Varyant Kategori </div>
              
              <div class="col-12 row">
              <div  class="col">
                
                  <div  class="text-h6 q-pa-lg">Varyant Şeması</div>
                  
                 
                  <q-separator inset />
                  <div class="row q-pt-lg q-pl-lg q-pr-lg">
                          <q-tree
                          style="font-size:16px"
                          :nodes="varyanttreem"
                          :selected.sync="vselected"
                          @update:selected="shemaselected()"
                          no-nodes-label="Stok Seçmelisiniz..!"
                          
                          
                          node-key="_id"
                          label-key="varyantname"
                          ref="nodes"
                          default-expand-all
                          />
                          </div>
                          <!-- @update:selected="dene" -->
              <!-- <q-separator class="q-mt-lg" inset /> -->

              <!-- <div class="col-12 row q-pt-lg q-pl-lg q-pr-lg" v-for= "(value, index) in varyantlist" :key = "index">
                  
                   <q-radio @input="altvaryantquery(`${value.value}`,`${index}`)" v-model="group1" :val="value" :label="`${value.label}`"  />
                    <q-space />
                   <q-btn @click="deleteilkvaryant(`${value.value}`)" icon="delete" color="grey-7" flat round></q-btn>
            </div> -->
            
              </div>
              
              <q-separator class="q-mt-lg" vertical inset />
              
              <div  class=" col  ">
                
                  <div class="text-h6 q-pa-lg">Varyant Ekle</div>
                  <q-separator inset />
                  <q-input 
                              outlined
                              label="Varyant"
                              class="q-pa-md hint"
                              hint="Eklemek istediğiniz Bağlı Varyantı Giriniz...!"
                              v-model="varyantvalinput"
                              >
                              
                              <template v-slot:append>
                                <!-- <q-icon name="colorize" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color v-model="color" />
                                  </q-popup-proxy>
                                </q-icon> -->
                                <q-btn @click="addvaryantkategori()" round dense flat icon="add" />
                              </template>
                   </q-input>           
              <!-- <q-separator v-if="varyantlist || varyantlist !=''" class="q-mt-lg" inset /> -->
              <div class="col-12 row q-pt-lg q-pl-lg q-pr-lg" v-for= "(value, index) in varyantlist" :key = "index">
                  <!-- <varyantkategori :options="value"  >
                    
                  </varyantkategori> -->
                   <!-- <q-radio  v-model="group1"  :val="`${value._id}`" :label="`${value.label}`" @input="varyantimg(`${value._id}`,`${value.varyantid}`)" /> -->
                   <q-radio  v-model="group1"  :val="value.value" :label="value.label" @input="varyantimg(value.value,value.label)" />
                    <q-space />
                   <q-btn @click="deletevaryant(value.value)"  icon="delete" color="grey-7" flat round></q-btn>
            </div>
            
            <div v-if="(vselected || group1) && varyantlist.length" class="q-pa-md row col-12">
              
              <q-card class="row col-12">
        <q-tabs
          v-model="altvartab"
          dense
          class="text-grey col-12 "
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="vone" label="Resim Yükleme" />
          <q-tab name="vtwo" label="Etiket Yükleme" />
          <q-tab name="vtree" label="Fiyat Yükleme" />
          
        </q-tabs>

        <q-separator ></q-separator>

        <q-tab-panels class="col-12" v-model="altvartab" animated>
          
          <q-tab-panel   name="vone">
            <div class="text-center row">
            <altcloud
                    
                    :stokid="edittreemselect._id"
                    :varyantid="group1"
                    
                    label="Varyant Resim Yükleme"
                    
                    class="col-12 "
                    v-on:varyantrefreshlist="varyantresimlistrefresh"
                    multiple
                    color="white"
                    text-color="black"
                    >
                <template v-slot:list="scope">
                        <q-list separator>

                          <q-item v-for="file in scope.files" :key="file.name">
                            <q-item-section>
                              <q-item-label class="full-width ellipsis">
                                {{ file.name }}
                              </q-item-label>

                              <q-item-label caption>
                                
                              </q-item-label>

                              <q-item-label caption>
                                
                              </q-item-label>
                            </q-item-section>

                            <q-item-section
                              v-if="file.__img"
                              thumbnail
                              class="gt-xs"
                            >
                              <img :src="file.__img.src">
                            </q-item-section>

                            <q-item-section top side>
                              <q-btn
                                class="gt-xs"
                                size="12px"
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
                </altcloud>


          </div>
          </q-tab-panel>

          <q-tab-panel  name="vtwo">
           
            <q-card  class="col-12">
                <q-card-section class="bg-grey-2 row">
                  <div class="text-subtitle2  col-3">Renk</div>
                  <div class="text-subtitle2 text-center col">Miktar </div>
                  <div class="text-subtitle2 text-center col">Fiyat1 </div>
                  <div class="text-subtitle2 text-center col">Fiyat2 </div>
                  
                </q-card-section>
                <q-card-section class="q-col-gutter-md">
                   
                    <ul v-for="(varyant,key) in varyantlist" class="row " :key=key @click.prevent="etiketdialog(varyant.value, varyant.color,)" style="cursor:pointer">
                      
                      <li class="text-subtitle2 col text-center self-center col-3"  :style="{'background-color':varyant.color,'border-radius':'15px','list-style-type': 'none'}">
                          {{varyant.label}}
                      </li>
                       <li class="text-subtitle2 text-center self-center col " label='Miktar' style="margin-left:20px;list-style-type: none;">
                        <q-item-label >{{ formatNumber(varyant.miktar) }}</q-item-label>
                      </li>
                      <li class="text-subtitle2 text-center self-center col " label='Fiyat1' style="margin-left:20px;list-style-type: none;">
                        <q-item-label >{{formatPrice(varyant.fiyat1)}} TL</q-item-label>
                      </li>
                      <li class="text-subtitle2 text-center self-center col " label='Fiyat2' style="margin-left:20px;list-style-type: none;">
                        <q-item-label >{{formatPrice(varyant.fiyat2)}} TL</q-item-label>
                      </li>
                    </ul>
                    <q-dialog v-model="prompt"  persistent>
                        <q-card  style="min-width: 550px">
                          <q-card-section class="row items-center ">
                            <div class="text-h6">Seçim</div>
                            <q-space />
                            <q-btn icon="close" flat round dense @click="closedialog()"  /> 
                          </q-card-section>

                          <q-card-section v-for="(varyant,key) in varyantlist" :key=key class="row q-pt-none q-col-gutter-md">
                            
                            <q-input
                                  class="col-3"
                                  :label="varyant.label"
                                  
                                  v-model="varyant.color"
                            >
                                  <template v-slot:append>
                                    <q-icon name="colorize" class="cursor-pointer">
                                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-color no-header v-model="varyant.color"  />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                            </q-input>
                            <q-input
                            class="col"
                            label="Miktar"
                            v-model="varyant.miktar"
                            />
                            <q-input
                            class="col"
                            label="Fiyat1"
                            suffix="TL"
                            mask=" #.##"
                            fill-mask="0"
                            reverse-fill-mask
                            v-model="varyant.fiyat1"
                            />
                            <q-input
                            class="col"
                            label="Fiyat2"
                            suffix="TL"
                            mask=" #.##"
                            fill-mask="0"
                            reverse-fill-mask
                            v-model="varyant.fiyat2"
                            />
                            
                          </q-card-section>

                          <q-card-actions align="right" class="text-primary">
                            <q-btn flat label="Kapat" @click="closedialog()"  />
                            <q-btn flat label="Ok"  @click="etiketsec()" />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                    <!-- <q-dialog v-model="prompt" persistent>
                        <q-card style="min-width: 350px">
                          <q-card-section>
                            <div class="text-h6">Renk</div>
                          </q-card-section>

                          <q-card-section class="q-pt-none">
                            <q-input
                                  
                                  v-model="renk.color"
                                  class="my-input"
                                >
                                  <template v-slot:append>
                                    <q-icon name="colorize" class="cursor-pointer">
                                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-color v-model="renk.color" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                          </q-card-section>

                          <q-card-actions align="right" class="text-primary">
                            <q-btn flat label="Kapat" v-close-popup />
                            <q-btn flat label="Ok"  @click="etiketsec()" />
                          </q-card-actions>
                        </q-card>
                      </q-dialog> -->
                </q-card-section>
              </q-card>
          </q-tab-panel>

          
        </q-tab-panels>
      </q-card>
              
              </div>
              
              </div>
              
            </div>
            <q-card class=col-1>
              <div v-if="varimage && group1!=''" class=" text-center">
                
                <q-img
                      :src="varimage.imageurl"
                      spinner-color="white"
                      style="height: 100px; max-width: 100px"
                    />
                <q-btn 
                @click="varyantimagedelete"
                icon="delete" color="grey-7" flat round></q-btn>
              </div>

            </q-card>
            
          </q-tab-panel>

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
                          <q-item-label class="full-width ellipsis">
                            {{ file.name }}
                          </q-item-label>

                          <q-item-label caption>
                            <!-- Durum: {{ file.__status }} -->
                          </q-item-label>

                          <q-item-label caption>
                            <!-- {{ file.__sizeLabel }} / {{ file.__progressLabel }} -->
                          </q-item-label>
                        </q-item-section>

                        <q-item-section
                          v-if="file.__img"
                          thumbnail
                          class="gt-xs"
                        >
                          <img :src="file.__img.src">
                        </q-item-section>

                        <q-item-section top side>
                          <q-btn
                            class="gt-xs"
                            size="12px"
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
              > -->
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3" >
                
              
                <!-- <q-card :class="props.selected ? 'bg-grey-2' : ''"> -->
                <q-card >
                  <q-card-section class="row">
                    <!-- <q-checkbox dense v-model="props.selected" label="Ürün Resmi" ></q-checkbox> -->
                  
                  <q-item-label class="q-pt-md">{{props.row.images.filename}}</q-item-label>
                  <q-space></q-space> 
                  <q-btn @click="imagedelete(props.row.images)"  icon="delete" color="grey-7" flat round></q-btn>
                  </q-card-section>
                  <q-separator ></q-separator>
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
  import Vue from 'vue'
  import axios from 'axios'
  import gql from 'graphql-tag'
//   import varyantkategori from '../../components/varyantkategori.vue'
  // import QFirebaseUploaderBase from '../../components/QFirebaseUploaderBase.vue'
   import cloud from '../../components/cloudinary.vue'
   import altcloud from '../../components/altcloudinary.vue'
//   import firebase from '../../services/fireinit'
//   import {storage} from '../../services/fireinit'
  import * as is from '../../../node_modules/is_js'
  import {Loading} from 'quasar'
  
//   import * as is from 'is_js'
    export default {
      //  mixin:{
      //    methods:{
      //      resimlist(){
      //       this.resimlistrefresh()
      //       }
      //  }
      //  },
      
      props:['value,label'],
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


      data(){
         return{
           loading:0,
           etiketkey:0,
           varimage:"",
           imgdata:[],
           imgdatares:[],
           resimcolumns: [{name: 'adi', label: 'resim', align: 'left', sortable: true,field: row => row.images.imageurl},
          ],
          
          selected:[],
            
           group1:"",
           group2:"",
           ilkvaryantid:"",
           ilkvaryantindex:"",
           altvaryantid:"",

           varyantvalinput:"",
           altvaryantvalinput:"",
           varyantlist:[],
           altvaryantlist:[],
           // varyanykatdat:[],
           options:[],
           ustkategori:
             {_id: null},
           denemem:[],
            treem:[],
            treemselect:[],
           
           edittreemselect:"",
           tab:'one',
           altvartab:'vone',
           attrr:"",

          stok:{
            kod:"",
            kdv:"",
            birim:"",
            fiyat1:"",
            fiyat2:"",
            doviz:"",
            aciklama:"",
          },
          birimselect:"",
          birimList:[],
          pagination: {
            rowsPerPage: 6,
          },
          prompt:false,
          varyant:{
            id:[],
            altvaryantname:"",
            color:[],
            label:[],
            miktar:[],
            fiyat1:[],
            fiyat2:[],
          },
          
          //TODO:
          
          liste:[],
          vselected:"",
          varyantschema:[],
          vtreem:[],
          varyanttreem:[],
          mask: {
          mask: '{8}000000',
          lazy: false
          },
          onAccept (e) {
            const maskRef = e.detail;
            console.log('accept', maskRef.stok.fiyat1);
          },
          onComplete (e) {
            const maskRef = e.detail;
            console.log('complete', maskRef.unmaskedValue);
          }
         }
      },
      // watch:{
      //     vselected(){

      //     }
      // },
      updated() {
        // this.$refs.nodes.expandAll();
      },
      watch:{
         
      
        
      },
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
      
      async mounted () {

        // this.denemem = await this.$apollo.query({query: variantselectQuery})
        // console.log(this.varyantlist.length);
        // Loading.show()
        const res = await axios.post(
          'http://localhost:4000/graphql', {
            query: `{
                    Query {
                              stokturad
                              _id
                              parentid
          }
        }`,
        loadingKey: 'loading',
          });
          
          const birim = await axios.post(
          'http://localhost:4000/graphql', {
            query: `{
                    birimList {
                              _id
                              birimad
          }
        }`
          });
        
        this.denemem = res.data.data.Query;
        this.birimList=birim.data.data.birimList;
        // console.log(this.varyantschema);
        
        // this.varyantlist=[this.varyantlist]
        // console.log(this.varyantlist);
        // this.varyanlistguncelle()
        this.parseTree(this.denemem);

        let dem=[];
        this.treemselected(dem)
        // console.log(this.simple);
        // Loading.hide()
        this.$nextTick(function () {
              // this.$refs.nodes.expandAll();
            })
      },
      methods:{
        UpdateStok(){
            // console.log(this.liste,this.edittreemselect);
            if( this.edittreemselect=="" ){
              const dialog = this.$q.dialog({
                  title: 'Hata',
                  message: 'Stok Seçilmedi..!'
                }).onOk(() => {
                  // console.log('OK')
                }).onCancel(() => {
                  // console.log('Cancel')
                }).onDismiss(() => {
                  clearTimeout(timer)
                  // console.log('I am triggered on both OK and Cancel')
                })

                const timer = setTimeout(() => {
                  dialog.hide()
                }, 3000)
            }else{
              Loading.show()
              let self=this
              this.$apollo.mutate({
              mutation: gql`mutation updateStokturu($id: String!,$parentid:String, $stokturad: String, $fiyat1:Float, $fiyat2:Float ){
                updateStokturu(id: $id, parentid:$parentid, stokturad: $stokturad, fiyat1: $fiyat1, fiyat2: $fiyat2)
                {
                _id
                }
                }`,
                // loadingKey: 'loading',
              variables:{
                
                id: this.edittreemselect._id,
                stokturad:this.edittreemselect.stokturad ,
                parentid:this.edittreemselect.parentid,
                fiyat1:Number(this.stok.fiyat1) ,
                fiyat2:Number(this.stok.fiyat2) ,

                
              },
          

              }).then(data => {
                //  console.log(data);
                 setTimeout(() => {
                  Loading.hide()
                  
                }, 3)
                 this.$q.notify({
                    type: 'positive',
                    message: `Kayıt Başarılı...`,
                    // color:'primary'
                    position:'top-right'
                  })
      
                 
                //  this.group1=""
                //  this.varyantvalinput=""
              });
            }
        },
        // ******************************************
        formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatNumber(value) {
        let val = (value)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        shemaselected(){
          // console.log(this.vselected);
          
            this.varyanlistguncelle()
            
            this.group1=""
            this.varyantresimlistrefresh()
            console.log("schema",this.varyantlist);
        },

       async selectstokid(){
          //  console.log(this.edittreemselect)
          
          this.altvaryantid=""
          this.ilkvaryantid=""
          this.ilkvaryantvalinput=""
          this.altvaryantvalinput=""
          this.altvarimage=""
          this.group1=""
          this.vselected=""
          this.varyantlist=""
          
          this.resimlistrefresh()
          
          await axios.post(
          'http://localhost:4000/graphql', {
            query:`query StokturuQuery($id: ID! ){
                 StokturuQuery(id: $id){
                      _id
                      parentid
                      fiyat1
                      fiyat2
                    }
                 }`,
                 
               variables:{
                
                 id: this.edittreemselect._id,
                

               },
          }).then(data => {


            this.stok.fiyat1=data.data.data.StokturuQuery[0].fiyat1;
            this.stok.fiyat2=data.data.data.StokturuQuery[0].fiyat2;
            
          });
            
          // Loading.show()
          const vary = await axios.post(
          'http://localhost:4000/graphql', {
            query:`query varyantschemaQuery($stokid: ID! ){
                 varyantschemaQuery(stokid: $stokid){
                     _id
                      varyantname
                      parentid
                      
                    }
                 }`,
                 
               variables:{
                
                 stokid: this.edittreemselect._id,
                

               },
          });
          this.liste=vary.data.data.varyantschemaQuery;
          this.varyantTree(this.liste)
            //  console.log(this.varyanttreem);
           // TODO: varyantlist
          this.varyanttreem = [{_id:null, parentid:null, 'varyantname':this.edittreemselect.stokturad, icon: 'code', 'children':this.varyanttreem}]

          // console.log(this.varyanttreem);
          
          // console.log(this.edittreemselect);
          

            
          
          // await console.log(this.varyanttreem);
          
            // Loading.hide()
        },
        //TODO: varyant listeleri
          async varyanlistguncelle(){
             
              //  console.log(stokid);
              
               await axios.post(
            'http://localhost:4000/graphql', {
              query: `query varyantquery($stokid:ID,$parentid: ID){
                      varyantQuery(stokid:$stokid, parentid: $parentid){
                                _id
                                varyantname
                                color
                                miktar
                                fiyat1
                                fiyat2
                }
              }`,
              
              variables: {
                          parentid: this.vselected,
                          stokid:this.edittreemselect._id
                          },
              // update:data=>data.varyantQuery
                }).then(data => {
                  // console.log("burada",data.data.data);
                  this.varyantlist = data.data.data.varyantQuery.map(({ _id, varyantname, color, miktar, fiyat1, fiyat2 }) => ({ value: _id, label: varyantname, color: color, miktar: miktar, fiyat1: fiyat1, fiyat2: fiyat2 }));
                  // console.log("hobaa");
                  //  console.log(this.varyantlist);
                });
                
              //  this.varyantlist = [varyant.data.data.varyantQuery.map(({ _id, varyantname }) => ({ value: _id, label: varyantname }))];
              // console.log("varyantlist",varyant.data.data.varyantQuery);
              
              
              // this.altvaryantlist=""
              // this.group1=""
              // console.log(this.varyantlist);
              // console.log(this.varyantkey);
              
              
          },
       async varyantimg(){
          // console.log(this.group1);
        //  this.altvaryantid=id
          this.varyantresimlistrefresh()
        
        },

        // ********************************************
       async imagedelete(obj){
           console.log("obj:",obj);
          


        
             if(!this.edittreemselect._id){
              const dialog = this.$q.dialog({
                  title: 'Hata',
                  message: 'Stok Seçilmedi...!'
                }).onOk(() => {
                  // console.log('OK')
                }).onCancel(() => {
                  // console.log('Cancel')
                }).onDismiss(() => {
                  clearTimeout(timer)
                  // console.log('I am triggered on both OK and Cancel')
                })

                const timer = setTimeout(() => {
                  dialog.hide()
                }, 3000)
            }else{
                console.log("resim silindi");
               this.$apollo.mutate({
            mutation: gql`mutation deleteimage($id: ID!, $imageid:ID,$path:String){
                deleteimage(id: $id, imageid:$imageid, path:$path)
                {
                _id
                }
              }`,
              variables:{
                    id: this.edittreemselect._id,
                    path:obj.publicid,
                    imageid:obj.id
            },
          
          }
        ).then(data => {
          console.log('Done');
          // storageRef.delete()
          
           this.resimlistrefresh()
        });
       }
                
        },

        

        /////********************************************* */
       async varyantimagedelete(){
          
            //  if(!this.edittreemselect._id){
            //   const dialog = this.$q.dialog({
            //       title: 'Hata',
            //       message: 'Stok Seçilmedi...!'
            //     }).onOk(() => {
            //       // console.log('OK')
            //     }).onCancel(() => {
            //       // console.log('Cancel')
            //     }).onDismiss(() => {
            //       clearTimeout(timer)
            //       // console.log('I am triggered on both OK and Cancel')
            //     })

            //     const timer = setTimeout(() => {
            //       dialog.hide()
            //     }, 3000)
            // }else{
                console.log("resim silindi");
               this.$apollo.mutate({
            mutation: gql`mutation deletevaryantimage($id: ID!, $imageid:ID,$path:String){
                deletevaryantimage(id: $id, imageid:$imageid, path:$path)
                {
                _id
                }
              }`,
              variables:{
                    id: this.group1,
                    path:this.varimage.publicid,
                    imageid:this.varimage.id
            },
          
          }
        ).then(data => {
          console.log('Done');
          // storageRef.delete()
          
           this.varyantresimlistrefresh()
        });
      //  }
                
        },
        
        
        
        
        
        addvaryantkategori(){
          
          
            if( this.varyantvalinput=="" || this.vselected==""){
              const dialog = this.$q.dialog({
                  title: 'Hata',
                  message: 'Yanlış Seçim...!'
                }).onOk(() => {
                  // console.log('OK')
                }).onCancel(() => {
                  // console.log('Cancel')
                }).onDismiss(() => {
                  clearTimeout(timer)
                  // console.log('I am triggered on both OK and Cancel')
                })

                const timer = setTimeout(() => {
                  dialog.hide()
                }, 3000)
            }else{
              this.$apollo.mutate({
              mutation: gql`mutation createvaryant($stokid: ID!,$parentid:ID, $varyantname: String! ){
                createVaryant(stokid: $stokid, parentid:$parentid, varyantname: $varyantname)
                {
                _id
                }
                }`,
              variables:{
                
                stokid: this.edittreemselect._id,
                varyantname: this.varyantvalinput,
                parentid:this.vselected
              },
          //           refetchQueries: [
          //   {
          //     query: gql`{
          //     varyantQuery{
          //       _id
          //       varyantname
          //     }
          //   }`
            
          //   }
          // ]

              }).then(data => {
                //  console.log(data);
                 setTimeout(() => {
                  this.varyanlistguncelle()
                  this.selectstokid()
                }, 3)
                 
                 
                 this.group1=""
                 this.varyantvalinput=""
              });
            }
            
                  
              
             
            // console.log(this.edittreemselect._id, this.ilkvaryantvalinput);
        },
        
        
         
           
          
          async deletevaryant(varyantid){
              // console.log(ilkvar);
              this.$apollo.mutate({
            mutation: gql`mutation deletevaryant($id: ID!){
                deleteVaryant(id: $id)
                {
                _id
                }
              }`,
              variables:{
                    id: varyantid,
            },
          //   refetchQueries: [
          //   {
          //     query: gql`{
          //     varyantQuery{
          //       _id
          //       varyantname
          //     }
          //   }`
            
          //   }
          // ]
          }
        ).then(async data => {
          this.varyanlistguncelle()
          //  this.selectstokid()
          this.resimlistrefresh()
          
          
            
          // Loading.show()
          const vary = await axios.post(
          'http://localhost:4000/graphql', {
            query:`query varyantschemaQuery($stokid: ID! ){
                 varyantschemaQuery(stokid: $stokid){
                     _id
                      varyantname
                      parentid
                    }
                 }`,
                 
               variables:{
                
                 stokid: this.edittreemselect._id,
                

               },
          });
          this.liste=vary.data.data.varyantschemaQuery;
          this.varyantTree(this.liste)
            //  console.log(this.varyanttreem);
           // TODO: varyantlist
          this.varyanttreem = [{_id:null, parentid:null, 'varyantname':this.edittreemselect.stokturad, icon: 'code', 'children':this.varyanttreem}]

        });
        
          
          },
          
          
        


         async etiketdialog(){
            
          //  console.log("vl",this.varyantlist);
          

          
          this.prompt = true;
          this.etiketkey = 0

        },
        // renksec(key,color){
        //   // console.log("key",key);
        //   //  console.log("color",this.varyant.color);
        //   this.varyant.color[key]=color;

        //   // console.log("idx",this.varyant.color);
        // },
        closedialog(){
          this.varyanlistguncelle()
          this.prompt = false;
        },
        async etiketsec(){
            
            // this.varyantedit=this.varyant
          var value = [];
          var label = [];
          var color = [];
          var miktar = [];
          var fiyat1 = [];
          var fiyat2 = [];
          
          this.varyantlist.forEach((values,i)=>{
          value.push(values.value)
          label.push(values.label)
          color.push(values.color)
          miktar.push(Number(values.miktar))
          fiyat1.push(Number(values.fiyat1))
          fiyat2.push(Number(values.fiyat2))
          })
         
          this.varyant.id = value
          this.varyant.color = color
          this.varyant.miktar = miktar
          this.varyant.label = label
          this.varyant.fiyat1 = fiyat1
          this.varyant.fiyat2 = fiyat2
            //  console.log(this.varyantlist);   ///önemli
            //  console.log("ön",this.varyant);
            this.$apollo.mutate({
                  mutation: gql`mutation updatevaryantcolors($id: [ID!], $color:[String], $miktar:[Int], $label:[String!], $fiyat1:[Float], $fiyat2:[Float]){
                      updatevaryantcolors(id: $id, color: $color, miktar:$miktar, label:$label, fiyat1:$fiyat1, fiyat2:$fiyat2)
                      {
                      _id
                      }
                    }`,
                    variables:{
                          id:       this.varyant.id,
                          color:    this.varyant.color,
                          miktar:   this.varyant.miktar,
                          label:    this.varyant.label,
                          fiyat1:   this.varyant.fiyat1,
                          fiyat2:   this.varyant.fiyat2,
                    },
                
                }
              ).then(data => {
                // console.log('Done');
                // this.varyanlistguncelle()
                this.prompt=false;
                
              });
            // this.altvaryantquery(this.ilkvaryantid)
            
            // this.prompt=false;
            // console.log(this.etiketkey);
            
        },
        //TODO: sON tab
         async resimlistrefresh(){
          const resimlist = await axios.post(
          'http://localhost:4000/graphql', {
            query:`query imgurlQuery($id: ID! ){
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
              
                 
               variables:{
                
                 id: this.edittreemselect._id,
                

               },
          });
              // console.log("resimlist",resimlist.data.data.imgurlQuery);
          if(resimlist.data.data.imgurlQuery[0].vars==null){
            this.imgdata=[]
            console.log("boşşşşşşşşşşşşş");
            
          }else{
            this.imgdata = resimlist.data.data.imgurlQuery[0].vars
            
          }
          
          //  console.log(this.imgdatares);
         },
         async varyantresimlistrefresh(){
          
          
           await axios.post(
          'http://localhost:4000/graphql', {
            query:`query varyantimgurlQuery($id: ID!){
                 varyantimgurlQuery(id: $id){
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
                 
               variables:{
                
                 id: this.group1,
                

               },
          }).then(data=>{
                if(data.data.data.varyantimgurlQuery){
                  if(data.data.data.varyantimgurlQuery[0].vars.length<1){
                    
                    // console.log("boşşşşşşşşşşşşş");
                    this.varimage=""
                    
                  }else{
                    this.varimage = data.data.data.varyantimgurlQuery[0].vars[0].images
                    
                  }
                  }

          });
       
          // console.log('altresimlist',altresimlist );
          
          // console.log("varimage",this.varimage);
          
       
        },
        parseTree(selfQ, parentID=null){
          let treem = [];


          selfQ.forEach((value, index) => {

            if(value.parentid === parentID){
              // console.log(value);
              const children = this.parseTree(selfQ, value._id);

              if (children.length > 0) {
                // value.children = children;

                Vue.set(value, 'children', children);

              }

              treem.push(value);

            }
          });

          this.treem=treem;

            return this.treem




        },
        treemselected(dem){
          // let treemm=[];
          if(dem.length < 1 ){

            dem=this.treem
          }


          // console.log(dem)
                  dem.forEach((value, index) => {
                    // console.log(value.children)
                    if(value.children){
                      // console.log(value.children)
                      this.treemselected(value.children);

                    }else{
                      // Vue.set(value, '', children);
                      this.treemselect.push(value);
                          // console.log(treemm)

                    }

                  });

            return this.treemselect
          // return this.treemselect
        },
        filterFn (val, update, abort) {
          update(() => {
            const needle = val.toLowerCase();
            this.options = this.treemselect.filter((v) => v.stokturad.toLowerCase().includes(needle))
          })
        },
         varyantTree(aa, parentID=null){
          // let anatreem = [{'varyantname':this.edittreemselect.stokturad},
          // {'children':[]}
          // ]
          let vtrem=new Array
          
          // let vtreem = [{'varyantname':this.edittreemselect.stokturad,'children':[]}]
          
          // console.log(vtreem);
          
          // console.log('aa', aa)
          //  console.log(aa);
          
          
          aa.forEach((value, index) => {
            // console.log("value:"+ value ,"index:"+ index );
            // console.log('value.parentid',value.parentid);
            
            

            if(value.parentid === parentID){
                 
             const  childrenn = this.varyantTree(aa, value._id);
              //  console.log('children',children);
                // console.log(children);
                if(is.array(childrenn)){
              if (childrenn.length > 0) {
                // value.children = children;
                // console.log('children');
                
                Vue.set(value, 'children', childrenn);

              }
            }
              // vtreem[0].children.push(value);
              vtrem.push(value);

            }
          });
          //  Object.assign(vtreem[0], {'children':vtrem} );
            //  vtreem.push(vtrem)
          this.varyanttreem=vtrem;
              //  console.log('vtreem', vtreem);

             return  this.varyanttreem
          // console.log(this.varyanttreem);
          



        },
      },

       
        
    }

// lang="styl"

</script>

<style scoped>
.grid-style-transition
  {transition: transform .28s, background-color .28s}
</style>
