import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://'+ process.env.API +':4000'
}))