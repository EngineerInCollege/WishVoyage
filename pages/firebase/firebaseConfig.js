
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-pZpSwQE57H4xx2AtAxMbs5RAD05Pr-k",
  authDomain: "wishvoyage-67808.firebaseapp.com",
  projectId: "wishvoyage-67808",
  storageBucket: "wishvoyage-67808.appspot.com",
  messagingSenderId: "1092691808243",
  appId: "1:1092691808243:web:076baf145730fb75cfcc86"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;