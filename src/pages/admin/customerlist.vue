<template>
    <div class="q-pa-lg row  justify-center">
        <q-card class="row col-11 ">
            <div class="row col-12 q-pl-xl q-pt-xs q-pb-xs  ">
            <q-table
            flat
            :data="customerlists"
            :columns="columns"
            row-key="_id"
            :pagination="pagination"
            class=" col-11"
            :filter="filter"
            
          >
          <!-- :selected.sync="selected"
            :filter="filter" -->
            <template  v-slot:top class="row">
                <div class="row text-weight-medium text-h5 col-12">Müşteri Listesi
                
                    <q-space />
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Bul" >
                    <q-icon slot="append" name="search" />
                    </q-input>
                </div>
            </template>
            <template v-slot:body="props" class="">
                <q-tr :props="props"  class=" ">
                    <q-td key="tarih" :props="props"  >
                        <!-- {{date(props.row.createdAt)}} -->
                        {{moment(props.row.createdAt).format('DD-MM-YYYY')}}
                    </q-td>
                    <q-td key="cep" :props="props"  >
                    {{props.row.ad_soyad}}<br>{{ props.row.cep | VMask('(###) ###-####') }}
                    <!-- {{maske(props.row.user[0].ad_soyad)}} -->
                
                    </q-td>
                    <q-td key="mail" :props="props"  >
                    {{props.row.email}}
                 
                    </q-td>
                    <q-td key="il" :props="props"  >
                    {{props.row.il}}
                 
                    </q-td>
                    <q-td key="ilce" :props="props"  >
                    {{props.row.ilce}}
                 
                    </q-td>
                </q-tr>
            </template>
            </q-table>
            </div>
        </q-card>
    </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
// import { date } from 'quasar'
import gql from "graphql-tag"
import moment from 'moment'

import { mapState, mapGetters } from "vuex"
import { Loading } from "quasar"
import VueMask from 'v-mask'
Vue.use(VueMask);
    export default {
    //     apollo: {
    //     customerlists: {
    //         query: gql`{
    //                     all_Userdetail_Query{
                        
    //                     _id
    //                     ad_soyad
    //                     email
    //                     cep
    //                     adres
    //                     il
    //                     ilce
    //                     }
    //         }`,
    //     update: data => data.all_Userdetail_Query,
        
    //   }
    // },

        data() {
            return {
                // all_Userdetail_Query
                moment: moment,
                customerlists:[],
                filter:"",
                columns: [
                    // {name: 'tarih', label: 'Tarih', align: 'left', sortable: true,field:row=>this.date(row.createdAt)},],
                    {name: 'tarih', label: 'Tarih', align: 'left', sortable: true,field:row=>moment(row.createdAt).format('DD-MM-YYYY')},
                    {name: 'cep', label: 'Ad - Cep no', align: 'left', sortable: true,field:row=>row.cep +' '+ row.ad_soyad},
                    {name: 'mail', label: 'E-mail', align: 'left', sortable: true,field:row=>row.email},
                    {name: 'il', label: 'il', align: 'left', sortable: true,field:row=>row.il},
                    {name: 'ilce', label: 'ilçe', align: 'left', sortable: true,field:row=>row.ilce},
                    ],
                pagination: {
                    // sortBy: 'tarih',
                    descending: true,
                    page: 1,
                    rowsPerPage: 25,
                },
            }
        },
        async mounted () {
          await  this.customerlistmethod()
        },
        methods: {
            async customerlistmethod(){
                await axios
                    .post(  process.env.API,{
                        query: `query all_Userdetail_Query{
                                all_Userdetail_Query{
                                    _id
                                    createdAt
                                    cep
                                    ad_soyad
                                    adres
                                    email
                                    il
                                    ilce
                                    }
                                }`,

                    // variables: {
                        
                    // }
                    })
                    .then(res => {
                        // console.log("musteri",data);
                     this.customerlists = res.data.data.all_Userdetail_Query;
                     console.log(this.customerlists);
                    // console.log(data.data.data.hasvaryantsatirQuery);
                    });

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>