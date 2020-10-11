<template>
  <div>
    <script
      type="application/javascript"
      src="https://apis.google.com/js/client:platform.js"
      async
      defer
    ></script>
    <!-- {{date.formatDate(Date.now(), 'DD-MM-YYYY')}} -->
    {{ moment(Date.now()).format("DD-MM-YYYY") }}
    <textarea cols="80" rows="20" id="query-output"></textarea>
    <!-- <div class="g-signin2" data-onsuccess="queryReports"></div> -->
    <div class="g-signin2" @click="queryReports"></div>
    <!-- <q-btn @click="getapi()"></q-btn> -->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import gql from "graphql-tag";
import { date } from "quasar";
import moment from "moment";
// moment.locale('tr');
export default {
  data() {
    return {
      moment: moment,
      CLIENT_ID: "292336428402-bjonvu2cdpenmphs6v492o9vtib1gj0n.apps.googleusercontent.com",
      VIEW_ID: "230918950",
      SCOPES: "https://www.googleapis.com/auth/analytics.readonly",
    };
  },

  async mounted() {},

  methods: {
    async getapi() {
      await this.queryReports();
    },
    async queryReports() {
    //   const gauthOption = {
    //     clientId: this.CLIENT_ID,
    //     scope: this.SCOPES,
    //   };
        //  await window.gapi.load('auth2', () => {
        // const auth2 = window.gapi.auth2.init({ client_id: this.CLIENT_ID });
        //  }).then(res=>{
        //      console.log(res);
        //  })
    //   await gapi.auth2.GoogleAuth({
    //     keyFile: "../../statics/gapi.json",
    //     scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    //   });
      await gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: this.VIEW_ID,
                dateRanges: [
                  {
                    startDate: "7daysAgo",
                    endDate: "today",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:sessions",
                  },
                ],
              },
            ],
          },
        })
        // .then(this.displayResults(), console.error.bind(console));
        .then(a=>{
          this.displayResults(a)
        },console.error.bind(console));
    },
    displayResults(response) {
      console.log(response);
      var formattedJson = JSON.stringify(response.result, null, 2);
      document.getElementById("query-output").value = formattedJson;
    },
    //    queryReports();
  },
};
</script>

<style lang="scss" scoped>
</style>