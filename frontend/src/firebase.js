import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8YIoeasK1Rfn4CnLPa2Ze011VwnWZg0A",
  authDomain: "lead-manager-app-135f4.firebaseapp.com",
  projectId: "lead-manager-app-135f4",
  storageBucket: "lead-manager-app-135f4.firebasestorage.app",
  messagingSenderId: "462325498247",
  appId: "1:462325498247:web:b5292244e22f9609925322"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();