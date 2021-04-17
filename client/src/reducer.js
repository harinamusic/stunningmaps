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
    if (action.type == "UNFRIEND") {
        return {
            ...state,
            friendsandWannabes: action.deletefriendship,
        };
    }
    return state;
}
