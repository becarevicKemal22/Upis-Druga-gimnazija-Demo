import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './style.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBtPxtxSE5UIgueQC8JewNMdCuykERicJM",
    authDomain: "upis-druga-gimnazija-cb2fd.firebaseapp.com",
    projectId: "upis-druga-gimnazija-cb2fd",
    storageBucket: "upis-druga-gimnazija-cb2fd.appspot.com",
    messagingSenderId: "515214066052",
    appId: "1:515214066052:web:e3120d70928db95666ddd1",
    databaseURL: "https://upis-druga-gimnazija-cb2fd-default-rtdb.europe-west1.firebasedatabase.app/",
}

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount('#app');
