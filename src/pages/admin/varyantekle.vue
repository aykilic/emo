<template>
  <div class="q-pa-xl row q-gutter-md">
    <q-card class="q-pa-md col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
      <div class="col-12 text-h6 text-center">Varyant Kategori</div>

      <q-input
        outlined
        label="Varyant"
        class="q-pt-md hint"
        hint="Eklemek istediğiniz Varyantı Giriniz...!...(RENK, BEDEN vs...)"
        v-model="varyantvalinput"
      >
        <template v-slot:append>
          <!-- <q-icon name="colorize" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color v-model="color" />
                                  </q-popup-proxy>
          </q-icon>-->
          <q-btn @click="addvaryant()" round dense flat icon="add" />
        </template>
      </q-input>
      <!-- </q-card>
      <q-card class="q-pa-md col-md-10  offset-md-1 col-sm-10 offset-sm-1 col-xs-12 ">-->

      <!-- <div class="q-pt-md text-h6 text-center">Varyant Listesi</div> -->

      <q-table
        :data="varyantQuery"
        :columns="columns"
        selection="single"
        row-key="_id"
        :pagination.sync="pagination"
        class="q-pa-lg"
        :selected.sync="selected"
      >
        <template v-slot:body="props">
          <q-tr :props="props" class="cursor-pointer" @click.native="editvaryant(props.row)">
            <q-td>
              <q-checkbox v-model="props.selected" @click.native="altvaryantlist()" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">{{props.row.varyantname}}</q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <q-card class="q-pa-md col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
      <div class="col-12 text-h6 text-center">Alt Varyant</div>
      <q-input
        outlined
        label="Alt Varyant"
        class="q-pt-md hint"
        hint="Eklemek istediğiniz Alt Varyantı Giriniz...!...(XS, SM; 39, 40 vs...)"
        v-model="altvaryantvalinput"
      >
        <template v-slot:append>
          <!-- <q-icon name="colorize" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color v-model="color" />
                                  </q-popup-proxy>
          </q-icon>-->
          <q-btn @click="addaltvaryant()" round dense flat icon="add" />
        </template>
      </q-input>

      <q-table
        :data="altvaryantQuery"
        :columns="columnss"
        row-key="_id"
        :pagination.sync="altpagination"
        class="q-pa-lg"
      >
        <template v-slot:body="props">
          <q-tr :props="props" class="cursor-pointer" @click.native="editaltvaryant(props.row)">
            <q-td  key="adi" :props="props">{{props.row.varyantname}}</q-td>
            <q-td key="color" :props="props">{{props.row.color}}</q-td>
            <q-td key="sira" :props="props">{{props.row.sira}}</q-td>

          </q-tr>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="medium">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Varyant Düzenle</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="closedialog()" />
        </q-card-section>

        <q-card-section>
          <q-input
            class="q-pa-md"
            outlined
            v-model="editedvaryantitem.varyantname"
            label="Adı"
            :dense="false"
          />
        </q-card-section>

        <q-card-section class="text-right">
          <q-btn
            class="q-ma-sm"
            color="primary"
            label="Güncelle"
            @click="updateVaryant(editedvaryantitem)"
            v-close-popup
          ></q-btn>
          <q-btn
            class="q-mr-md"
            color="negative"
            label="Sil"
            @click="deleteVaryant(editedvaryantitem)"
            v-close-popup
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="altmedium">
      <q-card style="width: 500px; max-width: 80vw;"> 
        <q-card-section class="row items-center">
          <div class="text-h6 text-center">Alt Varyant Düzenle</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="closedialog()" />
        </q-card-section>

        <q-card-section>
          <q-input
            class="q-pa-md"
            outlined
            v-model="editedaltvaryantitem.varyantname"
            label="Adı"
            :dense="false"
          />
          
          
          <q-input
            class="q-pa-md"
            outlined
            v-model="editedaltvaryantitem.color"
            label="Color"
            :dense="false"
          >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color no-header v-model="editedaltvaryantitem.color"  />
              </q-popup-proxy>
            </q-icon>
          </template>
          </q-input>
          <q-input
            class="q-pa-md"
            outlined
            v-model="editedaltvaryantitem.sira"
            label="Sira"
            :dense="false"
          />
        </q-card-section>

        <q-card-section class="text-right">
          <q-btn
            class="q-ma-sm"
            color="primary"
            label="Güncelle"
            @click="updatealtVaryant(editedaltvaryantitem)"
            v-close-popup
          ></q-btn>
          <q-btn
            class="q-mr-md"
            color="negative"
            label="Sil"
            @click="deletealtVaryant(editedaltvaryantitem)"
            v-close-popup
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
//   import varyantkategori from '../../components/varyantkategori.vue'
// import QFirebaseUploaderBase from '../../components/QFirebaseUploaderBase.vue'
//    import cloud from '../../components/cloudinary.vue'
//    import altcloud from '../../components/altcloudinary.vue'
//   import firebase from '../../services/fireinit'
//   import {storage} from '../../services/fireinit'
//   import * as is from '../../../node_modules/is_js'
import { Notify } from "quasar";
import { Loading } from "quasar";
export default {
  data() {
    return {
      varyantvalinput: "",
      altvaryantvalinput: "",
      sira:1,
      varyantQuery: [],
      altvaryantQuery: [],
      columns: [
        {
          name: "adi",
          label: "Adı",
          align: "left",
          sortable: true,
          field: row => row.varyantname
        }
      ],
      columnss: [
        {
          name: "adi",
          label: "Adı",
          align: "left",
          sortable: true,
          field: row => row.varyantname
        },
        {
          name: "color",
          label: "",
          align: "left",
          sortable: true,
          field: row => row.color
        },
        {
          name: "sira",
          label: "",
          align: "left",
          sortable: true,
          field: row => row.sira
        }
      ],
      pagination: {
        rowsPerPage: 20
      },
      altpagination: {
        rowsPerPage: 20
      },
      editedvaryantitem: "",
      editedaltvaryantitem: "",
      medium: false,
      altmedium: false,
      selected: [],
      prompt: false
    };
  },
  watch: {
    varyantQuery(Value) {
      this.varyantQuery = Value;
    },
    altvaryantQuery(Value) {
      this.altvaryantQuery = Value;
    }
  },
  mounted() {
    this.varyantlist();
  },
  methods: {
    addvaryant() {
      if (this.varyantvalinput == "") {
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
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation createvaryant($varyantname: String!) {
                createVaryant(varyantname: $varyantname) {
                  _id
                }
              }
            `,
            variables: {
              varyantname: this.varyantvalinput
            }
          })
          .then(data => {
            this.varyantlist();
            //  setTimeout(() => {

            // }, 3)

            this.$q.notify({
              message: "Varyant Eklendi.",
              color: "green",
              icon: "check",
              position: "top-right"
            });

            this.varyantvalinput = "";
          });
      }
    },
    addaltvaryant() {
      // console.log(this.selected);
      if (this.altvaryantvalinput === "" || this.selected[0]._id === "") {
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
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation createaltvaryant($varyantname: String!,$varyant_id: ID, $sira:Float) {
                createaltVaryant(varyantname: $varyantname, varyant_id: $varyant_id,sira:$sira) {
                  _id
                }
              }
            `,
            variables: {
              varyant_id: this.selected[0]._id,
              varyantname: this.altvaryantvalinput,
              sira:this.sira
            }
          })
          .then(data => {
            //   this.selected=[]
            this.altvaryantlist();
            //  setTimeout(() => {

            // }, 3)

            this.$q.notify({
              message: "Alt Varyant Eklendi.",
              color: "green",
              icon: "check",
              position: "top-right"
            });

            this.altvaryantvalinput = "";
          });
      }
    },
    editvaryant(item) {
      // console.log(item);
      this.editedvaryantitem = Object.assign({}, item);
      this.medium = true;
      // console.log(this.editedvaryantitem);
    },
    editaltvaryant(item) {
      // console.log(item);
      this.editedaltvaryantitem = Object.assign({}, item);
      this.altmedium = true;
      // console.log(this.editedvaryantitem);
    },
    async updateVaryant() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation updateVaryant($id: ID!, $varyantname: String!) {
              updateVaryant(id: $id, varyantname: $varyantname) {
                _id
                varyantname
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            id: this.editedvaryantitem._id,
            varyantname: this.editedvaryantitem.varyantname,
            sira: this.editedvaryantitem.sira
          }
        })
        .then(data => {
          this.varyantlist();
          //  setTimeout(() => {
          //   Loading.hide()

          // }, 3)

          this.$q.notify({
            type: "positive",
            message: `Kayıt Başarılı...`,
            // color:'primary'
            position: "top-right"
          });

          //  this.group1=""
          //  this.varyantvalinput=""
        });
    },
    updatealtVaryant() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation updatealtVaryant($id: ID!, $varyantname: String!, $color: String, $sira: Float ) {
              updatealtVaryant(id: $id, varyantname: $varyantname, color: $color,sira:$sira) {
                _id
                varyantname
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            id: this.editedaltvaryantitem._id,
            varyantname: this.editedaltvaryantitem.varyantname,
            color: this.editedaltvaryantitem.color,
            sira:Number(this.editedaltvaryantitem.sira)
          }
        })
        .then(data => {
          this.altvaryantlist();
          //  setTimeout(() => {
          //   Loading.hide()

          // }, 3)

          this.$q.notify({
            type: "positive",
            message: `Kayıt Başarılı...`,
            // color:'primary'
            position: "top-right"
          });

          //  this.group1=""
          //  this.varyantvalinput=""
        });
    },
    deleteVaryant() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteVaryant($id: ID!) {
              deleteVaryant(id: $id) {
                _id
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            id: this.editedvaryantitem._id
          }
        })
        .then(data => {
          this.varyantlist();
          //  setTimeout(() => {
          //   Loading.hide()

          // }, 3)

          this.$q.notify({
            type: "positive",
            message: `Kayıt Başarıyla silindi...`,
            // color:'primary'
            position: "top-right"
          });

          //  this.group1=""
          //  this.varyantvalinput=""
        });
    },
    deletealtVaryant() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation deletealtVaryant($id: ID!) {
              deletealtVaryant(id: $id) {
                _id
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            id: this.editedaltvaryantitem._id
          }
        })
        .then(data => {
          this.altvaryantlist();
          //  setTimeout(() => {
          //   Loading.hide()

          // }, 3)

          this.$q.notify({
            type: "positive",
            message: `Kayıt Başarıyla silindi...`,
            // color:'primary'
            position: "top-right"
          });

          //  this.group1=""
          //  this.varyantvalinput=""
        });
    },
    async varyantlist() {
      await axios
        .post('http://'+ process.env.API +':4000/graphql',{
          query: `query varyantquery{
                      varyantQuery{
                                _id
                                varyantname
                                
                }
              }`

          // update:data=>data.varyantQuery
        })
        .then(data => {
          // console.log(data.data.data.varyantQuery);
          this.varyantQuery = data.data.data.varyantQuery;
        });
    },
    async altvaryantlist() {
      if (this.selected.length > 0) {
        await axios
          .post('http://'+ process.env.API +':4000/graphql',{
            query: `query altvaryantquery($varyant_id:ID!){
                      altvaryantQuery(varyant_id:$varyant_id){
                                _id
                                varyantname
                                color
                                sira
                                
                }
              }`,
            variables: {
              varyant_id: this.selected[0]._id
            }

            // update:data=>data.varyantQuery
          })
          .then(data => {
            // console.log(data.data.data.varyantQuery);
            this.altvaryantQuery = data.data.data.altvaryantQuery;
          });
      } else {
        this.altvaryantQuery = [];
      }
    },
    closedialog() {
      this.medium = false;
      this.altmedium = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>