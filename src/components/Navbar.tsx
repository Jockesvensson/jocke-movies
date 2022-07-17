import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../services/Auth";
import { fetchUserName } from "../services/Database";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchUserName(user, setName);
  },[user])

  return (
    <>
      <div className="w-full absolute top-0 h-18 z-20 bg-black">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
          {user?.email ? (
            <>
              <div className="text-2xl text-white">
                <Link to="/">VÄLKOMMEN {name}</Link>
              </div>
              <div>
                <button
                  className="px-4 py-2 mr-2 bg-green-200"
                  onClick={() => navigate('/userPage')}
                >
                  Mitt konto
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
              <div className="text-2xl text-white">
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
