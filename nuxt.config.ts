import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    ssr: false,
    app: {
        head: {
            title: '爱惠家 Web 端',
            meta: [{name: 'naive-ui-style'}]
        }
    },
    nitro: {
      devProxy: {
          '/api': {
              target: 'https://smartcommunityserver.meishutech.com/',
              changeOrigin: true,
              prependPath: true
          }
      }
    },
    modules: ['@pinia/nuxt'],
    plugins: [{src: '~/plugins/naive-ui.ts', mode: "client"}],
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    'naive-ui',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer'
                ]
                : ['@juggle/resize-observer']
    },
    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                    : []
        }
    },
    css: [
        'vfonts/Lato.css',
        'vfonts/FiraCode.css',
        '~/assets/styles/main.css',
        '~/assets/styles/preflight.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
