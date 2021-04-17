import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, acceptFriend, unfriend } from "./actions";
// import axios from "./axios";

export default function Friends() {
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState();

    const friends = useSelector(
        (state) =>
            state.friendsandWannabes &&
            state.friendsandWannabes.filter((user) => user.accepted == true)
    );
    const wannabes = useSelector(
        (state) =>
            state.friendsandWannabes &&
            state.friendsandWannabes.filter((user) => user.accepted == false)
    );

    console.log(friends, "my friends");
    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    return (
        <div className="allmyFriends">
            <h2>Your Friends</h2>

            <div className="friendsList">
                {friends &&
                    friends.map((friend) => (
                        <div id="friend" key={friend.id}>
                            <h2>
                                {friend.first} {friend.last}
                            </h2>
                            <img
                                id="profilepic"
                                // id="profilepic"
                                src={
                                    friend.profile_pic ||
                                    "profilepic-static.jpg"
                                }
                            />

                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                {setButtonText}
                            </button>
                        </div>
                    ))}
            </div>
            <h2>Your friend Requests</h2>

            <div className="wannabefriendsList">
                {wannabes &&
                    wannabes.map((wannabe) => (
                        <div id="friend" key={wannabe.id}>
                            <h2>
                                {wannabe.first} {wannabe.last}
                            </h2>
                            <img
                                id="profilepic"
                                src={
                                    wannabe.profile_pic ||
                                    "profilepic-static.jpg"
                                }
                            />
                            <button
                                onClick={() =>
                                    dispatch(acceptFriend(wannabe.id))
                                }
                            >
                                Accept Request
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
