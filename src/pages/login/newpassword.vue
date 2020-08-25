<template>
    <div class="row col-12 justify-center items-center window-height">
        <!-- <q-card class="col-md-6 col-xs-12 " style="margin-top:-250px;">
            <q-input class="col-md-10 col-12 q-mb-lg" ref="email" v-model="email" label="Mail Adresi" :rules="[val => !!val || 'Hatalı Mail', isValidEmail]" outlined/>
        </q-card> -->
        <q-card  style="width: 500px; max-width: 160vw; margin-top:-300px;" >
              <q-card-section class="row justify-center">
                <div class="text-h6 ">Şifre Sıfırlama</div>
                <!-- <q-space /> -->
                <!-- <q-btn icon="close" flat round dense v-close-popup /> -->
              </q-card-section>
            <q-separator/>
              <q-card-section class="row ">
                <q-input 
            class=" col-12 q-mb-lg"
                 v-model="password"
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
        class="col-12 q-mb-lg"
                 v-model="passwordConfirm"
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
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-center">

                <q-btn  class="text-black"  color="" label="Gönder" @click="changePassword()" v-close-popup ></q-btn>
                
                <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
              </q-card-section>
        </q-card>
    </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";
import { Loading } from "quasar";
import { mapState, mapGetters } from "vuex";
import { Notify } from 'quasar'
var jwt = require('../../../node_modules/jsonwebtoken'); 
    export default {
        props:['token'],
        data() {
            return {
                password:"",
                passwordConfirm:"",
                isPwd:true,
                usermail:""
            }
        },
        watch: {
            
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
        },
        async mounted () {
            // console.log("token",this.token);
            // console.log("usermail",this.usermail);
            // var decoded = jwt.decode(this.token);
            //  console.log(process.env.JWT_SECRET);
            // console.log(decoded.payload)
            let vm =this
            var verify =  jwt.verify(this.token, process.env.JWT_SECRET, function(err, decoded) {
                // console.log("decoded",decoded) // bar
                if(err){
                    
                    
                    vm.$router.push({ path: '/forgotpassword' })
                    vm.$q.notify({
                                    type: 'negative',
                                    message: `Aktivasyon kodu geçersiz.`
                                }) 
                                return
                }
                vm.usermail=decoded.usermail
                console.log("usermail",vm.usermail);
                });
            
        },
        methods: {
            
            changePassword(){
                if(this.$refs.fldPasswordChangeConfirm.hasError){


                    return;
                }
                if(this.password.length > 5 && this.passwordConfirm > 5 && this.passwordConfirm == this.password){

                    this.$apollo
                        .mutate({
                            mutation: gql`
                            mutation changePassword($usermail: String,$password: String, $token: String,) {
                                changePassword(usermail: $usermail,password: $password, token: $token) {
                                _id
                                
                                }
                            }
                            `,
                            // loadingKey: 'loading',
                            variables: {
                                
                                usermail:this.usermail,
                                token:this.token,
                                password:this.passwordConfirm
                            }
                        })
                        .then(async response => {
                                    this.$q.notify({
                                    type: 'positive',
                                    message: `Şifreniz Başarıyla Değiştirildi`
                                }) 
                            // this.$router.push({ path: '/' })
                            });

                }else{
                    return;
                }
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>