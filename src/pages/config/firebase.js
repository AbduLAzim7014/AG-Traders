// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3SvBHjScSOpVZVunFfl5FGkfgFy4_Gzg",
  authDomain: "fir-login-e6316.firebaseapp.com",
  projectId: "fir-login-e6316",
  storageBucket: "fir-login-e6316.firebasestorage.app",
  messagingSenderId: "450144545427",
  appId: "1:450144545427:web:db5cd0072391235a4b3b66",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
