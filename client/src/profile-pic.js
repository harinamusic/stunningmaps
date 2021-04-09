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
        <div className="profilepic">
            <h2>Update your profile picture below</h2>
            <img
                id="profilepic"
                src={props.profile_pic || "/profilepic-static.jpg"}
                alt={`${props.firstName} ${props.lastName}`}
                //props.profile_pic ||
                onClick={() => props.showUploader()}
            />
        </div>
    );
}
