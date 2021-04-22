import { Component } from "react";
import axios from "./axios";
// import Logo from "./logo.js";
import { Uploader } from "./uploader";
import { ProfilePic } from "./profile-pic";
import { Profile } from "./profile";
// import { BioEditor } from "./bio-editor";
import { OtherProfile } from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./findpeople";
import Friends from "./friends";
import Chat from "./chat";

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
            // console.log("component mounted");
            // console.log(
            //     "this is my response data after the app component mounted, it contains the user information from GET /user route",
            //     res.data
            // );
            this.setState({ user: res.data });
            // console.log("this is my user id", this.state.user.id);

            // console.log(
            //     "updated state => added to my user object from this.state all the user information",
            //     this.state
            // );
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
    setBio(text) {
        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    bio: text,
                },
            };
        });
    }
    render() {
        return (
            <div>
                <div className="generalnavbar">
                    <div className="topnav">
                        <a href="/">Home</a>
                        <a href="/users">Favourites</a>
                        <a href="/friends">Ratings</a>
                        <a href="/chat">News</a>
                    </div>
                </div>

                <a className="btn" id="logout" href="/logout">
                    {" "}
                    Log out
                </a>

                {this.state.uploaderVisible && (
                    <Uploader
                        hideUploader={() => this.hideUploader()}
                        addProfilePic={(newPic) => this.addProfilePic(newPic)}
                    />
                )}

                <ProfilePic
                    // {...this.state.user}
                    first={this.state.user.first}
                    last={this.state.user.last}
                    profile_pic={this.state.user.profile_pic}
                    showUploader={() => this.showUploader()}
                    style={"minipic"}
                />
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <div>
                                        <Profile
                                            // {...this.state.user}
                                            id={this.state.user.id}
                                            first={this.state.user.first}
                                            last={this.state.user.last}
                                            profile_pic={
                                                this.state.user.profile_pic
                                            }
                                            bio={this.state.user.bio}
                                            showUploader={() =>
                                                this.showUploader()
                                            }
                                            setBio={(text) => this.setBio(text)}
                                        />
                                    </div>
                                );
                            }}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                    style={"bigpic"}
                                    myid={this.state.user.id}
                                />
                            )}
                        />
                        <Route path="/users" render={() => <FindPeople />} />
                        <Route path="/friends" render={() => <Friends />} />

                        <Route path="/chat" render={() => <Chat />} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
