import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './style.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDEfRY2QcKS-a0aD5Sivs5IRRrB4jm8RTc",
    authDomain: "upis-druga-gimnazija-demo.firebaseapp.com",
    projectId: "upis-druga-gimnazija-demo",
    storageBucket: "upis-druga-gimnazija-demo.appspot.com",
    messagingSenderId: "923547074040",
    appId: "1:923547074040:web:470ad78e6cc64b09b5ea0d",
    databaseURL: "https://upis-druga-gimnazija-demo-default-rtdb.europe-west1.firebasedatabase.app"
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount('#app');
