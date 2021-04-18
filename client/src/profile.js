import { Component } from "react";
import { BioEditor } from "./bio-editor";
import { ProfilePic } from "./profile-pic";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style;
    }
    render() {
        return (
            <div className="userprofile">
                <div className="navbar">
                    <a className="friendslink" href="/friends">
                        MY FRIENDS
                    </a>
                    <a className="findpeoplelink" href="/users">
                        SEARCH
                    </a>
                </div>
                <h1>
                    Welcome to WONDER {this.props.first} {this.props.last}
                </h1>
                <div className="info">
                    <p>Name: {this.props.first}</p>
                    <p>Surname: {this.props.last}</p>
                </div>
                <div>
                    <ProfilePic
                        id={this.props.id}
                        first={this.props.first}
                        last={this.props.last}
                        profile_pic={this.props.profile_pic}
                        bio={this.props.bio}
                        // onClick={this.props.showUploader}
                        showUploader={() => this.props.showUploader()}
                        style={"bigpic"}
                    />
                    <div className="biotext">
                        <BioEditor
                            bio={this.props.bio}
                            setBio={this.props.setBio}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
