// src/actions.js
import axios from "./axios";

export function receiveFriendsWannabes() {
    return axios
        .get("/friend-wannabes")
        .then(({ data }) => {
            console.log(data, "this is data from friendswannabes");
            // the object being returned here is called an "action"
            return {
                type: "RECEIVE_FRIENDS_WANNABES",
                friends: data,
                // array we got back from the server
            };
        })
        .catch((err) => {
            console.log("err: ", err);
        });
}

export async function acceptFriend() {
    const { data } = await axios.post();
    return {
        type: "ACCEPT_FRIEND",
    };
}

export async function unfriend(userId) {
    const { data } = await axios.post("/deletefriend/" + userId);
    return {
        type: "UNFRIEND",
        deletefriendship: data,
    };
}
