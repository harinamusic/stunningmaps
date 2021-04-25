import { Component } from "react";
import axios from "./axios";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        //this.state.file = null;
        this.state = { file: null };
        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
        });
    }

    upload(e) {
        e.preventDefault();
        const image = this.state.file;
        const formData = new FormData();
        formData.append("file", image);
        axios.post("/upload", formData).then(({ data }) => {
            console.log("Upload Data: ", data);

            this.props.addProfilePic(data.result.rows[0].profile_pic);
        });
    }

    render() {
        return (
            <div className="uploader">
                <button
                    // className="btn"
                    id="x"
                    onClick={this.props.hideUploader}
                >
                    X
                </button>
                <div className="userinput" data-text="Select your file!">
                    {/* <div className="inputfile"> */}

                    <input
                        label="choose a file"
                        className="inputfile"
                        id="file"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="file">Choose a file</label>
                    {/* </div> */}
                    <button className="btn" onClick={(e) => this.upload(e)}>
                        Upload
                    </button>
                </div>
            </div>
        );
    }
}

// import axios from "axios";
// import { response } from "express";
// import { Component } from "react";

// export default class Uploader extends Component {
//     handleChange() {
//         //update your state here
//     }

//     // upload() {
//     //     const fromData = new FormData();
//     //     FormData.append();
//     //     axios.post("/upload", formData).then(({ data }) => {
//     //         console.log(data.profilePic);
//     //     });
//     //     this.props.setProfilePic(data.profilePic);
//     // }

//     render() {
//         return (
//             <section id={"uploader"}>
//                 <button
//                     id={"close-button"}
//                     type={"button"}
//                     onClick={this.props.hideUploader}
//                 >
//                     X
//                 </button>
//                 <input type="file" onChange={this.handleChange}></input>
//                 <button onClick={() => this.upload()}>Upload</button>
//             </section>
//         );
//     }
// }
