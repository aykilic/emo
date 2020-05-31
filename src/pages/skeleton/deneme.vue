<template>
    
    
      <!-- <q-card  class="row col-12">
      
      
        <div class="col-md-6">
        <q-skeleton class="col-12 justify-center" style="min-width: 350px;margin-top:10px;" height="490px" />
        <div class="col-12">
            <q-skeleton  style="margin-top:10px;" width="130px" animation="fade" />
        </div>
      </div>
      <q-seperator vertical />
      <div class="col"></div>
        <q-skeleton width="200px" height="100px" />
      </q-card> -->
    <q-card  class="row col-12">
    <q-item class="row col-md-6 col-12 justify-center">
        

        <q-item-section class=" col-9 ">
          <q-skeleton height="450px" class="" />

           <div class="row justify-center q-pt-md q-gutter-md ">
            
              <q-skeleton  width="60px" height="90px" />
            
            
              <q-skeleton  width="60px" height="90px"/>
            
            </div>
            
           <!-- <div class="row items-center">
              <q-icon name="repeat" color="grey-4" class="q-mr-sm" size="18px" />
              <q-skeleton type="text" width="30px" />
            </div>

            <div class="row items-center">
              <q-icon name="favorite_border" color="grey-4" class="q-mr-sm" size="18px" />
              <q-skeleton type="text" width="30px" />
            </div>
          </div> -->
        </q-item-section>
      </q-item>
    <q-separator vertical />
    <div class=" col">
      <div >
        <q-item >
          <!-- <q-item-section class="col-12" align="center"> -->
          <q-item-section class="col-12" >
            <q-skeleton width="200px" height="40px" />
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item >
          <!-- <q-item-section class="col-12" align="center"> -->
          <div class="row col-12"  >
            <div class="row col-2  items-center justify-center  " >
              <q-skeleton width="100px" height="40px" />
                   
              
            </div>
            
            
          </div>
        </q-item>

        <q-separator inset />
        <q-item  class >
          <div class="row col-12">
            <div class="col-2" > <q-skeleton width="100px" /></div>
             <div class="col-10 col-lg-10 "  ></div>
             
            <div >
              
              <div class="">
                <ul class="row" style="list-style-type:none;padding-left:0px;">
                  <li><q-skeleton type="circle" size="60px" /> </li>
                </ul>
              </div>
            </div>
            
            <div  class="col-12" >
                <div class="col-2" > <q-skeleton width="100px" /></div>
             <div class="col-10 col-lg-10 "  ></div>
              <div class="">
                <ul class="row" style="list-style-type:none;padding-left:0px;">
                  <li><q-skeleton type="circle" size="60px" /></li>
                  <!-- v-bind:style= "[condition_1 ? condition_2 ? {styleA} : {styleB} : {styleC}]" -->
                </ul>
              </div>
            </div>
            
          </div>
        </q-item>
        <!-- <q-item v-if="varyantname.length<1">
          <div class="row col-12">
            <div class="col" style="text-transform: unset">Bu Ürün Geçici Bir Süre Stoklarımızda Bulunmamaktadır...</div>
          </div>
        </q-item> -->
        <q-item>
        <div class="row">
          <q-item-section class="col" >
                    <div class="col q-pb-md" style="text-transform: unset"><q-skeleton width="80px" /></div>
                        <q-skeleton width="130px" height="60px" />
                    </q-item-section>
        </div>
        </q-item>
        <q-separator inset />
        <!-- <q-icon name="shopping_cart" /> -->
                 <div class=" q-pa-md q-mt-lg q-mb-lg text-center row q-gutter-md" align="center">
                    <!-- <div  class="  text-h6 " >...{Ürün-Açıklaması...}...</div> -->
                    <!-- <q-btn push size="lg" class="bg-pink-12 text-white text-h5" icon="shopping_cart"  no-caps>Sipariş Ver </q-btn> -->
                    
                    <!-- <q-btn  size="lg" class="col-4  q-ma-xs"   color="pink-12"  rounded no-caps><q-icon name="shopping_cart"  style="font-size: 24px;" />  Sepete Ekle </q-btn> -->
                <q-skeleton type="QChip" width="60px"  height="50px"/>
                <q-skeleton type="QChip" width="240px"  height="50px"/>
                <q-skeleton type="QChip" width="60px"  height="50px"/>
                </div>
        
      </div>
      </div>

    </q-card>
  
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>