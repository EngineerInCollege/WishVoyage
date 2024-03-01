import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

/* This code sets up a Firebase app and exports it as a default module. It initializes the
* Firebase app, the authentication, and database services using Firebase's modular SDK. The
* writeUserData function is defined to write user data to the Firebase Realtime Database. It
* takes user information such as the user ID, name, email, and recent search history as parameters
* and stores them under the user's ID node in the database. The fetchRecentSearches function is
* defined to retrieve recent searches for a given user ID from the database. It returns the
* recent searches if they exist, otherwise returns null. The module exports the auth service
* for authentication purposes.
*/

const firebaseConfig = {
  apiKey: "AIzaSyC-pZpSwQE57H4xx2AtAxMbs5RAD05Pr-k",
  authDomain: "wishvoyage-67808.firebaseapp.com",
  projectId: "wishvoyage-67808",
  storageBucket: "wishvoyage-67808.appspot.com",
  messagingSenderId: "1092691808243",
  appId: "1:1092691808243:web:076baf145730fb75cfcc86"
};

const app = initializeApp(firebaseConfig);
export default app;
const auth = getAuth(app);
const db = getDatabase();

export { auth }; // Export only auth

export async function writeUserData(userId, name, email, recentSearch) {
  const reference = ref(db, 'users/' + userId);

  // Check if recentSearch is an array before filtering
  const filteredRecentSearch = Array.isArray(recentSearch) ? recentSearch.filter(item => item !== undefined) : [];

  try {
    await set(reference, {
      username: name,
      email: email,
      recentSearch: filteredRecentSearch // Change items to recentSearch
    });
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export const fetchRecentSearches = async (userId) => {
  try {
    const snapshot = await get(ref(db, `users/${userId}/recentSearches`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return null;
  }
};


