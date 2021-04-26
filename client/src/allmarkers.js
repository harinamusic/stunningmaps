import { Component } from "react";
import axios from "./axios";
import { Profile } from "./profile";
import { BioEditor } from "./bio-editor";

import { useState, useEffect } from "react";

export default function AllMarkers(props) {
    const [state, setState] = useState();

    console.log(props, "props in allmarkers");
    // useEffect(() => {
    //     axios
    //         .get(`/selected/${this.props.match.params.id}.json`)
    //         .then(({ data }) => {
    //             console.log(this.props.myid, "myid");
    //             if (data.redirectToProfile) {
    //                 this.props.history.push("/");
    //             } else {
    //                 this.setState(data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Error in otherprofile DidMount: ", err);
    //         });
    // });

    return (
        <section>
            <div className="bio">
                <h1>hi there thi sis your description</h1>
                {/* <h2>{this.state.first}'s Bio</h2>
                <p>{this.state.bio}</p> */}
                <BioEditor bio={props.bio} />
            </div>
        </section>
    );
}
