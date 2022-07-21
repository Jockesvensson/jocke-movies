import React, { useEffect, useState } from "react";
import { storage } from "../firebase.config";
import { fetchUser, sendFriendRequest } from "../services/Database";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const FindFriendsList = ({
  name,
  users,
  user,
  pendingFriends,
  acceptedFriends,
  friendRequests,
}) => {
  const [url, setUrl] = useState<any>([]);
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const [pendingFriendsUid, setPendingFriendsUid] = useState<any[]>([]);
  const [friendRequestsUidUid, setFriendRequestsUid] = useState<any[]>([]);
  const [acceptedFriendsUid, setAcceptedFriendssUid] = useState<any[]>([]);
  const [newUserArr, setNewUSerArr] = useState<any[]>([]);
  const [newUserArrr, setNewUSerArrr] = useState<any[]>([]);
  const [newUserArrrr, setNewUSerArrrr] = useState<any[]>([]);

  const [pendingFriendsId, setPendingFriendsId] = useState<any[]>([]);
  const [accpetedFriendsId, setAcceptedFriendsId] = useState<any[]>([]);
  const [friendRequestsId, setFriendRequestsId] = useState<any[]>([]);

  useEffect(() => {
    setNewUsers(users);
    setPendingFriendsUid(pendingFriends);
    setFriendRequestsUid(friendRequests);
    setAcceptedFriendssUid(acceptedFriends);
    const pendingFriendsUids = pendingFriends.map(
      (item) => item.pendingFriendRequest
    );
    setPendingFriendsId(pendingFriendsUids);
    const friendsRequestsUids = friendRequests.map((item) => item.owner);
    setFriendRequestsId(friendsRequestsUids);
    const acceptedFriendsUids = acceptedFriends.map((item) => item.owner);
    setAcceptedFriendsId(acceptedFriendsUids);
  }, [newUsers, pendingFriendsUid, friendRequestsUidUid, acceptedFriendsUid, pendingFriends]);

  useEffect(() => {
    setNewUSerArr(
      newUsers.filter((item) => !pendingFriendsId.includes(item.uid))
    );
  }, [newUsers, pendingFriendsId]);

  useEffect(() => {
    setNewUSerArrr(
      newUserArr.filter((item) => !accpetedFriendsId.includes(item.uid))
    );
  }, [newUserArr, accpetedFriendsId]);

  useEffect(() => {
    setNewUSerArrrr(
      newUserArrr.filter((item) => !friendRequestsId.includes(item.uid))
    );
  }, [newUserArrr, friendRequestsId]);

  // useEffect(() => {
  //     const test = users.map((item => item.uid));
  //     setUserId(test);
  //     const overviewRef = ref(storage);
  //     listAll(overviewRef).then((res) => {
  //         let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
  //         Promise.all(promises).then((urls) => {
  //             setUrl(urls)
  //         })
  //     }).catch((err)=> {
  //         console.log(err)
  //     })
  // }, [users]);

  const handleSentFriendRequest = (item) => {
    sendFriendRequest(item, user);
  };

  return (
    <div>
      {/* <img className="w-60 h-80" src={photoUrl} alt="profilbild" /> */}
      {newUserArrrr.map((item) => (
        <div className="flex items-center my-4" key={item.uid}>
          <div className="mr-4 text-xl font-semibold capitalize">{item.name}</div>
          <button
            className="px-4 py-2 bg-green-200"
            onClick={() => handleSentFriendRequest(item)}
          >
            Skicka vänförfrågan
          </button>
        </div>
      ))}
      <div>
        {/* {url.map((url, index) => (
                <img className="w-36" src={url} key={index} alt="images"/>
            ))} */}
      </div>
    </div>
  );
};

export default FindFriendsList;
