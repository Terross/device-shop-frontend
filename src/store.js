import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        email: "",
        role: "",
        id: "",
        users: []
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
        devices: new Map(),
        orders: []
    })
})

export const useComporationStore = defineStore({
    id: 'comporation',
    state: () => ({
        firstDevice: null,
        secondDevice: null
    })
})
