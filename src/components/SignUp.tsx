import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../services/Auth";
import CloseIcon from "@mui/icons-material/Close";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUpUser = () => {
    registerWithEmailAndPassword(name, email, password);
    setEmail("");
    setPassword("");
    setName("");
    navigate("/");
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
    </div>
  );
};

export default SignUp;
