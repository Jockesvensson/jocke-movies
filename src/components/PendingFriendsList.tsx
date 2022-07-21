import React, { useEffect, useState } from "react";

const PendingFriendsList = ({ users, user, pendingFriends }) => {
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const [pendingFriendsUid, setPendingFriendsUid] = useState<any[]>([]);
  const [newUserArr, setNewUSerArr] = useState<any[]>([]);
  const [pendingFriendsId, setPendingFriendsId] = useState<any[]>([]);

  useEffect(() => {
    setNewUsers(users);
    setPendingFriendsUid(pendingFriends);
    const pendingFriendsUids = pendingFriends.map(
      (item) => item.pendingFriendRequest
    );
    setPendingFriendsId(pendingFriendsUids);
  }, [pendingFriends]);

  useEffect(() => {
    setNewUSerArr(
      newUsers.filter((item) => pendingFriendsId.includes(item.uid))
    );
  }, [newUsers, pendingFriendsId]);

  return (
    <div>
      {newUserArr.map((item) => (
        <div className="flex items-center my-4" key={item.uid}>
          <div className="mr-4 text-xl font-semibold capitalize">{item.name}</div>
          <div>- väntar på svar...</div>
        </div>
      ))}
    </div>
  );
};

export default PendingFriendsList;
