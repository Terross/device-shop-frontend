<template>
    <v-container>
        <v-card
        class="mx-auto"
        max-width="400">
            <v-img
            height="300"
            weight="300"
            class="align-end text-white"
            :src="require('../assets/' + device.id + '.jpg')"
            cover></v-img>
        <v-card-title>{{device.name}}</v-card-title>
        <v-card-text>
            <div>Цена: {{ device.price }}</div>
            <div>Осталось: {{ device.count }}</div>
            <div>Изготовитель: {{ device.producer }}</div>
        </v-card-text>
        <v-card-actions>
            <v-col>
            <v-btn
                 color="primary"
                 @click="addToCart">
                Добавить в корзину
            </v-btn>
            <v-btn
             color="primary"
             @click="addToComparison"
             :disabled="!isComparisonEmpty">
                Добавить в сравнение
            </v-btn>
            </v-col>
        </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { useComporationStore, useOrderStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        device: Object
    },
    methods: {
        addToCart() {
            const orderStore = useOrderStore()
            const count = orderStore.devices.has(this.device.id) ? orderStore.devices.get(this.device.id) : 0
            orderStore.devices.set(this.device.id, {
                count: count + 1,
                device: this.device
            })
        },
        addToComparison() {
            const comparisonStore = useComporationStore()
            if (comparisonStore.firstDevice === null) {
                comparisonStore.firstDevice = this.device
            } else if (comparisonStore.secondDevice === null) {
                comparisonStore.secondDevice = this.device
            }
        }
    },
    computed: {
        isComparisonEmpty() {
            const comparisonStore = useComporationStore()
            if (comparisonStore.firstDevice === null || comparisonStore.secondDevice === null) {
                return true
            } else {
                return false
            }
        }
    }
})
</script>
