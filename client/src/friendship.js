import { useState, useEffect } from "react";
import axios from "./axios";

export function FriendButton(props) {
    const [buttonText, setButtonText] = useState();

    useEffect(() => {
        console.log("Props in friendship: ", props);
        axios
            .get(`/friends/${props.otherProfileUser}`)
            .then((result) => {
                console.log(result, "data in friendship component");

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
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}
