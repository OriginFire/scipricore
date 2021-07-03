import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDC43rlj46FeIzXAcfAdojV78rEKCdY1Do",
    authDomain: "scipricore.firebaseapp.com",
    projectId: "scipricore",
    storageBucket: "scipricore.appspot.com",
    messagingSenderId: "999098740448",
    appId: "1:999098740448:web:50562b7b850f1f0c74aa85"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.EmailAuthProvider();

async function signup(email, password) {
    try {
    const newUser = await auth.createUserWithEmailAndPassword(email, password);
    console.log("New User created!", newUser);
    }
    catch (e) {
        console.log(e)
    }
}

function signin() {
    auth.Auth.signInWithEmailAndPassword()
}

function logout() {

}

export default signup;