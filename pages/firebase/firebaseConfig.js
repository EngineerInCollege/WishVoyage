import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-pZpSwQE57H4xx2AtAxMbs5RAD05Pr-k",
  authDomain: "wishvoyage-67808.firebaseapp.com",
  projectId: "wishvoyage-67808",
  storageBucket: "wishvoyage-67808.appspot.com",
  messagingSenderId: "1092691808243",
  appId: "1:1092691808243:web:076baf145730fb75cfcc86"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export only auth

export function writeUserData(userId, name, email, recentSearch) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);

  // Check if items is an array before filtering
  const filteredItems = Array.isArray(recentSearch) ? recentSearch.filter(recentSearch => recentSearch !== undefined) : [];

  set(reference, {
    username: name,
    email: email,
    items: filteredItems
  });
}
