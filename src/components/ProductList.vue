<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Соритровка</v-card-title>
                    <v-card-actions>
                        <v-combobox
                        v-model="sortField"
                        :items="sortFields"
                        label="Поле для сортировки"
                    ></v-combobox>
                    <v-combobox
                        v-model="sortDirection"
                        :items="sortDirections"
                        label="Направление для сортировки"
                    ></v-combobox>
                    </v-card-actions>
                </v-card>
                <v-card>
                    <v-card-title>Фильтрация</v-card-title>
                    <v-card-actions>
                        <v-combobox
                        v-model="deviceType"
                        :items="deviceTypes"
                        label="Тип товара"
                    ></v-combobox>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        
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
import { HTTP } from '../axios.js'

export default defineComponent({
    data() {
        return {
            sortFields: ["Название","Цена"],
            sortField: "Название",
            sortDirections: ["По возрастанию", "По убыванию"],
            sortDirection: "По возрастанию",
            deviceTypes: ["Все", "Мышь", "Телефон", "Монитор", "Клавиатура"],
            deviceType: "Все"
        }
    },
    components: { ProductCard },
    computed: {
        devices() {
            const deviceStore = useDeviceStore()
            const deviceList = deviceStore.devices.filter(item => {
                const originalDeviceType = this.getDeviceType()
                if (originalDeviceType === 'ALL') {
                    return true
                }
                return item.type === originalDeviceType
            })
            return this.sortProducts(deviceList)
        }
    },
    beforeMount() {
        const deviceStore = useDeviceStore();
        HTTP.get('/device', { headers: {'USER-TOKEN': 'token'} })
            .then(response => {
                deviceStore.devices = response.data
            })
    },
    methods: {
        sortProducts(deviceList) {
            if (this.sortField === "Название") {
                return deviceList.sort((a, b) => {
                    const nameA = a.name.toUpperCase()
                    const nameB = b.name.toUpperCase()
                    var result = 0
                    if (nameA < nameB) {
                        result = -1
                    }
                    if (nameA > nameB) {
                        result =  1
                    }
                    if (this.sortDirection === "По убыванию") {
                        return -result
                    }
                    // names must be equal
                    return result;
                })
            } else {
                return deviceList.sort((a, b) => {
                    var result = a.price - b.price
                    
                    if (this.sortDirection === "По убыванию") {
                        return -result
                    }
                    // names must be equal
                    return result;
                })
            }
        },
        getDeviceType() {
            switch(this.deviceType) {
                case 'Мышь': return 'MOUSE'
                case 'Телефон': return 'PHONE'
                case 'Монитор': return 'MONITOR'
                case 'Клавиатура': return 'KEYBOARD'
                default: return "ALL"
            }
        }
    }
})
</script>
