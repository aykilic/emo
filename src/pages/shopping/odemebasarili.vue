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
    </q-card>-->

    <div class="col-12 q-pt-md text-center">
      <!-- <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
      </svg>-->
      <!-- <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#27AE60" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <polyline class="path check" fill="none" stroke="#27AE60" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
      </svg>-->
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>

    <div
      class="q-pt-xl text-h5 text-weight-medium"
    >Ödemeniz başarıyla gerçekleştirilmiştir. En kısa sürede siparişiniz kargoya verilecektir.</div>
  </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";
import { mapGetters } from "vuex";
import { Loading } from "quasar";
export default {
  data() {
    return {};
  },
  ...mapGetters([
    "get_guid",
    "get_uid",
    "get_basketlist",
    "get_ubasketlist",
    "get_userdetaillists",
    "get_user",
    //-*-*-*-*--*-*---**-
    "get_satirList",
    "get_sipno",
    "get_userid",
    "get_siparisfis",
  ]),
  mounted() {
    // this.$store.dispatch('credit_card',false);
    // console.log(localstorage.getItem('satirList'))
    this.start();
  },
  methods: {
    async start() {
      
      let siparisfis = [];
      siparisfis.push(localStorage.getItem("siparisfis"));
      this.$apollo
        .mutate({
          mutation: gql`
            mutation siparisodemedurumupdate(
              $odemedurumlist: [odemedurumlistInput]
              $odemedurum: String
            ) {
              siparisodemedurumupdate(
                odemedurumlist: $odemedurumlist
                odemedurum: $odemedurum
              ) {
                _id
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            odemedurumlist: siparisfis,
            odemedurum: "Ödendi",
          },
        })
        .then(async (data) => {
          if (Number(localStorage.getItem("sipno"))) {
            Loading.show();
            await this.delete_basketsellproduct();

            await this.$apollo
              .mutate({
                mutation: gql`
                  mutation kartsendmail_mutation(
                    $sipno: Float
                    $username: String
                    $usermail: String
                  ) {
                    kartsendmail_mutation(
                      sipno: $sipno
                      username: $username
                      usermail: $usermail
                    ) {
                      _id
                    }
                  }
                `,
                variables: {
                  sipno: Number(localStorage.getItem("sipno")),
                  username: localStorage.getItem("userad"),
                  usermail: localStorage.getItem("useremail"),
                },
              })
              .then(async (data) => {
                console.log("odeme basarılı");
                // localStorage.removeItem("sipno");
                // localStorage.removeItem("userid");
                // localStorage.removeItem("userad");
                // localStorage.removeItem("useremail");
                // localStorage.removeItem("satirList");
                localStorage.removeItem("siparisfis");
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                }, 5000);

                Loading.hide();
              })
              .catch((err) => {
                console.log(err);
                Loading.hide();
              });
          }
        });

      //  console.log(Number(localStorage.getItem('sipno')))

    },
    async delete_basketsellproduct() {
      Loading.show();
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation delete_basketsellproduct($satirList: [satirListInput]) {
              delete_basketsellproduct(satirList: $satirList) {
                _id
              }
            }
          `,
          // loadingKey: 'loading',
          variables: {
            satirList: JSON.parse(localStorage.getItem("satirList")),
          },
        })
        .then(async (data) => {
          Loading.hide();
        })
        .catch((err) => {
          console.log(err);
          Loading.hide();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// svg {
//   width: 100px;
//   display: block;
//   margin: 40px auto 0;
// }

// .path {
//   stroke-dasharray: 1000;
//   stroke-dashoffset: 0;
//   &.circle {
//     -webkit-animation: dash 1.9s ease-in-out;
//     animation: dash 1.9s ease-in-out;
//   }
//   &.line {
//     stroke-dashoffset: 1000;
//     -webkit-animation: dash 1.9s .35s ease-in-out forwards;
//     animation: dash 1.9s .35s ease-in-out forwards;
//   }
//   &.check {
//     stroke-dashoffset: -100;
//     -webkit-animation: dash-check 1.9s .35s ease-in-out forwards;
//     animation: dash-check 1.9s .35s ease-in-out forwards;
//   }
// }
// @-webkit-keyframes dash {
//   0% {
//     stroke-dashoffset: 1000;
//   }
//   100% {
//     stroke-dashoffset: 0;
//   }
// }

// @keyframes dash {
//   0% {
//     stroke-dashoffset: 1000;
//   }
//   100% {
//     stroke-dashoffset: 0;
//   }
// }

// @-webkit-keyframes dash-check {
//   0% {
//     stroke-dashoffset: -100;
//   }
//   100% {
//     stroke-dashoffset: 900;
//   }
// }

// @keyframes dash-check {
//   0% {
//     stroke-dashoffset: -100;
//   }
//   100% {
//     stroke-dashoffset: 900;
//   }
// }
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 4;
  stroke-miterlimit: 10;
  stroke: #ff4081;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
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
  animation: fill 0.4s ease-in-out 0.1s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
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