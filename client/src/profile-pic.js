// import { Component } from "react";

// export default class App extends Component {
//     render() {}
// }
export default function ProfilePic(props) {
    return (
        <section id={"profile-pic"}>
            <img
                src={props.ProfilePic}
                alt={`${props.firstName} ${props.lastName}`}
            />
        </section>
    );
}
