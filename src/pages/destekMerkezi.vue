<template>
  <div class="row col-12 justify-center">
    <!-- <q-separator class="q-mt-xl" /> -->
    <q-list class="col-12 q-mt-xl" bordered>
      <q-expansion-item group="somegroup" label="Gizlilik ve Güvenlik" header-class>
        <q-card>
          <q-card-section>
                <q-item-label  style="font-size:16px">
                   <div v-html="gg" class="">
                       
                   </div>
                    
                </q-item-label>
                
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item group="somegroup" label="Mesafeli Satış Sözleşmesi" header-class>
        <q-card>
              <q-item-section>
                <q-item-label style="font-size:16px">
                   <div v-html="mss" class="q-pa-md">
                       
                   </div>
                </q-item-label>
              </q-item-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item group="somegroup" label="İade İşlemleri" header-class>
        <q-card>
              <q-item-section>
                <q-item-label style="font-size:16px">
                   <div v-html="ii" class="q-pa-md">
                       
                   </div>
                </q-item-label>
              </q-item-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item group="somegroup" label="K.V.K.K" header-class>
        <q-card>
              <q-item-section>
                <q-item-label style="font-size:16px">
                   <div v-html="kvkk" class="q-pa-md">
                       
                   </div>
                </q-item-label>
              </q-item-section>
        </q-card>
      </q-expansion-item>
      <!-- <q-expansion-item group="somegroup" label="Sık Sorulan Sorular" header-class>
        <q-card>
              <q-item-section>
                <q-item-label style="font-size:16px">
                   <div v-html="ssk" class="q-pa-md">
                       
                   </div>
                </q-item-label>
              </q-item-section>
        </q-card>
      </q-expansion-item> -->
      

      <!-- <q-separator /> -->
    </q-list>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import { Loading } from "quasar";
export default {
  name: "destekmerkezi",
  data() {
    return {
      tab: "gg",
      splitterModel: 30,
      cid:"",  
      gg:"",
      mss:"",
      ii:"",
      kvkk:"",
      ssk:""
                        
    };
  },
  async mounted () {
      await this.cquery()
  },
  methods: {
      async cquery(){
            await axios
                    .post(  process.env.API,{
                    query: `query cozumQuery{
                            cozumQuery{
                               _id
                               gg
                               mss
                               ii
                               kvkk
                               ssk
                                }
                            }`,
                    })
                    .then(data => {
                        console.log(data.data.data.cozumQuery);
                        if (data.data.data.cozumQuery == null) {

                            return 
                        }
                        this.cid=data.data.data.cozumQuery[0]._id
                        this.gg=data.data.data.cozumQuery[0].gg
                        this.mss=data.data.data.cozumQuery[0].mss
                        this.ii=data.data.data.cozumQuery[0].ii
                        this.kvkk=data.data.data.cozumQuery[0].kvkk
                        this.ssk=data.data.data.cozumQuery[0].ssk
                    })
      }
  },
};
</script>

<style lang="scss" scoped>
</style>