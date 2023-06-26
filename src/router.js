import {createRouter, createWebHashHistory} from "vue-router";
import MainView from "@/views/MainView.vue";
import AnketaView from '@/views/AnketaView.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainView,
        },
        {
            path: '/Upis-Druga-gimnazija-Sarajevo/',
            name: 'mainDeploy',
            component: MainView,
        },
        {
            path: '/Upis-Druga-gimnazija-Sarajevo/generacijaAnkete/',
            name: 'generacijaAnketeDeploy',
            component: MainView,
        },
        {
            path: '/generacijaAnkete/',
            name: 'generacijaAnkete',
            component: AnketaView,
        }
    ]
})

export default router;