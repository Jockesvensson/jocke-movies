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
  const [newRating, setNewRating] = useState<number>(-1);
  const [uploaded, setUploaded] = useState<string>("");
  const [showBigStar, setShowBigStar] = useState<boolean>(false);
  const [newRatingError, setNewRatingError] = useState<boolean>(false);
  const [newUploadedError, setNewUploadedError] = useState<boolean>(false);

  const addNewMovie = () => {
    if (newRating === -1) {
      setNewRatingError(true);
    }
    if (!uploaded) {
      setNewUploadedError(true);
    } else if (newRating >= 0 && uploaded) {
      addMovieToUser(
        props.name,
        props.thumb_url,
        newRating + 1,
        user,
        uploaded
      );
      props.setShowAddMovie(false);
      navigate("/userPage");
      setNewRatingError(false);
      setNewUploadedError(false);
    }
  };

  const handleCancel = () => {
    props.setShowAddMovie(false);
    setNewRating(-1);
    setNewRatingError(false);
    setNewUploadedError(false);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-gray-300">
      {showBigStar && <BigStar newRating={newRating} />}
      <div className="text-2xl mb-2">Fyll i betyg och spara</div>
      <div className="flex justify-center">
        <StarRating
          newRating={newRating}
          setNewRating={setNewRating}
          setShowBigStar={setShowBigStar}
          showBigStar={showBigStar}
          setNewRatingError={setNewRatingError}
          setNewUploadedError={setNewUploadedError}
        />
      </div>
      {newRatingError && (
        <div className="italic text-red-500">Vänligen fyll i ett betyg</div>
      )}
      <form className="flex flex-col">
        <input
          className="p-3 my-2 bg-gray-700 rounded text-white"
          type="date"
          placeholder="Uppladdat..."
          onChange={(e) => setUploaded(e.target.value)}
          value={uploaded}
        />
      </form>
      {newUploadedError && (
        <div className="italic text-red-500">Vänligen välj ett datum</div>
      )}
      <button
        className="w-full px-4 py-2 my-2 bg-green-200"
        onClick={() => addNewMovie()}
      >
        Spara
      </button>
      <button
        className="w-full px-4 py-2 my-2 bg-green-200"
        onClick={() => handleCancel()}
      >
        Avbryt
      </button>
    </div>
  );
};

export default AddMovie;
