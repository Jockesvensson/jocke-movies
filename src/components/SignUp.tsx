import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../services/Auth";
import CloseIcon from "@mui/icons-material/Close";
import { upload } from "../services/Storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUser } from "../services/Database";

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [favoriteMovie, setFavoriteMovie] = useState<string>("");
  const [registerUserInfo, setRegisterUserInfo] = useState<boolean>(true);
  const [registerUserPhoto, setRegisterUserPhoto] = useState<boolean>(false);
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [newId, setNewId] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUpUser = () => {
    registerWithEmailAndPassword(name, email, password, favoriteMovie);
    setEmail("");
    setPassword("");
    setName("");
    setFavoriteMovie("");
    setRegisterUserInfo(false);
    setRegisterUserPhoto(true);
  };

  useEffect(() => {
    fetchUser(user, setUserInfo);
    if(userInfo.length > 0) {
        const userInformation = userInfo[Object.keys(userInfo)[0]];
        setNewId(userInformation.id);
    }
  }, [user, userInfo]);

  const handleUpload = () => {
    setNewId(userInfo.flatMap(({ id }) => id));
    upload(userPhoto, user);
    setRegisterUserPhoto(false);
    navigate("/");
  };

  const cancelUpload = () => {
    setRegisterUserPhoto(false);
    navigate("/");
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setUserPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {registerUserInfo && (
        <div className="z-30 absolute top-0 left-0 right-0 bottom-0 xsm:z-0 xsm:top-1/2 xsm:left-1/2 xsm:bottom-auto xsm:right-auto xsm:-translate-x-1/2 xsm:-translate-y-1/2 p-6 xsm:p-12 bg-gray-300">
          <div className="absolute top-4 right-4 xsm:hidden">
            <CloseIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </div>
          <div className="mb-4 text-2xl font-semibold">Skapa konto</div>
          <form className="flex flex-col" onSubmit={handleSignUpUser}>
            <input
              className="w-full xsm:w-72 p-3 my-2 bg-gray-700 rounded text-white"
              type="text"
              placeholder="Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full xsm:w-72 p-3 my-2 bg-gray-700 rounded text-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full xsm:w-72 p-3 my-2 bg-gray-700 rounded text-white"
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full xsm:w-72 p-3 my-2 bg-gray-700 rounded text-white"
              type="text"
              placeholder="Favoritfilm"
              value={favoriteMovie}
              onChange={(e) => setFavoriteMovie(e.target.value)}
            />
          </form>
          <button
            className="w-full xsm:w-72 p-3 my-2 bg-green-200 rounded"
            onClick={() => handleSignUpUser()}
          >
            Registrera
          </button>
          <div className="mt-4">
            Har du redan ett konto?{" "}
            <Link className="underline" to="/signIn">
              Klicka här
            </Link>
          </div>
        </div>
      )}
      {registerUserPhoto && (
        <div className="z-30 absolute top-0 left-0 right-0 bottom-0 xsm:z-0 xsm:top-1/2 xsm:left-1/2 xsm:bottom-auto xsm:right-auto xsm:-translate-x-1/2 xsm:-translate-y-1/2 p-6 xsm:p-12 bg-gray-300">
          <div className="mb-4 text-2xl font-semibold">Vill du ladda upp en profilbild?</div>
          <div className="flex flex-col">
          <input
            className="my-2"
            type="file"
            onChange={(e) => handleChange(e)}
            accept=""
          />
          <button className="px-4 py-2 my-2 bg-green-200" onClick={() => handleUpload()}>
            Spara
          </button>
          <button className="px-4 py-2 mt-2 bg-green-200" onClick={() => cancelUpload()}>
            Kanske senare
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
