import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ratingArrayFunction } from "../helpers/helper";
import { auth } from "../services/Auth";
import { fetchUser, getAcceptedFriendRequests, getUserMovies } from "../services/Database";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditProfile from "../components/EditProfile";
import StatisticsInformation from "../components/StatisticsInformation";

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [highestValue, setHighestValue] = useState<number>(0);
  const [highestRating, setHighestRating] = useState<string>("");
  const [sorted, setSorted] = useState<any[]>([]);
  const [completedRatingArray, setCompletedRatingArray] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<any>(
    "https://via.placeholder.com/2000"
  );
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptedFriends, setAcceptedFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchUser(user, setUserInfo);
    if (user?.photoURL) {
      setPhotoUrl(user?.photoURL);
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;
    getUserMovies(user, setMovies);
    getAcceptedFriendRequests(user, setAcceptedFriends);
  }, [user, loading]);

  useEffect(() => {
    ratingArrayFunction(
      movies,
      setSorted,
      setCompletedRatingArray,
      setHighestValue,
      setHighestRating,
      setAverageRating
    );
  }, [movies]);

  const handleEdit = () => {
    setEditUser(true);
  };

  const name = userInfo.flatMap(({ name }) => name);
  const favMovie = userInfo.flatMap(({ favoriteMovie }) => favoriteMovie);

  return (
    <div className="mt-24 mb-12">
      <div className="relative max-w-6xl mx-auto mt-8 px-4">
        {editUser && (
          <EditProfile
            user={user}
            userInfo={userInfo}
            photo={photo}
            setPhoto={setPhoto}
            loading={loading}
            setLoading={setLoading}
            setEditUser={setEditUser}
          />
        )}
        <div className="flex">
          <img className="w-60 h-80" src={photoUrl} alt="profilbild" />
          <div className="ml-4">
            <div className="my-2">
              <ModeEditIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleEdit()}
              />
            </div>
            <div className="text-2xl font-semibold">
              Namn: <span className="text-xl font-normal">{name}</span>
            </div>
            <div className="text-2xl font-semibold my-2">
              Favoritfilm hittills:{" "}
              {favMovie ? (
                <span className="text-xl font-normal">{favMovie}</span>
              ) : null}
            </div>
            <div className="text-2xl font-semibold my-2">
              Antal filmer betygsatta:{" "}
              <span className="text-xl font-normal">{movies.length} st</span>
            </div>
            <div className="flex items-center text-2xl font-semibold my-2">
              Snittbetyg:{" "}
              <StarOutlineIcon
                sx={{ fontSize: 30, color: "rgb(87, 153, 239)" }}
              />
              <span className="text-xl font-normal">
                {averageRating ? averageRating.toFixed(2) : 0}
              </span>
            </div>
            <div className="text-2xl font-semibold">Antal vänner: <span className="text-xl font-normal">{acceptedFriends.length}</span></div>
          </div>
        </div>
        <StatisticsInformation movies={movies}/>
      </div>
    </div>
  );
};

export default ProfilePage;
