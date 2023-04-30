<template>
    <v-container>
        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                Название
                </th>
                <th class="text-left">
                Цена
                </th>
                <th class="text-left">
                Количество
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="device in devices"
                :key="device.id"
            >
                <td class="text-left">{{ device.device.name }}</td>
                <td class="text-left">{{ device.device.price }}</td>
                <td class="text-left">
                    <v-row>
                        <div class="ma-1">{{ device.count }}</div>
                        <v-btn
                         :disabled="!isIncrementPossibility"
                         density="compact"
                         icon="mdi-plus"
                         class="mx-2"
                         @click="increment(device)"></v-btn>
                        <v-btn
                         :disabled="!isDecrementPossibility"
                         density="compact" 
                         icon="mdi-minus" 
                         class="mx-2"
                         @click="decrement(device)"></v-btn>
                         <v-btn
                         density="compact" 
                         icon="mdi-trash-can" 
                         class="mx-2"
                         @click="drop(device)"></v-btn>
                    </v-row>
                </td>
            </tr>
            </tbody>
        </v-table>
        <v-card>
            <v-card-title>Итог: {{ getTotalPrice }}</v-card-title>
            <v-card-actions>
                <v-btn 
                    color='primary'
                    variant='flat'
                    @click="createOrder"
                >Сделать заказ</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { HTTP } from '../axios.js'
import { useOrderStore, useUserStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            isIncrementPossibility: true,
            isDecrementPossibility: true
        }
    },
    computed: {
        devices() {
            const userOrderStore = useOrderStore()
            return userOrderStore.devices.values()
        },
        getTotalPrice() {
            var result = 0
            const userOrderStore = useOrderStore()
            const arr = Array.from(userOrderStore.devices.values());
            arr.forEach(element => {
                result += element.count * element.device.price
            });
            return result
        }
    },
    methods: {
        createOrder() {
            const userStore = useUserStore()
            const userOrderStore = useOrderStore()
            var orderDevices = []
            const arr = Array.from(userOrderStore.devices.values());
            arr.forEach(item => {
                orderDevices.push({
                    deviceId: item.device.id,
                    count: item.count
                })
            })
            const request = {
                number: Math.floor(Math.random() * (1000) + 1),
                userId: userStore.id,
                orderDevices: orderDevices
            }
            console.log()
            HTTP.post('/order', request).then(response => console.log(response.data))
        },
        increment(device) {
            const userOrderStore = useOrderStore()
            device.count++
            this.isDecrementPossibility = true
            if (device.count === userOrderStore.devices.get(device.device.id).device.count) {
                this.isIncrementPossibility = false
            }

        },
        decrement(device) {
            device.count--
            this.isIncrementPossibility = true
            if (device.count === 1) {
                this.isDecrementPossibility = false
            }
        },
        drop(device) {
            const userOrderStore = useOrderStore()
            userOrderStore.devices.delete(device.device.id)
        }
    }
})
</script>
