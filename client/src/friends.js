import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, acceptFriend, unfriend } from "./actions";
// import axios from "./axios";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);
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
    console.log(wannabes, "my wannabes");
    if (!friends) {
        return null;
    }
    if (!wannabes) {
        return null;
    }
    if (wannabes.length == 0 && friends.length == 0) {
        return (
            <h1>
                hoh noooooo!!!Seems like you don't have any friends yet! Go to
                Search to find some like minded people
            </h1>
        );
    }

    return (
        <div className="allmyFriends">
            <div className="navbar">
                <a id="backtoprofile" href="/">
                    PROFILE
                </a>
                <a className="findpeoplelink" href="/users">
                    SEARCH
                </a>
            </div>
            <div />
            <h2>Your Friends</h2>

            <div className="friendsList">
                {friends &&
                    friends.map((friend) => (
                        <div id="friend" key={friend.id}>
                            <h2>
                                {friend.first} {friend.last}
                            </h2>
                            <Link to={"/user/" + friend.id}>
                                <img
                                    id="profilepic"
                                    // id="profilepic"
                                    src={
                                        friend.profile_pic ||
                                        "profilepic-static.jpg"
                                    }
                                />
                            </Link>

                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
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
                            <Link to={"/user/" + wannabe.id}>
                                <img
                                    id="profilepic"
                                    src={
                                        wannabe.profile_pic ||
                                        "profilepic-static.jpg"
                                    }
                                />
                            </Link>
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
