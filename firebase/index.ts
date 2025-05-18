import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCTLchsxs0Kwn7mts5_KqdUjwsiITu6Ews",
  authDomain: "quiz-cce28.firebaseapp.com",
  projectId: "quiz-cce28",
  storageBucket: "quiz-cce28.firebasestorage.app",
  messagingSenderId: "858559444831",
  appId: "1:858559444831:web:26ab0f151094f9002de8ea"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}