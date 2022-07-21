import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../services/Auth";
import { fetchUser } from "../services/Database";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>([]);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchUser(user, setUserInfo);
  }, [user]);

  const name = userInfo.flatMap(({ name }) => name);

  return (
    <>
      <div id="navbar" className="w-full absolute top-0 h-18 z-20 bg-black">
        <div
          className={`max-w-6xl mx-auto flex flex-col sm:flex-row justify-between sm:items-center py-4 px-4`}
        >
          {user?.email ? (
            <>
              <div className="mb-4 sm:mb-0 text-2xl text-white">
                <Link to="/">VÄLKOMMEN {name}</Link>
              </div>
              <div className="flex">
                <button
                  className="px-4 py-2 mr-2 bg-green-200"
                  onClick={() => navigate("/myMovies")}
                >
                  Mina filmer
                </button>
                <button
                  className="px-4 py-2 mr-2 bg-green-200"
                  onClick={() => navigate("/myProfile")}
                >
                  Profil
                </button>
                <button
                  className="px-4 py-2 mr-2 bg-green-200"
                  onClick={() => navigate("/friendPage")}
                >
                  Vänner
                </button>
                <button
                  className="px-4 py-2 bg-green-200"
                  onClick={() => handleLogOut()}
                >
                  Logga ut
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 sm:mb-0 text-2xl text-white">
                <Link to="/">VÄLKOMMEN</Link>
              </div>
              <div>
                <button
                  className="px-4 py-2 mr-2 bg-green-200"
                  onClick={() => navigate("/signIn")}
                >
                  Logga in
                </button>
                <button
                  className="px-4 py-2 bg-green-200"
                  onClick={() => navigate("/signUp")}
                >
                  Registrera
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
