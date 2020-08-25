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
                <q-input class="col-12 q-pt-md" ref="email" v-model="email" label="Mail Adresinizi Giriniz" :rules="[val => !!val || 'Hatalı Mail', isValidEmail]" outlined/>
     
              </q-card-section>
                <q-separator/>
              <q-card-section  class="text-center">

                <q-btn  class="text-black"  color="" label="Gönder" @click="sendForgotPassword()" v-close-popup ></q-btn>
                
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
    export default {
        data() {
            return {
                email:"",
            }
        },
        watch: {
        },
        computed: {
        },
        mounted () {
            
        },
        methods: {
            
             async sendForgotPassword(){
                 if(this.$refs.email.hasError){
                    //  console.log("hata");
                 }else{
                    await axios.post(
                            'http://'+ process.env.API +':4000/graphql', {
                            query: `query forgotUserQuery($usermail:String){
                                forgotUserQuery(usermail:$usermail){
                                    token
                                    usermail
                                    res
                            }  
                            }`,
                            variables: {
                                usermail:this.email,
                                }
                        }).then( (response) => { 
                            // console.log("response.data.data.forgotUserQuery.res",response.data.data.forgotUserQuery);
                            if(response.data.data.forgotUserQuery.res == false){
                            this.$q.notify({
                                    type: 'negative',
                                    message: `Girdiğiniz e-mail sistemimizde kayıtlı değildir.`
                                }) 

                            }else{

                                this.$apollo
                                    .mutate({
                                        mutation: gql`
                                        mutation sendForgotPasswordMail($usermail: String, $token: String,) {
                                            sendForgotPasswordMail(usermail: $usermail, token: $token) {
                                            _id
                                            
                                            }
                                        }
                                        `,
                                        // loadingKey: 'loading',
                                        variables: {
                                            
                                            usermail:this.email,
                                            token:response.data.data.forgotUserQuery.token
                                        }
                                    })
                                    .then(async response => {
                                                this.$q.notify({
                                                type: 'positive',
                                                message: `E-Posta kutunuzu kontrol ediniz.`
                                            }) 
                            
                                        });

                                                
                                            }
                                            
                                        })
                 }
           
                

            },
            isValidEmail (val) {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return emailPattern.test(val) || 'Hatalı email';
            },
        },
    }
</script>

<style lang="stylus" scoped>

</style>