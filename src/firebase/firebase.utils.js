import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAp9u8vNvLke2ibdAdOKAU1bqSL1k6DdE8",
  authDomain: "reactclothapp.firebaseapp.com",
  databaseURL: "https://reactclothapp.firebaseio.com",
  projectId: "reactclothapp",
  storageBucket: "reactclothapp.appspot.com",
  messagingSenderId: "333146205037",
  appId: "1:333146205037:web:92362a668d484cd74a8864",
  measurementId: "G-7WYC2Y93DJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
