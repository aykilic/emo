<template>
    <div class=" row col-12  justify-center q-pt-xl">
    <!-- <div class="q-pa-xl">{{login}}</div> -->
    <q-card class="col-md-6 col-xs-12 ">
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
            <div class="text-h6 text-center q-pb-md">Üye Girişi</div>
            <div class="row justify-center ">
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signin.email" label="Mail Adresi"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signin.password" label="Şifre" outlined/>
            <q-btn class="col-md-4 col-6 q-mb-md " size="18px" color="positive " label="Giriş Yap" @click="login()" rounded/>
            
            </div>
          </q-tab-panel>

          <q-tab-panel class=" items-center " name="kayit">
            <div class="text-h6 q-pb-md">Üye Kayıt</div>
            <div class="row justify-center ">
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.username" label="Ad"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.lastname" label="Soyad"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.email" label="Mail Adresi"  outlined/>
            <!-- <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.password" label="Şifre" outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.repassword" label="Şifre Tekrarı" outlined/> -->
            <q-input 
            class="col-md-10 col-12 q-mb-lg"
                 v-model="loginData.password"
                 label="Şifre"
                 
                 v-bind:type="isPwd ? 'password' : ''"
                 lazy-rules
                 :rules="Required"
                 ref="fldPasswordChange"
                 outlined>
            <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        v-on:click="isPwd = !isPwd"></q-icon>
            </template>
        </q-input>
        <q-input 
        class="col-md-10 col-12 q-mb-lg"
                 v-model="loginData.passwordConfirm"
                 label="Şifre Tekrarı"
                 v-bind:type="isPwd ? 'password' : ''"
                 lazy-rules
                 :rules="ConfirmPWD"
                 ref="fldPasswordChangeConfirm"
                 outlined>
            <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        v-on:click="isPwd = !isPwd"></q-icon>
            </template>
        </q-input>
            <q-btn class="col-md-4 col-6 q-mb-md " size="18px" color="positive " label="Kayıt Ol " @click=" register()" rounded/>
            
            </div>
          </q-tab-panel>

          
        </q-tab-panels>
      </q-card>
  </div>
</template>

<script>
import {mapGetters } from 'vuex'
import axios from 'axios'
import gql from 'graphql-tag'
import { Cookies } from "quasar"
    export default {
        data() {
            return {
                tab:'giris',
                signin:{},
                signup:{},
                isPwd:true,

                // Required:"",
                // ConfirmPWD:"",
                loginData:{
                    password:'',
                    passwordConfirm:''
                },
                // isPwd:false
            }
        },
        computed: {
            
            Required() {
                return [(v) => !!v || 'Boş Geçemezsiniz',
                (v) =>  v.length > 5 || 'En Az 6 Karakter Olmalı',
                ]
            },
            ConfirmPWD() {
                return [
                    (v) => !!v || "Boş Geçemezsiniz",
                    (v) =>  v.length > 5 || 'En Az 6 Karakter Olmalı',
                    (v) => v == this.$refs.fldPasswordChange.value || "Girilen Şifre Farklı",
                    
                 ]
            },
            ...mapGetters([
                    "anakategorilists",
                    "anakategorizelists",
                    "activestoklistids",
                    "getvaryantlist",
                    "get_basketlist",
                    "get_ubasketlist",
                    'get_guid',
                    ])
                
                  
                
            
        },
        methods: {
           async login(){
            
                        await axios
                .post("http://localhost:4000/graphql", {
                  query: `query loginuser_Query($usermail: String,$password:String ){
                         loginuser_Query(usermail: $usermail,password: $password){
                             _id
                              username
                              usermail
                              res
                            }
                         }`,
                  variables: {
                    usermail:this.signin.email,
                    password:this.signin.password
                  }
                })
                .then(response => {
                    console.log(response.data.data.loginuser_Query);
                    if(response.data.data.loginuser_Query.res){
                        this.$store.dispatch('search_ubasketlist',response.data.data.loginuser_Query._id)
                        // guesti sil
                        Cookies.remove('guid')
                        this.$store.dispatch('delete_guid')
                        // guesti sil
                        // --------
                        // uid ekle
                        Cookies.set('uid',response.data.data.loginuser_Query._id)
                        this.$store.dispatch('add_uid')

                        // uid ekle
                        //  console.log("get_basketlist",this.get_basketlist);
                        //  console.log("get_ubasketlist",this.get_ubasketlist);
                        // console.log(this.get_basketlist);

                        let array = []

                        if(this.get_ubasketlist.length > 0){
                            
                            this.get_ubasketlist.forEach(item=>{
                                if(get_basketlist.length > 0){
                                this.get_basketlist.forEach(value=>{
                                    
                                 if (value.varyantid == item.varyantid) {
                                 }else{
                                    let avalue ={
                                        uid:response.data.data.loginuser_Query._id,
                                        guid:value.guid,
                                        stokid:value.stokid,
                                        stokad:value.stokad,
                                        varyantid:value.varyantid,
                                        varyantoption1:value.varyantoption1,
                                        varyantoption2:value.varyantoption2,
                                        path:value.path,
                                        publicid:value.publicid,
                                        count:value.count,
                                    }
                                        
                                     
                                     array.push(avalue)
                                 }   
                            })
                            }
                           
                                    
                            })
                            // mutation
                            this.$apollo
                            .mutate({
                            mutation: gql`
                                mutation mergesepet_mutation($sepetlist: [sepetlistInput]) {
                                mergesepet_mutation(sepetlist: $sepetlist) 
                                {
                                                      
                                                      _id
                                                    
                                                  }
                                }
                            `,
                            // loadingKey: 'loading',
                            variables: {
                                sepetlist: array
                            }
                            })
                            .then(data => {

                            })
                            console.log("1",array)
                        }else{
                            // ubasketlist yok
                            // basketlist var
                            // this.get_basketlist.forEach(value=>{
                                // Object.assign(value, {

                                //         uid:response.data.data.loginuser_Query._id

                                //         });
                                let array=[]
                                array=this.get_basketlist
                                array.map(avalue=>({
                                    uid:response.data.data.loginuser_Query._id,
                                    guid:avalue.guid,
                                    stokid:avalue.stokid,
                                    stokad:avalue.stokad,
                                    varyantid:avalue.varyantid,
                                    varyantoption1:avalue.varyantoption1,
                                    varyantoption2:avalue.varyantoption2,
                                    path:avalue.path,
                                    publicid:avalue.publicid,
                                    count:avalue.count,
                                }))
                                    //  array.push(lis)
                            // })
                            console.log("2",array)
                            // mutation
                        this.$apollo
                            .mutate({
                            mutation: gql`
                                mutation mergesepet_mutation($sepetlist: [sepetlistInput]) {
                                mergesepet_mutation(sepetlist: $sepetlist) 
                                {
                                                      
                                                      _id
                                                    
                                                  }
                                }
                            `,
                            // loadingKey: 'loading',
                            variables: {
                                sepetlist: array
                            }
                            })
                            .then(data => {

                            })
                        }
                        
                        
                        // mutation
                        // this.$apollo
                        //     .mutate({
                        //     mutation: gql`
                        //         mutation mergesepet_mutation($satirlist: [varyantlistInput]) {
                        //         mergesepet_mutation(satirlist: $satirlist) {
                        //             _id
                        //         }
                        //         }
                        //     `,
                        //     // loadingKey: 'loading',
                        //     variables: {
                        //         satirlist: this.satirlist
                        //     }
                        //     })
                        //     .then(data => {

                        //     })
                        // // mutation
                         this.$router.go(-1)

                    }else{
                        console.log(response.data.data.loginuser_Query);
                    }
                })
            //    ----- mail
            // mutation{sendmail(username:"asas"){
            //     username
            //     }
            //     }
            //    ----- mail
            },
            register() {
                console.log(this.signup.username);
                 if(this.loginData.password.length > 5 && this.loginData.passwordConfirm > 5 && this.loginData.passwordConfirm == this.loginData.password){
                    console.log("evet");
                 
                this.$apollo
        .mutate({
          mutation: gql`
            mutation createUser($username: String, $lastname: String, $usermail: String, $password:String) {
              createUser(username: $username, lastname: $lastname, usermail: $usermail, password:$password) {
                _id
                username
                password
                res
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
                username:this.signup.username,
                lastname:this.signup.lastname,
                usermail:this.signup.email,
                password:this.loginData.passwordConfirm,
          }
        })
        .then(response => {
                                          // Cookies.set('guid', data.data.createguid_mutation._id, { expires: 30, path: '' });
                                          console.log(response.data);
                                        });





                // this.$router.go(-1)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>