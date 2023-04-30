<template>
    <v-container>
        
        <v-card>
            <v-card-title>Вход</v-card-title>
            <v-card-text>
                <v-container>
                    <v-col>
                        <v-text-field
                            v-model="email"
                            label="Email"
                            required
                            variant="outlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Пароль"
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
                        @click="logIn"
                    >
                        Войти
                    </v-btn>
                    <v-btn
                        color='primary'
                        variant='flat'
                        @click="createAccount"
                    >
                        Зарегистрироваться
                    </v-btn>
                </v-container>     
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { defineComponent } from "vue"
import { HTTP } from '../axios.js'
import { useUserStore } from '../store.js'

export default defineComponent({
    data() {
        return {
            password: "",
            email: ""
        }
    },
    components: {
    
    },
    methods: {
        createAccount() {
            this.$router.replace('/sign-up')
        },
        logIn() {
            const userStore = useUserStore()
            HTTP.post('login/sign/in', {
                email: this.email,
                password: this.password
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
        }
    }
})
</script>


