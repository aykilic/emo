// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
// const envparsers = require('./src/boot/envparser')
// const DotEnv = require('./node_modules/dotenv')
// const envparser = require('./src/boot/envparser')
module.exports = function (ctx) {
  // console.log(ctx)
  // console.info(process.env)
  // console.log(process.env)
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'i18n',
      'apollo',
      'axios',
      // 'jwt'
      // 'socket'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.styl'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
       
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons',
      'mdi-v4',
      // 'material-icons-outlined',
      // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
       iconSet: 'material-icons',
      
       iconSet:'mdi-v4',
      
      // Quasar icon set
      lang: 'tr', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [
        'QDialog'
      ],
      directives: [
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog',
        'Cookies',
      ],
      config: {
        loading: { /* Loading defaults */ },
        notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
      }
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      
      
      
      scopeHoisting: true,
      vueRouterMode: 'history', // available values: 'hash', 'history'
      showProgress: true,
      gzip: false,
      analyze: false,
      publicPath:ctx.dev
      ? '' :  'https://www.emosetekstil.com.tr/',
      // ? '' :  'http://www.emosetekstil.com.tr/',
      env: ctx.dev
    ? { // so on dev we'll have
      API: JSON.stringify('http://localhost:4000/graphql'),
      WAPI:JSON.stringify('ws://localhost:4000/graphql'),
      // JWT_SECRET:JSON.stringify('emose2-app3-jwt4')
    }
    : { // and on build (production):


      
      // API: JSON.stringify('https://34.71.100.141:443/graphql'),
      API: JSON.stringify('http://34.71.100.141/graphql'),
      
      // WAPI:JSON.stringify('ws://localhost'),
      
      // WAPI:JSON.stringify('wss://34.71.100.141:443/graphql'),
      WAPI:JSON.stringify('ws://34.71.100.141/graphql'),
      // JWT_SECRET:JSON.stringify('emose2-app3-jwt4')
    },
      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      // env:envparser(),
      extendWebpack (cfg) {
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
      // proxy: {
      //   // proxy all requests starting with /api to jsonplaceholder
      //   '/pos': {
      //     target: 'https://www.paytr.com/odeme/api/get-token',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/pos': 'https://www.paytr.com/odeme/api/get-token'
      //     }
      //   }
      // }
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Emose 1',
        short_name: 'Emose 2',
        description: 'gecelik',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          // {
          //   'src': 'statics/icons/icon-128x128.png',
          //   'sizes': '128x128',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-192x192.png',
          //   'sizes': '192x192',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-256x256.png',
          //   'sizes': '256x256',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-384x384.png',
          //   'sizes': '384x384',
          //   'type': 'image/png'
          // },
          // {
          //   'src': 'statics/icons/icon-512x512.png',
          //   'sizes': '512x512',
          //   'type': 'image/png'
          // }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'n'
    },


    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'gecelik'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
        // cfg.resolve.alias.env=path.resolve(__dirname,'./src/boot/helpers/env.js')
        // cfg.plugins.push(
        //   new webpack.ProvidePlugin({
        //     'env':'env'
        //   })
        // )
      },
      
    }
  }
  
}
