import { Component } from "react";
import axios from "./axios";
import Logo from "./logo.js";
import { Uploader } from "./uploader";
import { ProfilePic } from "./profile-pic";

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
            console.log("component mounted");
            console.log(
                "this is my response data after the app component mounted, it contains the user information from GET /user route",
                res.data
            );
            this.setState({ user: res.data });

            console.log(
                "updated state => added to my user object from this.state all the user information",
                this.state
            );
        });
    }

    showUploader() {
        this.setState({ uploaderVisible: true });
        console.log("i clicked the pic");
    }
    hideUploader() {
        this.setState({
            uploaderVisible: false,
        });
        console.log("i clicked the x");
    }

    addProfilePic(newPic) {
        this.setState((prevState) => {
            console.log("this was my prev state", prevState);
            return {
                user: {
                    ...prevState.user,
                    profile_pic: newPic,
                },
                uploaderVisible: false,
            };
        });
        console.log(
            "new user obj with new pic after setProfilePic ran",
            this.state.user
        );
    }
    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>WONDER</h1>
                        <Logo />
                        <a id="logout" href="/logout">
                            {" "}
                            Log out
                        </a>
                    </header>
                </div>

                <ProfilePic
                    // {...this.state.user}
                    first={this.state.user.first}
                    last={this.state.user.last}
                    profile_pic={this.state.user.profile_pic}
                    showUploader={() => this.showUploader()}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        hideUploader={() => this.hideUploader()}
                        addProfilePic={(newPic) => this.addProfilePic(newPic)}
                    />
                )}
            </div>
        );
    }
}
