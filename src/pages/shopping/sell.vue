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
                                    <q-td class=""  key="miktar"  :props="props"  > 
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
                                            @click="hesaplama(props.row.count--)"
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
                                            @click="hesaplama(props.row.count++)"
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
                                            :class=" [{ new_detail_selected:get_userdetaillist.selected },'new_detail'] "
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
                                                    <q-btn color="red" flat rounded>Sil</q-btn>
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
                        </q-item> -->
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
                            <q-input class="q-pt-md q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.cep" ref="cep" :rules="[val => val.length > 9 || 'Yanlış Numara']" mask="+90(###) ### - ####" unmasked-value outlined label="Cep Telefonu" hint="Cep No Giriniz" dense />
                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.tc_v_no" ref="tc" :rules="[val => !!val || 'Boş Bırakmayınız']" outlined label="TC Kimlik No-Vergi No" hint="Lütfen Adınızı Giriniz" dense />
                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-md-6 col-xs-12"  v-model="user.v_daire"  outlined label="Vergi Dairesi" hint="Varsa - Vergi Dairesi Giriniz" dense />
                            <q-input class="q-pt-xs q-pl-xs q-pr-xs col-12" v-model="user.email" ref="email" outlined label="Mail" hint="Lütfen Adınızı Giriniz" :rules="[val => !!val || 'Email Alanı', isValidEmail]" dense />
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
                                @input=ilcesec()
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
                            
                            <q-btn v-if="user._id != null " class="q-ma-sm"  color="primary" @click="user_det_kaydet(user._id)" label="Güncelle"  v-close-popup ></q-btn>
                            <q-btn v-else class="q-ma-sm"  color="primary" label="Kaydet" @click="user_det_kaydet()" ></q-btn>
                            <!-- <q-btn class="q-mr-md text-grey"  color="" label="Kapat"  v-close-popup ></q-btn> -->
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
    export default {
        data() {
            return {
                edit_adress:false,
                val:"",
                user_detail_dialog:false,
                havale_div:false,
                // bankad:"",
                // ------
                user_validate:Boolean,
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
                // ------
                step:1,
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
                'get_userdetaillists'
      
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
            selectdetail(a,i){
                // console.log(this.user);
                a.forEach((value, index) => {
                    if (!value.selected || value.selected === false || value.selected === undefined) {
                    if (i == index) {
                        Vue.set(value, "selected", true);

                        } else {
                        
                    }
                    } else {
                    value.selected = !value.selected;
                    // this.user={
                    //     _id:"",
                    //     baslik:"",
                    //     ad_soyad:"",
                    //     cep:"",
                    //     tc_v_no:"",
                    //     v_daire:"",
                    //     email:"",
                    //     adres:"",
                    //     p_kodu:"",
                    //     il:{
                    //         il:"",
                    //         ilid:""
                    //         },
                    //     ilce:{
                    //         ilce:"",
                    //         ilceid:""
                    //         }
                    //     }
                    }
                });
                console.log(this.user);


            },
            user_det_kaydet(a){
                
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
                    if(a){


                        console.log(this.user);
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
                                        email:this.user.email,
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
                                console.log("user detail sonuc");
                                this.$store.dispatch('search_userdetaillists',Cookies.get('uid'))
                                // search_userdetaillists
                                this.user_detail_dialog=false
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
                                    id:this.user.id,
                                    uid:Cookies.get("uid"),
                                    baslik:this.user.baslik,
                                    ad_soyad:this.user.ad_soyad,
                                    cep:this.user.cep,
                                    tc_v_no:this.user.tc_v_no,
                                    v_daire:this.user.v_daire,
                                    email:this.user.email,
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
                              console.log("user detail sonuc");
                              this.$store.dispatch('search_userdetaillists',Cookies.get('uid'))
                              this.user_detail_dialog=false
                            })
                    }
                }else{

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
                console.log(this.user);
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
                    this.user.uid=Cookies.get("uid")
                }else{
                    this.lists=this.get_basketlist
                }
                // console.log(this.lists);
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
/* #ff4081 */
</style>