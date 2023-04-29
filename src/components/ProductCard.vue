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
                <v-btn color="primary">
                Добавить в корзину
            </v-btn>
            <v-btn color="primary">
                Добавить в сравнение
            </v-btn>
            </v-col>
        </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        device: Object
    },
    methods: {
    
    }
})
</script>
