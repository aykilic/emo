<template>
  <div class="q-pa-lg row justify-center">
    <!-- <q-card class="row col-11">
      <div class="row col-12 q-pl-xl q-pt-xs q-pb-xs text-h6">Fatura Sorgu Seçenekleri</div>

      <q-separator />

      <div class="row col-12">
        <div class="col-3 q-pl-xl q-pt-md q-pb-md">
          <q-select dense class outlined label="Ödeme Yöntemi" />
        </div>
        <div class="col-3 q-pl-xs q-pt-md q-pb-md">
          <q-select dense class outlined label="Ödeme Durumu" />
        </div>
        <div class="col-3 q-pl-xs q-pt-md q-pb-md">
          <q-select dense class outlined label="Teslimat Durumu" />
        </div>
        <div class="col-3 q-pl-xs q-pt-md q-pb-md q-pr-xl">
          <q-select dense class outlined label="Fatura Durumu" />
        </div>
        
      </div>
      <q-separator />
      <div class="q-ml-xl q-mt-md q-mb-md">
        <q-btn class @click="fatlistfilter()" color="primary" label="Sorgula" v-close-popup></q-btn>
      </div>
    </q-card> -->
    <q-card class="row q-mt-md col-11 ">
        <div class="col-md-12 row  col-sm-12  col-xs-12 justify-center" >
            
            
            <!-- <q-separator inset/>     -->
            <q-table
            flat
            
            :data="faturalists"
            :columns="columns"
            row-key="_id"
            :pagination="pagination"
            class=" col-11"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter"
          >
            <template  v-slot:top class="row">
                <div class="row text-weight-medium text-h5 col-12">Fatura Listesi
                
                    <q-space />
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Bul" >
                    <q-icon slot="append" name="search" />
                    </q-input>
                </div>
                <div class="col-10 q-gutter-x-md q-mt-md">
                    <q-btn @click="selected.length < 1 ? $q.notify({type: 'negative',message: `Listeden Seçim Yapmalısınız...`}) : teslimatdialog=true"  color="primary" text-color="white" label="Teslimat Durumunu Değiştir" />
                    <q-btn @click="selected.length < 1 ? $q.notify({type: 'negative',message: `Listeden Seçim Yapmalısınız...`}) : odemedialog=true" color="primary" text-color="white" label="Ödeme Durumunu Değiştir" />
                
                
                </div>
                <q-space/>
                <div class="q-mt-md">
                <q-btn
                    class="text-grey-7"
                    color=""
                    icon-right="mdi-printer"
                    label="Yazdır"
                    @click="yazdir()"
                    no-caps
                    
                    />
                </div>
                    <!-- <q-btn >Düzenle</q-btn> -->
            </template>
            <template v-slot:body="props" class="">
              <q-tr :props="props"  class=" ">
                <q-td>
              <q-checkbox v-model="props.selected" color="grey-8"  />
            </q-td>
                <q-td key="tarih" :props="props"  >
                  <!-- {{moment(props.row.createdAt).format('DD-MM-YYYY')}} -->
                  {{date(props.row.createdAt)}}
                </q-td>
                <q-td key="sipno" :props="props"  class="sipno cursor-pointer"   >
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
                    <q-badge :color="props.row.odemedurumu === 'Ödendi' ? 'green' : props.row.odemedurumu ==='İptal' ? 'black' : 'deep-orange' ">
                    {{props.row.odemedurumu}}
                    </q-badge>
                </q-td>
                <q-td key="teslimat" :props="props"  >
                    <q-badge :color="props.row.teslimat === 'Beklemede' ? 'deep-orange' : props.row.teslimat ==='İptal' ? 'deep-orange' : 'green'">
                        <!-- ['Beklemede' ? 'iptal' ? {deep-orange} : {deep-orange} : {green}] -->
                    {{props.row.teslimat}}
                    </q-badge>
                </q-td>
                
                <q-td key="faturadurumu" :props="props"  >
                    <q-badge :color="props.row.fatdurum === 'Beklemede' ? 'deep-orange' : props.row.fatdurum ==='İptal' ? 'deep-orange' : 'green'">
                    {{props.row.fatdurum}}
                    </q-badge>
                </q-td>
                <q-td key="faturano" :props="props"  >
                    <!-- <q-badge :color="props.row.fatdurum === 'Beklemede' ? 'deep-orange' : 'green'">
                    {{props.row.fatdurum}}
                    </q-badge> -->
                    
                    <q-btn class="" @click="numara_guncelleopen(props.row)" flat>{{props.row.faturano}}</q-btn>
                    
                </q-td>
              
                <q-td key="tutar" :props="props">
                    <!-- {{ Number(props.row.tutar).toFixed(2).toLocaleString()}} TL -->
                    {{props.row.tutar.toLocaleString('tr', {minimumFractionDigits: 2})}} TL
                  <!-- {{props.row.varyant_option1_name}} -     {{props.row.varyant_option2_name}} -->
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
            
          </q-td>
          <q-td class="text-weight-bolder" colspan="">
            Toplam :
          </q-td>
          <q-td class="text-right text-weight-bolder" colspan="">
            <!-- {{Number(tabletutar).toFixed(2).toLocaleString()}} TL -->
            {{tabletutar.toLocaleString('tr', {minimumFractionDigits: 2})}} TL
          </q-td>
        </q-tr>
      </template>
            <!-- <template v-slot:bottom>
          blah blah
</template> -->
          </q-table>
          </div>
    </q-card>
    <q-dialog
            v-model="faturanodialog"
          >
            <q-card  style="width: 400px; max-width: 80vw;">
              <q-card-section class="row justify-center">
                <div class="text-h6 ">Numara Güncelleme</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
            <q-separator/>
              <q-card-section class="row q-col-gutter-md">
                <q-input class="col-12  "  v-model="faturano" label="Fatura No"  outlined/>
                <q-input class="col-12  "  v-model="irsaliyeno" label="İrsaliye No"  outlined/>
                
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-right">

                <q-btn class=""  color="primary" label="Güncelle" @click="numara_guncelle()"  v-close-popup ></q-btn>
                <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
              </q-card-section>
            </q-card>
    </q-dialog>
    <q-dialog
            v-model="teslimatdialog"

          >
            <q-card  style="width: 550px; max-width: 80vw;">
              <q-card-section class="row justify-center">
                <div class="text-h6 ">Teslimat Seçimi</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
            <q-separator/>
              <q-card-section class="row">
                <q-radio class="col-12" v-model="kargodurum" val="Kargoya Teslim" label="Kargoya Teslim" />
                <q-radio class="col-12" v-model="kargodurum" val="Elden Teslim" label="Elden Teslim" />
                <q-radio class="col-12" v-model="kargodurum" val="Kargodan Teslim" label="Kargodan Teslim" />
                <q-radio class="col-12" v-model="kargodurum" val="iptal" label="İptal Edildi" />
                
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-right">

                <q-btn class=""  color="primary" label="Güncelle" @click="teslimat()" v-close-popup ></q-btn>
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
              <q-card-section class="row">
                <q-radio class="col-12" v-model="odemedurum" val="Ödendi" label="Ödendi" />
                <q-radio class="col-12" v-model="odemedurum" val="Nakit" label="Elden Ödeme" />
                <q-radio class="col-12" v-model="odemedurum" val="Beklemede" label="Beklemede" />
                
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-right">

                <q-btn class=""  color="primary" label="Güncelle" @click="odeme()" v-close-popup ></q-btn>
                <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
              </q-card-section>
            </q-card>
          </q-dialog>   
    <div  style="display:none;">
        <div id="yazdirdiv" >
            <div v-for="(select,index) in selected" :key='index' style="" >
                <!-- <div class="page-break">asdfgh</div> -->
               
                <div style="margin-left:550px">
                    {{datekisa(select.createdAt)}}
                </div>
                <div style="margin-top:50px">
                    {{select.user[0].ad_soyad}}
                </div>
                
                <div style="margin-top:30px">
                    {{select.user[0].adres}}
                </div>
                <div style="margin-left:150px;margin-top:30px">
                    {{select.user[0].il}} - {{select.user[0].ilce}}
                </div>
                <div style="margin-left:120px;margin-top:30px;">
                    {{select.user[0].v_daire}} - {{select.user[0].tc_v_no}}
                </div>
                <!-- <div style="">

                </div> -->
                
                <div style="margin-top:50px;">
                    <table v-for="(satir,ind) in select.satirs" :key='ind' style="margin-top:10px;margin-left:10px;">
                        <tr :style="'width:1200px;margin-top:5px;'">
                        <!-- <tr :style="'width:1200px;margin-top:'+ (ind * 5 )+'px;'"> -->
                        <td style="width:250px;" >{{satir.stokad}}</td>
                        <td style="width:100px;">{{satir.birimfiyat.toLocaleString('tr', {minimumFractionDigits: 2})}} TL</td>
                        <td style="width:100px;">{{satir.count}}</td>
                        <td style="width:100px;">% {{satir.kdv}}</td>
                        <td style="width:100px;">{{satir.kdvtutar.toLocaleString('tr', {minimumFractionDigits: 2})}} TL</td>
                        <td style="width:100px;">{{satir.aratoplam.toLocaleString('tr', {minimumFractionDigits: 2})}} TL</td>
                        </tr>
                    </table>
                </div>
                <div style="width:100px;margin-left:600px;margin-top:25px;"><hr style="border:1px solid;"></div>
                <div style="width:100px;margin-left:600px;"><hr style="border:1px solid;"></div>
                <div style="width:665px;text-align:right;margin-top:25px;">{{select.aratoplam.toLocaleString('tr', {minimumFractionDigits: 2})}} TL</div>
                <div style="width:665px;text-align:right;margin-top:10px;">{{select.kdv.toLocaleString('tr', {minimumFractionDigits: 2})}} TL</div>
                <div style="width:100px;margin-left:600px;"><hr style="border:1px solid;"></div>
                <!-- <div style="width:645px;text-align:right;margin-top:10px;">{{select.tutar.toFixed(2).toLocaleString()}}</div> -->
                <div style="width:665px;text-align:right;margin-top:10px;">{{select.tutar.toLocaleString('tr', {minimumFractionDigits: 2})}} TL</div>





                <div style="page-break-after:always;"></div>
                <!-- <div style="height:500px;"></div> -->
            
            </div>
            
            
        </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
import gql from "graphql-tag"
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import { Loading } from "quasar"
import printJS from 'print-js'
// import moment from 'moment'
import VueMask from 'v-mask'
Vue.use(VueMask);
export default {
  data() {
    return {
        fatdurummodel:"",
        fatdurumdata: [
        '','Faturalandı', 'Beklemede', 'İptal',
        ],
        odemedurummodel:"",
        odemedurumdata:[
        '','Ödendi', 'Beklemede'
        ],
        teslimatdurummodel:"",
        teslimatdurumdata:[
            '','Beklemede', 'Kargoya Teslim', 'Elden Teslim', 'Kargodan Teslim', 'İptal Edildi'
        ],
        odemeyontemmodel:"",
        odemeyontemdata:[
            '','Havale','Kredi Kartı Hemen', 'Kapıda Nakit'
        ],
        kargodurum:"",
        odemedurum:"",
        //----------
        teslimatdialog:false,
        odemedialog:false,
        //----------
        sipno:"",
        faturanodialog:false,
        secimid:"",
        faturano:"",
        irsaliyeno:"",
        faturalists:[],
        selected:[],
        filter:"",
        tabletutar:0,
        columns: [
                    {name: 'tarih', label: 'Tarih', align: 'left', sortable: true,field:row=>this.date(row.createdAt)},
                    {name: 'sipno', label: 'Sipariş No', align: 'left', sortable: true,field:row=>row.sipno},
                    {name: 'cep', label: 'Ad - Cep no', align: 'left', sortable: true,field:row=>row.user[0].cep +' '+ row.user[0].ad_soyad},
                    
                    {name: 'odemetipi', label: 'Ödeme Yöntemi', align: 'left', sortable: true,field:row=>row.odemetipi},
                    {name: 'odemedurumu', label: 'Ödeme Durumu', align: 'left', sortable: true,field:row=>row.odemedurumu},
                    {name: 'teslimat', label: 'Teslimat', align: 'left', sortable: true,field:row=>row.teslimat},
                    {name: 'faturadurumu', label: 'Fatura Durumu', align: 'left', sortable: true,field:row=>row.faturadurum},
                    {name: 'faturano', label: 'Fatura No', align: 'center', field:row=>row.faturano},

                    {name: 'tutar', label: 'Toplam', align: 'right',field:row=>row.tutar}
                ],
        pagination: {
                    sortBy: 'tarih',
                    descending: true,
                    page: 1,
                    rowsPerPage: 25,
                },

    };
  },
  async mounted () {
        //    console.log(moment("12-25-1995").format('DD-MM-YYYY'));
        //    moment("12-25-1995").format('MM-DD-YYYY');
            this.fatlist()
                    // console.log("sip",this.siparislists);
        },
  watch: {
      faturalists(val){
                this.tabletutar=0
                val.forEach(item=>{
                    this.tabletutar += item.tutar
                })

            },
  },
  methods: {
      yazdir(){
          printJS({
                printable: 'yazdirdiv',
                type: 'html',
                targetStyles: ['*'],
                // style: '.page-break'
            })
      },
      
       numara_guncelleopen(val){
          this.faturanodialog=true
          this.secimid=val._id
          this.faturano=val.faturano
          this.irsaliyeno=val.irsaliyeno

        //   console.log(val);
      },
      async numara_guncelle(){
          Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation siparis_numara_guncelle($id:ID,$faturano: Float,$irsaliyeno:Float) {
                            siparis_numara_guncelle(id:$id,faturano: $faturano, irsaliyeno: $irsaliyeno) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          id:this.secimid,
                          faturano:Number(this.faturano) ,
                          irsaliyeno:Number(this.irsaliyeno)
                        }
                        })
                        .then( async data => {
                        //    await numaralar_guncelle()
                            // console.log("ok");
                            await this.fatlist()
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })

      },
      async fatlist(){
                await axios
                    .post(  process.env.API +':4000/graphql',{
                    query: `query search_faturalist{
                            search_faturalist{
                                _id
                                userid
                                tutar
                                odemetipi
                                odemedurumu
                                teslimat
                                fatdurum
                                sipno
                                irsaliyeno
                                faturano
                                aratoplam
                                kdv
                                user{
                                    _id
                                    ad_soyad
                                    cep
                                    adres
                                    il
                                    ilce
                                    v_daire
                                    tc_v_no
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
                     this.faturalists = data.data.data.search_faturalist;
                    // console.log(data.data.data.hasvaryantsatirQuery);
                    });
            },
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
                            await this.fatlist()
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
                            await this.fatlist()
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
            date(val) {
              return  date.formatDate(val, 'DD-MM-YYYY-HH:mm')
                // return date;
            },
            datekisa(val){
              return  date.formatDate(val, 'DD-MM-YYYY')
            }
  },
};
</script>

<style lang="scss" scoped>
// @media print and (width: 21cm) and (height: 29.7cm) {
//      @page {
//         margin: 3cm;
//      }
// }

// /* style sheet for "letter" printing */
// @media print and (width: 8.5in) and (height: 11in) {
//     @page {
//         margin: 1in;
//     }
// }

/* A4 Landscape*/
// @page {
//     size: A4 landscape;
//     // margin: 10%;
// }
@media all {
//   .page-break {  }
}

@media print {
  .page-break { 
  display: block;
   page-break-before: always;
   page-break-after: always;
    page-break-inside: avoid;
    page-break-before: avoid;
    break-after: always;
    break-inside: avoid;
    break-before: avoid;
    }
}
</style>