import { createApp } from 'vue'

import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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
    theme: {
        defaultTheme: 'mainTheme',
        themes: {
            mainTheme
        }
    }
})

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
