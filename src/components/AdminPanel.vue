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
                <th class="text-left">
                Email пользователя
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
                <td>{{ getUserEmail(order.userId) }}</td>
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
            const userOrderStore = useOrderStore()
            return userOrderStore.orders
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
        },
        getUserEmail(id) {
            const userStore = useUserStore()
            return userStore.users.find(item => item.id === id).email
        }
    }
})
</script>