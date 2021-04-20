import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function FriendButton(props) {
    const [buttonText, setButtonText] = useState();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // console.log("my user id", ${});
        console.log("Props in friendship: ", props);
        axios
            .get(`/friends/${props.otherProfileUser}`)
            .then((result) => {
                console.log(result, "data in frienship component fuck me");
                setFriends(
                    result.data.result.rows.filter((friend) => {
                        if (friend.id !== `${props.userId}`) {
                            return friend;
                        }
                    })
                );

                // mystate.push(result.data.result.rows);
                // console.log(mystate, "this my state");
                // console.log(result.data.result.rows, "my result.rows");
                setButtonText(result.data.setButtonText);
            })
            .catch((err) => {
                console.log("Error in useEffect /api/friends: ", err);
            });
    }, []);

    function handleClick() {
        console.log("i clicked it");
        console.log(buttonText);
        axios
            .post(`/friendrequest/${props.otherProfileUser}/${buttonText}`)
            .then((result) => {
                setButtonText(result.data.setButtonText);
            });
    }

    return (
        <div>
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
                    </div>
                ))}
            <div>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        </div>
    );
}
