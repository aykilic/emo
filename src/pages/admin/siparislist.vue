<template>
    <div class="q-pa-xl row q-gutter-md justify-center">
        <!-- <q-card class="col-md-11 row  col-sm-11  col-xs-11 justify-center">
            <q-card-section class="row">
                <div class="text-h6">Sipariş Listesi</div>

            </q-card-section>
            <q-separator inset />
            
        </q-card> -->
        <q-card class="col-11 ">
            <div class="row col-12 justify-center">
            <div class="q-pa-xl "><q-btn @click="teslimatdialog=true"  color="primary" text-color="white" label="Teslimat Durumunu Değiştir" /></div>
            <div class="q-pa-xl "><q-btn @click="odemedialog=true" color="primary" text-color="white" label="Ödeme Durumunu Değiştir" /></div>
            <!-- <div class="q-pa-xl "><q-btn  color="primary" text-color="white" label="Teslimat Durumunu Değiştir" /></div> -->
            </div>
            <div class="col-md-12 row  col-sm-12  col-xs-12 justify-center" >
            
            
            <q-separator inset/>    
            <q-table
            flat
            title="Sipariş Listesi"
            :data="siparislists"
            :columns="columns"
            row-key="_id"
            :pagination="pagination"
            class=" col-11"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter"
          >
            <template v-if="siparislists.length > 0" v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="arama" placeholder="Bul" >
                <q-icon slot="append" name="search" />
                </q-input>
                    <!-- <q-btn >Düzenle</q-btn> -->
            </template>
            <template v-slot:body="props" class="">
              <q-tr :props="props"  class=" ">
                <q-td>
              <q-checkbox v-model="props.selected" color="grey-8"  />
            </q-td>
                <q-td key="tarih" :props="props"  >
                  <!-- {{moment(props.row.createdAt).format('DD-MM-YYYY')}} -->
                  {{date().formatDate(props.row.createdAt, 'DD-MM-YYYY-HH:mm')}}
                </q-td>
                <q-td key="sipno" :props="props"  class="sipno cursor-pointer"   @click.native="editsiparisdialogm(props.row),siparisdialog=true,sipno=props.row.sipno">
                    {{props.row.sipno}}
                 
                </q-td>
                <q-td key="cep" :props="props"  >
                    {{props.row.user[0].ad_soyad}}<br>{{ props.row.user[0].cep | VMask('(###) ###-####') }}
                    <!-- {{maske(props.row.user[0].ad_soyad)}} -->
                
                </q-td>
                
                <q-td key="odemetipi" :props="props"  >
                    {{props.row.odemetipi}}
                 
                </q-td>
                <q-td key="odemedurumu" :props="props"  >
                    <q-badge :color="props.row.odemedurumu === 'Ödendi' ? 'green' : props.row.odemedurumu === 'Banka' ? 'green' : props.row.odemedurumu === 'Nakit' ? 'green': 'deep-orange'">
                    {{props.row.odemedurumu}}
                    </q-badge>
                </q-td>
                <q-td key="teslimat" :props="props"  >
                    <q-badge :color="props.row.teslimat === 'Beklemede' ? 'deep-orange' : props.row.teslimat ==='iptal' ? 'deep-orange' : 'green'">
                        <!-- ['Beklemede' ? 'iptal' ? {deep-orange} : {deep-orange} : {green}] -->
                    {{props.row.teslimat}}
                    </q-badge>
                </q-td>
                <q-td key="faturadurumu" :props="props"  >
                    <q-badge :color="props.row.fatdurum === 'Beklemede' ? 'deep-orange' : 'green'">
                    {{props.row.fatdurum}}
                    </q-badge>
                </q-td>
              
                <q-td key="tutar" :props="props"  >
                    {{ Number(props.row.tutar).toLocaleString()}} TL
                  <!-- {{props.row.varyant_option1_name}} - {{props.row.varyant_option2_name}} -->
                  <!-- {{props.row.tutar}} -->
                </q-td>
              </q-tr>


            </template>
            <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            
          </q-td>
          <q-td colspan="">
            Toplam :
          </q-td>
        </q-tr>
      </template>
            <!-- <template v-slot:bottom>
          blah blah
</template> -->
          </q-table>
          </div>
        </q-card>
        <!-- <q-dialog v-model="teslimatdialog" >
        <q-card style="min-width:300px">    
            <q-input class="q-pl-xs col-4"  label="Ad Soyad"   outlined/>
        </q-card>
        </q-dialog> -->
        <q-dialog
            v-model="teslimatdialog"

          >
            <q-card  style="width: 500px; max-width: 80vw;">
              <q-card-section class="row justify-center">
                <div class="text-h6 ">Teslimat Seçimi</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
            <q-separator/>
              <q-card-section >
                <q-radio  v-model="kargodurum" val="Kargoya Teslim" label="Kargoya Teslim" />
                <q-radio  v-model="kargodurum" val="Elden Teslim" label="Elden Teslim" />
                <q-radio  v-model="kargodurum" val="iptal" label="İptal" />
                
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-right">

                <q-btn class="q-ma-sm"  color="primary" label="Güncelle" @click="teslimat()" v-close-popup ></q-btn>
                <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
              </q-card-section>
            </q-card>
          </q-dialog>
        <q-dialog
            v-model="odemedialog"

          >
            <q-card  style="width: 500px; max-width: 80vw;">
              <q-card-section class="row justify-center">
                <div class="text-h6 ">Ödeme Durum Seçimi</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
            <q-separator/>
              <q-card-section >
                <q-radio  v-model="odemedurum" val="Banka" label="Bankadan Ödeme" />
                <q-radio  v-model="odemedurum" val="Nakit" label="Elden Ödeme" />
                <q-radio  v-model="odemedurum" val="Beklemede" label="Beklemede" />
                
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-right">

                <q-btn class="q-ma-sm"  color="primary" label="Güncelle" @click="odeme()" v-close-popup ></q-btn>
                <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
              </q-card-section>
            </q-card>
          </q-dialog>
        <q-dialog v-model="siparisdialog" >
        <q-card style="min-width:800px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Siparis Detayları</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator inset />
        <q-card-section>
        <!-- <div v-for="(siparislist,index) in siparislists" :key="index"> -->
        <div class="row ">
            <q-input class="col-4" label="Tarih" v-model="editsiparisdialog.date"  outlined dense readonly/>
            <!-- <div v-for="editsiparisdialog.user,index" in editsiparisdialog.user></div> -->
            <q-input class="q-pl-xs col-4"  label="Ad Soyad" v-model="editsiparisdialog.ad" dense outlined/>
            <q-input class="q-pl-xs col-4" label="Cep No" mask="(###) ###-####" v-model="editsiparisdialog.cep" dense outlined/>
            
        </div>
        <div class="row q-mt-md q-mb-md">
            <q-input class=" col-8" label="Açıklama" v-model="editsiparisdialog.description" type="textarea" dense outlined/>
            <!-- <div class=" q-ml-xl     self-center col">
                <q-radio  v-model="kargodurum" val="Kargoya Teslim" label="Kargoya Teslim" disabled/>
                <q-radio  v-model="kargodurum" val="Elden Teslim" label="Elden Teslim" disabled/>
            
            </div> -->
            
        </div>
        <q-separator inset />
        <div v-for="(editsiparisdialo, i) in editsiparisdialog.satirs" :key="i" class="row q-mt-md items-center">
            
                <!-- <div>{{editsiparisdialog.satirs[i].kdv}}</div> -->
            <!-- <q-input label="Stok Kodu" v-model="editsiparisdialog.satirs[index].stokkod" outlined/>
            <q-input label="Stok Adı" v-model="editsiparisdialog.satirs[index].stokkod" outlined/>
            <q-input label="Stok Miktar" v-model="editsiparisdialog.satirs[index].stokkod" outlined/>
            <q-input label="Stok Birim Fiyatı" v-model="editsiparisdialog.satirs[index].stokkod" outlined/>-->
            <q-input class="col-3" label="Ürün Adı" v-model="editsiparisdialog.satirs[i].stokad" dense outlined readonly/>
            <q-input class="q-pl-xs col-2 " label="Birim Fiyatı" v-model="editsiparisdialog.satirs[i].birimfiyat" dense outlined readonly/>
            <q-input class="q-pl-xs col-2" label="Miktar" v-model="editsiparisdialog.satirs[i].count" dense outlined readonly/>
            <q-input class="q-pl-xs col-2" label="Kdv" v-model="editsiparisdialog.satirs[i].kdv" prefix="%" dense outlined readonly/>
            <q-input class="q-pl-xs col-2" label="Toplam" v-model="editsiparisdialog.satirs[i].aratoplam"  dense outlined readonly/>
            <div class="q-pl-xs col-1">
                <q-btn class="" flat color="grey" @click="satirsil(editsiparisdialog.satirs[i],siparislists)" dense round icon="delete" />
            </div>
            
        </div> 
        <q-separator class="q-mt-md" inset />
        <div class="row  ">
            <div class="col-9 q-pt-md text-right">Ara Toplam:</div>
            <div class="col-1 q-pt-md  text-right">{{formatPrice(editsiparisdialog.aratoplam)}}</div>
        </div>
        <div class="row  ">
            <div class="col-9 q-pt-md text-right">Kdv:</div>
            <div class="col-1 q-pt-md  text-right">{{formatPrice(editsiparisdialog.kdv)}}</div>
            
        </div>
        <div class="row justify-end">
            <div class="col-5 "><q-separator class="q-mt-md" inset /><q-separator class="q-mt-xs" inset /></div>
        </div>
        <div class="row  ">
            <div class="col-9 q-pt-md text-right">Tutar:</div>
            <div class="col-1 q-pt-md text-right">{{formatPrice(editsiparisdialog.tutar)}}</div>
        </div>
            <!-- <q-item-section class="col-9 q-pt-md" style="margin-left:0px;">Kdv Toplam:</q-item-section>
            <q-item-section class="col-9 q-pt-md" style="margin-left:0px;">Tutar:</q-item-section> -->
        
        </q-card-section>
        <q-separator class="q-mt-md" inset />
        <q-card-section  class="text-right">
                            
            <q-btn  class="q-ma-sm"  color="primary"  label="Güncelle"  v-close-popup ></q-btn>
            <q-btn  class="q-ma-sm text-grey"  color="white" label="Kapat"  v-close-popup></q-btn>
                        
        </q-card-section>
      </q-card>
        </q-dialog>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import {mapGetters } from 'vuex';
import { date } from 'quasar'
import { Loading } from "quasar";
// import moment from 'moment'
import VueMask from 'v-mask'
Vue.use(VueMask);
// moment.locale('tr');

    export default {
        data() {
            return {
                teslimatdialog:false,
                odemedialog:false,
                //------------
                selected:[],
                kargodurum:"",
                odemedurum:"",
                sipno: "",
                siparislists:[],
                tarih:"",
                filter:"",
                columns: [
                    {name: 'tarih', label: 'Tarih', align: 'left', sortable: true,field:row=>row.createdAt},
                    {name: 'sipno', label: 'Sipariş No', align: 'left', sortable: true},
                    {name: 'cep', label: 'Ad - Cep no', align: 'left', sortable: true},
                    
                    {name: 'odemetipi', label: 'Ödeme Yöntemi', align: 'left', sortable: true},
                    {name: 'odemedurumu', label: 'Ödeme Durumu', align: 'left', sortable: true},
                    {name: 'teslimat', label: 'Teslimat', align: 'left', sortable: true},
                    {name: 'faturadurumu', label: 'Fatura Durumu', align: 'left', sortable: true},

                    {name: 'tutar', label: 'Toplam', align: 'right'}
                ],
                pagination: {
                    sortBy: 'tarih',
                    descending: true,
                    page: 1,
                    rowsPerPage: 25,
                },
                // siparis edit dialog
                siparisdialog:false,
                editsiparisdialog:{},
                // siparis edit dialog  
            }
        },
        watch: {
            tarih(val) {
                console.log(val);
            },
            // editsiparisdialog(val){
            //       console.log(val);

                 
            //     this.editsiparisdialog.date=date.formatDate(val.createdAt,'DD-MM-YYYY')
            //     // this.editsiparisdialog.ad=val.user.ad_soyad
            //         val.user.forEach(item=>{
            //             // console.log(object);
            //             this.editsiparisdialog.ad=item.ad_soyad
            //             this.editsiparisdialog.cep=item.cep

            //         })
            //         // val.satirs.forEach(item=>{
            //         //     let obj={}
            //         //     obj.kdv=item.kdv
            //         //     // this.editsiparisdialog.satirs=item.satirs
            //         //     this.editsiparisdialog.satirs.push(obj)
            //         // })
            //     // this.editsiparisdialog.ad_soyad=val.user[0].ad_soyad
            // }
        },
       async mounted () {
        //    console.log(moment("12-25-1995").format('DD-MM-YYYY'));
        //    moment("12-25-1995").format('MM-DD-YYYY');
            this.siplist()
                    console.log("sip",this.siparislists);
        },
        methods: {
            
            teslimat(){
                if(this.selected.length < 1  || this.kargodurum == ""){
                    this.$q.notify({
                    type: 'negative',
                    message: `Seçim Yapmadınız...`
                })
                return 
                }
                // console.log("durdur",this.selected);
                // return
                // secilenlerin teslimat durumlarını değiştir...
                let select=[]
                this.selected.forEach(item=>{
                    let obj={}
                    obj={
                        sipno:item.sipno
                    }
                    select.push(obj)
                })
                Loading.show()
                this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation sipariskargodurumupdate($kargodurumlist: [kargodurumlistInput],$kargodurum:String) {
                            sipariskargodurumupdate(kargodurumlist: $kargodurumlist, kargodurum: $kargodurum) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          kargodurumlist: select ,
                          kargodurum: this.kargodurum
                        }
                        })
                        .then(async data => {
                            await this.siplist()
                            this.$q.notify({
                                                type: "Positive",
                                                message: `Teslimat Durumları Güncellendi...`,
                                                position: "top-right",
                                                color: "green",
                                                icon: "check",
                                            });
                                            this.selected=[],
                                            this.kargodurum=""
                                            Loading.hide()
                        }).catch(err => {
                                console.log(err);
                                 Loading.hide()
                            

                                // Loading.hide()
                                })
                
            },
            odeme(){
                if(this.selected.length < 1  || this.odemedurum == ""){
                    this.$q.notify({
                    type: 'negative',
                    message: `Seçim Yapmadınız...`
                })
                return 
                }
                // console.log("durdur",this.selected);
                // return
                // secilenlerin teslimat durumlarını değiştir...
                let select=[]
                this.selected.forEach(item=>{
                    let obj={}
                    obj={
                        sipno:item.sipno
                    }
                    select.push(obj)
                })
                Loading.show()
                this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation siparisodemedurumupdate($odemedurumlist: [odemedurumlistInput],$odemedurum:String) {
                            siparisodemedurumupdate(odemedurumlist: $odemedurumlist, odemedurum: $odemedurum) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          odemedurumlist: select ,
                          odemedurum: this.odemedurum
                        }
                        })
                        .then(async data => {
                            await this.siplist()
                            this.$q.notify({
                                                type: "Positive",
                                                message: `Ödeme Durumları Güncellendi...`,
                                                position: "top-right",
                                                color: "green",
                                                icon: "check",
                                            });
                                            this.selected=[],
                                            this.odemedurum=""
                                            Loading.hide()
                        }).catch(err => {
                                console.log(err);
                                 Loading.hide()
                            

                                // Loading.hide()
                                })
                
            },
            editsiparisdialogm(val){
                // rowIndex
               
                console.log(val);
                
                this.editsiparisdialog=val
                this.editsiparisdialog.date=date.formatDate(val.createdAt,'DD-MM-YYYY')
                // this.editsiparisdialog.ad=val.user.ad_soyad
                    val.user.forEach(item=>{
                        // console.log(object);
                        this.editsiparisdialog.ad=item.ad_soyad
                        this.editsiparisdialog.cep=item.cep

                    })

            },
            
            satirsil(satir,siparis){
                
                console.log(satir,siparis);
                // return
                this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation varyantstokmiktaredit($id: ID,$count:Float) {
                            varyantstokmiktaredit(id: $id, count: $count) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          id: satir.varyantid,
                          count: satir.count
                        }
                        })
                        .then(data => {
                            console.log(data);
                            if(data.data.varyantstokmiktaredit._id != null || data.varyantstokmiktaredit._id != undefined){
                                // siparis tutarları guncelle
                                
                                this.$apollo
                                    .mutate({
                                    mutation: gql`
                                        mutation siparissatirdelete($sipid: ID,$satirid:ID) {
                                        siparissatirdelete(sipid: $sipid, satirid:$satirid) {
                                            _id
                                        }
                                        }
                                    `,
                                    // loadingKey: 'loading',
                                    variables: {
                                    sipid:siparis[0]._id,
                                    satirid:satir._id
                                    }
                                    })
                                    .then(async data => {
                                            if(data.data.siparissatirdelete._id != null || data.siparissatirdelete._id != undefined){
                                                // siparis satir sil 
                                                
                                                  await this.siplist()
                                                  console.log("this.siparislists[0]",this.siparislists[0]);
                                                 let aratoplam=0
                                                 let kdv=0
                                                 let tutar=0
                                                    this.siparislists[0].satirs.forEach(item=>{
                                                        
                                                        // let kdvtutar=0
                                                        // count=item.count
                                                        // kdv=item.kdv

                                                        aratoplam +=Number(item.aratoplam)
                                                        kdv  +=Number(item.kdvtutar)
                                                        tutar += Number(item.tutar)



                                                        
                                                    })
                                             console.log("tutarlar",aratoplam,kdv,tutar);
                                           
                                      this.$apollo
                                        .mutate({
                                        mutation: gql`
                                            mutation siparistutarupdate($id: ID,$aratoplam:Float,$kdv:Float,$tutar:Float) {
                                            siparistutarupdate(id: $id, aratoplam: $aratoplam, kdv:$kdv, tutar:$tutar) {
                                                _id
                                            }
                                            }
                                        `,
                                        // loadingKey: 'loading',
                                        variables: {
                                        id:siparis[0]._id,
                                        aratoplam: aratoplam,
                                        kdv:kdv,
                                        tutar:tutar
                                        }
                                        })
                                        .then(async data => {
                                            // siparisdialog=false
                                            // this.$emit('silemit');
                                            await this.siplist()
                                            let obj=""
                                            this.siparislists.forEach(item=>{
                                                
                                                if(item.sipno == this.sipno){
                                                    obj=item
                                                }

                                            })
                                            // console.log("silindi falan",obj);
                                            this.$q.notify({
                                                type: "Positive",
                                                message: `Satır Silindi`,
                                                position: "top-right",
                                                color: "green",
                                                icon: "check",
                                            });
                                            this.editsiparisdialogm(obj)
                                            }).catch(err => {
                                            console.log(err);
                                            // Loading.hide()
                                        

                                            // Loading.hide()
                                        })
                                    }
                                                        }).catch(err => {
                                                            console.log(err);
                                                            // Loading.hide()
                                                        

                                                            // Loading.hide()
                                                        })

                                
                                    }
                                        }).catch(err => {
                                            console.log(err);
                                            // Loading.hide()
                                        })
                // varyant stok güncelle {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{ok}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
                // siparis tutarları guncelle
                // siparis satir sil 

            },
            date() {
                return date;
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            // editsiparisdialogmethod(val){
            //     console.log(val)
            //     this.datem=date.formatDate(val.createdAt,'DD-MM-YYYY')
                
            // }
            async siplist(){
                await axios
                    .post('http://'+ process.env.API +':4000/graphql',{
                    query: `query search_siparislist{
                            search_siparislist{
                                _id
                                userid
                                tutar
                                odemetipi
                                odemedurumu
                                teslimat
                                fatdurum
                                sipno
                                aratoplam
                                kdv
                                user{
                                    ad_soyad
                                    cep
                                    _id
                                }
                                satirs{
                                    _id
                                    count
                                    stokad
                                    varyantid
                                    birimfiyat
                                    tutar
                                    aratoplam
                                    kdv
                                    kdvtutar
                                }
                                createdAt
                                }
                            }`,

                    variables: {
                        
                    }
                    })
                    .then(data => {
                     this.siparislists = data.data.data.search_siparislist;
                    // console.log(data.data.data.hasvaryantsatirQuery);
                    });
            }
        },

    }
</script>

<style lang="scss" scoped>
.sipno:hover{
    text-decoration: underline;
}
</style>