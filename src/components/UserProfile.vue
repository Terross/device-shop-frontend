<template>
    <v-table>
            <thead>
            <tr>
                <th class="text-left">
                Номер заказа
                </th>
                <th class="text-left">
                Товары
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="order in orders"
                :key="order.id"
            >
                <td class="text-left">{{ order.number }}</td>
                <td class="text-left">
                    <v-list lines="one">
                    <v-list-item
                        v-for="item in order.orderDevices"
                        :key="item.deviceId"
                        :title="getDevice(item.deviceId, item.count)"
                    ></v-list-item>
                    <v-list-item>Итог: {{ getOrderPrice(order) }}</v-list-item>
                    </v-list>
                </td>
            </tr>
            </tbody>
        </v-table>
</template>

<script>
import { useDeviceStore, useOrderStore, useUserStore } from '@/store.js'
import { defineComponent } from 'vue'
import { HTTP } from '../axios.js'

export default defineComponent({
    beforeMount() {
        const orderStore = useOrderStore()
        HTTP.get('/order')
            .then(response => {
                console.log(response)
                orderStore.orders = response.data
            })
    },
    computed: {
        orders() {
            const userStore = useUserStore()
            const userOrderStore = useOrderStore()
            return userOrderStore.orders.filter(item => item.userId === userStore.id)
        }
    },
    methods: {
        getDeviceById(id) {
            const deviceStore = useDeviceStore()
            return deviceStore.devices.find(item => item.id === id)
        },
        getDevice(id, count) {
            return this.getDeviceById(id).name + '(' + count + ')'
        },
        getOrderPrice(order) {
            var result = 0
            order.orderDevices.forEach(item => {
                result += this.getDeviceById(item.deviceId).price * item.count
            })
            return result
        }
    }
})
</script>
