import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        email: "",
        role: ""
    })
})

export const useDeviceStore = defineStore({
    id: 'device',
    state: () => ({
        devices: []
    })
})

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        
    })
})