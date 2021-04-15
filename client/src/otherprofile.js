import { Component } from "react";
import axios from "./axios";
import { Profile } from "./profile";
import { FriendButton } from "./friendship";

export class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // console.log("this.state in otherprofile before: ", this.state);
        axios
            .get(`/user/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                if (data.redirectToProfile) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                    // console.log(
                    //     "this.state in otherprofile after: ",
                    //     this.state
                    // );
                }
            })
            .catch((err) => {
                console.log("Error in otherprofile DidMount: ", err);
            });
    }

    render() {
        // console.log("this.state in rendering otherprofile", this.state);
        return (
            <section>
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <img
                    className={`profilepic ${this.props.style}`}
                    // id="profilepic"
                    src={this.state.profile_pic || "profilepic-static.jpg"}
                />
                <div className="bio">
                    <h2>{this.state.first}'s Bio</h2>
                    <p>{this.state.bio}</p>
                </div>

                <a id="backtoprofile" href="/">
                    {" "}
                    Back to your Profile
                </a>
                <FriendButton otherProfileUser={this.props.match.params.id} />
            </section>
        );
    }
}
