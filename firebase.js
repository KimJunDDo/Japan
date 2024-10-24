// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsz_mf1orksZdveqtOVFseBlnRNh2Ni9I",
  authDomain: "react-native-lyokosketch-app.firebaseapp.com",
  databaseURL: "https://react-native-lyokosketch-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-native-lyokosketch-app",
  storageBucket: "react-native-lyokosketch-app.appspot.com",
  messagingSenderId: "883770164618",
  appId: "1:883770164618:web:a33f909759c40fc2a07473"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Authentication 초기화
const auth = getAuth(app);

// Realtime Database 초기화
const database = getDatabase(app);

// Firestore 초기화
const firestore = getFirestore(app);

// 각각의 모듈 내보내기
export { auth, database, firestore };