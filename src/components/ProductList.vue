<template>
    <v-container>
        <v-row>
            <v-col
            v-for="(device, i) in devices"
            :key="i">
                <product-card :device="device"></product-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import { useDeviceStore } from '../store.js'
import ProductCard from './ProductCard.vue'

export default defineComponent({
  components: { ProductCard },
    computed: {
        devices() {
            const deviceStore = useDeviceStore()
            return deviceStore.devices
        }
    }
})
</script>
