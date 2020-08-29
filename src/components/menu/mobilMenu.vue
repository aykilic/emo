<template>
    <div >
      <q-list  v-for="(list ,index) in nodes" :key="index" >
          
            
                <div v-if="list.children.length > 0">
                <q-expansion-item
                    :style="indent"
                    :label="list.stokturad"
                    
                >
                    <q-item  :style="indent" v-if="list.children.length > 1  " @click="open(list.stokturad,list._id)" clickable exact>
                        <q-item-section class="" >
                        <!-- <q-item-label  class="row  " clickable>Tüm Ürünler <q-icon name="arrow_forward_ios" /> </q-item-label> -->
                        <q-item-label  class="row  " clickable>Tüm Ürünler  </q-item-label>
                        <!-- <q-item-label v-else>{{list.stokturad}}</q-item-label> -->
                        </q-item-section>
                    </q-item>
                    <mobil-menu  :nodes="list.children" :depth="depth + 1"   ></mobil-menu>
                </q-expansion-item>
                </div>
                <div  v-else>
                <q-item :style="indent" @click="select(list.stokturad,list._id)" clickable exact>
                        <q-item-section >
                        <q-item-label >{{list.stokturad}}</q-item-label>
                        <!-- <q-item-label v-else>{{list.stokturad}}</q-item-label> -->
                        </q-item-section>
                    </q-item>
                    <mobil-menu  :nodes="list.children" :depth="depth + 1"></mobil-menu>
                </div>

      </q-list>
    </div>
</template>

<script>
import {mapGetters } from 'vuex'
import mobilMenu from './mobilMenu.vue'

    export default {
        name:"mobilMenu",
        components: {
                        mobilMenu,
                    },
        props:  [
                    'drawer',
                    'nodes',
                    'depth'
                ],
        data() {
            return {
                    draw:false,
                    dra:false,
                    veri:[]
                
            }
        },
        computed:{
            indent() {
                return { transform: `translate(${this.depth * 10}px)` }
                },
                ...mapGetters([
                    'anakategorizelists',
                    
                ]),
        },
        watch:{
            //  drawer(val){
            //      this.draw = !this.draw
            // },
            nodes(val){
                // console.log(val);
            }
        },
        methods: {
            open(a,b) {
                this.$router.push({ name: 'stoklist', params: { parentname: a, parentid : b }})
            },
            select(a,b){
                  // stoklistid
                //    this.$store.dispatch('stoklistid',a)
                //   this.$router.push({ name: 'sales', params: { stokad: a, stokid:b }})
                  let self= this
              // console.log("b",b);
              let c=this.anakategorizelists
              
              rota(this.anakategorizelists,b)

               function rota(c,b){

                 c.forEach(item=>{
                  let parentname=item.stokturad
                  if(item._id==b){
                    if(item.children.length > 0){
                      self.$router.push({ name: 'stoklist', params: { parentname: parentname, parentid : b }})
                    }else{
                      self.$store.dispatch('stoklistid',b)
                      self.$router.push({ name: 'sales', params: { parentname:parentname, stokid: item._id, stokad:item.stokturad }})
                    }
                  }else{
                    item.children.forEach(subitem=>{
                        rota(subitem.children,b)
                    })
                  }
                 })
              }
               }
        },
    }
</script>

<style lang="scss" scoped>

</style>