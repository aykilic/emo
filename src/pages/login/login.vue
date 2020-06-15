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
            <q-input class="col-md-10 col-12 q-mb-lg" ref="email" v-model="signin.email" label="Mail Adresi" :rules="[val => !!val || 'Hatalı Mail', isValidEmail]" outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" :rules="[val => !!val || 'Hatalı Password',val => val.length > 5 || 'Hatalı Password']" ref="password" type="password" v-model="signin.password" @keypress.enter.native="login()" label="Şifre" outlined/>
            <q-btn class="col-md-4 col-6 q-mb-md"  size="18px" color="positive " label="Giriş Yap" @click="login()" rounded/>
            
            </div>
          </q-tab-panel>

          <q-tab-panel class=" items-center " name="kayit">
            <div class="text-h6 text-center q-pb-md">Üye Kayıt</div>
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
          // entir(){
          //   console.log("object");
          // },
          isValidEmail (val) {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return emailPattern.test(val) || 'Hatalı email';
            },
           async login(){
              this.$refs.email.validate()
              this.$refs.password.validate()

              if(this.$refs.email.hasError || this.$refs.password.hasError){


                return;
              }
            // console.log("onay");
                        await axios
                .post('http://'+ process.env.API +':4000/graphql', {
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
                    if(response.data.data.loginuser_Query.res=='true'){
                        this.$store.dispatch('search_ubasketlist',response.data.data.loginuser_Query._id)
                        // guesti sil
                        Cookies.remove('guid')
                        this.$store.dispatch('delete_guid')
                        // guesti sil
                        // --------
                        // uid ekle
                        Cookies.set('uid',response.data.data.loginuser_Query._id)
                        this.$store.dispatch('add_uid')
                        //---------------
                        

                        this.$store.dispatch('search_ubasketlist',response.data.data.loginuser_Query._id)

                        Cookies.remove('guid')
                        this.$store.dispatch('delete_guid')
                        // guesti sil
                        // --------
                        // uid ekle
                        Cookies.set('uid',response.data.data.loginuser_Query._id)
                        this.$store.dispatch('add_uid')
                        let array=[]
                        if(this.get_ubasketlist.length > 0){
                          console.log("uid sepetinde ürün varsa");
                          this.get_ubasketlist.forEach(item=>{
                                if(this.get_basketlist.length > 0){
                                  console.log("guid sepetinde ürün varsa");
                                  this.get_basketlist.forEach(value=>{
                                    
                                  if (value.varyantid == item.varyantid) {
                                  }
                                  else{
                                    console.log("1");
                                      let avalue ={
                                          uid:response.data.data.loginuser_Query._id,
                                          guid:"",
                                          stokid:value.stokid,
                                          stokad:value.stokad,
                                          varyantid:value.varyantid,
                                          varyantoption1:value.varyantoption1,
                                          varyantoption2:value.varyantoption2,
                                          fiyat:value.fiyat,
                                          path:value.path,
                                          publicid:value.publicid,
                                          count:value.count,
                                      }
                                      array.push(avalue)
                                  }   
                                })
                            }
                            else{
                                console.log("guid sepetinde ürün yoksa");
                                
                                array=this.get_ubasketlist
                                console.log(array);
                                // array.map(avalue=>({
                                //     uid:response.data.data.loginuser_Query._id,
                                //     guid:"",
                                //     stokid:avalue.stokid,
                                //     stokad:avalue.stokad,
                                //     varyantid:avalue.varyantid,
                                //     varyantoption1:avalue.varyantoption1,
                                //     varyantoption2:avalue.varyantoption2,
                                //     fiyat:avalue.fiyat,
                                //     path:avalue.path,
                                //     publicid:avalue.publicid,
                                //     count:avalue.count,
                                // }))
                               let avalue={
                                    uid:response.data.data.loginuser_Query._id,
                                    guid:"",
                                    stokid:avalue.stokid,
                                    stokad:avalue.stokad,
                                    varyantid:avalue.varyantid,
                                    varyantoption1:avalue.varyantoption1,
                                    varyantoption2:avalue.varyantoption2,
                                    fiyat:avalue.fiyat,
                                    path:avalue.path,
                                    publicid:avalue.publicid,
                                    count:avalue.count,

                               }
                                array.push(avalue)
                            }
                            })

                          // mutation
                          console.log("3",array);
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
                              console.log("3.1");
                            })
                        }else{
                          console.log("uid sepeti boş ise",array);
                          this.get_basketlist.forEach(value=>{
                            let avalue ={
                                          uid:response.data.data.loginuser_Query._id,
                                          guid:"",
                                          stokid:value.stokid,
                                          stokad:value.stokad,
                                          varyantid:value.varyantid,
                                          varyantoption1:value.varyantoption1,
                                          varyantoption2:value.varyantoption2,
                                          fiyat:value.fiyat,
                                          path:value.path,
                                          publicid:value.publicid,
                                          count:value.count,
                                      }
                                      array.push(avalue)

                        })

                          // mutation
                          console.log("5",array);
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
                              console.log("5.1");
                            })
                        }
                        

                    this.$router.go(-1)
                    }else{
                      this.$q.notify({
                        type: 'negative',
                        message: `${response.data.data.loginuser_Query.res}`
                    })  
                    }

                })
            //    ----- mail
            // mutation{sendmail(username:"asas"){
            //     username
            //     }
            //     }
            //    ----- mail
            },
            async register() {
                // console.log(this.signup.username);
                 if(this.loginData.password.length > 5 && this.loginData.passwordConfirm > 5 && this.loginData.passwordConfirm == this.loginData.password){
                    // console.log("evet");
                 //----------------
               let checkmail= await axios.post(
                'http://'+ process.env.API +':4000/graphql', {
                 query: `query Search_checkmail($email:String){
                    Search_checkmail(email:$email){
                        _id
                   }  
                 }`,
                   variables: {
                    email: this.signup.email
                    }
            })
            // console.log("checkmail",checkmail);
             if(checkmail.data.data.Search_checkmail._id != null){
                    this.$q.notify({
                        type: 'negative',
                        message: `Mail Kullanımda`
                    })  
              return;
             }
                  //----------------


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