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
                setButtonText(result.data.setButtonText);

                setFriends(result.data.friends);
                console.log(props.userId, "this is it!!!!");
                console.log({ friends }, "my friends array");
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
                setFriends(undefined);
            });
    }
    if (friends == undefined || friends.length == 0) {
        console.log(friends);
        return (
            <div>
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        );
    } else {
        return (
            <div>
                <div className="friendsoffriends-container">
                    {friends &&
                        friends.map((friend) => (
                            <div id="friendOfFriend" key={friend.id}>
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
                </div>
                <div>
                    <button onClick={handleClick}>{buttonText}</button>
                </div>
            </div>
        );
    }
}
