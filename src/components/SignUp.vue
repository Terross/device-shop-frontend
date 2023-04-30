<template>
    <v-container>
        <v-card>
            <v-card-title>Регистрация</v-card-title>
            <v-card-text>
                <v-container>
                    <v-col>
                        <v-text-field
                            v-model="firstName"
                            label="Имя"
                            required
                            variant="outlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="lastName"
                            label="Фамилия"
                            required
                            variant="outlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Пароль"
                            required
                            variant="outlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            label="Email"
                            required
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-container>
                    <v-btn
                        color='primary'
                        variant='flat'
                        @click="createAccount"
                    >
                        Зарегистрироваться
                    </v-btn>
                    <v-btn
                        color='primary'
                        variant='flat'
                        @click="logIn"
                    >
                        Войти. Аккаунт уже есть
                    </v-btn>
                </v-container>     
            </v-card-actions>
        </v-card>
    </v-container>
    
</template>

<script>
import { HTTP } from '../axios.js'
import { defineComponent } from "vue"
import { useUserStore } from '../store.js'

export default defineComponent({
    data() {
        return {
            firstName: "",
            lastName: "",
            password: "",
            email: ""
        }
    },
    components: {
    
    },
    methods: {
        createAccount() {
            const userStore = useUserStore()

            HTTP.post('/login/sign/up', {
                firstName: this.firstName,
                secondName: this.lastName,
                password: this.password,
                email: this.email
            })
            .then(response => {
                const data = response.data
                userStore.email = data.email
                userStore.role = data.userRole
                userStore.id = data.id
            })
            HTTP.get('/user')
            .then(response => {
                userStore.users = response.data
            })
            this.$router.replace('/devices')

        },
        logIn() {
            this.$router.push('/sign-in')
        }
    }
})
</script>

<style scoped>

</style>