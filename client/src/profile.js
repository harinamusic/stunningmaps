import { Component } from "react";
import { BioEditor } from "./bio-editor";
// import { FriendButton } from "./friendship";
// import { GoogleMap } from "./google";
import { MapContainer } from "./google";
// import { ProfilePic } from "./profile-pic";
// import { MapContainer } from "./mapcontainer";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style;
    }

    render() {
        return (
            <div>
                <div className="welcomepage">
                    <MapContainer
                        bio={this.props.bio}
                        setBio={this.props.setBio}
                    />
                </div>
            </div>
        );
    }
}
