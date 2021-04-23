import { Component } from "react";
// import { BioEditor } from "./bio-editor";
// import { FriendButton } from "./friendship";
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
                    {/* <img
                        className="icecream"
                        src="/icecreamwaffels.jpeg"
                        // alt={`${props.first} ${props.last}`}
                    />  */}

                    <MapContainer />
                </div>
                {/* <ProfilePic
                        id={this.props.id}
                        first={this.props.first}
                        last={this.props.last}
                        profile_pic={this.props.profile_pic}
                        bio={this.props.bio}
                        // onClick={this.props.showUploader}
                        showUploader={() => this.props.showUploader()}
                        style={"bigpic"}
                    /> */}

                {/* <div className="biotext">
                        <BioEditor
                            bio={this.props.bio}
                            setBio={this.props.setBio}
                        />
                    </div> */}
            </div>
        );
    }
}
