import axios from "axios";
import { response } from "express";
import { Component } from "react";

export default class Uploader extends Component {
    handleChange() {
        //update your state here
    }

    // upload() {
    //     const fromData = new FormData();
    //     FormData.append();
    //     axios.post("/upload", formData).then(({ data }) => {
    //         console.log(data.profilePic);
    //     });
    //     this.props.setProfilePic(data.profilePic);
    // }

    render() {
        return (
            <section id={"uploader"}>
                <button
                    id={"close-button"}
                    type={"button"}
                    onClick={this.props.hideUploader}
                >
                    X
                </button>
                <input type="file" onChange={this.handleChange}></input>
                <button onClick={() => this.upload()}>Upload</button>
            </section>
        );
    }
}
