<template>
    <div class="q-pa-xl row q-gutter-md justify-center">
        <q-card class="col-md-12 row  col-sm-12  col-xs-12 justify-center">
            <q-card-section class="row">
                <div class="text-h6">Sipariş Listesi</div>

            </q-card-section>
            <q-separator inset />
            
        </q-card>
        <q-card class="col-md-12 row  col-sm-12  col-xs-12 justify-center">
            <q-table
            
            :data="siparislists"
            :columns="columns"
            row-key="_id"
            :pagination="pagination"
            class=" col-11"
          >
            <template v-if="siparislists.length > 0" v-slot:top-right>
                <!-- <q-input borderless dense debounce="300" v-model="arama" placeholder="Bul"> -->
                    <!-- <q-btn >Düzenle</q-btn> -->
            </template>
            <template v-slot:body="props" class="">
              <q-tr :props="props"  class=" " >
                
                <q-td key="tarih" :props="props"  >
                  <!-- {{moment(props.row.createdAt).format('DD-MM-YYYY')}} -->
                  {{date().formatDate(props.row.createdAt, 'DD-MM-YYYY-HH:mm')}}
                </q-td>
                <q-td key="sipno" :props="props" class="sipno cursor-pointer" @click.native="editsiparisdialog=(props.row),siparisdialog=true">
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
                    <q-badge :color="props.row.odemedurumu === 'Ödendi' ? 'green' : 'deep-orange'">
                    {{props.row.odemedurumu}}
                    </q-badge>
                </q-td>
                <q-td key="teslimat" :props="props"  >
                    <!-- <q-badge :color="props.row.odemedurumu === 'Ödendi' ? 'green' : 'deep-orange'">
                    {{props.row.odemedurumu}}
                    </q-badge> -->
                </q-td>
                <q-td key="faturadurumu" :props="props"  >
                    <!-- <q-badge :color="props.row.odemedurumu === 'Ödendi' ? 'green' : 'deep-orange'">
                    {{props.row.odemedurumu}}
                    </q-badge> -->
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
            Toplam :
          </q-td>
          <q-td colspan="">
            
          </q-td>
        </q-tr>
      </template>
            <!-- <template v-slot:bottom>
          blah blah
</template> -->
          </q-table>
        </q-card>
        <q-dialog v-model="siparisdialog">
        <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Siparis Detayları</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
        <!-- <div v-for="(siparislist,index) in siparislists" :key="index"> -->
        <div>
            <q-input  v-model="datem"  outlined readonly/>
      <!-- <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="editsiparisdialog.createdAt" @input="() => $refs.qDateProxy.hide()" readOnly></q-date>
          </q-popup-proxy>
        </q-icon>
      </template> -->
    
        </div>


        </q-card-section>
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
// import moment from 'moment'
import VueMask from 'v-mask'
Vue.use(VueMask);
// moment.locale('tr');

    export default {
        data() {
            return {
                siparislists:[],
                tarih:"",
                columns: [
                    {name: 'tarih', label: 'Tarih', align: 'left', sortable: true,field:row=>row.createdAt},
                    {name: 'sipno', label: 'Sipariş No', align: 'left', sortable: true},
                    {name: 'cep', label: 'Ad - Cep no', align: 'left', sortable: true},
                    
                    {name: 'odemetipi', label: 'Ödeme Yöntemi', align: 'left', sortable: true},
                    {name: 'odemedurumu', label: 'Ödeme Durumu', align: 'left', sortable: true},
                    {name: 'teslimat', label: 'Teslimat', align: 'left', sortable: true},
                    {name: 'faturadurumu', label: 'Fatura Durumu', align: 'left', sortable: true},

                    {name: 'tutar', label: 'Toplam', align: 'left'}
                ],
                pagination: {
                    sortBy: 'tarih',
                    descending: true,
                    page: 1,
                    rowsPerPage: 25,
                },
                siparisdialog:false,
                editsiparisdialog:{},
                datem:""
            }
        },
        watch: {
            tarih(val) {
                console.log(val);
            },
            editsiparisdialog(val){
                // console.log(val);
                this.datem=date.formatDate(val.createdAt,'DD-MM-YYYY')
            }
        },
       async mounted () {
        //    console.log(moment("12-25-1995").format('DD-MM-YYYY'));
        //    moment("12-25-1995").format('MM-DD-YYYY');
            await axios
                    .post('http://'+ process.env.API +':4000/graphql',{
                    query: `query search_siparislist{
                            search_siparislist{
                                _id
                                userid
                                tutar
                                odemetipi
                                odemedurumu
                                sipno
                                user{
                                    ad_soyad
                                    cep
                                    _id
                                }
                                satirs{
                                    _id
                                    varyantid
                                    tutar
                                    kdv
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
                    console.log("sip",this.siparislists);
        },
        methods: {
            date() {
                return date;
            },
            // editsiparisdialogmethod(val){
            //     console.log(val)
            //     this.datem=date.formatDate(val.createdAt,'DD-MM-YYYY')
                
            // }
            
        },

    }
</script>

<style lang="scss" scoped>
.sipno:hover{
    text-decoration: underline;
}
</style>