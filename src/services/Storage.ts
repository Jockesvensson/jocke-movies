import { updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase.config"

const upload = async (userPhoto, user) => {
    const fileRef = ref(storage, user.uid + '.png');
    // setLoading(true);
    const snapshot = await uploadBytes(fileRef, userPhoto);
    await getDownloadURL(fileRef).then((url) => {
        updateProfile(user, {photoURL: url})
    })
    // setLoading(false);
}

export {
    upload
}