<template>
  <q-page class="flex flex-center">
    
      <div class="q-pt-md">
      
      <!-- <q-page-sticky expand position="top" elevated>
            <q-toolbar class="bg-accent text-white">
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
              </q-avatar>
              <q-toolbar-title>
                Page Title
              </q-toolbar-title>
            </q-toolbar>
          </q-page-sticky> -->
                      <q-carousel
                      
                            animated
                            v-model="slide"
                            navigation
                            infinite
                            autoplay
                            arrows
                            transition-prev="slide-right"
                            transition-next="slide-left"
                            
                      >
                            <!-- <q-carousel-slide class="slidir" v-for="(list ,index) in get_slider1list" :key="index" :name="`${index}`" :img-src="list.imageurl" />-->
                            <q-carousel-slide v-for="(list ,index) in get_slider1list" :key="index" :name="index" class="q-pa-none">
                                <img :src="list.imageurl" alt="mountains" class="fit" style="object-fit: contain;">
                            </q-carousel-slide>
                      <!-- style="object-fit: contain;" -->
                      <!-- style="max-height: 367px; " -->
                      </q-carousel>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
      </div>
    
  </q-page>
</template>

<script>
import axios from 'axios'
import gql from 'graphql-tag'
import router from "../router"
import {mapGetters } from 'vuex'
export default {
  // get_slider1listrefresh
  name: 'PageIndex',
  data () {
    return {
      slide:1,
      
    }
    },
    computed: {
      ...mapGetters([
      'get_slider1list',
      
    ]),
    },
    async mounted(){
     await this.$store.dispatch('search_slider1listrefresh')
      console.log("get_slider1listrefresh",this.get_slider1list);
    }
}
</script>
<style lang="stylus" scope>
.slidir{
  // object-fit: contain !important
  width:400px;

}
</style>