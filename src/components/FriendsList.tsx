import React, { useEffect, useState } from "react";
import { removeAcceptedFriends } from "../services/Database";

const FriendsList = ({ users, user, acceptedFriends }) => {
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const [acceptedFriendsUid, setAcceptedFriendssUid] = useState<any[]>([]);
  const [newUserArr, setNewUSerArr] = useState<any[]>([]);
  const [accpetedFriendsId, setAcceptedFriendsId] = useState<any[]>([]);
  const [newUsersArrSorted, setNewUsersArrSorted] = useState<any[]>([]);
  const [acceptedFriendsSorted, setAcceptedFriendsSorted] = useState<any[]>([]);

  useEffect(() => {
    setNewUsers(users);
    setAcceptedFriendssUid(acceptedFriends);
    const acceptedFriendsUids = acceptedFriends.map((item) => item.owner);
    setAcceptedFriendsId(acceptedFriendsUids);
  }, [acceptedFriends]);

  useEffect(() => {
    setNewUSerArr(
      newUsers.filter((item) => accpetedFriendsId.includes(item.uid))
    );
  }, [newUsers, accpetedFriendsId]);

  useEffect(() => {
    setNewUsersArrSorted(newUserArr.sort((a, b) => (a.uid > b.uid ? 1 : -1)));
    setAcceptedFriendsSorted(
      acceptedFriendsUid.sort((a, b) => (a.owner > b.owner ? 1 : -1))
    );
  }, [newUserArr]);

  const handleRemoveFriend = (item, index) => {
    removeAcceptedFriends(acceptedFriends[index].id);
  };

  return (
    <div>
      {newUsersArrSorted.map((item, index) => (
        <div className="flex items-center my-4" key={item.uid}>
          <div className="mr-4 text-xl font-semibold capitalize">
            {item.name}
          </div>
          {/* <button
          className="px-4 py-2 mr-2 bg-green-200"
          onClick={() => handleAcceptFriendRequest(item)}
        >
          Acceptera vänförfrågan
        </button> */}
          <button
            className="px-4 py-2 bg-green-200"
            onClick={() => handleRemoveFriend(item, index)}
          >
            Ta bort vän
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
