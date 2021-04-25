// import { Component } from "react";

// export default class App extends Component {
//     render() {}
// }
// export default function ProfilePic(props) {
//     return (
//         <section id={"profile-pic"}>
//             <h2>Click on the image to update it</h2>
//             <img
//                 src={props.ProfilePic}
//                 alt={`${props.firstName} ${props.lastName}`}
//             />
//         </section>
//     );
// }

export function ProfilePic(props) {
    return (
        <section>
            <div className="userpic">
                <img
                    className={`profilepic ${props.style}`}
                    src={props.profile_pic || "/user.png"}
                    // alt={`${props.first} ${props.last}`}
                    onClick={() => props.showUploader()}
                />

                <a className="usernames" href="/">
                    {props.first} {props.last}
                </a>
            </div>
        </section>
    );
}
