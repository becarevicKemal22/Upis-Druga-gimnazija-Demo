import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './style.css'

import { initializeApp } from "firebase/app";


// Production config
// const firebaseConfig = {
//     apiKey: "AIzaSyBIL216DUwoowJS03h9IhgbnPBGB0WVSbU",
//     authDomain: "upis-druga-gimnazija-sarajevo.firebaseapp.com",
//     projectId: "upis-druga-gimnazija-sarajevo",
//     storageBucket: "upis-druga-gimnazija-sarajevo.appspot.com",
//     messagingSenderId: "850617679154",
//     appId: "1:850617679154:web:ca69a33fd15fd9892beb2b",
//     databaseURL: "https://upis-druga-gimnazija-sarajevo-default-rtdb.europe-west1.firebasedatabase.app/",
// };

// Dev config
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
