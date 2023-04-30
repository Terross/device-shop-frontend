<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        density="compact"
      >
        <v-btn
         icon="mdi-format-list-bulleted"
         v-if="isAuthorized"
         @click="toDeviceList"></v-btn>
        <v-app-bar-title>Device-shop</v-app-bar-title>
        <v-btn
         icon="mdi-cart"
         v-if="isAuthorized"
         @click="toCart"></v-btn>
        <v-btn
         icon="mdi-compare"
         v-if="isAuthorized"
         @click="toComparison"></v-btn>
        <v-btn
         icon="mdi-shield-crown"
         v-if="isAdmin && isAuthorized"
         @click="toAdminPanel"></v-btn>
        <v-btn
         icon="mdi-face-man-profile"
         v-if="!isAdmin && isAuthorized"
         @click="toProfile"></v-btn>
        <v-btn
         icon="mdi-logout"
         v-if="isAuthorized"
         @click="logOut"></v-btn>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { useUserStore } from './store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  beforeMount() {
    const userStore = useUserStore()
    if (userStore.email === "") {
      this.$router.replace('/sign-in')
    } else {
      this.$router.replace('/devices')
    }
  },
  computed: {
    isAuthorized() {
      const userStore = useUserStore()
      return userStore.email !== ""
    },
    isAdmin() {
      const userStore = useUserStore()
      return userStore.role === "ADMIN"
    }
  },
  methods: {
    toDeviceList() {
      this.$router.replace('/devices')
    },
    toComparison() {
      this.$router.replace('/comparison')
    },
    toCart() {
      this.$router.replace('/order')
    },
    toProfile() {
      this.$router.replace('/profile')
    },
    toAdminPanel() {
      this.$router.replace('/admin')
    },
    logOut() {
      const userStore = useUserStore()
      userStore.email = ""
      this.$router.replace('/sign-in')
    }
  }
})
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
