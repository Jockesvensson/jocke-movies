import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../services/Auth";

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
    <div className="w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-gray-300">
        <div className="text-2xl">Fyll i nedan uppgifter</div>
        <form className="flex flex-col" onSubmit={handleSignUpUser}>
          <input
            className="w-72 p-3 my-2 bg-gray-700 rounded text-white"
            type="text"
            placeholder="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-72 p-3 my-2 bg-gray-700 rounded text-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-72 p-3 my-2 bg-gray-700 rounded text-white"
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          className="w-full p-3 my-2 bg-green-200 rounded"
          onClick={() => handleSignUpUser()}
        >
          Registrera
        </button>
        <div className="mt-4">
          Har du redan ett kontot?{" "}
          <Link className="underline" to="/signIn">
            Klicka här
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
