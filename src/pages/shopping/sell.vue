<template>
        <div class="row col-12  justify-center q-pt-xl" >
            <div v-if="lists.length < 1 ">

                 <q-btn size="lg" rounded to="/" class="text-pink" label="Mağazaya Dön" />
          </div>
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
                                <q-tr :props="props"  class="cursor-pointer "  >
                                    <q-td >
                                        <div v-if="load"></div>
                                        <q-checkbox v-else-if=" props.row.miktar==0" color="grey-8"  dense v-model="props.selected" disable/>
                                        <q-checkbox v-else color="grey-8"  dense v-model="props.selected"/>
                                    </q-td>
                                    <q-td class="" style=""  key="resim" :props="props"  > 

                                        <div v-if="load"></div>
                                        
                                        
                                        <!-- <p class="text-center" style="width:100px;white-space: normal;">
                                            Geçici Olarak Temin edilememektedir
                                        </p> -->
                                        <div v-else-if="props.row.miktar!=0" class="scale-down " style="margin-left: auto;margin-right: auto;" ><q-img class=" " style="border-radius:10px;"  :src="props.row.path + props.row.publicid " /></div>
                                        <div class=" text-red  text-weight-bold scale-down justify-center" style="margin-left: auto;margin-right: auto;white-space: normal;" v-else-if=" props.row.miktar==0">
                                        <!-- <div class="text-red  " style="width:100px;height:100px;word-wrap: break-word;" >-->
                                           <span class="">Stokta Kalmadı</span>
                                            
                                        </div> 
                                    <!-- class="scale-down fit" -->
                                    </q-td>
                                    <q-td class="text-weight-bold" key="stokad" :props="props"  > 
                                        
                                        <!-- <div v-else> -->
                                        {{props.row.stokad}} <br> {{props.row.varyantoption1}} <br> {{props.row.varyantoption2}}
                                        <!-- </div> -->
                                    </q-td>
                                    <q-td class=""  key="miktar"  :props="props" v-if="props.selected==false ? props.row.count=1:props.row.count" > 
                                        <!-- TODO: -->
                                        <!-- <q-input
                                        style="margin-top:20px;"
                                            dense
                                            oninput=" if (this.value < 1) {this.value = 1}else if(this.value > 10){this.value = 10}"
                                            @input="hesaplama()"
                                            v-model="props.row.count"
                                            type="number"
                                            outlined
                                            :rules="[ val => val > 0  ]"
                                            /> -->
                                        <q-btn
                                            v-model="props.row.count" 
                                            @click="hesaplama(props.row.count < 2 ? props.row.count=1 : props.row.count--)"
                                            color="white"
                                            size="xs"
                                            push
                                            round
                                            class=" text-grey"
                                            icon="remove"
                                            ></q-btn>
                                            <span style="margin-left:4px;margin-right:4px" class=" self-center">
                                            {{  props.row.count  }}
                                            </span>
                                            <q-btn
                                            v-model="props.row.count"
                                            @click="hesaplama(props.row.miktar > props.row.count ? props.row.count++ : props.row.count)"
                                            color="white"
                                            size="xs"
                                            push
                                            round
                                            class="text-grey"
                                            icon="add"
                                            ></q-btn>
                                    
                                    </q-td>
                                    <q-td class="text-weight-bold " key="fiyat" :props="props"  > 
                                        {{formatPrice(props.row.fiyat)}} TL
                
                                    </q-td>
                                    <q-td  key="delete" :props="props"  > 
                                        <!-- <div v-if="load"></div>
                                        <q-btn v-else-if=" props.row.miktar==0"  size="md"  icon="delete" color="grey-7" @click="delete_basketproduct(props.row._id)" flat round disable></q-btn> -->
                                        <q-btn   size="md"  icon="delete" color="grey-7" @click="delete_basketproduct(props.row._id),load=true" flat round></q-btn>

                                    
                                    </q-td>
                                    <!-- <q-td key="fiyat" :props="props"  >
                                    
                                    </q-td> -->
                                    <!-- <q-item-label class="row col-12" v-if="props.row.miktar==0">sdsdfsdf</q-item-label> -->
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
                                    <q-separator class="q-mb-md"/>
                                    <div class="row" v-if="get_guid">
                                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-6"  v-model="user.ad_soyad" ref="ad" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="Ad-Soyad" hint="Ad-Soyad Giriniz" dense />
                                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-6"  v-model="user.cep" ref="cep" :rules="[val => val.length > 9 || 'Yanlış Numara']" mask="+90(###) ### - ####" unmasked-value outlined label="Cep Telefonu" hint="Cep No Giriniz" dense />
                                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-6"  v-model="user.tc_v_no" ref="tc" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="TC Kimlik No-Vergi No" hint="Lütfen Adınızı Giriniz" dense />
                                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-6"  v-model="user.v_daire"  outlined label="Vergi Dairesi" hint="Varsa - Vergi Dairesi Giriniz" dense />
                                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-12" v-model="user.email" ref="email" outlined label="Mail" hint="Lütfen Mail Giriniz" :rules="[val => !!val || 'Email Alanı', isValidEmail]" dense />
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
                                    <!-- -------------- -->
                                    <div class="row col-12 " v-else>
                                        <div class=" col-md-4 col-xs-6 q-pa-xs" v-for="(get_userdetaillist ,index) in get_userdetaillists" :key="index">
                                            <q-card class="new_detail"
                                            :class=" [{ new_detail_selected:get_userdetaillist.selected }] "
                                            >
                                                <q-card-section @click="user=get_userdetaillist;selectdetail(get_userdetaillists,index)" style="height:170px;"  >
                                                    <!-- <div class="text-h6">Our Changing Planet</div> -->
                                                    <div class="col-5 text-subtitle2 text-left">{{get_userdetaillist.baslik}} - {{get_userdetaillist.ad_soyad}}
                                                    
                                                    </div>
                                                    
                                                    
                                                    <q-separator class="q-mb-xs"/>
                                                    <div class="text-caption text-left">{{get_userdetaillist.adres}}</div>
                                                    <!-- <div class="text-caption"> {{get_userdetaillist.email}}</div> -->
                                                    <!-- <div v-if="typeof(get_userdetaillist.il) === 'object'" class="text-caption text-left">{{get_userdetaillist.il.il}} - {{get_userdetaillist.ilce.ilce}}</div> -->
                                                    <div   class="text-caption text-left">{{get_userdetaillist.il}} - {{get_userdetaillist.ilce}}</div>
                                                    
                                                    <div class="text-caption text-left">Cep: {{get_userdetaillist.cep}}</div>
                                                </q-card-section>
                                                <q-card-actions align="right">
                                                    <q-btn color="primary"  @click="user=get_userdetaillist;user_detail_dialog = !user_detail_dialog;edit_adress=true"  flat rounded >Düzenle</q-btn>
                                                    <q-btn color="red" @click="selectadresid=get_userdetaillist._id,adressildialog=true" flat rounded>Sil</q-btn>
                                                </q-card-actions>
                                        </q-card>

                                        </div>
                                        <q-card class="col q-ma-xs " @click="user={};user_detail_dialog = !user_detail_dialog; edit_adress=false " >
                                            <q-card-section class="new_detail" style="margin-right:4px;">
                                                <div class=""  style="margin-top:50px;" >Yeni Adres Ekle <br><q-icon name="mdi-plus" /></div>
                                            </q-card-section>
                                        </q-card>
                                        <!-- <card class="col-md-4 col-xs-6 q-pa-md " @click="user_detail_dialog = !user_detail_dialog">
                                            <q-item class="new_detail text-grey justify-center">
                                                <q-item-label class=" self-center">Yeni Adres Ekle <br><q-icon name="mdi-plus" /></q-item-label>
                                                
                                            </q-item>
                                        </card> -->

                                    </div>  
                                   <!-- -------------- -->   
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
                                        <!-- <q-btn @click="goster()"></q-btn> -->
                                    <q-btn v-if="get_uid" @click="u_veriler()"  class="q-px-xl " size="lg" color="primary" :label="step === 3 ? 'Finish' : 'Devam'" rounded/>
                                    <q-btn v-else @click="veriler()"  class="q-px-xl " size="lg" color="primary" :label="step === 3 ? 'Finish' : 'Devam'" rounded/>
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
                                <q-btn  class="q-px-xl" size="lg" color="primary" label="Tamamla" @click="tamamla()" rounded/>
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
                    <!-- FIXME: -->
                    <!-- <q-item class="row col-12 justify-center"><q-item-label>{{ JSON.stringify(selected) }}</q-item-label></q-item>  -->
                    <!-- FIXME: -->
                    <q-dialog
                        v-model="user_detail_dialog"
                        
                    >
                        <q-card  class="">
                        <q-card-section class="row justify-center" >
                            <div class="text-h6">Adres Bilgileri </div>
                            <q-space />
                            <q-btn icon="close" flat round dense @click="user_detail_dialog=false" />
                        </q-card-section>

                        <q-card-section class="row col-12">
                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-12"  v-model="user.baslik" ref="baslik" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="Baslik" hint="Örnek Ev, İş vb." dense />
                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.ad_soyad" ref="ad" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="Ad-Soyad" hint="Ad-Soyad Giriniz" dense />
                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.cep" ref="cep" :rules="[val =>!!val, val.length > 9 || 'Yanlış Numara']" mask="+90(###) ### - ####" unmasked-value outlined label="Cep Telefonu" hint="Cep No Giriniz" dense />
                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.tc_v_no" ref="tc" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="TC Kimlik No-Vergi No" hint="Lütfen Adınızı Giriniz" dense />
                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.v_daire"  outlined label="Vergi Dairesi" hint="Varsa - Vergi Dairesi Giriniz" dense />
                            <!-- <q-input class="q-pt-xs q-pl-xs q-pr-xs col-12" v-model="get_user.usermail"  outlined label="Mail"  :rules="[val => !!val || 'Email Alanı', isValidEmail]" dense /> -->
                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-12" v-model="get_user.usermail"  outlined label="Mail" dense readonly/>
                            <q-input
                                outlined
                                ref="adres"
                                :rules="[val => !!val || 'Boş Bırakmayınız']"
                                v-model="user.adres"
                                type="textarea"
                                label="Adres"
                                class="q-pt-xs q-pl-xs q-pr-xs  col-12 hint"
                                hint="Adres Giriniz...!"
                                dense
                            />
                            <!-- <q-select 
                                class="hint col-6 q-pt-xs q-pl-xs q-pr-xs q-mb-md"
                                ref="il"
                                :rules="[val => !!val || 'Boş Bırakmayınız']"
                                outlined 
                                label="il" 
                                hint="il Seçiniz...!"
                                
                                v-model="user.il"
                                :options="iloptions"
                                option-value="opt => opt.ilid"
                                option-label="opt => opt.il"
                                @input=ilcesec()
                                @filter="filteril"
                                use-input
                                auto-select
                                fill-input
                                hide-selected
                                dense
                            /> -->
                            <div class="row col-12" v-if="edit_adress">
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
                                @input="ilcesec()"
                                @filter="filteril"
                                use-input
                                auto-select
                                fill-input
                                hide-selected
                                dense
                                disable
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
                                disable
                            /> 
                            </div>            
                            <div class="row col-12" v-else>
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
                                :rules="[val => !!val  || 'Boş Bırakmayınız']"
                                label="ilçe" 
                                hint="ilçe Seçiniz...!"
                                v-model="user.ilce" 
                                :options="ilceoptions"
                                option-value="ilceid"
                                option-label="ilce"
                                dense
                                
                            /> 
                            </div>          
                            
                        </q-card-section>

                        <q-card-section  class="text-right">
                            
                            <q-btn v-if="user._id != null " class="q-ma-sm"  color="primary" @click="user_det_kaydet(user._id)" label="Güncelle"   ></q-btn>
                            <q-btn v-else class="q-ma-sm"  color="primary" label="Kaydet" @click="user_det_kaydet()" ></q-btn>
                            <!-- <q-btn class="q-mr-md text-grey"  color="" label="Kapat"  v-close-popup ></q-btn> -->
                        </q-card-section>
                        </q-card>
                    </q-dialog>

                    <q-dialog
                        v-model="adressildialog"

                    >
                        <q-card  style="width: 500px; max-width: 80vw;">
                        <q-card-section class="row justify-center">
                            <div class="text-h6 self-center">
                                <q-icon style="margin-top:-5px;" name="mdi-alert-outline" />
                                <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
                                <span> Uyarı..!</span>
                                  
                                  </div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator/>
                        <q-card-section class="row">
                            
                            Adresi Silmek İstediğinizden Eminmisiniz? 
                            
                        </q-card-section>
                            <q-separator/>
                        <q-card-section  class="text-right">

                            <q-btn class=""  color="red" label="Sil" @click="adresdelete()" v-close-popup ></q-btn>
                            <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
                        </q-card-section>
                        </q-card>
                    </q-dialog>
                    <q-dialog
                        v-model="popdialog"

                    >
                        <q-card  style="width: 500px; max-width: 80vw;">
                        <q-card-section class="row justify-center">
                            <div class="text-h6 ">Sipariş Tamamlandı</div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator/>
                        <q-card-section class="q-gutter-md">
                            <div class="row text-h4 justify-center " style="text-decoration:underline">"{{sipno}}" </div>
                            <div class="row text-h5      justify-center" >Nolu siparişiniz oluşturuldu. </div>
                            
                            
                        </q-card-section>
                            <q-separator/>
                        <q-card-section  class="text-center">

                            <q-btn class="text-black"  color="" label="Tamam" @click="route()" v-close-popup ></q-btn>
                            <!-- <q-btn class="q-mr-md text-black"  color="white" label="Kapat"  v-close-popup ></q-btn> -->
                        </q-card-section>
                        </q-card>
                    </q-dialog>
                    
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
import { date } from 'quasar';
import bcryptjs from 'bcryptjs'
import CryptoJS from 'crypto-js';
// import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
// import jwt from 'vuejs-jwt'
// Vue.use(jwt)
let myBody = document.getElementsByTagName('body')[0];
    export default {
        data() {
            return {
                adressildialog:false,
                edit_adress:false,
                val:"",
                user_detail_dialog:false,
                havale_div:false,
                // bankad:"",
                // -----
                user_validate:Boolean,
                popdialog:false,
            //     uid,
            // baslik,
            // ad_soyad,
            // email,
            // cep,
            // tc_v_no,
            // v_daire,
            // adres,
            // p_kodu,
            // il,
            // ilce,
            // user:"",
            selectadresid:"",
                user:{
                    _id:"",
                    uid:"",
                    baslik:"",
                    ad_soyad:"",
                    cep:"",
                    tc_v_no:"",
                    v_daire:"",
                    email:"",
                    adres:"",
                    p_kodu:"",
                    // il:{il:"",
                    //     ilid:""},
                    // ilce:{ilce:"",
                    // ilceid:""}
                    il:"",
                    ilce:""
            
                },
                // get_userdetaillist:{selected:false},
                // ------
                step:1,
                lists:[],
                // ------
                aratoplam:"0,00",
                kdv:"0,00",
                tutar:"0,00",
                count:1,
                selected:[],
                odemedurumu:"",
                kdvtutar:0,
                sipno:"",
                load:true,
                // ------
                columns: [
                     { name: "resim",   label: "Resim", align: "center"  },
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
        numaralar:{}
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
            selected(val){
                // console.log("val",val);
                this.hesaplama()
                
            },
            // user(val){
                // console.log("object");
            // },
            // get_userdetaillists(val){
            //     if (this.user.cep="") {
            //         this.selectdetail(val,null)
            //     }
            //     // console.log(val);
                
            // }
            // aratoplam(val){
            //     this.kdv=(val*0.18).toFixed(2)
            //     this.tutar=(val*1.18).toFixed(2)
            // }


        },
        computed: {
            ...mapGetters([
                'anakategorilists',
                'getvaryantskuslists',
                'get_guid',
                'get_uid',
                'get_basketlist',
                'get_ubasketlist',
                'get_userdetaillists',
                'get_user',
      
            ]),
        },
        async created () {
            
        },
        async mounted () {
             this.lists=[]
            //  this.props.row=""
            // this.selected=[ ]
            Loading.show()
            await this.$store.dispatch('varyantSkus');
            // console.log("ibo");
            
            this.fonk()
           
           this.get_userdetaillists.forEach(item=>{ //adres selected hatası için
               item.selected=false
           })
            
                this.ilList=ildata
        Loading.hide()
        },
        
        methods: {
            route(){
                console.log("route");
            },
            async adresdelete(){
               console.log(this.selectadresid); 
               Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation deleteuserdetail_mutation($id:ID) {
                            deleteuserdetail_mutation(id: $id) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          id: this.selectadresid,
                        }
                        })
                        .then(async data => {
                           this.$store.dispatch('search_userdetaillists', Cookies.get('uid'));
                            // console.log("ok");
                            Loading.hide()
                            this.$q.notify({
                                                type: "Positive",
                                                message: `Bilgiler Başarıyla Silindi...`,
                                                position: "top-right",
                                                color: "green",
                                                icon: "check",
                                            });
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
            },
            goster(){
                // console.log(this.user);
                // console.log(this.selected);
            },
            async tamamla(){
                // console.log("this.get_uid",this.get_uid);
                //  console.log("user",this.user);
                //  console.log("selected",this.selected);
                // this.numaralar_guncelle()
                // return
                await axios
                    .post('http://'+ process.env.API +':4000/graphql',{
                    query: `query son_numaralar{
                            son_numaralar{
                               
                                faturano
                                irsaliyeno
                                }
                            }`,

                    variables: {
                        
                    }
                    })
                    .then(data => {
                        // console.log("data",data);
                        if(data.data.data.son_numaralar == null){
                            this.numaralar.faturano=1
                            this.numaralar.irsaliyeno=1
                        }else{
                            this.numaralar.faturano=data.data.data.son_numaralar.faturano + 1
                            this.numaralar.irsaliyeno=data.data.data.son_numaralar.irsaliyeno + 1
                        }
                    //  this.numaralar = data.data.data.son_numaralar;
                      console.log("numaralar",this.numaralar);
                    });
                    //   return 
                let userid=""
                let satirList  = []
                let siparisfis = ""
                let sipno=Number(date.formatDate(Date.now(), 'X'))+225222222
                sipno=sipno.toString()
                this.sipno=sipno
                if (this.get_uid == null || this.get_uid == undefined || this.get_uid == "") {
                      this.user._id=this.get_guid
                    //   console.log(this.user)
                      
                }else{
                    //  userid=this.get_uid
                }
                // return

               let aratoplam =this.formatNumber(this.aratoplam)
               let kdv =this.formatNumber(this.kdv)
               let tutar =this.formatNumber(this.tutar)
               
               
                let vm=this
                function satlistolustur() {
                    // let stokad=""
                    // vm.selected.forEach(em=>{
                    //     stokad=em.stokad+" "+em.varyantoption1+" "+em.varyantoption2
                    // })
                siparisfis={
                    sipno:sipno,
                    faturano:vm.numaralar.faturano,
                    irsaliyeno:vm.numaralar.irsaliyeno,
                    userid:vm.user._id,
                    odemetipi:vm.val,
                    odemedurumu:vm.odemedurumu,
                    aratoplam:aratoplam,// server yapı
                    kdv:kdv,
                    tutar:tutar
                    // stokad:stokad
                    // stokad:this.selected
                    // stokid:this.selected[0],
                    // aratoplam:this.formatNumber(this.aratoplam),
                    // kdv:this.formatNumber(this.kdv),
                    // tutar:this.formatNumber(this.tutar),
                }    
                
                vm.selected.forEach(item=>{
                        
                    let obj={}
                    
                        obj.varyantid=item.varyantid
                        obj.count=item.count
                        obj.stokad=item.stokad+" "+item.varyantoption1+" "+item.varyantoption2
                        obj.birimfiyat=item.fiyat/((item.kdv+100)/100) //8
                        obj.aratoplam=item.fiyat/((item.kdv+100)/100)*(item.count) // 9.26
                        obj.kdv=(item.kdv) //0.08
                        obj.kdvtutar=(item.fiyat/((item.kdv+100)/100))*item.count*((item.kdv)/100)
                        
                        obj.tutar=(item.fiyat)*(item.count) // 10
                        // obj.kdvtutar +=(item.fiyat)*(item.count)*()
                        satirList.push(obj)
                })
                }
                satlistolustur()
                // console.log("satirList",satirList);
                 
               if(this.val == ""){
                   this.$q.notify({
                        type: "negative",
                        message: `Sipariş Seçimini Tamamlamadınız...`
                    });
                    return
               } 

                let val =this.val
                if(val==="Kredi Kartı Hemen"){
                     console.log("kredi kartı entegrasyonu");
                    var paytrurunList=[]
                    var email = this.user.email;
                    // var merchant_oid = sipno
                    var merchant_oid = '1824375906'
                    var merchant_id=Number(process.env.merchant_id);
                    var merchant_key=process.env.merchant_key;
                    var merchant_salt=process.env.merchant_salt;
                    var user_name = this.user.ad_soyad
                    var user_address = this.user.adres
                    var user_phone = this.user.cep
                    var merchant_ok_url = "http://www.emosetekstil.com.tr/sell" //Siparişi onaylayacağız sayfa "Bildirim URL" sayfasıdır
                    var merchant_fail_url = "http://www.emosetekstil.com.tr/hata" //Siparişi iptal edeceğiniz sayfa "Bildirim URL" sayfasıdır
                    var ptutar=0
                    // console.log(satirList);
                    let obj=[]
                    satirList.forEach((item,i)=>{
                        // console.log("a",item.stokad);
                        let sad=item.stokad
                        let fiya=(item.tutar/item.count).toString()
                        let cou=item.count
                        obj.push(sad)
                        obj.push(fiya)
                        obj.push(cou)
                        // Object.assign(obj,Object.values(item.stokad))
                        //  obj = Object.keys(item).map((key) => item[key][0]);
                        // obj.stokad=obj.item.stokad
                        // obj.stokad=obj.item.stokad
                        // obj.stokad=obj.item.stokad
                        // obj.item[fiya]
                        // obj.item[count]
                        paytrurunList.push(obj)
                        
                    })
                    //  console.log(paytrurunList);
                    // return
                    tutar=tutar*100
                    var payment_amount=tutar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    
                    // var payment_amount=" "
                    console.log("paytrurunList",JSON.stringify(paytrurunList));
                    // console.log("paytrurunListJJJ",paytrurunList);
                    var user_basket =btoa(JSON.stringify(paytrurunList))
                    
                    console.log("user_basket",user_basket);
                    // return
                    var user_ip=
                    // fetch('https://api.ipify.org?format=json')
                    // .then(x => x.json())
                    // .then(({ ip }) => {
                    //     return ip;
                    // });
                    await axios.get('http://extreme-ip-lookup.com/json/')
                        .then(function (response) {
                            
                            // businessWebsite: ""
                            // city: "Istanbul"
                            // continent: "Asia"
                            // country: "Turkey"
                            // countryCode: "TR"
                            // ipName: ""
                            // ipType: "Residential"
                            // isp: "Turkcell Internet"
                            // lat: "41.01384"
                            // lon: "28.94966"
                            // org: "Turkcell Internet"
                            // query: "176.90.135.57"
                            // region: "Istanbul"
                            // status: "success"
                            //  console.log(response.data.query);
                            return response.data.query
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                            this.$q.notify({
                                    type: 'negative',
                                    message: `ip bilgisi alınamadı...!`
                                })
                            return
                        })
                        console.log("bura");
                        var timeout_limit = "10"
                        var debug_on = 1 // test 1
                        var test_mode = 0;
                        var no_installment	= 0; // Taksit yapılmasını istemiyorsanız, sadece tek çekim sunacaksanız 1 yapın
                        var max_installment = 3
                        var currency = "TL"
                        var hash_str = merchant_id+user_ip+merchant_oid+email+payment_amount+user_basket+no_installment+max_installment+currency+test_mode;
                        // console.log("hash_str",hash_str);
                        // return

                        // $paytr_token=base64_encode(hash_hmac('sha256',$hash_str.$merchant_salt,$merchant_key,true));
                        
                        // jwt.sign(hash_str+merchant_salt, merchant_key, { algorithm: 'RS256' }, function(err, token) {
                        //     var paytr_token=token
                         console.log("merchant_id",merchant_id);
                         console.log("user_ip",user_ip);
                         console.log("merchant_oid",merchant_oid);
                         console.log("email",email);
                         console.log("payment_amount",payment_amount);
                         console.log("user_basket",user_basket);
                         console.log("no_installment",no_installment);
                         console.log("max_installment",max_installment);
                         console.log("currency",currency);
                         console.log("test_mode",test_mode);
                         console.log("hash_str",hash_str);
                        // });
                        console.log("1");
                        
                        console.log(merchant_key);
                        // var paytr_token =await Base64(hmacSHA256(hash_str+merchant_salt, merchant_key));
                        // var paytr_token =await CryptoJS.AES.encrypt(JSON.stringify(hash_str), 'secret key 123').toString();;
                        var paytr_token = Base64.stringify(hmacSHA256(hash_str+merchant_salt, merchant_key,true));
                        

                        console.log("paytr_token",paytr_token);
                        // return
                        console.log("2");
                        var post_vals={}
                        // post_vals.map(item=>({
                            post_vals.merchant_id= merchant_id,
                            post_vals.user_ip= user_ip,
                            post_vals.merchant_oid=merchant_oid,
                            post_vals.email=email,
                            post_vals.payment_amount=payment_amount,
                            post_vals.paytr_token=paytr_token,
                            post_vals.user_basket=user_basket,
                            post_vals.debug_on=debug_on,
                            post_vals.no_installment=no_installment,
                            post_vals.max_installment=max_installment,
                            post_vals.user_name=user_name,
                            post_vals.user_address=user_address,
                            post_vals.user_phone=user_phone,
                            post_vals.merchant_ok_url=merchant_ok_url,
                            post_vals.merchant_fail_url=merchant_fail_url,
                            post_vals.timeout_limit=timeout_limit,
                            post_vals.currency=currency,
                            post_vals.test_mode=test_mode
                            console.log("buraa");
                        // }))
                         console.log(JSON.stringify(post_vals));
                        // return
                        // this.$http.post('/somehttps://www.paytr.com/odeme/api/get-token',
                        //  JSON.stringify(post_vals))
                          
                        //   .then(response => {
                        //     console.log(response);
                        // }, response => {
                        //     // error callback
                        // });
                        await axios.post("https://www.paytr.com/odeme/api/get-token",JSON.stringify(post_vals))
                        .then(function(response){
                            console.log(response);
                        }).catch(function(err){
                            console.log(err);
                        })
                        
                           console.log("buraaa"); 









                     //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
                    return
                    Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation kartsendmail_mutation($sipno: Float,$username:String, $usermail:String) {
                            kartsendmail_mutation(sipno: $sipno, username: $username, usermail: $usermail) {
                                _id
                            }
                            }
                        `,
                        variables: {
                            sipno:Number(sipno),
                            username:this.user.ad_soyad,
                            usermail:this.user.email,
                        },
                    })
                        .then(async data => {

                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })

                    // return
                    this.odemedurumu="Ödendi"
                    if(Cookies.get("uid")== null || Cookies.get("uid") == undefined || Cookies.get("uid") == ""){
                    this.guser_det_kaydet() // guser detay kayıt
                    }
                    satlistolustur()
                    
                    Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation createSiparisFis_mutation($satirList: [satirListInput],$siparisfis:siparisfisinput) {
                            createSiparisFis_mutation(satirList: $satirList, siparisfis: $siparisfis) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          satirList: satirList,
                          siparisfis: siparisfis
                        }
                        })
                        .then(async data => {
                           await this.numaralar_guncelle()
                            // console.log("ok");
                            await this.delete_basketsellproduct(satirList)
                            // this.popdialog=true
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })

                }else if(val==="Havale"){
                    // console.log(this.user,sipno);
                    
                    // return
                    Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation havalesendmail_mutation($sipno: Float,$username:String, $usermail:String) {
                            havalesendmail_mutation(sipno: $sipno, username: $username, usermail: $usermail) {
                                _id
                                
                            }
                            }
                        `,
                        variables: {
                            sipno:Number(sipno),
                            username:this.user.ad_soyad,
                            usermail:this.user.email,
                        },
                    })
                        .then(async data => {
                            //Sipariş detayları mailinize yollanmıştır.
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })

                    // return
                    this.havale_div=true
                    this.odemedurumu="Beklemede"
                    if(Cookies.get("uid")== null || Cookies.get("uid") == undefined || Cookies.get("uid") == ""){
                    this.guser_det_kaydet() // guser detay kayıt
                    }
                    satlistolustur()
                    
                    
                    Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation createSiparisFis_mutation($satirList: [satirListInput],$siparisfis:siparisfisinput) {
                            createSiparisFis_mutation(satirList: $satirList, siparisfis: $siparisfis) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          satirList: satirList,
                          siparisfis: siparisfis
                        }
                        })
                        .then(async data => {
                           await this.numaralar_guncelle()
                           await this.delete_basketsellproduct(satirList)
                        //    this.havalesendmail()
                            // console.log("ok");
                            this.popdialog=true
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
                }else if(val==="Kapıda Nakit"){

                    // yorum dialog

                    Loading.show()
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation doorsendmail_mutation($sipno: Float,$username:String, $usermail:String) {
                            doorsendmail_mutation(sipno: $sipno, username: $username, usermail: $usermail) {
                                _id
                            }
                            }
                        `,
                        variables: {
                            sipno:Number(sipno),
                            username:this.user.ad_soyad,
                            usermail:this.user.email,
                        },
                    })
                        .then(async data => {
                            
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
                    // return
                    this.odemedurumu="Beklemede"
                    if(Cookies.get("uid")== null || Cookies.get("uid") == undefined || Cookies.get("uid") == ""){
                    await this.guser_det_kaydet() // guser detay kayıt
                    }
                    
                    satlistolustur()
                    
                    
                    
                    this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation createSiparisFis_mutation($satirList: [satirListInput],$siparisfis:siparisfisinput) {
                            createSiparisFis_mutation(satirList: $satirList, siparisfis: $siparisfis) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          satirList: satirList,
                          siparisfis: siparisfis
                        }
                        })
                        .then(async data => {
                           await this.numaralar_guncelle()
                           await this.delete_basketsellproduct(satirList)
                            this.popdialog=true
                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
                    // console.log(val);
                }
                // console.log(this.user);
                // console.log(this.selected);
                // console.log(this.lists);
                // miktar güncelle
                this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation varyantstoklistmiktaredit($liste: [satiridcountinput]) {
                            varyantstoklistmiktaredit(liste: $liste) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          liste: satirList.map(item=>({
                              id : item.varyantid,
                              count : (item.count)* (-1)
                          })),
                          
                        }
                        })
                        .then(data => {
                            
                        })
            },
            // satılan urunu sepetten cıkar
            async delete_basketsellproduct(satirList){
                Loading.show()
               await this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation delete_basketsellproduct($satirList: [satirListInput]) {
                            delete_basketsellproduct(satirList: $satirList) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          satirList: satirList
                        }
                        })
                        .then(async data => {

                            Loading.hide()
                        }).catch(err => {
                            console.log(err);
                            Loading.hide()
                        })
            },
            async numaralar_guncelle(){
               
              await this.$apollo
                        .mutate({
                        mutation: gql`
                            mutation numara_guncelle($faturano: Float,$irsaliyeno:Float) {
                            numara_guncelle(faturano: $faturano, irsaliyeno: $irsaliyeno) {
                                _id
                            }
                            }
                        `,
                        // loadingKey: 'loading',
                        variables: {
                          faturano:this.numaralar.faturano ,
                          irsaliyeno:this.numaralar.irsaliyeno
                        }
                        })
                        .then( data => {
                        //    await numaralar_guncelle()
                            // console.log("ok");
                            
                        }).catch(err => {
                            console.log(err);
                            
                        })
            },
            selectdetail(a,i){
                // console.log(this.user);
                a.forEach((value, index) => {
                    if (!value.selected || value.selected === false || value.selected === undefined) {
                        
                        if (i == index) {
                            Vue.set(value, "selected", true);

                            } else {
                            
                        }
                    } else {
                    value.selected = !value.selected; // true ise false yap
                    }
                    
                });

                // console.log(this.user);
            },
           async guser_det_kaydet(){
               await this.$apollo
                            .mutate({
                            mutation: gql`
                                mutation user_detail_mutation($userdetail: userdetailInput) {
                                user_detail_mutation( userdetail: $userdetail) 
                                    {
                                    _id
                                    }
                                }
                            `,
                                loadingKey: 'loading',
                                variables: {
                                    
                                    userdetail: {
                                        id:this.user._id,
                                        uid:Cookies.get("guid"),
                                        baslik:this.user.baslik,
                                        ad_soyad:this.user.ad_soyad,
                                        cep:this.user.cep,
                                        tc_v_no:this.user.tc_v_no,
                                        v_daire:this.user.v_daire,
                                        email:this.user.email,
                                        // email:this.get_user.usermail,
                                        adres:this.user.adres,
                                        p_kodu:this.user.p_kodu,
                                        il:this.user.il.il,
                                        ilid:this.user.il.ilid,
                                        ilce:this.user.ilce.ilce,
                                        ilceid:this.user.ilce.ilceid,
                                    }
                                }
                                })
                                .then(data => {
                                //  console.log("data",data.data.user_detail_mutation._id);
                                 this.user._id=data.data.user_detail_mutation._id
                                // this.$store.dispatch('search_userdetaillists',Cookies.get('guid'))
                                // search_userdetaillists
                                // this.user_detail_dialog=false
                                // this.$q.notify({
                                //                 type: "Positive",
                                //                 message: `Bilgiler Başarıyla Güncellendi...`,
                                //                 position: "top-right",
                                //                 color: "green",
                                //                 icon: "check",
                                //             });
                                })


            },
            user_det_kaydet(a){
                this.$refs.ad.validate()
                 this.$refs.tc.validate()
                 this.$refs.cep.validate()
                //  this.$refs.email.validate()
                 this.$refs.adres.validate()
                  this.$refs.il.validate()
                  this.$refs.ilce.validate()
                //  console.log("user",this.user.ad_soyad);
                if(
                //    this.user.baslik == "" ||
                   this.user.ad_soyad == "" || this.user.ad_soyad == undefined ||
                   this.user.tc_v_no == "" || this.user.tc_v_no == undefined ||
                //    this.user.email == "" ||
                   this.user.adres == "" || this.user.adres == undefined ||
                    this.user.il == "" || this.user.il == undefined ||
                    this.user.ilce == "" || this.user.ilce == undefined
                ){
                    this.user_validate=false
                }else{
                    this.user_validate=true
                }
                if(this.user_validate ){
                    // console.log("a",a)
                    // return
                    if(a != undefined){


                        // console.log(this.user);
                        this.$apollo
                            .mutate({
                            mutation: gql`
                                mutation user_detail_edit_mutation($id:ID, $userdetail: userdetailInput) {
                                user_detail_edit_mutation(id:$id, userdetail: $userdetail) 
                                    {
                                    _id
                                    }
                                }
                            `,
                                loadingKey: 'loading',
                                variables: {
                                    id:a,
                                    userdetail: {
                                        id:this.user._id,
                                        uid:Cookies.get("uid"),
                                        baslik:this.user.baslik,
                                        ad_soyad:this.user.ad_soyad,
                                        cep:this.user.cep,
                                        tc_v_no:this.user.tc_v_no,
                                        v_daire:this.user.v_daire,
                                        // email:this.user.email,
                                        email:this.get_user.usermail,
                                        adres:this.user.adres,
                                        p_kodu:this.user.p_kodu,
                                        il:this.user.il,
                                        ilid:this.user.ilid,
                                        ilce:this.user.ilce,
                                        ilceid:this.user.ilceid,
                                    }
                                }
                                })
                                .then(data => {
                                // console.log("user detail sonuc");
                                this.$store.dispatch('search_userdetaillists',Cookies.get('uid'))
                                // search_userdetaillists
                                this.user_detail_dialog=false
                                this.$q.notify({
                                                type: "Positive",
                                                message: `Bilgiler Başarıyla Güncellendi...`,
                                                position: "top-right",
                                                color: "green",
                                                icon: "check",
                                            });
                                })



                    }else{
                    this.$apollo
                            .mutate({
                            mutation: gql`
                                mutation user_detail_mutation($userdetail: userdetailInput) {
                                user_detail_mutation(userdetail: $userdetail) 
                                    {
                                    _id
                                    }
                                }
                            `,
                             loadingKey: 'loading',
                            variables: {
                                userdetail: {
                                    id:this.user._id,
                                    uid:Cookies.get("uid"),
                                    baslik:this.user.baslik,
                                    ad_soyad:this.user.ad_soyad,
                                    cep:this.user.cep,
                                    tc_v_no:this.user.tc_v_no,
                                    v_daire:this.user.v_daire,
                                    //  email:this.user.email,
                                    email:this.get_user.usermail,
                                    adres:this.user.adres,
                                    p_kodu:this.user.p_kodu,
                                    il:this.user.il.il,
                                    ilid:this.user.il.ilid,
                                    ilce:this.user.ilce.ilce,
                                    ilceid:this.user.ilce.ilceid,
                                }
                            }
                            })
                            .then(data => {
                            //   console.log("user detail sonuc");
                              this.$store.dispatch('search_userdetaillists',Cookies.get('uid'))
                              this.user_detail_dialog=false
                              this.$q.notify({
                                                type: "Positive",
                                                message: `Bilgiler Başarıyla Güncellendi...`,
                                                position: "top-right",
                                                color: "green",
                                                icon: "check",
                                            });
                            })
                    }
                    this.user_detail_dialog=false
                }else{
                    this.$q.notify({
                        type: 'negative',
                        message: `Eksik Bilgi Girişi...!`
                    })
                    
                }
                
            },
            u_veriler(){
                if(this.user.selected){
                    this.$refs.stepper.next()
                }else{
                    
                    this.$q.notify({
                        type: 'negative',
                        message: `Adres Seçimini Yapmadınız..!`
                    })  
                }
                
                
            },
            veriler(){
                // user seçildi mi?
                //  console.log(this.$refs.email.rules);
                //  this.$refs.baslik.validate()
                // console.log(this.user);
                 this.$refs.ad.validate()
                 this.$refs.tc.validate()
                 this.$refs.cep.validate()
                 this.$refs.email.validate()
                 this.$refs.adres.validate()
                 this.$refs.il.validate()
                 this.$refs.ilce.validate()
                if(
                //    this.user.baslik == "" ||
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
                }else{
                    
                }
            },
            devam(){
                // console.log(this.selected);
                this.$q.notify({
                        type: 'negative',
                        message: `Ürün Seçimini Yapmadınız..!`
                    })
            },
            payment_radio(val){
                
                if(val==="Kredi Kartı Hemen"){
                    // console.log("1");
                }else if(val==="Havale"){
                    this.havale_div=true
                    // console.log("2");
                }else if(val==="Kapıda Nakit"){
                    // console.log("3");
                }
            },
            async fonk(){
                let vm =this
                // this.count=1
                //StokturuQuery
                //fiyatListQuery
                //FIXME:

                let idList=[]
                if (Cookies.get("uid")) {
                    // console.log(this.get_ubasketlist); //TODO: fiyat stoktan alınacak
                    this.lists=this.get_ubasketlist
                    this.user.uid=Cookies.get("uid")
                }else{
                    this.lists=this.get_basketlist
                }
                this.lists.forEach((item,i)=>{
                    let obbj={}
                     obbj={id:item.stokid}
                    idList.push(obbj)
                })
                //   console.log("this.lists",this.lists);
                // -*-*-*-*-*-*-*-*
                await axios.post(
                'http://'+ process.env.API +':4000/graphql', {
                 query: `query fiyatListQuery($idlist:[idListInput]){
                    fiyatListQuery(idlist:$idlist){
                        _id
                        fiyat1
                        indirim
                        
                        
                   }  
                 }`,
                   variables: {
                    idlist: idList
                    }
            }).then( (response) => { 
                let farr=[] 
                // console.log("idler",response.data.data.fiyatListQuery);
                farr=response.data.data.fiyatListQuery
                // console.log("farr",farr);
                this.lists.forEach((item,i)=>{
                    farr.forEach((aitem,a)=>{
                        if(a==i){
                            this.lists[i].fiyat = (aitem.fiyat1) - (aitem.fiyat1*aitem.indirim/100)
                        }
                    })
                })
                
            })
            
            // console.log("this.getvaryantskuslists",this.getvaryantskuslists);
            // stok kontrol data
            this.lists.forEach((item,z)=>{
                this.getvaryantskuslists.forEach((aitem,a)=>{ //varyantskus
                    if(item.varyantid==aitem._id){
                        this.lists[z].miktar=aitem.miktar
                        this.load=false
                        // this.asn++
                    }
                })
            })
            
            // console.log("this.lists",this.lists);
            
            // miktar kontrol data
            // console.log("this.lists",this.lists);
            //    -*-*-*-*-*-*-*-*-*-*-
            },
            // eksi () {
      
            //     // this.miktar--
                
            // },

            // arti () {
            //     // this.miktar++
            //     // this.selected.forEach(item=>{
            //     //     this.count=item.count++
            //     // })
            // },
            hesaplama(){
                // Unix Timestamp
                // let sipno=Number(date.formatDate(Date.now(), 'X'))+225222222
                // sipno=sipno.toString()
                
                //  console.log("sipno",sipno);
                // 
                // eğer stok miktarı varsa yazılacak
                let aratoplam=0
                let kdv=0
                let kdvoran=0
                let tutar=0
                
                this.selected.forEach(item=>{
                    if(item.count < 1 ){
                        item.count=1
                    }
                    kdvoran=item.kdv
                    // console.log(item.count);
                    aratoplam +=item.count * (item.fiyat/((100+item.kdv)/100))
                    kdv += item.count * (item.fiyat-(item.fiyat/((100+item.kdv)/100)))
                })
                // console.log(kdv);
            //    kdv=(aratoplam*kdvoran/100)
            //    tutar=aratoplam*((100+kdvoran)/100)
               tutar=aratoplam + kdv
               aratoplam=(aratoplam/1).toFixed(2).replace('.', ',')
               aratoplam=aratoplam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
               this.aratoplam=aratoplam

               kdv=kdv.toFixed(2).replace('.', ',')
               this.kdv=kdv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

               tutar=tutar.toFixed(2).replace('.', ',')
               this.tutar=tutar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            //    console.log("selected",this.selected)

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
            editil_ilce(a){

                console.log(a);
                if(a.il === Object){
                    return true
                }else{
                    return false
                }

            },
            filteril (value, update, abort) {
          update(() => {
            const needle = value.toLowerCase();
            this.iloptions = this.ilList.filter((v) => v.il.toLowerCase().includes(needle))
          })
        },
            async ilcesec() {

            // console.log("sdsd");
            console.log(this.user);
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
            // this.user.ilce=""
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
                console.log("value",value);
                let val = ""
                value=value.replace(/\./g,"");
                value=value.replace(/\,/g,".");
                val=Number(value)
                // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                 return val
            },
            kartsendmail(){

            },
            havalesendmail(){

            },
            doorsendmail(){

            },
            // formatNumber(value) {
            // return value.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
            // }
            // toggleBodyClass(addRemoveClass, className) {    
            //     const el = document.body;

            //     if (addRemoveClass === 'addClass') {
            //     el.classList.add(className);
            //     } else {
            //     el.classList.remove(className);
            //     }
            // },
        },
        
    }
</script>

<style lang="styl" scoped>

tr td {
    height: 200px;
}
.scale-down{
    display: flex;
    align-items: center;
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
.scale-down{
    display: flex;
    align-items: center;
    width: 120px;
    height: 120px;
    
}
}
@media only screen and (max-width: 530px ) {
    /* tr>td {
    height: 150px;
} */
.scale-down{
    display: flex;
    align-items: center;
    width: 65px;
    height: 65px;
    
}
}
.new_detail{
    /* border: 2px solid rgba(0,0,0,0.11); */
    height:220px;
    cursor:pointer;
}
/* .new_detail:hover{
    border: 2px solid rgba(0,0,0,0.11);
    border-color:#f00;
    content: "\F12C";
    
    text-align: center;
} */
.new_detail_selected {
  border: solid 2px #3c8dbc;
}

.new_detail_selected::before,
.new_detail_selected::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  border-color: transparent;
  border-style: solid;
}

.new_detail_selected::after {
  content: '\2713';
  font-size: 13px;
  line-height: 13px;
  font-weight: bold;
  color: white;
}

.new_detail_selected::before {
  border-radius: 2px;
  border-width: 15px;
  border-left-color: #3c8dbc;
  border-top-color: #3c8dbc;
}
/* .q-table { */
    /* table-layout: fixed; */
    /* display: inline-block;
    overflow-wrap: break-word;
    word-wrap: break-word !important; */
    /* line-break: auto; */
    /* line-break: loose; */
    /* line-break: normal; */
    /* line-break: strict; */
    /* line-break: anywhere; */
    /* width:80px; */
/* } */
/* #ff4081 */
</style>