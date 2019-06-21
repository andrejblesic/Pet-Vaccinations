import firebase from "firebase/app";
import firebaseui from "firebaseui";

//create firebase initialization object
const config = {
  apiKey: "AIzaSyCn3vjH1LTwp4U5zpgT_T0wZojIf3GV-iI",
  authDomain: "pet-vaccinations.firebaseapp.com",
  databaseURL: "https://pet-vaccinations.firebaseio.com",
  projectId: "pet-vaccinations",
  storageBucket: "pet-vaccinations.appspot.com",
  messagingSenderId: "519684415525"
};
firebase.initializeApp(config);

var uiConfig = {
  signInSuccessUrl: "/home",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export { ui };
export { uiConfig };
export default firebase;
