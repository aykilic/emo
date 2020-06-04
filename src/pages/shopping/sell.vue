<template>
        <div class="row col-12  justify-center q-pt-xl" >
            <div v-if="lists.length == 0">Sepetinizde Ürün Bulunmamaktadır...</div>
                <q-stepper
                    v-else
                    class="col-md-10 col-12"
                    v-model="step"
                    ref="stepper"
                    contracted
                    color="primary"
                    animated
                    >
                    <q-step
                    
                    class=""
                        :name="1"
                        title="Select campaign settings"
                        icon="mdi-cart"
                        :done=" step > 1 "
                    >
                    <div class="row q-gutter-md">
                    <div class="col-xs-12 col-md-8" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;">
                        <!-- <q-table
                    
                        flat
                        :data="lists"
                        :columns="columns"
                        row-key="name"
                        selection="multiple"
                        :selected.sync="selected"
                        hide-bottom
                        /> -->
                        <q-table
                        
                        flat
                        :data="lists"
                        :columns="columns"
                        row-key="stokad"
                        selection="multiple"
                        :selected.sync="selected"
                        hide-bottom
                        >
                        <template v-slot:body="props" >
                            <!-- <q-tr :props="props"  class="cursor-pointer" @click.native="props.selected = !props.selected" @click="secim(props)"> -->
                            <q-tr :props="props"  class="cursor-pointer"  >
                                <q-td >
                                    <q-checkbox color="grey-8"  dense v-model="props.selected" @click="secim()"/>
                                </q-td>
                                <q-td class="row items-center justify-center "   key="resim" :props="props"  > 
                                    <div class=" scale-down " ><q-img style="border-radius:10px;"  :src="props.row.path + props.row.publicid " /></div>
                                <!-- {{props.row.stokad}} - {{props.row.varyantoption1}} - {{props.row.varyantoption2}} -->
                                </q-td>
                                <q-td key="stokad" :props="props"  > 
                                    {{props.row.stokad}} - {{props.row.varyantoption1}} - {{props.row.varyantoption2}}
                                <!-- {{props.row.stokad}} - {{props.row.varyantoption1}} - {{props.row.varyantoption2}} -->
                                </q-td>
                                 <q-td key="miktar" :props="props"  > 
                                     <q-input
                                        v-model="props.row.count"
                                        type="number"
                                        outlined
                                        
                                        />

                                <!-- {{props.row.stokad}} - {{props.row.varyantoption1}} - {{props.row.varyantoption2}} -->
                                </q-td>
                                <!-- <q-td key="fiyat" :props="props"  >
                                
                                </q-td> -->
                            </q-tr>
                        </template>
                            <!-- <template v-slot:body="props">
                                <q-tr :props="props">
                                <q-td key="desc" :props="props">
                                    {{ props.row.stokad }} -->
                                    <!-- <q-popup-edit v-model="props.row.name">
                                    <q-input v-model="props.row.name" dense autofocus counter />
                                    </q-popup-edit> -->
                                <!-- </q-td> -->
                                <!-- <q-td key="calories" :props="props">
                                    {{ props.row.calories }}
                                    <q-popup-edit v-model="props.row.calories" title="Update calories" buttons>
                                    <q-input type="number" v-model="props.row.calories" dense autofocus />
                                    </q-popup-edit>
                                </q-td>
                                <q-td key="fat" :props="props">
                                    <div class="text-pre-wrap">{{ props.row.fat }}</div>
                                    <q-popup-edit v-model="props.row.fat">
                                    <q-input type="textarea" v-model="props.row.fat" dense autofocus />
                                    </q-popup-edit>
                                </q-td>
                                <q-td key="carbs" :props="props">
                                    {{ props.row.carbs }}
                                    <q-popup-edit v-model="props.row.carbs" title="Update carbs" buttons persistent>
                                    <q-input type="number" v-model="props.row.carbs" dense autofocus hint="Use buttons to close" />
                                    </q-popup-edit>
                                </q-td>
                                <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
                                <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
                                <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
                                <q-td key="iron" :props="props">{{ props.row.iron }}</q-td> -->
                                <!-- </q-tr> -->
                            <!-- </template> -->
                        </q-table>
                    </div>
                    <div class="col-12 col-md" style="border-style:solid;border-color:#cdcdcd;border-width: 1px;border-radius:5px;display:block;min-width:150px;">
                        <q-card flat>
                        <q-card-section>
                        <q-stepper-navigation>
                        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'DEVAM'" />
                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                        </q-stepper-navigation>
                        </q-card-section>
                    </q-card>
                    </div>
                    </div>
                        <!-- <div v-for="(list,key) in lists" :key="key" style="min-height:130px;" class="row items-center">
                            <div class="scale-down col-3"><q-img :src="list.path+list.publicid " spinner-color="white"/></div>
                            <q-item-label class="col-3">{{list.stokad}} - {{list.varyantoption1}} - {{list.varyantoption2}} </q-item-label>
                            <q-item-label class="col-3"></q-item-label>
                        </div> -->
                    
                    </q-step>

                    <q-step
                        :name="2"
                        title="Create an ad group"
                        caption="Optional"
                        icon="mdi-map-marker-alert"
                        :done="step > 2"
                    >
                        An ad group contains one or more ads which target a shared set of keywords.
                        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'DEVAM'" />
                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                    </q-step>

                    <q-step
                        :name="3"
                        title="Create an ad"
                        icon="mdi-credit-card"
                    >
                        Try out different ad text to see what brings in the most customers, and learn how to
                        enhance your ads using features like ad extensions. If you run into any problems with
                        your ads, find out how to tell if they're running and how to resolve approval issues.
                        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'DEVAM'" />
                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                    </q-step>

                </q-stepper>
                <q-item class=" col-12 justify-center"><q-item-label>{{ JSON.stringify(selected) }}</q-item-label>
                    </q-item>
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
                step:1,
                lists:[],
                // ------
                selected:[],
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
                    // { name: "fiyat",   label: "Fiyat", align: "center", sortable: true, field: row => row.varyantid },
                    // { name: 'stokad', label: 'Fiyat', align: 'center',  field: 'calories', sortable: true, field: row => row.stokad },
                ],
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
        },
        methods: {
            fonk(){
                if (Cookies.get("uid")) {
                    this.lists=this.get_ubasketlist
                }else{
                    this.lists=this.get_basketlist
                }
                console.log(this.lists);
                

            },
            secim(val){
                console.log(val);
               
            }
        },
    }
</script>

<style lang="scss" scoped>
tr td {
    height: 200px;
}
.scale-down{
    width: 100px;
    min-height: 100px;
}
tr td .scale-down img {
  object-fit: scale-down;
//   display: block;
//   text-align: center;
}
</style>