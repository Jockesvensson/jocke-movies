import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut  } from "firebase/auth";
import { deleteDoc, doc, onSnapshot, updateDoc, collection, addDoc, where, query, getDocs, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config'

const usersRef = collection(db, "users");
const moviesRef = collection(db, "movies");

const fetchUserName = async (user, setName) => {
    try {
        const q = query(usersRef, where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
    } catch (err) {
        console.log(err);
    }
}

const addMovieToUser = async (name, thumb_url, newRating, user, uploaded) => {
    await addDoc(moviesRef, {
        name: name,
        thumb_url: thumb_url,
        newRating: newRating,
        uploaded: uploaded,
        createdAt: Timestamp.fromDate(new Date()),
        owner: user.uid,
    })
}

const getUserMovies = async (user, setMovies) => {
    try {
        const q = query(moviesRef, where("owner", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const movies: any = [];
        querySnapshot.forEach((doc) => {
            movies.push({id: doc.id, ...doc.data()});
        });
        setMovies(movies);
        });
        return unsubscribe;
    } catch (err) {
        console.log(err);
    }
}

const deleteUserMovie = async (id: string) => {
    await deleteDoc(doc(moviesRef, id));
}

const updateUserMovie = async (id, newRating, uploaded) => {
    await updateDoc(doc(moviesRef, id), {
        newRating: newRating,
        uploaded: uploaded
    })
}

export {
    fetchUserName, 
    addMovieToUser,
    getUserMovies,
    deleteUserMovie,
    updateUserMovie
};