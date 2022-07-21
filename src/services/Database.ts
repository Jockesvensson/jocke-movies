import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut  } from "firebase/auth";
import { deleteDoc, doc, onSnapshot, updateDoc, collection, addDoc, where, query, getDocs, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config'

const usersRef = collection(db, "users");
const moviesRef = collection(db, "movies");
const pendingFriendsRef = collection(db, "pendingFriends");
const acceptedFriendsRef = collection(db, "acceptedFriends");

const fetchUser = async (user, setUserInfo) => {
    try {
        const q = query(usersRef, where("uid", "==", user?.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => {
            users.push({id: doc.id, ...doc.data()});
        });
        setUserInfo(users);
        });
        return unsubscribe;
    } catch (err) {
        // console.log(err);
    }
}

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
        // console.log(err);
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

const getAllUsers = async (setUsers, name) => {
    try {
        const q = query(usersRef, where("name", "!=", name));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        setUsers(users);
        });
        return unsubscribe;
    } catch (err) {
        console.log(err);
    }
}

const sendFriendRequest = async (item, user) => {
    await addDoc(pendingFriendsRef, {
        createdAt: Timestamp.fromDate(new Date()),
        owner: user.uid,
        pendingFriendRequest: item.uid,
    })
}

const getPendingFriendRequests = async (user, setPendingFriends) => {
    try {
        const q = query(pendingFriendsRef, where("owner", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const pendingFriendRequests: any = [];
        querySnapshot.forEach((doc) => {
            pendingFriendRequests.push({id: doc.id, ...doc.data()});
        });
        setPendingFriends(pendingFriendRequests);
        });
        return unsubscribe;
    } catch (err) {
        console.log(err);
    }
}

const getFriendRequests = async (user, setFriendRequests) => {
    try {
        const q = query(pendingFriendsRef, where("pendingFriendRequest", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const friendRequests: any = [];
        querySnapshot.forEach((doc) => {
            friendRequests.push({id: doc.id, ...doc.data()});
        });
        setFriendRequests(friendRequests);
        });
        return unsubscribe;
    } catch (err) {
        console.log(err);
    }
}

const removeFrindRequests = async (id: string) => {
    await deleteDoc(doc(pendingFriendsRef, id));
}

const acceptFriendRequests = async (item, user) => {
    await addDoc(acceptedFriendsRef, {
        createdAt: Timestamp.fromDate(new Date()),
        owner: user.uid,
        acceptedFriend: item.uid,
    })
}

const getAcceptedFriendRequests = async (user, setAcceptedFriends) => {
    try {
        const q = query(acceptedFriendsRef, where("acceptedFriend", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const accpetedFriendRequests: any = [];
        querySnapshot.forEach((doc) => {
            accpetedFriendRequests.push({id: doc.id, ...doc.data()});
        });
        setAcceptedFriends(accpetedFriendRequests);
        });
        return unsubscribe;
    } catch (err) {
        console.log(err);
    }
}

const removeAcceptedFriends = async (id: string) => {
    await deleteDoc(doc(acceptedFriendsRef, id));
}


export {
    fetchUser,
    fetchUserName,
    addMovieToUser,
    getUserMovies,
    deleteUserMovie,
    updateUserMovie,
    getAllUsers,
    sendFriendRequest,
    getPendingFriendRequests,
    getFriendRequests,
    removeFrindRequests,
    acceptFriendRequests,
    getAcceptedFriendRequests,
    removeAcceptedFriends
};