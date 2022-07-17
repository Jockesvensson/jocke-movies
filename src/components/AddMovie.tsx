import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/Auth";
import { addMovieToUser } from "../services/Database";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import BigStar from "./BigStar";

const AddMovie = (props) => {
    const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [newRating, setNewRating] = useState<number>(0);
  const [uploaded, setUploaded] = useState(Date);
  const [showBigStar, setShowBigStar] = useState<boolean>(false);

  const addNewMovie = () => {
    addMovieToUser(props.name, props.thumb_url, newRating + 1, user, uploaded);
    props.setShowAddMovie(false);
    navigate('/userPage');
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-gray-300">
      {showBigStar && (
        <BigStar newRating={newRating}/>
      )}
      <div className="text-2xl mb-2">Fyll i betyg och lägg till film</div>
      <div className="flex justify-center">
        <StarRating newRating={newRating} setNewRating={setNewRating} setShowBigStar={setShowBigStar} showBigStar={showBigStar} />
      </div>
      <form className="flex flex-col">
        <input
          className="p-3 my-2 bg-gray-700 rounded text-white"
          type="date"
          placeholder="Uppladdat..."
          onChange={(e) => setUploaded(e.target.value)}
          value={uploaded}
        />
      </form>
      <button
        className="w-full px-4 py-2 my-2 bg-green-200"
        onClick={() => addNewMovie()}
      >
        Lägg till film
      </button>
      <button
        className="w-full px-4 py-2 my-2 bg-green-200"
        onClick={() => props.setShowAddMovie(false)}
      >
        Avbryt
      </button>
    </div>
  );
};

export default AddMovie;
