import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FindFriendsList from "../components/FindFriendsList";
import FriendsList from "../components/FriendsList";
import IncomingFriendRequests from "../components/IncomingFriendRequests";
import PendingFriendsList from "../components/PendingFriendsList";
import { auth } from "../services/Auth";
import {
  fetchUserName,
  getAcceptedFriendRequests,
  getAllUsers,
  getFriendRequests,
  getPendingFriendRequests,
} from "../services/Database";

const FriendPage = () => {
  const [showFriends, setShowFriends] = useState<boolean>(true);
  const [showFindFriends, setShowFindFriends] = useState<boolean>(false);
  const [showPendingFriends, setShowPendingFriends] = useState<boolean>(false);
  const [showIncomingFriendRequests, setShowIncomingFriendRequests] =
    useState<boolean>(false);
  const [pendingFriends, setPendingFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [acceptedFriends, setAcceptedFriends] = useState<any[]>([]);
  const [totalFindFriendsCount, setTotalFindFriendsCount] = useState<number>(0);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    if (loading) return;
    fetchUserName(user, setName);
    getAllUsers(setUsers, name);
    getPendingFriendRequests(user, setPendingFriends);
    getFriendRequests(user, setFriendRequests);
    getAcceptedFriendRequests(user, setAcceptedFriends);
    setTotalFindFriendsCount(
      users.length -
        acceptedFriends.length -
        friendRequests.length -
        pendingFriends.length
    );
  }, [user, loading, name]);

  const handleShowFriends = () => {
    setShowFriends(true);
    setShowFindFriends(false);
    setShowPendingFriends(false);
    setShowIncomingFriendRequests(false);
  };

  const handleShowFindFriends = () => {
    setShowFindFriends(true);
    setShowFriends(false);
    setShowPendingFriends(false);
    setShowIncomingFriendRequests(false);
  };

  const handleShowIncomingFriendRequests = () => {
    setShowIncomingFriendRequests(true);
    setShowPendingFriends(false);
    setShowFriends(false);
    setShowFindFriends(false);
  };

  const handleShowPendingFriends = () => {
    setShowPendingFriends(true);
    setShowFriends(false);
    setShowFindFriends(false);
    setShowIncomingFriendRequests(false);
  };

  return (
    <div className="mt-24 mb-12">
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <button
          className={
            showFriends
              ? "px-4 py-2 bg-green-200 border-2 border-green-200 mr-2"
              : "px-4 py-2 border-2 border-green-200 mr-2"
          }
          onClick={() => handleShowFriends()}
        >
          Mina vänner
          <span className="ml-1">({acceptedFriends.length})</span>
        </button>
        <button
          className={
            showFindFriends
              ? "px-4 py-2 bg-green-200 border-2 border-green-200 mr-2"
              : "px-4 py-2 border-2 border-green-200 mr-2"
          }
          onClick={() => handleShowFindFriends()}
        >
          Hitta vänner
          <span className="ml-1">({totalFindFriendsCount})</span>
        </button>
        <button
          className={
            showIncomingFriendRequests
              ? "px-4 py-2 bg-green-200 border-2 border-green-200 mr-2"
              : "px-4 py-2 border-2 border-green-200 mr-2"
          }
          onClick={() => handleShowIncomingFriendRequests()}
        >
          Vänförfrågningar
          <span className="ml-1">({friendRequests.length})</span>
        </button>
        <button
          className={
            showPendingFriends
              ? "px-4 py-2 bg-green-200 border-2 border-green-200"
              : "px-4 py-2 border-2 border-green-200"
          }
          onClick={() => handleShowPendingFriends()}
        >
          Skickade vänförfrågningar
          <span className="ml-1">({pendingFriends.length})</span>
        </button>
        <div className="mt-4">
          {showFriends && (
            <FriendsList
              users={users}
              user={user}
              acceptedFriends={acceptedFriends}
            />
          )}
          {showFindFriends && (
            <FindFriendsList
              name={name}
              users={users}
              user={user}
              pendingFriends={pendingFriends}
              acceptedFriends={acceptedFriends}
              friendRequests={friendRequests}
            />
          )}
          {showIncomingFriendRequests && (
            <IncomingFriendRequests
              users={users}
              user={user}
              friendRequests={friendRequests}
            />
          )}
          {showPendingFriends && (
            <PendingFriendsList
              users={users}
              user={user}
              pendingFriends={pendingFriends}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
