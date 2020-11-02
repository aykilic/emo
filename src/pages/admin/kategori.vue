<template>
  <div class="q-pa-xl row q-gutter-md">
    <!-- <div v-if="!treem.length"></div> -->

    <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12" title>
      <q-card class="my-card col-md-5 offset-md-3 row col-sm-8 offset-sm-2 offset-xs-1" title>
        <div class="col-12 offset-md-1">
          <!-- <q-card-section >
              <div class="text-h6 text-center" >Kategori</div>
          </q-card-section>-->
          <!--    <q-separator inset />-->

          <!-- <q-input class="q-pa-md " outlined v-model="stokturad" label="Adı" :dense=false /> -->
          <!-- <q-card-section>
            <div class="text-h6 ">Kategori Ağacı</div>
          </q-card-section>-->
          <!-- <q-tree
            
            :selected.sync="selected"
            @update:selected="dene"
            :nodes="treem"
            node-key="_id"
            label-key="stokturad"
            ref="nodes"
          />-->

          <!-- <treeselect
              
              :options="treem"
              class="kategori"
              :show-count="true"
              :normalizer="normalizer"
              :default-expand-level="5"
              :flatten-search-results="true"
              placeholder="Üst Kategori"
              v-model="ustkategori"
  
          />-->
          <!-- <treeselect-value :value="ustkategori" /> -->
          <!-- <q-select

          fill-input
          input-debounce="0"
          hide-selected
          use-input
          @filter="filterFn"
          class="q-pa-md "
          label="Üst Kategori"
          outlined
          v-model="ustkategori"
          :options="options"
          option-value="_id"
          option-label="stokturad"

          auto-select
          >-->
          <!--      option-value="id"-->
          <!--      option-label="stokturad"-->
          <!--      :display-value ="`${ustkategori.stokturad ? ustkategori.stokturad : 'Yok'}`"-->
          <!-- </q-select> -->
          <!-- <div class="text-center">
              <q-btn class="q-ma-md " @click="createStoktur()" color="primary" label="Kaydet" />

          </div>-->
        </div>
      </q-card>
    </q-card>

    <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
      <q-card class="col-md-4 col-sm-10 offset-sm-1 col-xs-12" title>
        <q-dialog v-model="medium">
          <q-card style="width: 500px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6 text-center">Kategori Düzenle</div>
            </q-card-section>

            <q-card-section>
              <q-input
                class="q-pa-md"
                outlined
                v-model="editedItem.stokturad"
                label="Adı"
                :dense="false"
              />
              <q-select
                class="q-pa-md col-md-12"
                label="Üst Kategori"
                outlined
                v-model="editedItem.children"
                :options="Query"
                option-value="parentid"
                option-label="stokturad"
                :display-value="`${editedItem.children.stokturad}`"
              ></q-select>
            </q-card-section>

            <q-card-section class="text-right">
              <q-btn
                class="q-ma-sm"
                color="primary"
                label="Güncelle"
                @click="updateStoktur(editedItem)"
                v-close-popup
              ></q-btn>
              <q-btn
                class="q-mr-md"
                color="negative"
                label="Sil"
                @click="deleteStoktur(editedItem)"
                v-close-popup
              ></q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--      <app-tablestok></app-tablestok>-->
        <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;***************&#45;&#45;&#45;&#45;&#45;&#45;-->
        <q-card-section>
          <div class="text-h6">Kategori Listesi</div>
        </q-card-section>
        <q-tree
          :selected.sync="selected"
          @update:selected="dene"
          :nodes="treem"
          node-key="_id"
          label-key="stokturad"
          ref="nodes"
          default-expand-all
        />
      </q-card>

      <q-card class="col-md-5 col-sm-10 offset-sm-1 col-xs-12" title>
        <q-card class="col-12" title>
          <q-card-section>
            <div class="text-h6 text-center">Kategori</div>
          </q-card-section>

          <!--    <q-separator inset />-->

          <q-input class="q-pa-md" outlined v-model="stokturad" label="Adı" :dense="false" />
          <q-card-section>
            <div class="text-h6 text-center">
              Üst Kategori
              <br />
              <q-badge align="middle" color="red">Kategori Listesinden Seçiniz !...</q-badge>
            </div>
          </q-card-section>

          <!--    <q-separator inset />-->

          <q-input
            class="q-pa-md kategori"
            outlined
            v-model="ustkategoriad"
            placeholder="ANA KATEGORİ"
            :dense="false"
            disable
          />

          <div class="text-center">
            <q-btn class="q-ma-md" @click="createStoktur()" color="primary" label="Kaydet" />
          </div>
        </q-card>
      </q-card>
    </q-card>

    <q-card class="col-md-10 row offset-md-1 col-sm-10 offset-sm-1 col-xs-12">
      <q-card class="col-md-10 col-sm-10 offset-sm-1 col-xs-12" title>
        <!--        <q-card class="col-10 offset-1">-->
        <q-dialog v-model="medium">
          <q-card style="width: 500px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6 text-center">Kategori Düzenle</div>
            </q-card-section>

            <q-card-section>
              <q-input
                class="q-pa-md"
                outlined
                v-model="editedItem.stokturad"
                label="Adı"
                :dense="false"
              />
              <q-select
                class="q-pa-md col-md-12"
                label="Üst Kategori"
                outlined
                v-model="editedItem.children"
                :options="Query"
                option-value="parentid"
                option-label="stokturad"
                :display-value="`${editedItem.children.stokturad}`"
                @click.native="deneme(editedItem.children)"
              ></q-select>
            </q-card-section>

            <q-card-section class="text-right">
              <q-btn
                class="q-ma-sm"
                color="primary"
                label="Güncelle"
                @click="updateStoktur(editedItem)"
                v-close-popup
              ></q-btn>
              <q-btn
                class="q-mr-md"
                color="negative"
                label="Sil"
                @click="deleteStoktur(editedItem)"
                v-close-popup
              ></q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!--      <app-tablestok></app-tablestok>-->
        <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;***************&#45;&#45;&#45;&#45;&#45;&#45;-->
        <q-card-section>
          <div class="text-h6">Kategori Listesi</div>
        </q-card-section>
        <q-table :data="Query" :columns="columnss" row-key="name" :pagination.sync="pagination">
          <template v-slot:body="props">
            <q-tr :props="props" class="cursor-pointer" @click.native="editItem(props.row)">
              <q-td key="adi" :props="props">{{props.row.stokturad}}</q-td>
              <q-td key="ust" :props="props">{{props.row.children.stokturad}}</q-td>
            </q-tr>
          </template>
        </q-table>

        <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;*************-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
      </q-card>
    </q-card>
    <div></div>
  </div>
</template>
<!--<link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">-->
<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import { Loading } from "quasar";

export default {
  components: {
    //  Treeselect,
    // child
  },
  // components: {
  //   TreeMenu
  // },
  props: {},
  name: "stok",

  apollo: {
    Query: {
      query: gql`
        {
          Query {
            stokturad
            parentid
            _id
            children {
              stokturad
              parentid
              _id
            }
          }
        }
      `,
      loadingKey: "loading",
      watchLoading(isLoading, countModifier) {
        console.log(isLoading);
      },
      update: (data) => data.Query,
      // update(data){
      //    return data.Qkategori
      // },

      // result ({ data }) {
      //
      //     this.Qkategori = data.Qkategori
      //
      // }
    },
  },

  data() {
    return {
      loading: 0,
      value: "",
      editedItem: {
        _id: "",
        stokturad: "",
        parentid: "",
        children: {
          stokturad: "",
          parentid: "",
          _id: "",
        },
      },
      selected: "",
      example1: [],
      example2: "",
      treem: [],
      medium: false,
      editstokturad: "",
      Query: [],
      users: [],
      ustkategoriid: null,
      ustkategoriad: "",
      columnss: [
        {
          name: "adi",
          label: "Kategori",
          align: "left",
          sortable: true,
          field: (row) => row.stokturad,
        },
        {
          name: "ust",
          label: "Üst Kategori",
          align: "left",
          sortable: true,
          field: (row) => row.children.stokturad,
        },
      ],

      lastname: "",
      stokturu: "",
      stokturad: "",
      // date:moment(now).format('YYYY-MM-DD HH:mm'),
      pagination: {
        sortBy: "ust",
        descending: false,
        page: 1,
        rowsPerPage: 1000,
        // rowsNumber: 5,q
      },
      // options:[],
      isChildren: 0,
    };
  },
  watch: {
    loading(val) {
      if (val > 0) {
        Loading.show();
      } else {
        Loading.hide();
      }
    },
  },
  async mounted() {
    // Loading.show()
    // console.log(this.loading);
    // console.log(this.Query);
    this.treedata();
    // console.log(this.loading);
  },
  updated() {
    // this.$refs.nodes.expandAll();
  },

  methods: {
    async treedata () {
      Loading.show()
       await axios.post(
        process.env.API,
        {
          query: `{
                    Query{
                      stokturad
                      parentid
                      _id
                      
                    }
        }`,
          
        }).then((data)=>{
          Loading.hide()
            // commit('set_varyantlist',data.data.data.childvaryantQuery);
            this.example1 = data.data.data.Query;
          }).catch(err => {
            console.log(err);
              Loading.hide()
      
          })
      // this.example1 = res.data.data.Query;
      // this.example2 = this.example1[0].parentid;

      //  console.log(this.example1);
      this.parseTree(this.example1);
    },

    parseTree(selfQ, parentID = null) {
      let treem = [];
      //  console.log(selfQ);

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
      // console.log(this.treem);
      return this.treem;
    },

    editItem(item) {
      this.selected = null;
      // console.log(item);
      // this.editedIndex = this.gorevler.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.medium = true;
      // console.log(item.id)
    },

    createStoktur() {
      //  console.log(this.ustkategoriid,this.selected);

      if (this.selected == "") {
        this.ustkategoriid = null;
      } else {
        this.ustkategoriid = this.selected;
      }
      Loading.show();
      this.$apollo
        .mutate({
          mutation: gql`
            mutation createStoktur($stokturad: String, $parentid: String) {
              createStokturu(stokturad: $stokturad, parentid: $parentid) {
                stokturad
                parentid
              }
            }
          `,

          variables: {
            stokturad: this.stokturad,
            parentid: this.ustkategoriid,
          },
          // -------*********-----------
          refetchQueries: [
            {
              query: gql`
                {
                  Query {
                    stokturad
                    parentid
                    _id
                    children {
                      stokturad
                      parentid
                      _id
                    }
                  }
                }
              `,
            },
          ],
        })
        .then(async (data) => {
          console.log("Done");
          this.treedata();
          this.stokturad = "";
          //  this.ustkategoriid=""
          this.ustkategoriad = "";
          await this.$store.dispatch("anafunction");
          Loading.hide();
        });

      // this.treedata()
      this.selected = null;
    },
    updateStoktur() {
      // console.log(this.editedItem._id);
      // console.log(this.editedItem.parentid);
      // console.log(this.editedItem.children._id);
      // console.log(this.selected);
      this.$apollo
        .mutate({
          mutation: gql`
            mutation updateKategori(
              $id: String!
              $stokturad: String!
              $parentid: String
            ) {
              updateKategori(
                id: $id
                stokturad: $stokturad
                parentid: $parentid
              ) {
                _id
              }
            }
          `,

          variables: {
            id: this.editedItem._id,
            stokturad: this.editedItem.stokturad,
            parentid: this.editedItem.children._id,
          },
          refetchQueries: [
            {
              query: gql`
                {
                  Query {
                    stokturad
                    parentid
                    _id
                    children {
                      stokturad
                      parentid
                      _id
                    }
                  }
                }
              `,
            },
          ],
        })
        .then(async (data) => {
          this.treedata();
          await this.$store.dispatch("anafunction");
        });
    },
    altkategori(key, treem) {
      let self = this;
      treem.forEach(function (value, index) {
        if (value._id == key) {
          //  console.log(value._id,key);

          // self.isChildren = self.isChildren++
          if (value.children) {
            return (self.isChildren = 1);
            // self.altkategori(key, value.children);
          }
        }
      });
    },

    deleteStoktur(item) {
      this.altkategori(item._id, this.treem);
      // console.log(this.isChildren);
      //  this.altkategori(item._id, treem)
      // let id =item.id;
      // eğer kategorinin altında urun varsa silinemez

      if (this.isChildren > 0) {
        console.log("hata");
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation deleteStoktur($id: String!) {
                deleteStokturu(id: $id) {
                  _id
                }
              }
            `,
            variables: {
              id: item._id,
            },
            refetchQueries: [
              {
                query: gql`
                  {
                    Query {
                      stokturad
                      parentid
                      _id
                      children {
                        stokturad
                        parentid
                        _id
                      }
                    }
                  }
                `,
              },
            ],
            loadingKey: "loading",
          })
          .then((data) => {
            console.log("Done");
            this.treedata();
            this.ustkategoriad = "";
          });
      }
      this.isChildren = 0;
      // location.reload();
    },
    refetch() {
      this.$apollo.queries.Query.refetch();
    },
    filterFn(val, update, abort) {
      // if (val.length < 1) {
      //   abort();
      //   return
      // }

      update(() => {
        const needle = val.toLowerCase();
        // console.log(this.Query.filter(v => v.stokturad.toLowerCase().includes(needle)));
        this.options = this.Query.filter((v) =>
          v.stokturad.toLowerCase().includes(needle)
        );
      });
    },
    // <input (val) {
    //   this.notif();
    //   this.notif = this.$q.notify({
    //     message: `Selected ${val} as our hero.`,
    //     timeout: 300,
    //     color: 'positive'
    //   })
    // }
    search(key, treem) {
      treem.forEach((value, index) => {
        if (value._id === key) {
          // console.log(value.stokturad);
          return (this.ustkategoriad = value.stokturad);
        } else if (value.children) {
          this.search(key, value.children);
        }
        return null;
      });
    },
    deneme(a) {
      // console.log("a",a);
    },
    dene() {
      // console.log(this.stokturad);
      console.log(this.selected);
      if (this.selected == null) {
        this.ustkategoriad = "";
      } else {
        this.search(this.selected, this.treem);
      }
    },
  },

  // for(let i in selfQ) {
  //   let children =null;
  //   if(selfQ[i].parentid === parentID) {
  //      children = this.parseTree(selfQ, selfQ[i].id);
  //
  //     if(children.length) {
  //       // selfQ[i].children = children
  //       Vue.set(selfQ[i], 'children', children);
  //     }
  //     this.treem.push(selfQ[i])
  //   }
  // }
};
</script>

<style lang='scss' scoped>
/*@import '../../css/material.scss';*/
</style>
