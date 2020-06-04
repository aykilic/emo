<template>
  <div class=" row col-12  justify-center q-pt-xl">
    <!-- <div class="q-pa-xl">{{login}}</div> -->
    <q-card v-if="get_guid == undefined " class="col-md-4 col-xs-12 ">loading</q-card>
    <q-card v-else class="col-md-4 col-xs-12 ">
        <q-tabs
          v-model="tab"
          
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="giris"  label="Giriş" />
          <q-tab name="kayit" label="Kayıt Ol" />
          
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel class=" items-center " name="giris">
            <div class="text-h6 q-pb-md">Üye Girişi</div>
            <!-- <div class="text-h6 q-pb-md">{{get_guid}}</div> -->
            <div class="row justify-center ">
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signin.mail" label="Mail Adresi"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signin.password" label="Şifre" outlined/>
            <q-btn class="col-md-4 col-6 q-mb-md " size="18px" color="positive " label="Giriş Yap " rounded/>
            <div class="col-12 text-subtitle2 q-mb-md">veya</div>
            <q-btn class="col-md-8 col-11 text-pink-12" size="18px" color="white" @click="sell()" label="Üye olmadan devam et" rounded/>
            </div>
          </q-tab-panel>

          <q-tab-panel class=" items-center " name="kayit">
            <div class="text-h6 q-pb-md">Üye Kayıt</div>
            <div class="row justify-center ">
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.ad" label="Ad"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.soyad" label="Soyad"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.mail" label="Mail Adresi"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.password" label="Şifre" outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.repassword" label="Şifre Tekrarı" outlined/>
            <q-btn class="col-md-4 col-6 q-mb-md " size="18px" color="positive " label="Kayıt Ol " rounded/>
            
            </div>
          </q-tab-panel>

          
        </q-tab-panels>
      </q-card>
  </div>
</template>

<script>
import { Cookies } from "quasar";
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import { mapState, mapGetters } from "vuex";
import { Loading } from "quasar";



export default {
    data() {
        return {
            login:"",
            tab:'giris',
            signin:"",
            signup:""
        }
    },
    watch:{

    },
    computed: {
    ...mapGetters([
      'anakategorilists',
      'get_guid',
      'get_uid',
      'get_basketlist',
      'get_ubasketlist',
      
    ]),
    },
    mounted () {
      // console.log(this.get_uid); //yoksa undefined
      // console.log(Cookies.get('uid')); //yoksa null

      if(Cookies.get('uid')){
        console.log("uid varsa");

      }else{
        console.log("uid yoksa");
        



      }
    //   setTimeout(() => {
    //     // console.log("uid varrr");
    //      console.log("get_guid",this.get_guid); 
    //   console.log("get_basketlist",this.get_basketlist); 
    //  }, 2000);
      
      // if("this.get_basketlist.length >0"){}


    },
    methods: {
      sell() {
        this.$router.push({ path: '/sell' })
      }
    },
};
</script>

<style lang="scss" scoped>
</style>