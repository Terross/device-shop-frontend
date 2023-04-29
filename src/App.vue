<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Device-shop</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-vuetify"></v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { useUserStore } from './store'
// import { mdiAccountAlertOutline } from '@mdi/js';

export default {
  name: 'App',
  components: {
 
  },
  beforeMount() {
    const userStore = useUserStore()
    if (userStore.email === "") {
      this.$router.replace('/sign-in')
    } else {
      this.$router.replace('/devices')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
