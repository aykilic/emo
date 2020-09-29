<template>
    <div class=" row col-12   justify-center  items-center	window-height"  >
    <!-- <div class="q-pa-xl">{{login}}</div> -->
   
    <q-card class="col-md-6 col-xs-12 " style="margin-top:-250px;">
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
            <q-item-label @click="forgotpassword" class="col-md-10 col-12 q-mb-lg cursor-pointer" style="color:blue;text-decoration: underline;"><a > Şifremi Unuttum </a></q-item-label>
            <q-btn class="col-md-4 col-6 q-mb-md"  size="18px" color="positive " label="Giriş Yap" @click="login()" rounded/>
            
            </div>
          </q-tab-panel>

          <q-tab-panel class=" items-center " name="kayit">
            <div class="text-h6 text-center q-pb-md">Üye Kayıt</div>
            <div class="row justify-center ">
            <q-input class="col-md-10 col-12 q-mb-lg" ref="uad" :rules="[val => !!val || 'İsim Giriniz']" v-model="signup.username" label="Ad"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" ref="usad" :rules="[val => !!val || 'Soyad Giriniz']" v-model="signup.lastname"  label="Soyad"  outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" ref="uemail" v-model="signup.email" :rules="[val => !!val || 'Hatalı Mail', isValidEmail]" label="Mail Adresi"  outlined/>
            <!-- <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.password" label="Şifre" outlined/>
            <q-input class="col-md-10 col-12 q-mb-lg" v-model="signup.repassword" label="Şifre Tekrarı" outlined/> -->
            <q-input 
            class="col-md-10 col-12 q-mb-lg"
                 v-model="SignupData.password"
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
                 v-model="SignupData.passwordConfirm"
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
                
                SignupData:{
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
          forgotpassword(){
            this.$router.push({ path: 'forgotpassword' })
          },
          // entir(){
          //   console.log("object");
          // },
          //ibo
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
                .post(  process.env.API, {
                  query: `query loginuser_Query($usermail: String,$password:String ){
                         loginuser_Query(usermail: $usermail,password: $password){
                              _id
                              username
                              usermail
                              token
                              role
                              res
                            }
                         }`,
                  variables: {
                    usermail:this.signin.email,
                    password:this.signin.password
                  }
                })
                .then(response => {
                    console.log("response.data.data.loginuser_Query",response.data.data.loginuser_Query);
                    if(response.data.data.loginuser_Query.res=='true'){
                        Cookies.set('token',response.data.data.loginuser_Query.token)
                        this.merge(response.data.data.loginuser_Query)
                    }else{
                      this.$q.notify({
                        type: 'negative',
                        message: `${response.data.data.loginuser_Query.res}`
                    })  
                    }

                })
                // location.reload()
              //    ----- mail
              // mutation{sendmail(username:"asas"){
              //     username
              //     }
              //     }
              //    ----- mail
            },
            async register() {
                // console.log(this.signup.username);
                this.$refs.fldPasswordChangeConfirm.validate()
                this.$refs.uemail.validate()
                this.$refs.uad.validate()
                this.$refs.usad.validate()
                if(this.$refs.uemail.hasError || this.$refs.uad.hasError || this.$refs.usad.hasError || this.$refs.fldPasswordChangeConfirm.hasError){


                return;
              }
                 if(this.SignupData.password.length > 5 && this.SignupData.passwordConfirm > 5 && this.SignupData.passwordConfirm == this.SignupData.password){
                    // console.log("evet");
                 //----------------
               let checkmail= await axios.post(
                  process.env.API, {
                 query: `query Search_checkmail($email:String){
                    Search_checkmail(email:$email){
                        _id
                   }  
                 }`,
                   variables: {
                    email: this.signup.email
                    }
            })
             console.log("checkmail",checkmail.data.data.Search_checkmail);
             if (checkmail.data.data.Search_checkmail != null ) {

               if(checkmail.data.data.Search_checkmail._id != null){
                    this.$q.notify({
                        type: 'negative',
                        message: `Mail Kullanımda`
                    })  
              return;
             }
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
                              password:this.SignupData.passwordConfirm,
                        }
                      })
                      .then(async response => {
                            // Cookies.set('guid', data.data.createguid_mutation._id, { expires: 30, path: '' });
                            console.log("createİD",response.data.createUser._id);
                            await this.merge(response.data.createUser)
                            // this.$q.notify({
                            //     type: 'positive',
                            //     message: `Kayıt Başarılı`
                            // }) 
                            // Cookies.remove('guid');
                            // Cookies.set('uid',response.data.createUser._id)
                            // this.$store.dispatch('add_uid')
                            // this.$router.push({ path: '/' })
                          });
                // this.$router.go(-1)
                }
            },
            async merge(response){
              this.$store.dispatch('search_ubasketlist',response._id)
                        // guesti sil
                        Cookies.remove('guid')
                        this.$store.dispatch('delete_guid')
                        // guesti sil
                        // --------
                        // uid ekle
                        Cookies.set('uid',response._id)
                        this.$store.dispatch('add_uid')
                        //---------------
                        

                        this.$store.dispatch('search_ubasketlist',response._id)

                        Cookies.remove('guid')
                        this.$store.dispatch('delete_guid')
                        // guesti sil
                        // --------
                        // uid ekle
                        Cookies.set('uid',response._id)
                        this.$store.dispatch('add_uid')
                        let array=[]
                        if(this.get_ubasketlist.length > 0){
                          console.log("uid sepetinde ürün varsa");
                          this.get_ubasketlist.forEach(item=>{
                                if(this.get_basketlist.length > 0){
                                  console.log("guid sepetinde ürün varsa");
                                  this.get_basketlist.forEach(value=>{
                                    
                                  if (value.varyantid == item.varyantid) {
                                    // aynı ürün
                                  }
                                  else{
                                    console.log("1");
                                      let avalue ={
                                          uid:response._id,
                                          guid:null,
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
                            //    let avalue={
                            //         uid:response._id,
                            //         guid:"",
                            //         stokid:item.stokid,
                            //         stokad:item.stokad,
                            //         varyantid:item.varyantid,
                            //         varyantoption1:item.varyantoption1,
                            //         varyantoption2:item.varyantoption2,
                            //         fiyat:item.fiyat,
                            //         path:item.path,
                            //         publicid:item.publicid,
                            //         count:item.count,

                            //    }
                            //     array.push(avalue)
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
                                          uid:response._id,
                                          guid:null,
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
                        

                    this.$router.push({ path: '/' })
            }
        },
    }
</script>

<style lang="scss" scoped>
// .footer{
  // display:none !important;
// }
</style>