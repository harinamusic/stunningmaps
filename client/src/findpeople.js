import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    // console.log(users, "this is my array of users");
    const [searchusers, setSearchUsers] = useState();
    console.log(searchusers, "this is mu searchusers");

    const handleChange = (e) => {
        console.log("e.target.value", e.target.value);
        setSearchUsers(e.target.value);
    };
    useEffect(() => {
        if (!searchusers) {
            axios.get("/lastthreeusers").then((res) => {
                console.log("component mounted");
                console.log(
                    "this is my response data after the app component mounted, it contains the user information from GET /user route",
                    res.data
                );
                console.log("this is my data", res.data);

                setUsers(res.data);
                console.log("hi i am your users", users);
            });
        } else {
            axios.get(`/users/${searchusers}`).then((res) => {
                console.log("component mounted");

                console.log("this is my data", res.data);

                setUsers(res.data);
                console.log("hi i am your users", users);
            });
        }
    }, [searchusers]);

    return (
        <div className="usersearch">
            <input
                type="text"
                placeholder="Type a Name"
                onChange={handleChange}
            />
            <div className="navbar">
                <a className="friendslink" href="/friends">
                    FRIENDS
                </a>
                <a className="chatlink" href="/chat">
                    CHAT
                </a>
                <a id="backtoprofile" href="/">
                    PROFILE
                </a>
            </div>
            {users.map((user) => (
                <div className="userdivinsearch" key={user.id}>
                    <Link to={"/user/" + user.id}>
                        <img
                            id="profilepic"
                            src={user.profile_pic || "profilepic-static.jpg"}
                        />
                    </Link>
                    <p>
                        {user.first} {user.last}
                    </p>
                </div>
            ))}
        </div>
    );
}
