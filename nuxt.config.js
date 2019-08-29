export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      },
      // { rel: 'stylesheet', href: '/styles/style.css' },
      { rel: 'stylesheet', href: '/fonts/feather/style.css' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        type: 'text/javascript'
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://apis.google.com/js/platform.js',
        type: 'text/javascript'
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js',
        type: 'text/javascript'
      }
    ]
  },
  env: {
    googleClientID: "769165313432-rq98o9410ntrgg2obvkhl86k82bueoq0.apps.googleusercontent.com",
    facebookAppID: "2310649132486818"
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.css', '~/assets/styles/transitions.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/',
    { src: '~/plugins/fb-sdk.js', mode: 'client' },
    { src: '~/plugins/vuex-persist', ssr: true },
    {src: '~/plugins/apollo.config.js', mode: 'client'},
    {src: '~/plugins/apollo-overrides.js', mode: 'client'},
    { src: '~/plugins/vuelidate', mode: 'client' },
    { src: '~/plugins/lazyload', mode: 'client' },
    { src: '~plugins/filters.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/toast'
  ],

  axios: {
    baseURL: 'https://api.equilibra.test.natterbase.com'
  },

  bootstrapVue: {
    bootstrapCSS: true,
    bootstrapVueCSS: false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    vendor: ['vuelidate']
  },
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.config.js'
    }
  },
  toast: {
    position: 'top-right',
    className: 'toast',
    duration: 5000,
    register: [
      // Register custom toasts
      {
        name: 'error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      },
      {
        name: 'success',
        message: 'Oops...Something went wrong',
        options: {
          type: 'success'
        }
      },
      {
        name: 'notification',
        message: 'Oops...Something went wrong',
        options: {
          type: 'info'
        }
      }
    ]
  }
};
