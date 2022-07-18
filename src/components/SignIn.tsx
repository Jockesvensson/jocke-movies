import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../services/Auth";

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
    <div className="w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 xsm:p-12 bg-gray-300">
        <div className="text-2xl">Fyll i nedan uppgifter</div>
        <form className="flex flex-col" onSubmit={handleSignIn}>
          <input
            className="w-64 xsm:w-72 p-3 my-2 bg-gray-700 rounded text-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-64 xsm:w-72 p-3 my-2 bg-gray-700 rounded text-white"
            type="password"
            placeholder="Lösenord"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          className="w-full p-3 my-2 bg-green-200 rounded"
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
