//component we see when we registered or logged in => shows Logo and Profile picture

import { Component } from "react";
import { Logo } from "./logo.js";
import { Uploader } from "./uploader";
import axios from "./utilities/axios";
import ProfilePic from "./profile-pic";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            uploaderVisible: false,
        };
    }
    componentDidMount() {
        console.log("app mounted");

        axios.get("/user").then((res) => {
            console.log("data fetched");
            console.log(res.data);
            this.setState({ user: res.data });

            console.log("updated state", this.state);
        });
    }

    // setProfilePic(profilePic) {
    //     this.setstate;
    // } =>>>>>>>>you need to render this down below

    showUploader() {
        this.setState({ uploaderVisible: true });
    }
    render() {
        return (
            <section id={"app"} onClick={() => this.showUploader}>
                {/* //arrow function so "this" is still defined => alternative way is binding*/}
                <Logo />
                <ProfilePic
                    firstName={this.state.user.firstName}
                    lastname={this.state.user.lastName}
                    profilePic={this.state.user.profilePic}
                />
                {this.state.uploaderVisible && <Uploader />}
                {/* //if uploaderVisibleis false => Uploader wont show */}
            </section>
        );
    }
}
