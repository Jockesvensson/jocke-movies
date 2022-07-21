import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut  } from "firebase/auth";
import { deleteDoc, doc, onSnapshot, updateDoc, collection, addDoc, where, query, getDocs, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config'

const usersRef = collection(db, "users");

const registerWithEmailAndPassword = async (name, email, password, favoriteMovie) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(usersRef, {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            favoriteMovie,
        });
    } catch (err) {
        console.error(err);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
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

const updateUser = async (newId, userName, favoriteMovie) => {
    await updateDoc(doc(usersRef, newId), {
        name: userName,
        favoriteMovie: favoriteMovie
    })
}

export {
    auth,
    db,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    sendPasswordReset,
    logout,
    updateUser,
}