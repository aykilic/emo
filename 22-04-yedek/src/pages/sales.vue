<template>
<q-page class="row q-pt-md items-start q-col-gutter-md " >
    
    <div style="min-width: 350px;"  class="col-md-6 col-sm-6 col-xs-12 " >
       <q-card class="">
        <product-zoomer
                
                :key="zoomerKey"
                :images="images"
                >
        </product-zoomer>
      </q-card> 
    </div>
    
      <div  class="col-md-6 col-sm-6 col-xs-12 " >
        <q-card class="">
            <q-item class="">
                <q-item-section class="col-12 " align="center">
                    <div  class="  text-h6 " >{{stokad}}</div>
                </q-item-section>
                
            </q-item>
            <q-separator inset/>
            <q-item class="" v-for="(value,i) in varyanttree" :key="i">
                   <div class="row">
                    <div   class=" col-2" style="text-transform: unset">{{value.varyantname}}: </div>
                    <div  class="col-9" style="margin-left:15px;"  :id="'varyant'+i" ></div>
                    <!-- <q-separator inset/> -->
                    <div  v-for="(altvalue, index) in value.children" :key = "index">
                        
                    <div  v-if="altvalue.vars.length > 0">
                        <ul   style="list-style-type:none;padding-left:0px;" v-for="(vars, key) in altvalue" :key = "key">
                            
                            <li  style="border-radius:10px" :id="value.varyantname + index" :class="[{ active:altvalue.selected },'firstvar']"

                            @click.prevent="ibo(value.children,index,i,altvalue)"
                            >
                            
                                <img class="varyantimg" :src="vars.images.imageurl "/>
                                </li>
                        </ul>
                    </div>
                      <div class="col-12" v-else-if="altvalue.color">
                        <ul class="row" style="list-style-type:none;padding-left:0px;">
                          <li :id="value.varyantname + index"  
                          @click.prevent="selectvar(value.children,index,i,altvalue,value)" 
                          style="border-radius:31px;" :style="{'background-color':altvalue.color}"   
                          :class="[{ active:altvalue.selected },'firstvar']">
                            
                          </li>
                        </ul>
                      </div>
                      <div class="col-12" v-else>
                        <ul class="row" style="list-style-type:none;padding-left:0px;">
                          <li :id="value.varyantname + index"  
                          @click.prevent="selectvar(value.children,index,i,altvalue)" 
                          style="border-radius:21px;text-align:center;padding-top:20px"    
                          :class="[{ active:altvalue.selected },'firstvar1']">
                            {{altvalue.varyantname}}
                          </li>
                        </ul>
                      </div>
                </div>
                </div>
                
                </q-item>
                <q-separator inset />
            <!-- <q-item>
                 <q-item-section class="col-12 " align="center">
                    <div  class="  text-h6 " >...{Ürün-Açıklaması...}...</div>
                    
                </q-item-section>
            </q-item> -->
        </q-card> 
      </div>    
        
</q-page>
</template>

<script>
    import Vue  from 'vue'
    import axios from 'axios'
    import gql from 'graphql-tag'
    // import {store} from '../store/index'
    import {mapState,mapGetters} from 'vuex'
    import {Loading} from 'quasar'
    import ProductZoomer from '../components/productzoom'
    
    export default {
        components:{ProductZoomer},
        props:['stokad'],
        data(){
            return{
                zoomerKey:0,
                urunad:"",
                urundetay:"",
                varyantlists:[],
                varyanttree:[],
                images:
            {
                 thumbs:
             [{
                "id":"Zoom-1",
                href:"https://via.placeholder.com/450",
                "data-image":"https://via.placeholder.com/450",
                "dataimage":"https://via.placeholder.com/",
                "publicid":"450"
            
             }],
            }

               //  parentname:this.$route.params.parentname
                
            }
        },
        async beforeCreate(){
      
    //   await this.$store.dispatch('varyantlist')
    // this.anakategorilists=this.$store.state.stok.anakategorilist
    
  },
        watch:{
            // getvaryantlist(val){
            //      this.stok()
            // },
            stokad(val){
                this.stokad=val
                
                 this.stok() 
                
            },
            anakategorilists(val){
                // console.log(val);
                
                this.stok()
                
            },
            getvaryantlist(val){
                // this.stok()
            }
        },
        computed:{
            // stokad:{
            //     get(){
            //         //  console.log(this.stokad);
            //     },
            //     set(val){
            //         console.log(val);
            //         return val
            //     }
            // },
            ...mapGetters([
                'anakategorilists',
                'anakategorizelists',
                'activestoklistids',
                'getvaryantlist'
                ]),
        },
        mounted(){
            //    console.log("mounted",this.anakategorilists);
             
            if (this.anakategorilists.length > 0) {
                
                this.stok()
            }
            if(this.activestoklistids===""){
                // this.stokad
            }
        },
        
         methods: {
           async stok(){
                // console.log(this.anakategorilists);
                // console.log(this.stokad);
                
                
              let id=this.anakategorilists.find((item=>{
              if (item.stokturad===this.stokad){
            //    console.log(item.hasOwnProperty("children"));
            
                 return item
              }
               }));  
               await this.$store.dispatch('stoklistid',id._id)
               let varyantlist=  this.getvaryantlist.filter((item=>{
              if (item.stokid===this.activestoklistids){
                 return item
              }
               }));
               this.varyantlists=varyantlist
               this.childtree(this.varyantlists)
              let item=this.anakategorilists.filter((item=>{
              if (item.stokturad===this.stokad){
            //    console.log(item.hasOwnProperty("children"));
            
                 return item
              }
               }));
                // console.log(item[0].vars);
               this.urundetay=item
               let images={}
               let thumbs=[]
               let normal_size=[]
               let large_size=[]
        // property hatası
          for (var key in this.urundetay[0].vars) {
            //    console.log(key);
             var value = this.urundetay[0].vars[key];
             
            thumbs.push({
                "id":value.images.id, href:value.images.imageurl, "dataimage":value.images.path, "publicid":value.images.publicid
            })
            normal_size.push({
                id:value.images.id, url:value.images.imageurl
            })
            large_size.push({
                id:value.images.id, url:value.images.imageurl
            })
            }
            // property hatası
             images= Object.assign( {"thumbs":thumbs},{"normal_size":normal_size},{"large_size":large_size});
            
             this.images=images
            
            console.log("varyantlists",this.getvaryantlist);
            console.log("varyantlist",varyantlist);
            
           this.zoomerKey++ ;
              
            },
            childtree(childarr, parentID=null){
          // console.log(childarr);
          
          const childtreem = [];
            childarr.forEach((value, index)=>{
                //  console.log(value);

                if(value.parentid === parentID){
               
              const children =  this.childtree(childarr, value._id);

              if (children.length > 0) {
                

                Vue.set(value, 'children', children);

              }

              childtreem.push(value);

            }

            })
            this.varyanttree=childtreem;

            return this.varyanttree
        },
          selectvar(a,i,ii,aa,bb){
        const varyant="varyant"+ii;
        a.forEach((value,index)=>{
          
          
          if(!value.selected || value.selected===false || value.selected===undefined){
                // document.getElementById(varyant).innerHTML = ""
                  if(i==index){
                
                    //  console.log(typeof(bb.children) );
                  
                  Vue.set(value, 'selected', true);
                  document.getElementById(varyant).innerHTML = aa.varyantname
                  
                  if(bb == undefined || null){
                    this.selectedid=value._id
                  }
                  
                  
                  
                  
                  
                  }else{
                    
                  }
                  
          }else {
            // if(value.selected==true){
            //   value.selected=false
            //   if(i==index){
            //     document.getElementById(varyant).innerHTML = ""
            //   }
            // }
           value.selected=!value.selected
            // console.log(value.selected);
            // if (value.selected===false || "" || null || undefined) {
               
            // } else {
              //  document.getElementById(varyant).innerHTML = aa.varyantname
            // }
           i==index  ? document.getElementById(varyant).innerHTML = "" : document.getElementById(varyant).innerHTML = aa.varyantname
          // 
          }
          
        })
        
            // console.log("2",this.selectedid)
        
        
      },
            
        },
        
    }
</script>

<style lang="scss" scoped>
.firstvar{
  border: 2px solid rgb(216, 216, 216);
   /* border-radius: 4px; */
  box-sizing:content-box; 
  width:58px;height:58px;cursor:pointer;margin-left:5px;
}
.firstvar1{
  border: 2px solid rgb(216, 216, 216);
   /* border-radius: 4px; */
  box-sizing:content-box; 
  width:38px;height:38px;cursor:pointer;margin-left:5px;
}
.firstvar1:hover {
  
   border:2px solid #f00;
   border-radius: 10px;
}
.firstvar:hover {
  
   border:2px solid #f00;
   border-radius: 10px;
}
.active{
  border: 2px solid #f00;
  border-radius: 10px;
  text-transform:unset
}
</style>