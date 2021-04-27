import axios from "./axios";

import { useState, useEffect } from "react";

export default function UploaderMemories(props) {
    const [state, setState] = useState();
    const [photos, setPhotos] = useState([]);

    setPhotos(["/softice.jpeg", "/travel.png"]);
    console.log(photos);

    function handleChange(e) {
        setState({
            imageUrl: e.target.value,
        });
    }

    // function upload(e) {
    //     e.preventDefault();
    //     const image = photos.file;
    //     const formData = new FormData();
    //     formData.append("file", image);
    //     axios.post("/uploadmemories", formData).then(({ data }) => {
    //         console.log("Upload Data: ", data);

    //         // this.props.addProfilePic(data.result.rows[0].profile_pic);
    //     });
    // }

    const imageSubmitter = (e) => {
        e.preventDefault();

        photos.push(state.imageUrl);
    };

    return (
        <div>
            <form onSubmit={imageSubmitter}>
                <button
                    // className="btn"
                    id="x"
                    onClick={props.hideUploader}
                >
                    X
                </button>
                <div data-text="Select your file!">
                    {/* <div className="inputfile"> */}

                    <input
                        label="choose a file"
                        className="inputfile"
                        id="file"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="file">Choose a file</label>
                    {/* </div> */}
                    <button>Upload</button>

                    {photos.map((photo) => {
                        console.log(photo, "is it my marker id? in render");

                        return (
                            <img
                                className="images"
                                src={photo.imageUrl}
                                key={photo.index}
                            />
                        );
                    })}
                </div>
            </form>
        </div>
    );
}
