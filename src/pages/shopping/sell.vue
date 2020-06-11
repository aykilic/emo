<template>
        <div class="row col-12  justify-center q-pt-xl" >
            <div v-if="lists.length == 0"><q-img
          src="statics/Emose_Logo.jpg"
          style=" max-width: 140px"
          /></div>
                <q-stepper
                    v-else
                    class="col-12 "
                    
                    v-model="step"
                    ref="stepper"
                    alternative-labels
                    
                    color="primary"
                    animated
                    >
                    <q-step
                        class=" "
                            :name="1"
                            title=""
                            icon="mdi-cart"
                            :done=" step > 1 "
                            style=""
                        >
                        <div class="row  justify-center" >
                        <div class="row q-gutter-y-md col-md-10" >
                        <div class="col-xs-12 col-md-8" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;">
                            
                            <q-table
                            flat
                            :data="lists"
                            :columns="columns"
                            row-key="_id"
                            selection="multiple"
                            :selected.sync="selected"
                            :pagination.sync="pagination"
                            hide-bottom
                            :dense="$q.screen.lt.md"
                            >
                            <template v-slot:body="props" >
                                <!-- <q-tr :props="props"  class="cursor-pointer" @click.native="props.selected = !props.selected" @click="secim(props)"> -->
                                <!-- <q-tr :props="props"  class="cursor-pointer"  > -->
                                <q-tr :props="props"  class="cursor-pointer"  >
                                    <q-td >
                                        <q-checkbox color="grey-8"  dense v-model="props.selected"/>
                                    </q-td>
                                    <q-td  style=""  key="resim" :props="props"  > 
                                        <div class="scale-down "  ><q-img style="border-radius:10px;"  :src="props.row.path + props.row.publicid " /></div>
                                    
                                    </q-td>
                                    <q-td class="text-weight-bold" key="stokad" :props="props"  > 
                                        {{props.row.stokad}} <br> {{props.row.varyantoption1}} <br> {{props.row.varyantoption2}}
                                    </q-td>
                                    <q-td style="width:115px" key="miktar"  :props="props"  > 
                                        <q-input
                                        style="margin-top:20px;"
                                            dense
                                            oninput=" if (this.value < 1) {this.value = 1}else if(this.value > 10){this.value = 10}"
                                            @input="hesaplama()"
                                            v-model="props.row.count"
                                            type="number"
                                            outlined
                                            :rules="[ val => val > 0  ]"
                                            />

                                    
                                    </q-td>
                                    <q-td class="text-weight-bold " key="fiyat" :props="props"  > 
                                        {{formatPrice(props.row.fiyat)}} TL
                
                                    
                                    </q-td>
                                    <q-td  key="delete" :props="props"  > 
                                        <q-btn size="md"  icon="delete" color="grey-7" @click="delete_basketproduct(props.row._id)" flat round></q-btn>

                                    
                                    </q-td>
                                    <!-- <q-td key="fiyat" :props="props"  >
                                    
                                    </q-td> -->
                                </q-tr>
                            </template>
                                
                            </q-table>
                        </div>
                        <div class="col-12 col-md ozet" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;display:block;min-width:150px;max-height:295px">
                            <q-card flat>
                            <q-card-section>
                                <div class="row"> 
                                    <q-item class="" style="margin-top:-10px;"><q-item-label class="col-12 text-h6 text-left text-weight-medium" style="margin-top:3px;">Sipariş Özeti </q-item-label></q-item>
                                    <q-separator />
                                    <q-item class="col-12 q-pt-md">
                                        <q-item-label class="col-8  text-left text-weight-medium">Ara Toplam : </q-item-label>
                                        <q-item-label class="col-4 text-weight-bold text-right" style=" ">{{aratoplam}} TL </q-item-label>
                                    </q-item>
                                    <q-item class="col-12 " >
                                        <q-item-label class="col-8  text-left text-weight-medium">KDV : </q-item-label>
                                        <q-item-label class="col-4 text-weight-bold text-right" style="">{{kdv}} TL </q-item-label>
                                    </q-item>
                                    <q-separator style="margin-top:-10px;"/>
                                    <q-item class="col-12 ">
                                        <q-item-label class="col-8 text-h6 text-left text-weight-medium">TOPLAM : </q-item-label>
                                        <q-item-label class="col-4 text-weight-bold text-right" style="">{{tutar}} TL </q-item-label>
                                    </q-item>
                                    
                                </div>
                            <q-stepper-navigation>
                            <q-btn @click="selected.length >= 1 ? $refs.stepper.next() : devam()" class="q-px-xl " size="lg" color="primary" :label="step === 3 ? 'Finish' : 'Devam'" rounded/>
                            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                            </q-stepper-navigation>
                            </q-card-section>
                        </q-card>
                        </div>
                        </div>
                        </div>
                            
                    
                    </q-step>
<!-- -------------------------------------------------------------------- -->
                    <q-step
                        :name="2"
                        title=""
                        icon="mdi-map-marker-alert"
                        :done="step > 2"
                        >
                        <div class="row  justify-center" >
                        <div class="row q-gutter-y-md col-md-10" >
                            <div class="col-xs-12 col-md-8 " style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;">
                                <div class="row">
                                    <q-item-label class="q-pa-md col-12  text-weight-medium" style="font-size:19px" >Sipariş Bilgileri</q-item-label>
                                    <q-separator/>
                                    <div v-if="get_guid">
                                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-6"  v-model="user.ad_soyad" ref="ad" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="Ad-Soyad" hint="Ad-Soyad Giriniz" dense />
                                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-6"  v-model="user.cep" ref="cep" :rules="[val => val.length > 9 || 'Yanlış Numara']" mask="+90(###) ### - ####" unmasked-value outlined label="Cep Telefonu" hint="Cep No Giriniz" dense />
                                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-6"  v-model="user.tc_v_no" ref="tc" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="TC Kimlik No-Vergi No" hint="Lütfen Adınızı Giriniz" dense />
                                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-6"  v-model="user.v_daire"  outlined label="Vergi Dairesi" hint="Varsa - Vergi Dairesi Giriniz" dense />
                                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-12" v-model="user.email" ref="email" outlined label="Mail" hint="Lütfen Adınızı Giriniz" :rules="[val => !!val || 'Email Alanı', isValidEmail]" dense />
                                            <q-input
                                                outlined
                                                ref="adres"
                                                :rules="[val => !!val || 'Boş Bırakmayınız']"
                                                v-model="user.adres"
                                                type="textarea"
                                                label="Adres"
                                                class="q-pt-xs q-pl-xs q-pr-xs  col-12 hint"
                                                hint="Açıklama Giriniz...!"
                                                dense
                                            />
                                            <q-select 
                                            class="hint col-6 q-pt-xs q-pl-xs q-pr-xs q-mb-md"
                                            ref="il"
                                            :rules="[val => !!val || 'Boş Bırakmayınız']"
                                            outlined 
                                            label="il" 
                                            hint="il Seçiniz...!"
                                            v-model="user.il"
                                            :options="iloptions"
                                            option-value="ilid"
                                            option-label="il"
                                            @input=ilcesec()
                                            @filter="filteril"
                                            use-input
                                            auto-select
                                            fill-input
                                            hide-selected
                                            dense
                                            />
                                            <q-select 
                                            class="hint col-6 q-pt-xs q-pl-xs q-pr-xs q-mb-md"
                                            outlined 
                                            ref="ilce"
                                            :rules="[val => !!val || 'Boş Bırakmayınız']"
                                            label="ilçe" 
                                            hint="ilçe Seçiniz...!"
                                            v-model="user.ilce"
                                            :options="ilceoptions"
                                            option-value="ilceid"
                                            option-label="ilce"
                                            dense
                                            />

                        
                                    </div>
                                    <div class="row col-12" v-else>
                                        <div class="col-6 q-pa-md ">
                                            <q-item class="new_detail text-grey justify-center">
                                                <q-item-label class=" self-center">Yeni Adres Ekle <br><q-icon name="mdi-plus" /></q-item-label>
                                                
                                            </q-item>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                            <div class="col-12 col-md ozet" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;display:block;min-width:150px;max-height:345px">
                                <q-card flat>
                                <q-card-section>
                                    <div class="row"> 
                                        <q-item class="" style="margin-top:-10px;"><q-item-label class="col-12 text-h6 text-left text-weight-medium" style="margin-top:3px;">Sipariş Özeti </q-item-label></q-item>
                                        <q-separator />
                                        <q-item class="col-12 q-pt-md">
                                            <q-item-label class="col-8  text-left text-weight-medium">Ara Toplam : </q-item-label>
                                            <q-item-label class="col-4 text-weight-bold text-right" style=" ">{{aratoplam}} TL </q-item-label>
                                        </q-item>
                                        <q-item class="col-12 " >
                                            <q-item-label class="col-8  text-left text-weight-medium">KDV : </q-item-label>
                                            <q-item-label class="col-4 text-weight-bold text-right" style="">{{kdv}} TL </q-item-label>
                                        </q-item>
                                        <q-separator style="margin-top:-10px;"/>
                                        <q-item class="col-12 ">
                                            <q-item-label class="col-8 text-h6 text-left text-weight-medium">TOPLAM : </q-item-label>
                                            <q-item-label class="col-4 text-weight-bold text-right" style="">{{tutar}} TL </q-item-label>
                                        </q-item>
                                        
                                    </div>
                                <q-stepper-navigation>
                                <div class="col-12">
                                    <q-btn @click="veriler()"  class="q-px-xl " size="lg" color="primary" :label="step === 3 ? 'Finish' : 'Devam'" rounded/>
                                </div>
                                <div class="col-12 q-pt-md">
                                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Geri" class="q-ml-sm" rounded/>
                                </div>
                                </q-stepper-navigation>
                                </q-card-section>
                            </q-card>
                            </div>
                        </div>
                        </div>
                            <!-- An ad group contains one or more ads which target a shared set of keywords.
                            <q-btn @click="$refs.stepper.next()" color="bg-pink-11" :label="step === 3 ? 'Finish' : 'DEVAM'" />
                            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" /> -->
                    </q-step>
<!-- -------------------------------------------------------------------- -->
                    <q-step
                        :name="3"
                        title=""
                        icon="mdi-credit-card"
                        
                        >
                        
                            <div class="row  justify-center" >
                        <div class="row q-gutter-y-md col-md-10" >
                            <div class="col-xs-12 col-md-8" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;">
                                <div class="row">
                                    <q-item-label class="q-mb-md q-mt-md col-12  text-weight-medium" style="font-size:19px" >Ödeme Seçenekleri</q-item-label>
                                    <q-separator/>
                                
                                <q-list class="col-12" bordered>
                                    <q-expansion-item
                                        group="somegroup"
                                        icon="mdi-credit-card-multiple-outline"
                                        label="Kredi Kartıyla Hemen Ödeme Yap"
                                        default-opened
                                        header-class=""
                                    >
                                        <q-card>
                                            <q-separator />
                                            <q-card-section>
                                                <q-item style="height:60px" tag="label" v-ripple>
                                                    <q-item-section avatar>
                                                        <q-radio v-model="val" val="Kredi Kartı Hemen" @click.native="payment_radio(`${val}`)" color="primary" />
                                                    </q-item-section>
                                                    <q-item-section >
                                                        <q-item-label style="font-size:19px" >Kredi Kartıyla Öde </q-item-label>
                                                        <q-item-label class="text-red" caption >Seçin, Tamamla Butonuna Basın</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </q-card-section>
                                        </q-card>
                                    </q-expansion-item>

                                    <q-separator />

                                            <q-expansion-item group="somegroup" icon="mdi-bank-transfer-in" label="Banka Havalesi İle Ödeme Yap" header-class="">
                                                <q-card>
                                                    <q-separator />
                                                <q-card-section>
                                                    <q-item style="height:60px" tag="label" v-ripple>
                                                <q-item-section avatar>
                                                <q-radio v-model="val" val="Havale" @click.native="payment_radio(`${val}`)" color="primary" />
                                                </q-item-section>
                                                <q-item-section>
                                                <q-item-label style="font-size:19px" >Havale ile Öde</q-item-label>
                                                <q-item-label class="text-red" caption >Lütfen İstenen Bilgileri Girin.</q-item-label>
                                                
                                                </q-item-section>
                                            </q-item>
                                                </q-card-section>
                                                </q-card>
                                                <!-- <div v-if="havale_div">
                                                    <q-input class="col-6"  v-model="val" ref="ad" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="Banka Adı" hint="Banka Adı" :dense=false />
                                                </div> -->
                                            </q-expansion-item>
                                        <q-separator />
                                            <q-expansion-item group="somegroup" icon="mdi-truck-check" label="Ürün Kapınıza Geldiğinde Nakit Öde" header-class="">
                                                <q-card>
                                                    <q-separator />
                                                <q-card-section>
                                                    <q-item style="height:60px" tag="label" v-ripple>
                                                <q-item-section avatar>
                                                <q-radio v-model="val" val="Kapıda Nakit" @click.native="payment_radio(`${val}`)" color="primary" />
                                                </q-item-section>
                                                <q-item-section>
                                                <q-item-label style="font-size:19px" >Kapıda Nakit Öde</q-item-label>
                                                <q-item-label class="text-red" caption > Tamamla Butonuna Basın.</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                                </q-card-section>
                                                </q-card>
                                            </q-expansion-item>

                                </q-list>
                        
                                
                                </div>
                            </div>
                            <div class="col-12 col-md ozet" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;display:block;min-width:150px">
                                <q-card flat>
                                <q-card-section>
                                    <div class="row"> 
                                        <q-item class="" style="margin-top:-10px;"><q-item-label class="col-12 text-h6 text-left text-weight-medium" style="margin-top:3px;">Sipariş Özeti </q-item-label></q-item>
                                        <q-separator />
                                        <q-item class="col-12 q-pt-md">
                                            <q-item-label class="col-8  text-left text-weight-medium">Ara Toplam : </q-item-label>
                                            <q-item-label class="col-4 text-weight-bold text-right" style=" ">{{aratoplam}} TL </q-item-label>
                                        </q-item>
                                        <q-item class="col-12 " >
                                            <q-item-label class="col-8  text-left text-weight-medium">KDV : </q-item-label>
                                            <q-item-label class="col-4 text-weight-bold text-right" style="">{{kdv}} TL </q-item-label>
                                        </q-item>
                                        <q-separator style="margin-top:-10px;"/>
                                        <q-item class="col-12 ">
                                            <q-item-label class="col-8 text-h6 text-left text-weight-medium">TOPLAM : </q-item-label>
                                            <q-item-label class="col-4 text-weight-bold text-right" style="">{{tutar}} TL </q-item-label>
                                        </q-item>
                                        
                                    </div>
                                <q-stepper-navigation>
                                <!-- <div class="col-12">
                                    <q-btn @click="veriler()"  class="q-px-xl " size="lg" color="primary" :label="step === 3 ? 'Finish' : 'Devam'" rounded/>
                                </div> -->
                                <div class="col-12 ">
                                <q-btn  class="q-px-xl" size="lg" color="primary" :label="step === 3 ? 'Tamamla' : 'DEVAM'" rounded/>
                                </div>
                                <div class="col-12 q-mt-md">
                                <q-btn v-if="step > 2" flat color="primary" @click="$refs.stepper.previous()" label="Geri" class="q-ml-sm" rounded/>
                                </div>
                                </q-stepper-navigation>
                                </q-card-section>
                            </q-card>
                            </div>
                            </div>
                            </div>
                        
                    </q-step>

                </q-stepper>
                <!-- <q-item class=" col-12 justify-center"><q-item-label>{{ JSON.stringify(selected) }}</q-item-label> 
                    </q-item>-->
        </div>
        
</template>

<script>
import { Cookies } from "quasar";
import Vue from "vue";
import axios from "axios";
import ildata from '../../statics/il.json'
import ilcedata from '../../statics/ilce.json'
import gql from "graphql-tag";
import { mapState, mapGetters } from "vuex";
import { Loading } from "quasar";
    export default {
        data() {
            return {
                val:"",
                havale_div:false,
                // bankad:"",
                // ------
                user_validate:Boolean,
                user:{
                    ad_soyad:"",
                    cep:"",
                    tc_v_no:"",
                    v_daire:"",
                    email:"",
                    adres:"",
                    il:"",
                    ilce:"",
                    
                },
                // ------
                step:3,
                lists:[],
                // ------
                aratoplam:"0,00",
                kdv:"0,00",
                tutar:"0,00",
                count:1,
                selected:[],
                // ------
                columns: [
                     { name: "resim",   label: "Resim", align: "left"  },
                    {
                        name: 'stokad',
                        required: true,
                        label: 'Ürün Adı',
                        align: 'center',
                        field: row => row.stokad,
                        format: val => `${val}`,
                        // sortable: true
                        },
                         
                     { name: "miktar",   label: "Miktar", align: "center"  },
                     { name: "fiyat",   label: "Fiyat", align: "center"  },
                     { name: "delete",   label: "", align: "center"  },
                    // { name: "fiyat",   label: "Fiyat", align: "center", sortable: true, field: row => row.varyantid },
                    // { name: 'stokad', label: 'Fiyat', align: 'center',  field: 'calories', sortable: true, field: row => row.stokad },
                ],
                pagination: {
        //   sortBy: 'ust',
        //   descending: false,
          page: 1,
          rowsPerPage: 20,
          // rowsNumber: 5,q

        },
        il:"",
        ilce:"",
        ilList:[],
        ilceList:[],
        iloptions:[],
        ilceoptions:[],
        }
        },
        watch: {
            get_basketlist(newValue, oldValue) {
                // console.log(newValue);
                 this.fonk()
            },
            get_ubasketlist(newValue, oldValue) {
                // console.log(newValue);
                 this.fonk()
            },
            selected(){
                this.hesaplama()
                // console.log("1");
            },
            
            // aratoplam(val){
            //     this.kdv=(val*0.18).toFixed(2)
            //     this.tutar=(val*1.18).toFixed(2)
            // }
            
        },
        computed: {
            ...mapGetters([
                'anakategorilists',
                'get_guid',
                'get_uid',
                'get_basketlist',
                'get_ubasketlist',
      
    ]),
        // get_guid(val){
        //     console.log(val);
        // }
        },
        mounted () {
            this.fonk()
            //  console.log(this.get_basketlist.length,this.get_ubasketlist.length);
            // if (Cookies.get("uid")) {
            //     console.log("1");
            //     if(this.get_ubasketlist.length < 1){
            //         this.$router.push({ path: '/' }  )
            //     }
                    
                
            //     }else{
            //         console.log("2");
            //         if (this.get_basketlist.length < 1) {
            //             this.$router.push({ path: '/' }  )
            //         }
                    
            //     }
                this.ilList=ildata
        },
        methods: {
            veriler(){
                //  console.log(this.$refs.email.rules);
                 
                 this.$refs.ad.validate()
                 this.$refs.tc.validate()
                 this.$refs.cep.validate()
                 this.$refs.email.validate()
                 this.$refs.adres.validate()
                 this.$refs.il.validate()
                 this.$refs.ilce.validate()
                if(
                   this.user.ad_soyad == "" ||
                   this.user.tc_v_no == "" ||
                   this.user.email == "" ||
                   this.user.adres == "" ||
                   this.user.il == "" ||
                   this.user.ilce == ""
                ){
                    this.user_validate=false
                }else{
                    this.user_validate=true
                }
                if(this.user_validate && !this.$refs.email.hasError){
                    // console.log(this.user);
                    this.$refs.stepper.next()
                }
            },
            devam(){
                // console.log(this.selected);
            },
            payment_radio(val){
                
                if(val==="Kredi Kartı Hemen"){
                    console.log("1");
                }else if(val==="Havale"){
                    this.havale_div=true
                    console.log("2");
                }else if(val==="Kapıda Nakit"){
                    console.log("3");
                }
            },
            fonk(){
                if (Cookies.get("uid")) {
                    this.lists=this.get_ubasketlist
                }else{
                    this.lists=this.get_basketlist
                }
                // console.log(this.lists);
            },
            hesaplama(){
                // eğer stok miktarı varsa yazılacak
                let aratoplam=0
                let kdv=0
                let tutar=0
               
                this.selected.forEach(item=>{
                    if(item.count < 1 ){
                        item.count=1
                      return  false
                    }
                    aratoplam +=item.count * (item.fiyat/1.18);
                     
                })
            
               kdv=(aratoplam*0.18)
               tutar=aratoplam*1.18
               aratoplam=(aratoplam/1).toFixed(2).replace('.', ',')
               aratoplam=aratoplam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
               this.aratoplam=aratoplam
               kdv=kdv.toFixed(2).replace('.', ',')
               this.kdv=kdv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
               tutar=tutar.toFixed(2).replace('.', ',')
               this.tutar=tutar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

            },
            delete_basketproduct(val){
                this.$apollo.mutate({
            mutation: gql`mutation delete_basketproduct($id: ID){
                delete_basketproduct(id: $id)
                {
                _id
                }
              }`,
              variables:{
                    id: val,
            },
          
          loadingKey: 'loading',
          }
        ).then(data => {
        //    console.log(data);
          if(Cookies.get('uid') == null){
              this.$store.dispatch('search_basketlist',Cookies.get('guid'))
          }else{
              this.$store.dispatch('search_ubasketlist',Cookies.get('uid'))
          }
          this.$q.notify({
                type: 'positive',
                message: `Sepetteki Ürün Başarıyla Silindi...`
            })
        //   this.fonk()

        });
        
            },
            filteril (value, update, abort) {
          update(() => {
            const needle = value.toLowerCase();
            this.iloptions = this.ilList.filter((v) => v.il.toLowerCase().includes(needle))
          })
        },
            async ilcesec() {

            // console.log("sdsd");
            const ilcelist=[]
           await ilcedata.forEach((value, index) => {
               
                if(this.user.il.ilid==value.ilid){
                    
                    // this.ilce.ilceid=value.ilceid
                    // this.ilce.ilce=value.ilceid

                    ilcelist.push({ilceid:value.ilceid,ilce:value.ilce})

            }
                    // this.ilceList=ilcelist
                    
                  this.ilceoptions=ilcelist
            })
            this.user.ilce=""
                    //  console.log(ilcelist);
                    
            

            
        },
            isValidEmail (val) {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return emailPattern.test(val) || 'Hatalı email';
            },
    
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            formatNumber(value) {
                let val = (value)
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        },
    }
</script>

<style lang="styl" scoped>

tr td {
    height: 200px;
}
.scale-down{
    width: 100px;
    min-height: 100px;
}
tr td .scale-down img {
  object-fit: scale-down;
   /* display: block;
   text-align: center; */
}
@media only screen and (min-width: 1024px ) {
.ozet{
    margin-left:10px;
}
}
@media only screen and (max-width: 530px ) {
    /* tr>td {
    height: 150px;
} */
.scale-down{
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    
}
}
.new_detail{
    border: 2px solid rgba(0,0,0,0.11);
    height:120px;
    cursor:pointer;
}
</style>