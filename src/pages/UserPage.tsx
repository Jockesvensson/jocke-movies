import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import SingelUserMovie from "../components/SingelUserMovie";
import { auth } from "../services/Auth";
import { getUserMovies } from "../services/Database";

const UserPage = () => {
  const [user, loading] = useAuthState(auth);
  const [movies, setMovies] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getUserMovies(user, setMovies);
  }, [user, loading, navigate]);

  return (
    <div className="mt-24 mb-12">
      <SingelUserMovie movies={movies} />
    </div>
  );
};

export default UserPage;
