import { useState, useEffect } from "react";
// import axios from "./axios";
// import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export function GoogleMap() {
    // const [buttonText, setButtonText] = useState();
    const [state, setState] = useState([]);

    // function handleClick() {
    //     console.log("i clicked it");
    //     console.log(buttonText);
    //     axios
    //         .post(`/friendrequest/${props.otherProfileUser}/${buttonText}`)
    //         .then((result) => {
    //             setButtonText(result.data.setButtonText);
    //             setFriends(undefined);
    //         });
    // }

    // function onMapClicked() {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null,
    //         });
    //     }
    // }
    // function onMarkerClick(props, marker, e) {
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true,
    //     });
    // }
    return (
        <div>
            <h1>hiiiiiiiii</h1>
            <Map google={this.props.google}>
                <Marker name={"Current location"} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyBJwyRf9DMyuZXmryChHUvwXk4SusI2I6U",
})(GoogleMap);
