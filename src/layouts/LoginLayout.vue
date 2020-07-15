<template>
    <div class="row q-mb-xl q-mt-xl text-center">
        <div class=" col-12">
          <router-link to="/">
          <q-img
          src="statics/Emose_Logo.jpg"
          style=" max-width: 140px"
          />
          </router-link>
        </div>
        <router-view ></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters } from 'vuex'
import router from "../router"
import { Cookies } from "quasar";
    export default {
        computed: {
    
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'anakategorilists',
      'get_guid',
      'get_basketlist',
      'get_userdetaillists',
      'get_user'
      
    ]),
    ...mapState([
        'guid'
    ])
  },
 async mounted(){
   
    //  console.log("get_guid",this.get_guid);
    //  if(this.get_guid == "" || this.get_guid == undefined || this.get_guid == null  ){
     if(Cookies.get('guid')== null || Cookies.get('guid')== undefined || this.get_guid == "" || this.get_guid == undefined || this.get_guid == null  ){
          // console.log("11");
        if(Cookies.get('uid')){
          this.$store.dispatch('search_getuser',Cookies.get('uid'))
          this.$store.dispatch('add_uid',Cookies.get('uid'))
          // this.$store.dispatch('user',Cookies.get('uid'))

          }else{
            this.$store.dispatch('add_guid',Cookies.get('guid'))
          }
        
      }else{
          //  console.log("22");
          
           this.$store.dispatch('add_guid',this.get_guid)
        //    console.log("get_guid",this.get_guid);
      }
  }
    }
</script>

<style lang="scss" scoped>

</style>