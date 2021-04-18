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
                if (user.id == action.acceptfriend) {
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
        state = {
            ...state,
            friendsandWannabes: state.friendsandWannabes.filter((friend) => {
                console.log(friend);
                friend = action.deletefriendship;
                return { ...state.friendsandWannabes };
            }),
        };
    }
    return state;
}
