import React, { Component } from "react";

import {
    Map,
    InfoWindow,
    Marker,
    GoogleApiWrapper,
    useLoadScript,
} from "google-maps-react";

import { LocationSearchInput } from "./placesauto";

const options = {};
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat: 51.492914695,
                lng: -0.1215161806,
            },
        };
        // this.style;
    }

    onMarkerClick(props, marker, e) {
        console.log(props);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }

    onMapClicked(props) {
        console.log("i clicked");
        console.log(props);
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    }

    render() {
        console.log("this is my state", this.state);
        return (
            <div>
                <div id="locationsearch">
                    <LocationSearchInput />
                </div>
                <div className="mymap">
                    <h2>
                        Ice Cream
                        <span role="img" aria-label="ice">
                            {" "}
                        </span>
                    </h2>
                    <Map
                        onClick={this.onMapClick}
                        defaultZoom={10}
                        google={this.props.google}
                        options={options}
                        // mapCenter={this.state.mapCenter}
                        // initialCenter={this.props.coords}
                        style={{ width: "300px", height: "300px" }}
                        // style={{ width: "100%", height: "100%", top: "1.5rem" }}
                        containerStyle={{ width: "300px", height: "300px" }}
                        initialCenter={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng,
                        }}
                        center={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng,
                        }}
                        zoom={15}
                    >
                        <Marker
                            onClick={this.onMarkerClick}
                            name={"Current location"}
                            position={{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng,
                            }}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                            <div>
                                <h1 color="black">
                                    {this.state.selectedPlace.name}
                                </h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        );
    }
}

const libraries = ["places"];
export default GoogleApiWrapper({
    apiKey: "AIzaSyBJwyRf9DMyuZXmryChHUvwXk4SusI2I6U",
    language: "EN",
    libraries,
})(MapContainer);

// App = GoogleApiWrapper({
//     apiKey: "",
//     language: "RU",
// })(App);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
