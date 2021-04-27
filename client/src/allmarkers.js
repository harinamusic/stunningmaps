import { Component } from "react";
import axios from "./axios";
import { Profile } from "./profile";
import { BioEditor } from "./bio-editor";
import UploaderMemories from "./uploadmemories";

import { useState, useEffect } from "react";

export default function AllMarkers(props) {
    const [state, setState] = useState();
    const [bio, setBio] = useState("");
    // const [photos, setPhotos] = useState([]);

    console.log(props, "props in allmarkers");
    console.log(props.match.params, "markers array?");

    useEffect(() => {
        axios
            .get(`/selected/${props.match.params.id}.json`)
            .then((result) => {
                console.log(result.data.bio);
                setBio(result.data.bio);
                // setBio(result);
            })
            .catch((err) => {
                console.log("Error in allMarker useEffect: ", err);
            });
    });

    return (
        <section>
            <div className="bio">
                <h1>hi there thi sis your description</h1>
                {/* <h2>{this.state.first}'s Bio</h2>
                <p>{this.state.bio}</p> */}
                <BioEditor
                    bio={bio}
                    selected={props.selected}
                    setSelected={props.setSelected}
                    setBio={props.setBio}
                    markerId={props.match.params.id}
                    // key={markerId}
                    markers={props.markers}
                    setMarkers={props.setMarkers}
                    updateMarkerDescription={props.updateMarkerDescription}
                />
            </div>
            {/* <UploaderMemories /> */}
        </section>
    );
}
