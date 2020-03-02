<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import {Loading} from 'quasar'
export default {
  name: 'App',
  created() {
    axios.interceptors.request.use((config) => {
      Loading.show()
      return config;
    }, (error) => {
      Loading.hide()
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      Loading.hide()
      return response;
    }, (error) => {
      Loading.hide()
      return Promise.reject(error);
    });
  }
}
</script>
