import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

const mainTheme = {
    dark: false,
    colors: {
        primary: '#4caf50',
        secondary: '#8bc34a',
        accent: '#cddc39',
        error: '#ff5722',
        warning: '#ffc107',
        info: '#3f51b5',
        success: '#009688'
        }
}

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        }
    },
    theme: {
        defaultTheme: 'mainTheme',
        themes: {
            mainTheme
        }
    }
})

const pinia = createPinia()
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
