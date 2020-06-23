<template>
    <div class="q-pa-xl row q-gutter-md">
        <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12 justify-center">
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
          :options="selectoptions"
          option-value="_id"
          option-label="stokturad"
          @input="selectstokid()"
          auto-select
        ></q-select>


        
        </q-card>
        <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12 ">
            <q-table
            title="Stok Tablosu"
            :data="hasvaryantsatirlists"
            :columns="columns"
            row-key="_id"
            :filter="arama"
            :pagination.sync="pagination"
            class="col-12"
          >
          <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="arama" placeholder="Bul">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
            <template v-slot:body="props" >
              <q-tr :props="props"  class="cursor-pointer" @click.native="editItem(props.row)">
                
                <q-td key="adi" :props="props"  >
                  {{props.row.varyant_option1_name}} - {{props.row.varyant_option2_name}}

                </q-td>
                <q-td key="miktar" :props="props"  >
                  {{props.row.miktar}} 

                </q-td>
                <!-- <q-td key="ust" :props="props"  >
                  {{props.row.stokturad}}

                </q-td> -->
                

              </q-tr>


            </template>
          </q-table>
        </q-card>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import Cookies from 'js-cookie';
import { Loading } from "quasar";
import {mapGetters } from 'vuex';
    export default {
        data() {
            return {
                arama:"",
                edittreemselect: [],
                selectoptions:[],
                hasvaryantsatirlists:[],
                columns: [
                    {name: 'adi', label: 'Ürün Adı', align: 'left', sortable: true,field: row => row.stokturad},
                    {name: 'miktar', label: 'Miktar', align: 'left', sortable: true,field: row => row.miktar},
                    // {name: 'ust', label: 'Üst Kategori', align: 'left', sortable: true}
          ],
          pagination: {
           sortBy: 'adi',
          ascending: false,
          page: 1,
          rowsPerPage: 20,
          // rowsNumber: 5,q
        },
            }
        },
        computed: {
            ...mapGetters([
                'anakategorilists',
                'geturunlists',
                // 'getvaryantlist',
                ]),
        },
        methods: {
           async selectstokid() {
                console.log(this.edittreemselect._id);
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
                      fiyat2
                      miktar
                      
                    }
                 }`,

          variables: {
            id: this.edittreemselect._id
          }
        })
        .then(data => {
          this.hasvaryantsatirlists = data.data.data.hasvaryantsatirQuery;
        //    console.log(this.hasvaryantsatirlists);
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

        },
    }
</script>

<style lang="scss" scoped>

</style>