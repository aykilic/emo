<template>
    <q-page class=" row q-pt-md items-start q-col-gutter-lg">
    
      
                
        <div class="col-md-3 col-sm-4 col-xs-6 ">
        <q-intersection
                once
                transition="fade"
                
                >
        <q-card  class="my-card product-card box-shadow shadow-transition cursor-pointer">
        <q-img src="../statics/emose_h200.jpg" />

        <q-card-section>
            

            <div class="row  text-center">
            <div class="col   ">
                Alt Kategori Adı
            </div>
            
            </div>

            
        </q-card-section>

        <q-card-section class="   q-pt-none text-center">
            
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
       <div class="col-md-3 col-sm-4 col-xs-6 ">
        <q-intersection
                once
                transition="fade"
                
                >
        <q-card  class="my-card product-card box-shadow shadow-transition cursor-pointer">
        <q-img src="../statics/emose1_h200.jpg" />

        <q-card-section>
            

            <div class="row  text-center">
            <div class="col   ">
                Alt Kategori Adı
            </div>
            
            </div>

            
        </q-card-section>

        <q-card-section class="   q-pt-none text-center">
            
            <div class=" text-h5 ">
                79<span class="vertical-middle text-caption">,99 TL</span></div>
            
        </q-card-section>

        <q-card-section class="q-pt-none text-center ">
            <q-rating
                v-model="ratingModel"
                size="1.1em"
                :max="5"
                style="color:#ff4081"
                icon="mdi-heart"
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
        <div class="col-md-3 col-sm-4 col-xs-6 ">
        <q-intersection
                once
                transition="fade"
                
                >
        <q-card  class="my-card product-card box-shadow shadow-transition cursor-pointer">
        <q-img src="../statics/emose2_h200.jpg" />

        <q-card-section>
            

            <div class="row  text-center">
            <div class="col   ">
                Alt Kategori Adı
            </div>
            
            </div>

            
        </q-card-section>

        <q-card-section class="   q-pt-none text-center">
            
            <div class=" text-h5 ">
                49<span class="vertical-middle text-caption">,99 TL</span></div>
            
        </q-card-section>

        <q-card-section class="q-pt-none text-center ">
            <q-rating
                v-model="ratingModel"
                size="1.1em"
                :max="5"
                style="color:#ff4081"
                icon="mdi-heart"
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
        <div class="col-md-3 col-sm-4 col-xs-6 ">
        <q-intersection
                once
                transition="fade"
                
                >
        <q-card  class="my-card product-card box-shadow shadow-transition cursor-pointer">
        <q-img src="../statics/emose3_h200.jpg" />

        <q-card-section>
            

            <div class="row  text-center">
            <div class="col   ">
                Alt Kategori Adı
            </div>
            
            </div>

            
        </q-card-section>

        <q-card-section class="   q-pt-none text-center">
            
            <div class=" text-h5 ">
                119<span class="vertical-middle text-caption">,99 TL</span></div>
            
        </q-card-section>

        <q-card-section class="q-pt-none text-center ">
            <q-rating
                v-model="ratingModel"
                size="1.1em"
                :max="5"
                style="color:#ff4081"
                icon="mdi-heart"
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
       <!-- <div class="col-3">

        <q-card  class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
            

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                Cafe Basilico
            </div>
            
            </div>

            
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary">
            Reserve
            </q-btn>
        </q-card-actions>
        </q-card>
        </div>
        <div class="col-3">

        <q-card  class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
            

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                Cafe Basilico
            </div>
            
            </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary">
            Reserve
            </q-btn>
        </q-card-actions>
        </q-card>
        </div>
        <div class="col-3">

        <q-card  class="my-card shadow-transition">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
            

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                Cafe Basilico
            </div>
            
            </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary">
            Reserve
            </q-btn>
        </q-card-actions>
        </q-card>
        </div>
        <div class="col-3">

        <q-card  class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
            

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                Cafe Basilico
            </div>
            
            </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary">
            Reserve
            </q-btn>
        </q-card-actions>
        </q-card>
        </div>
        <div class="col-3">

        <q-card  class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
            

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                Cafe Basilico
            </div>
            
            </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary">
            Reserve
            </q-btn>
        </q-card-actions>
        </q-card>
        </div>
        <div class="col-3">

        <q-card  class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
            

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                Cafe Basilico
            </div>
            
            </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
            $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat color="primary">
            Reserve
            </q-btn>
        </q-card-actions>
        </q-card> 
        </div> -->
      
    </q-page>
</template>

<script>
    export default {
        data(){
            return{
                ratingModel:4,
            }
        }
    }
</script>

<style lang="stylus" scoped>

 .product-card:hover
    // box-shadow $shadow-15  
    box-shadow 5px 15px 9px rgba(0, 0, 0, 0.5) 
</style>