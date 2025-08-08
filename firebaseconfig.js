// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-storage.js";

const firebaseConfig = {
apiKey: "AIzaSyCo8bAkuexM6HEsv8yUBeqzbObG3gz6Mqg",
authDomain: "nichecommunity-99429.firebaseapp.com",
projectId: "nichecommunity-99429",
storageBucket: "nichecommunity-99429.firebasestorage.app",
messagingSenderId: "279519848760",
appId: "1:279519848760:web:4cae7aa6e7f8530a4bf9cd",
measurementId: "G-S858ZSPPYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const db=getFirestore(app)
const storage = getStorage(app);

export{auth,db,storage}