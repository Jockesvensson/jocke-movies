import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/Auth";
import { updateUserMovie } from "../services/Database";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRating from "./StarRating";
import BigStar from "./BigStar";

const EditMovie = (props) => {
  const [user] = useAuthState(auth);
  const [newRating, setNewRating] = useState<number>(0);
  const [uploaded, setUploaded] = useState(Date);
  const [showBigStar, setShowBigStar] = useState<boolean>(false);
  const [newRatingError, setNewRatingError] = useState<boolean>(false);
  const [newUploadedError, setNewUploadedError] = useState<boolean>(false);

  useEffect(() => {
    setNewRating(props.movie.newRating);
    setUploaded(props.movie.uploaded);
  }, []);

  const handleEditMovie = (id) => {
    updateUserMovie(id, newRating + 1, uploaded);
    props.setShowEditMovie(false);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-gray-300">
      {showBigStar && (
        <BigStar newRating={newRating}/>
      )}
      <div className="text-2xl mb-2">Uppdatera filmen och spara</div>
      <div className="flex justify-center">
        <StarRating newRating={newRating} setNewRating={setNewRating} setShowBigStar={setShowBigStar} showBigStar={showBigStar} setNewRatingError={setNewRatingError} setNewUploadedError={setNewUploadedError}/>
      </div>
      <form className="flex flex-col">
        <input
          className="p-3 my-2 bg-gray-700 rounded text-white"
          type="date"
          placeholder="Uppladdat..."
          value={uploaded}
          onChange={(e) => setUploaded(e.target.value)}
        />
      </form>
      <button
        className="w-full px-4 py-2 my-2 bg-green-200"
        onClick={() => handleEditMovie(props.movie.id)}
      >
        Uppdatera film
      </button>
      <button
        className="w-full px-4 py-2 my-2 bg-green-200"
        onClick={() => props.setShowEditMovie(false)}
      >
        Avbryt
      </button>
    </div>
  );
};

export default EditMovie;
