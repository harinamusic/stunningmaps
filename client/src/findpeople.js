import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //     axios.get("/lastthreeusers").then((res) => {
        //         console.log("component mounted");
        //         console.log(
        //             "this is my response data after the app component mounted, it contains the user information from GET /user route",
        //             res.data
        //         );
        //         console.log("this is my data", res.data);

        //         setUsers(res.data);
        //         console.log("hi i am your users", users);
        //     });
        // });
        // axios
        //     .get("/lastthreeusers")
        //     .then(({ data }) => {
        //         setUsers(data);
        //         console.log(data, "data in /users in findpoeple");
        //     })
        //     .catch((err) => {
        //         console.log("FindPeople GET /users catch err: ", err);
        //     });
        (async () => {
            const { data } = await axios.get("/lastthreeusers");
            setUsers(data);
            console.log(data.user);
        })();
    });

    return (
        <div className="usersearch">
            <input
                type="text"
                placeholder="Find..."
                // onChange={(e) => setUsers(e.target.value)}
            />
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
