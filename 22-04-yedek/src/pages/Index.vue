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
                            height="600px"
                      >
                            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                      </q-carousel>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
      </div>
    
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      slide:1,
      
    }
    }
}
</script>
