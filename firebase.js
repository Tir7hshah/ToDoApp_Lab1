// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyD48-A5TJd4MxkL9fjqduI8NmPMDAi1Wg8",
    authDomain: "lab-2-for-mad.firebaseapp.com",
    databaseURL: "https://lab-2-for-mad-default-rtdb.firebaseio.com",
    projectId: "lab-2-for-mad",
    storageBucket: "lab-2-for-mad.appspot.com",
    messagingSenderId: "189831389114",
    appId: "1:189831389114:web:6dd14332f7103e7b280783"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
