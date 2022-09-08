// Firebase deps
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

var db;
console.log('')
export const initializeFirebase = () => {
    // if (!firebase.apps.length) {
    initializeApp({
        apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
        authDomain:process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
        measurementId: process.env.REACT_APP_FIRE_BASE_MEASUREMENT_ID,
    } );
    db = getFirestore();
}

export default db;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC19rpM70SQy7oXtx0TtlguuZsTNWm6PyE",
//   authDomain: "greens-cms-2080e.firebaseapp.com",
//   projectId: "greens-cms-2080e",
//   storageBucket: "greens-cms-2080e.appspot.com",
//   messagingSenderId: "1017973602576",
//   appId: "1:1017973602576:web:0ef553a88b5ab266a58d95",
//   measurementId: "G-VBY401Q2DD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);