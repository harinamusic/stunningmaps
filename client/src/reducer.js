// export default function (state = {}, action) {
//     return state;
//}
export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return Object.assign({}, state, {
            ...state,
            friendsandWannabes: action.friends,
        });
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendsandWannabes: state.friendsandWannabes.map((user) => {
                if (user.id == action.friendaccepted) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        console.log(state.friendsandWannabes, "state.friendsadwannabes");
        state = {
            ...state,
            friendsandWannabes: state.friendsandWannabes.filter((friend) => {
                if (friend.id !== action.deletefriendship) {
                    return friend;
                }
            }),
        };
        console.log(state.friendsandWannabes, "my state");
    }
    return state;
}
