<template>
    <q-page class=" row q-pt-xl q-pb-md items-start q-col-gutter-md">
    

        <div  v-for="(list,index) in lists" :key="index" v-if="list.vars" class="col-md-3 col-sm-4 col-xs-6 ">
           <!-- <div>{{JSON.stringify(list)}}</div> -->
         <q-intersection
                  once
                  transition="fade"
                  >
                  
            <q-card @click="select(list._id,list.stokturad)" style="" class="my-card product-card box-shadow shadow-transition cursor-pointer">
               <!-- <q-img src="../statics/emose_h200.jpg" /> -->
               
               <q-img 
                :srcset="list.vars.images.path + list.vars.images.publicid+'.jpg'"
                :src="list.vars.images.path + list.vars.images.publicid+'.webp'" 
                alt="Not Found" 
                
                />
                
               <q-card-section class="q-pl-xs q-pr-xs">
                     <div class="row  text-center">
                     <div class="col   ">
                        {{list.stokturad}}
                     </div>
                     
                     </div>
               </q-card-section>
               <q-card-section class="q-pt-none text-center">
                     
                     <!-- <div class=" text-h5 ">
                        99<span class="vertical-middle text-caption">,99 TL</span>
                     </div> -->
                     <div v-if="list.indirim === null || list.indirim === undefined || list.indirim === 0">
                        {{list.fiyat1.toLocaleString('tr', {minimumFractionDigits: 2})}} TL
                     </div>
                     <div v-else>
                        <div v-if="list.fiyat1 == null" >
                           <div class=" text-subtitle2 ">
                              Fiyat bilgisi yok
                           </div>
                           
                           <div class=" text-h5  ">
                           &nbsp;
                           </div>
                        </div>
                        
                        <div v-else-if="list.fiyat1 != null" >
                           <div class="text-subtitle2 text-grey text-strike ">
                           {{list.fiyat1.toLocaleString('tr', {minimumFractionDigits: 2})}} TL
                           </div>
                           <div class=" text-h5  ">
                           {{((list.fiyat1)-(list.fiyat1*(list.indirim/100))).toLocaleString('tr', {minimumFractionDigits: 2})}} TL
                           </div>
                        </div>
                        <!-- <div v-else-if="list.fiyat1 != null">
                           
                           </div> -->
                     </div>
                     <!-- <div v-if="" class=" text-h6 text-strike ">

                     </div> -->
                     <!-- <div class=" text-h6">

                     </div> -->
                     
               </q-card-section>

               <q-card-section class="q-pt-none q-pl-none q-pr-none text-center ">
                   <!-- v-model="ratingModel[index]" -->
                     <q-rating
                        v-model="ratingmod"
                        size="1.1em"
                        :max="5"
                        style="color:#ff4081"
                        icon="mdi-heart"
                        icon-half="mdi-heart-half-full"
                        readonly
                        />
                        <!-- style="color:#ff4081" -->
                        <!-- <q-space/> -->

                        <span v-if="list.yorumlar" class="  text-center justify-center text-weight-regular text-subtitle2" >
                           <span class="row " ></span><span class="text-weight-bold text-blue-7">
                           Yorumlar( <span class="  text-subtitle2 ">{{list.yorumlar.length}}</span> )</span>
                        </span>
                        <span v-else class="  text-center justify-center text-weight-regular text-subtitle2" >
                           <span class="row " ></span><span class="text-weight-bold text-blue-7">
                           Yorumlar( <span class="  text-subtitle2 ">0</span> )</span>
                        </span>
               </q-card-section>
               
            </q-card>
            
         </q-intersection>
         
        </div>
  
       <!-- <div>this.$route.params.parentname</div> -->
       <!-- <div>{{this.$route.params.parentname}}</div> -->
        <!-- <div><q-btn @click="deneme()">sfsf</q-btn></div> -->
      
    </q-page>
</template>

<script>
    import Vue  from 'vue'
    import axios from 'axios'
    import gql from 'graphql-tag'
    // import {store} from '../store/index'
    import {mapState,mapGetters} from 'vuex'
    import {Loading} from 'quasar'
    const heavyList = []
    export default {
         props:['parentname','parentid'],
        data(){
            return{
                ratingModel:[],
                ratingmod:5,
                treeem:[],
                lists:[],
                stokid:"",
                heavyList
               //  parentname:this.$route.params.parentname
                
            }
        },
      //   beforeRouteUpdate (to, from, next) {
  
      //    console.log("beforeRouteUpdate",to);
      //    next()
      //    },
      //   beforeRouteLeave (to, from, next) {
      //       const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      //       if (answer) {
      //          next()
      //       } else {
      //          next(false)
      //       }
      //       },
        computed: {  
        
        ...mapGetters([
        'anakategorilists',
        'anakategorizelists',
        'activestoklistids'

        ]),
         // parentname:{
         //    get:function(){
         //       console.log("comp_parent");
         //       // this.$store.dispatch('anakategori')
         //     return this.$route.params.parentname
         //     },
         //     set:function(val){
         //        console.log("comp",val);
         //        return val
         //     }
         // }
      },
        watch:{
           parentname(val){
            let id=this.anakategorilists.find((item=>{
               if (item.stokturad===val){
                     // console.log(val);
                  return item
               }
            }));
            //  console.log(val);
               this.stokid=id._id;
               this.stoklist()
              
           },
            anakategorilists(val){
               
               // console.log(this.parentname);
               let id=val.find((item=>{
              if (item.stokturad===this.parentname){
               //   console.log(item._id); rating model ve data

                 return item
              }
               }));
               this.stokid=id._id;
            this.stoklist()
            // console.log("anakategorilistssss",val);

            }
        },
      
        async created(){
         // return this.$store.dispatch('fetchItem')
        },
        async mounted(){
         //   console.log(this.parentid);
           let id=this.anakategorilists.find((item=>{
              if (item.stokturad===this.parentname){
               //   console.log(item._id);
                 return item
              }
               }));
         //       console.log(id);
         if(id){
            this.stokid =id._id;
         }
         //  this.stokid =id._id;
               
               this.stoklist()
           
        },
        methods:{
         //   async stoklistt(){
         //    console.log("methods",this.parentname);
         //    console.log("methods",this.anakategorilists);
         //   },
           async stoklist(){
              
               this.parseTree(this.anakategorilists,this.stokid);
               this.viewlist(this.treeem);

            },
               viewlist(list){
                  // console.log("list1",list);
                  // console.log(list.children.flat());
                   let result = 
                   list.flatMap(obj => {
                      if(obj.children.length > 0){
                        return obj.children
                      }else{
                        return obj
                      }
                      
                      })
                   
                   ;//childrenları  eşit seviyele
                  // console.log("result",result);
                  //  console.log("result",result); 
                  let resultt=result.map(item =>{
                     return {
                        _id: item._id,
                        stokturad: item.stokturad,
                        parentid: item.parentid,
                        fiyat1:item.fiyat1,
                        indirim:item.indirim,
                        vars: item.vars[0],
                        yorumlar:item.yorumlar

                     }
                  })
                  //   console.log("resultt",resultt);
                   this.lists=resultt

                   // rating
                   let deneme
                  //  console.log("deneme",(deneme = 0/0));
                   let say
                   resultt.forEach((item,i)=>{
                     //  console.log("result",item.yorumlar);
                     // this.ratingModel[i]=

                     if (item.yorumlar && item.yorumlar.length ) {
                        item.yorumlar.forEach((aitem,a)=>{
                           if(a==0){
                              let yorumlikenumber = 0
                              let yorumdislikenumber = 0
                              // console.log("aitem.like",aitem.like);
                              aitem.like > 0 ? yorumlikenumber=aitem.like  : yorumlikenumber = 0
                              aitem.dislike < 0 ? yorumdislikenumber=(aitem.dislike * (-1))  :yorumdislikenumber=0
                              // console.log("numberlar",aitem.like,yorumlikenumber,yorumdislikenumber,(yorumlikenumber + yorumdislikenumber));
                              say =  aitem.like / (yorumlikenumber + yorumdislikenumber)  * 5
                           //  say = 3.5  
                           }
                        })
                        // console.log("item.yorumlar.length",item.yorumlar.length);
                        
                        // console.log("say",say);
                        this.ratingModel[i]=say
                        
                     }else{
                     this.ratingModel[i]=5
                     }
                   })
                  //  console.log("ratingmodel", this.ratingModel);
               },
               parseTree(selfQ, parentID){
      
                  let treemmenu = [];


                  selfQ.forEach((value, index) => {

                     if(value.parentid === parentID){
                     // console.log(value);
                     const children = this.parseTree(selfQ, value._id);

                     if (children.length > 0) {
                        // value.children = children;

                        Vue.set(value, 'children', children);

                     }else{
                        Vue.set(value,'children',[])
                     }

                     treemmenu.push(value);

                     }
                  });

                  this.treeem=treemmenu;
                  // console.log(this.treemmenu);
                     return this.treeem




               },
               select(a,b){
                  // stoklistid
                  // console.log("a",a,"b",b);
                  this.$store.dispatch('stoklistid',a)
                  this.$router.push({ name: 'sales', params: { stokid: a, stokad:b }})
                  
               }
        }
    }
</script>

<style lang="stylus" scoped>

  
   .product-card:hover
      // box-shadow $shadow-15  
      box-shadow 5px 15px 9px rgba(0, 0, 0, 0.5) 
   .my-card
      min-height:535px;
</style>