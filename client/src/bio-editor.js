import { Component } from "react";
import axios from "./axios";

export class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            editMode: false,
        };
    }

    toggleEditMode() {
        this.setState({ editMode: true });

        // To toggle the editMode state variable.
    }
    addButton() {
        return (
            <div className="biotexthere">
                <button onClick={() => this.toggleEditMode()}>Add</button>
            </div>
        );
    }

    editButton() {
        return (
            <div className="biotexthere">
                {this.props.bio}

                <button onClick={() => this.toggleEditMode()}>Edit</button>
            </div>
        );
    }

    handleBioChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state)
        );
        // To keep track of the bio the user types
    }

    submitBio() {
        axios
            .post(`/bio/${this.props.markerId}`, this.state)
            .then((res) => {
                // console.log("res in /bio", res);
                this.props.updateMarkerDescription(
                    res.data.bio,
                    this.props.markerId
                );

                this.setState({ editMode: false });
            })
            .catch((err) => console.log("err in post /bio", err));
        // 1. Post the new bio the user typed (you should read it from this.state.draft)
        // 2. Set the new bio in the state of App
    }

    render() {
        var button;
        const { bio } = this.props;
        if (bio) {
            button = this.editButton();
        } else {
            button = this.addButton();
        }
        if (this.state.editMode) {
            button = undefined;
        }

        return (
            <div className="bio">
                <h2>Add a Description</h2>
                {this.state.editMode && (
                    <div className="bioeditor">
                        <textarea
                            onChange={(e) => this.handleBioChange(e)}
                            className="text"
                            name="bio"
                            defaultValue={this.props.bio}
                        ></textarea>
                        <button onClick={() => this.submitBio()}>Save</button>
                    </div>
                )}
                <div>{button}</div>
            </div>
        );
    }
}
