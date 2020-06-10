<template>
    <q-page class=" row q-pt-md items-start q-col-gutter-md">
    
        <div  v-for="(list,index) in lists" :key="index" v-if="list.vars" class="col-md-3 col-sm-4 col-xs-6 ">
           
         <q-intersection
                  
                  once
                  transition="fade"
                  >
            <q-card @click="select(list._id,list.stokturad)"  class="my-card product-card box-shadow shadow-transition cursor-pointer">
               <!-- <q-img src="../statics/emose_h200.jpg" /> -->
               
               <q-img 
                
                :src="list.vars.images.path + list.vars.images.publicid" 
                alt="Not Found" 
                
                
                />
               
               <q-card-section>
                     <div class="row  text-center">
                     <div class="col   ">
                        {{list.stokturad}}
                     </div>
                     
                     </div>
               </q-card-section>
               <q-card-section class="q-pt-none text-center">
                     
                     <div class=" text-h5 ">
                        99<span class="vertical-middle text-caption">,99 TL</span></div>
                     
               </q-card-section>

               <q-card-section class="q-pt-none text-center ">
                     <q-rating
                        v-model="ratingModel"
                        size="1.1em"
                        :max="5"
                        style="color:#ff4081"
                        icon="mdi-heart"
                        readonly
                        />
                        <!-- style="color:#ff4081" -->
                        <!-- <q-space/> -->
                        <span class="q-ml-md text-center text-weight-regular text-subtitle2" >
                           <span class="" style="color:grey">Yorum</span><span class="text-grey">
                           ( <span class="  text-subtitle2 ">11</span> )</span></span>
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
    export default {
         props:['parentname','parentid'],
        data(){
            return{
                ratingModel:4,
                treeem:[],
                lists:[],
                stokid:"",
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
               let id=this.anakategorilists.find((item=>{
              if (item.stokturad===this.parentname){
               //   console.log(item._id);
                 return item
              }
               }));
               this.stokid=id._id;
            this.stoklist()
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
                  // console.log(result); 
                  let resultt=result.map(item =>{
                     return {
                        _id: item._id,
                        stokturad: item.stokturad,
                        parentid: item.parentid,
                        vars: item.vars[0]

                     }
                  })
                  //   console.log("resultt",resultt);
                   this.lists=resultt
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
</style>