<template>
    <div class="row col-12 q-pt-xl q-pb-xl justify-center">
        <!-- <q-card  style="width: 500px; max-width: 80vw;">
            <q-card-section class="row justify-center">
                <div class="text-h6 ">Sipariş Tamamlandı</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-gutter-md">
                
                <div class="row text-h5 justify-center" > siparişiniz oluşturuldu. </div>
                
                
            </q-card-section>
                <q-separator/>
            <q-card-section  class="text-center">
            </q-card-section>
        </q-card> -->
        
        <div class="col-12 q-pt-md text-center">
            <!-- <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
        </svg> -->
            <!-- <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#27AE60" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <polyline class="path check" fill="none" stroke="#27AE60" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg> -->
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <line class=" line" fill="none"   stroke-linecap="round" stroke-miterlimit="10" x1="6" y1="7" x2="95.8" y2="92.3" /> 
            <!-- x1="4.4" y1="7.9" x2="95.8" y2="92.3" -->
            <!-- <line class=" line" fill="none"   stroke-linecap="round" stroke-miterlimit="10" x1="4.4"  y1="47" x2="45"  y2="8"/> -->
            </svg>  
        </div>
        
        <div class=" col-10 q-pt-xl text-h5 text-weight-medium">Ödemeniz çeşitli nedenlerden dolayı GERÇEKLEŞTİRİLEMEMİŞTİR, lütfen kart bilgilerinizi veya kart limitinizi kontrol ediniz!
        </div>
    </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";
import { mapGetters } from "vuex";
import { Loading } from "quasar";
    export default {
        data() {
            return {
                
            }
        },
        
        mounted () {
            // this.$store.dispatch('credit_card',false);
            // console.log(localstorage.getItem('satirList'))
            //  this.start()
        },
        methods: {
            async start() {
            },
        },
    }
</script>

<style lang="scss" scoped>

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 4;
  stroke-miterlimit: 10;
  stroke: #ff4081;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.line {
    stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  stroke-width: 4;
  stroke: #ff4081;
    -webkit-animation: stroke .6s .35s ease-in-out forwards;
    animation: stroke .6s .35s ease-in-out forwards;
  }
.checkmark {
  width: 156px;
  height: 156px;
  border-radius: 50%;
  display: block;
  stroke-width: 4;
  stroke: #ff4081;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #fff;
  animation: fill .4s ease-in-out .1s forwards, scale .3s ease-in-out .9s both;
}

// .checkmark__check {
//   transform-origin: 50% 50%;
//   stroke-dasharray: 48;
//   stroke-dashoffset: 48;
//   stroke-linecap: round;
//   stroke-linejoin: round;
//   animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
// }

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.3, 1.3, 0.2);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 80px #fff;
  }
}
</style>