<template>
  <div class="q-pa-xl q-gutter-y-md ">
    <!-- <script
      type="application/javascript"
      src="https://apis.google.com/js/client:platform.js"
      async defer
    ></script> -->
    <!-- {{date.formatDate(Date.now(), 'DD-MM-YYYY')}} -->
    <!-- {{ moment(Date.now()).format("DD-MM-YYYY") }} -->
    <!-- <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js" async defer></script>
    <script type="application/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js" async defer></script> -->
    <div class="q-pa-md" id="embed-api-auth-container" hidden></div>
    <div class="row q-gutter-x-md">
    <q-card class="col-6 justify-center">
      <q-card-section class="col-12"><div class=" text-center">
          <div class="text-h5 ">Ziyaret Eden Kişi Sayısı</div>
          
        </div>
      </q-card-section >
       <div class="col-12 scale-down " id="chart-2-container"></div>
    </q-card>
    <q-card class="col">
      <q-card-section><div class="row text-center">
          <div class="text-h5 col">Ziyaret Eden Şehir</div>
          
        </div>
        </q-card-section>
      <div class="fill" id="chart-1-container"></div>
    </q-card>
    </div>
    <div class="row q-gutter-x-md">
    <q-card class="col-6"> 
      <q-card-section><div class="row text-center">
          <div class="text-h5 col">Ziyaret Eden Cihaz</div>
          
        </div>
        </q-card-section>
      <div class="fill" id="chart-3-container"></div>
      </q-card>
    <!-- <div id="chart-4-container"></div> -->
    <q-card class="col">
      <q-card-section><div class="row text-center">
          <div class="text-h5 col">Ziyaret Edilen Sayfa</div>
          
        </div>
        </q-card-section>
       <div class="fill" id="chart-5-container"></div>
       </q-card>
       </div>
    <!-- <div id="view-selector-1-container"></div> -->
    <!-- <div id="view-selector-2-container"></div> -->
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
      CLIENT_ID:
        "292336428402-bjonvu2cdpenmphs6v492o9vtib1gj0n.apps.googleusercontent.com",
      VIEW_ID: "230918950",
      SCOPES: "https://www.googleapis.com/auth/analytics.readonly",
    };
  },

  async mounted() {
    await this.getapi();
  },

  methods: {
    async getapi() {
      await this.queryReports();
    },
    async queryReports() {
      gapi.analytics.ready(function () {
        /**
         * Authorize the user immediately if the user has already granted access.
         * If no access has been created, render an authorize button inside the
         * element with the ID "embed-api-auth-container".
         */
        gapi.analytics.auth.authorize({
          container: document.getElementById("embed-api-auth-container"),
          clientid:
            "292336428402-bjonvu2cdpenmphs6v492o9vtib1gj0n.apps.googleusercontent.com",
        });

        //       var viewSelector1 = new gapi.analytics.ViewSelector({
        //   container: 'view-selector-1-container'
        // });

        /**
         * Create a ViewSelector for the second view to be rendered inside of an
         * element with the id "view-selector-2-container".
         */

        // Render both view selectors to the page.
        // viewSelector1.execute();
        // viewSelector2.execute();

        /**
         * Create the first DataChart for top countries over the past 30 days.
         * It will be rendered inside an element with the id "chart-1-container".
         */
        var dataChart1 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:230918950",
            metrics: "ga:sessions",
            dimensions: "ga:city",
            "start-date": "30daysAgo",
            "end-date": "0daysAgo",
            "max-results": 8,
            sort: "-ga:sessions",
          },
          chart: {
            container: "chart-1-container",
            type: "PIE",
            options: {
              width: "100%",
              pieHole: 4 / 9,
            },
          },
        });
        

        /**
         * Create the second DataChart for top countries over the past 30 days.
         * It will be rendered inside an element with the id "chart-2-container".
         */
        var dataChart2 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:230918950",
            metrics: "ga:sessions",
            dimensions: "ga:date",
            "start-date": "30daysAgo",
            "end-date": "0daysAgo",
          },
          chart: {
            container: "chart-2-container",
            type: "LINE",
            options: {
              width: "100%",
            },
          },
        });
        var dataChart3 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:230918950",
            metrics: "ga:sessions",
            dimensions: "ga:deviceCategory",
            "start-date": "30daysAgo",
            "end-date": "0daysAgo",
          },
          chart: {
            container: "chart-3-container",
            type: "PIE",
            options: {
              width: "100%",
            },
          },
        });
        // var dataChart4 = new gapi.analytics.googleCharts.DataChart({
        //   query: {
        //     ids:'ga:230918950',
        //     metrics: 'ga:sessions',
        //     dimensions: 'ga:deviceCategory',
        //     'start-date': '30daysAgo',
        //     'end-date': '0daysAgo'
        //   },
        //   chart: {
        //     container: 'chart-4-container',
        //     type: 'TABLE',
        //     options: {
        //       width: '100%'
        //     }
        //   }
        // });
        var dataChart5 = new gapi.analytics.googleCharts.DataChart({
          query: {
            ids: "ga:230918950",
            metrics: "ga:pageviews",
            dimensions: "ga:pagePath",
            "start-date": "30daysAgo",
            "end-date": "0daysAgo",
          },
          chart: {
            container: "chart-5-container",
            type: "TABLE",
            options: {
              width: "100%",
            },
          },
        });

        dataChart1.set().execute();
        dataChart2.set().execute();
        dataChart3.set().execute();
        // dataChart4.set().execute();
        dataChart5.set().execute();
        /**
         * Update the first dataChart when the first view selecter is changed.
         */
        // viewSelector1.on('change', function(ids) {
        //   // console.log(ids);
        //   // dataChart1.set({query: {ids: ids}}).execute();
        //   // dataChart2.set({query: {ids: ids}}).execute();
        // });

        /**
         * Update the second dataChart when the second view selecter is changed.
         */
        // viewSelector2.on('change', function(ids) {
        //   dataChart2.set({query: {ids: ids}}).execute();
        // });
      });
    },
    // displayResults(response) {
    //   console.log(response);
    //   var formattedJson = JSON.stringify(response.result, null, 2);
    //   document.getElementById("query-output").value = formattedJson;
    // },
    //    queryReports();
  },
};
</script>

<style lang="scss" scoped>
</style>