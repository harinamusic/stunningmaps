import { Component } from "react";
import axios from "./axios";

export class BioEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            editMode: false,

            // You may want to set some defaults here
        };
    }

    toggleEditMode() {
        this.setState({ editMode: true });

        // To toggle the editMode state variable.
    }
    addButton() {
        console.log("i clicked add bio");
        return (
            <div className="biotexthere">
                <button onClick={() => this.toggleEditMode()}>Add Bio</button>
            </div>
        );
    }

    editButton() {
        return (
            <div className="biotexthere">
                {this.props.bio}

                <button onClick={() => this.toggleEditMode()}>Edit Bio</button>
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
        console.log(
            "i submitted the bio, this.state in bioeditor:",
            this.state
        );
        axios
            .post("/bio", this.state)
            .then((res) => {
                console.log("res in /bio", res);
                this.props.setBio(res.data.bio);
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
        // const { bio } = this.props;
        // const button = bio ? this.editButton() : this.addButton();
        console.log(this.props, "is this my bio?");
        return (
            <div className="bio">
                <h2>Your Bio</h2>
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
    // return (
    //     <section id={"bio-editor"}>
    //         {/*
    //          Lots of rendering logic here, depending on whether:
    //          1. You are in edit mode or not
    //          2. If you are not in edit mode: whether a bio already exists
    //          */}
    //     </section>
    // );
    //     }
}
