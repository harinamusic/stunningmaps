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

// export async function acceptFriend() {
//     const { data } = await axios.post();
//     return {
//         type: "ACCEPT_FRIEND",
//     };
// }
export function acceptFriend(userId) {
    console.log("userId", userId);
    return axios.post("/acceptfriend/" + userId).then((result) => {
        console.log(
            "this is the result row from my friendships table",
            result.data[0]
        );
        return {
            type: "ACCEPT_FRIEND",
            friendaccepted: userId,
        };
    });
}

export async function unfriend(userId) {
    const { data } = await axios.post("/deletefriend/" + userId);
    console.log(data, "this is mi result");
    return {
        type: "UNFRIEND",
        deletefriendship: userId,
    };
}
export async function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        messages: msgs,
    };
}

export async function chatMessage(msg) {
    return {
        type: "GET_MESSAGE",
        message: msg,
    };
}
