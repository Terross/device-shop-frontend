<template>
    <v-container>
        <v-row>
            <v-card
            v-if="firstDevice !== null"
            class="mx-auto"
            max-width="400">
            <v-img
            height="300"
            weight="300"
            class="align-end text-white"
            :src="require('../assets/' + firstDevice.id + '.jpg')"
            cover></v-img>
            <v-card-title>{{firstDevice.name}}</v-card-title>
            <v-card-text>
                <div>Цена: {{ firstDevice.price }}</div>
                <div>Осталось: {{ firstDevice.count }}</div>
                <div>Изготовитель: {{ firstDevice.producer }}</div>
                <div v-if="firstDevice.type === 'HEADPHONES'">
                    <div>Тип: {{ firstDevice.constructionType }}</div>
                    <div>{{ firstDevice.wireless ? 'Беспроводные' : 'Проводные'}}</div>
                    <div>{{ firstDevice.withMicrophone ? 'С микрофоном' : 'Без микрофона'}}</div>
                </div>
                <div v-if="firstDevice.type === 'MOUSE'">
                    <div>Количество кнопок: {{ firstDevice.keyCount }}</div>
                    <div>DPI: {{ firstDevice.dpi}}</div>
                    <div>{{ firstDevice.wireless ? 'Беспроводная' : 'Проводная'}}</div>
                </div>
                <div v-if="firstDevice.type === 'KEYBOARD'">
                    <div>Тип: {{ firstDevice.keyType }}</div>
                    <div>{{ firstDevice.rgb ? 'RGB' : 'Без RGB'}}</div>
                </div>
                <div v-if="firstDevice.type === 'PHONE'">
                    <div>Диагональ: {{ firstDevice.screenDiagonal }}</div>
                    <div>RAM: {{ firstDevice.ram}}</div>
                    <div>Операционная система: {{ firstDevice.operationSystem}}</div>
                </div>
                <div v-if="firstDevice.type === 'MONITOR'">
                    <div>Разрешение: {{ firstDevice.resolution }}</div>
                    <div>Тип матрицы: {{ firstDevice.matrixType}}</div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-col>
                <v-btn
                    color="primary"
                    @click="removeFirstFromComparison">
                    Убрать из сравнения
                </v-btn>
                </v-col>
            </v-card-actions>
            </v-card>
            <v-card
                v-if="secondDevice !== null"
                class="mx-auto"
                max-width="400">
                <v-img
                height="300"
                weight="300"
                class="align-end text-white"
                :src="require('../assets/' + secondDevice.id + '.jpg')"
                cover></v-img>
            <v-card-title>{{secondDevice.name}}</v-card-title>
            <v-card-text>
                <div>Цена: {{ secondDevice.price }}</div>
                <div>Осталось: {{ secondDevice.count }}</div>
                <div>Изготовитель: {{ secondDevice.producer }}</div>
                <div v-if="secondDevice.type === 'HEADPHONES'">
                    <div>Тип: {{ secondDevice.constructionType }}</div>
                    <div>{{ secondDevice.wireless ? 'Беспроводные' : 'Проводные'}}</div>
                    <div>{{ secondDevice.withMicrophone ? 'С микрофоном' : 'Без микрофона'}}</div>
                </div>
                <div v-if="secondDevice.type === 'MOUSE'">
                    <div>Количество кнопок: {{ secondDevice.keyCount }}</div>
                    <div>DPI: {{ secondDevice.dpi}}</div>
                    <div>{{ secondDevice.wireless ? 'Беспроводная' : 'Проводная'}}</div>
                </div>
                <div v-if="secondDevice.type === 'KEYBOARD'">
                    <div>Тип: {{ secondDevice.keyType }}</div>
                    <div>{{ secondDevice.rgb ? 'RGB' : 'Без RGB'}}</div>
                </div>
                <div v-if="secondDevice.type === 'PHONE'">
                    <div>Диагональ: {{ secondDevice.screenDiagonal }}</div>
                    <div>RAM: {{ secondDevice.ram}}</div>
                    <div>Операционная система: {{ secondDevice.operationSystem}}</div>
                </div>
                <div v-if="secondDevice.type === 'MONITOR'">
                    <div>Разрешение: {{ secondDevice.resolution }}</div>
                    <div>Тип матрицы: {{ secondDevice.matrixType}}</div>
                </div>

            </v-card-text>
            <v-card-actions>
                <v-col>
                <v-btn
                    color="primary"
                    @click="removeSecondFromComparison">
                    Убрать из сравнения
                </v-btn>
                </v-col>
            </v-card-actions>
            </v-card>
        </v-row>
        
    </v-container>
</template>

<script>
import { useComporationStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        firstDevice() {
            const comparisonStore = useComporationStore()
            return comparisonStore.firstDevice
        },
        secondDevice() {
            const comparisonStore = useComporationStore()
            return comparisonStore.secondDevice
        }
    },
    methods: {
        removeFirstFromComparison() {
            const comparisonStore = useComporationStore()
            comparisonStore.firstDevice = null
        },
        removeSecondFromComparison() {
            const comparisonStore = useComporationStore()
            comparisonStore.secondDevice = null
        }
    }
})
</script>
