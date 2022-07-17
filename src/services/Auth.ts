import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut  } from "firebase/auth";
import { deleteDoc, doc, onSnapshot, updateDoc, collection, addDoc, where, query, getDocs, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config'

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        console.log(user);
    } catch (err) {
        console.error(err);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log(auth);
    } catch (err) {
        console.error(err);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (err) {
        console.error(err);
    }
};

const logout = () => {
    signOut(auth);
};


export {
    auth,
    db,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    sendPasswordReset,
    logout,
}