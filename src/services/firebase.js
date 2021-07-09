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

export async function signup(email, password) {
    try {
    const newUser = await auth.createUserWithEmailAndPassword(email, password);
    console.log(newUser);
    return newUser;
    }
    catch (e) {
        console.log(e)
    }
}

export async function signin(email, password) {
    try {
        const user = auth.signInWithEmailAndPassword(email, password);
        return user;
    }
    catch (e) {
        console.log(e);
    }
}

function logout() {

}

export default {signup, signin};