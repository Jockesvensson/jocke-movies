import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, updateUser } from "../services/Auth";
import { fetchUser } from "../services/Database";
import { upload } from "../services/Storage";

const EditProfile = (props) => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<any>([]);

  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [favoriteMovie, setFavoriteMovie] = useState<string>("");
  const [newId, setNewId] = useState<string>("");

  const handleUpload = () => {
    setNewId(userInfo.flatMap(({ id }) => id));
    updateUser(newId, userName, favoriteMovie);
    upload(userPhoto, user);
    props.setEditUser(false);
  };

  useEffect(() => {
    fetchUser(user, setUserInfo);
    props.setPhoto(userPhoto);
    setUserName(userName);
    setFavoriteMovie(favoriteMovie);

    const userInformation = props.userInfo[Object.keys(props.userInfo)[0]];
    setNewId(userInformation.id);
    setUserName(userInformation.name);
    setFavoriteMovie(userInformation.favoriteMovie);
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setUserPhoto(e.target.files[0]);
    }
  };

  const cancelEditProfile = () => {
    props.setEditUser(false);
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-gray-300">
      <div className="flex flex-col">
        <input
          className="my-2"
          type="file"
          onChange={(e) => handleChange(e)}
          accept=""
        />
        <input
          className="p-3 my-2 bg-gray-700 rounded text-white"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="p-3 my-2 bg-gray-700 rounded text-white"
          type="text"
          value={favoriteMovie ? favoriteMovie : ""}
          onChange={(e) => setFavoriteMovie(e.target.value)}
        />
        <button
          className="px-4 py-2 my-2 bg-green-200"
          disabled={props.loading}
          onClick={() => handleUpload()}
        >
          Spara
        </button>
        <button
          className="px-4 py-2 my-2 bg-green-200"
          disabled={props.loading}
          onClick={() => cancelEditProfile()}
        >
          Avbryt
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
