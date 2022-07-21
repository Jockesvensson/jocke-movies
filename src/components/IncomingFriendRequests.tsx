import React, { useEffect, useState } from "react";
import {
  acceptFriendRequests,
  removeFrindRequests,
} from "../services/Database";

const IncomingFriendRequests = ({ users, user, friendRequests }) => {
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const [friendRequestsUid, setFriendRequestsUid] = useState<any[]>([]);
  const [newUserArr, setNewUserArr] = useState<any[]>([]);
  const [newUsersArrSorted, setNewUsersArrSorted] = useState<any[]>([]);
  const [friendRequestsId, setFriendRequestsId] = useState<any[]>([]);
  const [friendRequestsSorted, setFriendRequestsSorted] = useState<any[]>([]);

  useEffect(() => {
    setNewUsers(users);
    setFriendRequestsUid(friendRequests);
    const friendsRequestsUids = friendRequests.map((item) => item.owner);
    setFriendRequestsId(friendsRequestsUids);
  }, [friendRequests]);

  useEffect(() => {
    setNewUserArr(
      newUsers.filter((item) => friendRequestsId.includes(item.uid))
    );
  }, [newUsers, friendRequestsId]);

  useEffect(() => {
    setNewUsersArrSorted(newUserArr.sort((a, b) => (a.uid > b.uid ? 1 : -1)));
    setFriendRequestsSorted(
      friendRequestsUid.sort((a, b) => (a.owner > b.owner ? 1 : -1))
    );
  }, [newUserArr]);

  const handleAcceptFriendRequest = (item) => {
    acceptFriendRequests(user, item);
  };

  const removeFriendRequests = (item, index) => {
    removeFrindRequests(friendRequests[index].id);
  };

  return (
    <div>
      {newUsersArrSorted.map((item, index) => (
        <div className="flex items-center my-4" key={item.uid}>
          <div className="mr-4 text-xl font-semibold capitalize">
            {item.name}
          </div>
          <button
            className="px-4 py-2 mr-2 bg-green-200"
            onClick={() => {
              handleAcceptFriendRequest(item);
              removeFriendRequests(item, index);
            }}
          >
            Acceptera vänförfrågan
          </button>
          <button
            className="px-4 py-2 bg-green-200"
            onClick={() => removeFriendRequests(item, index)}
          >
            Avböj vänförfrågan
          </button>
        </div>
      ))}
    </div>
  );
};

export default IncomingFriendRequests;
