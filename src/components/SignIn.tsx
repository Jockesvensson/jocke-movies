import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../services/Auth";
import CloseIcon from "@mui/icons-material/Close";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const handleSignIn = () => {
    logInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative w-full h-screen">
      <div className="z-30 absolute top-0 left-0 right-0 bottom-0 xsm:z-0 xsm:top-1/2 xsm:left-1/2 xsm:bottom-auto xsm:right-auto xsm:-translate-x-1/2 xsm:-translate-y-1/2 p-6 xsm:p-12 bg-gray-300">
        <div className="absolute top-4 right-4 xsm:hidden">
          <CloseIcon
            sx={{ fontSize: 40, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="mb-4 text-2xl font-semibold">Logga in</div>
        <form className="flex flex-col" onSubmit={handleSignIn}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          className="w-full xsm:w-72 p-3 my-2 bg-green-200 rounded"
          onClick={() => handleSignIn()}
        >
          Logga in
        </button>
        <div className="mt-4">
          Har du glömt ditt lösenord?{" "}
          <Link className="underline" to="/ForgotPassword">
            Klicka här
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
