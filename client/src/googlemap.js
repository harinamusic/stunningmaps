import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import { Constants } from "./../../utils/constants";
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
            <div className="mymap">
                <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    // mapCenter={this.state.mapCenter}
                    // initialCenter={this.props.coords}
                    style={{ width: "950px", height: "700px" }}
                    // style={{ width: "100%", height: "100%", top: "1.5rem" }}
                    containerStyle={{ width: "110vw", height: "150vh" }}
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
        );
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyBJwyRf9DMyuZXmryChHUvwXk4SusI2I6U",
    language: "EN",
})(MapContainer);

// App = GoogleApiWrapper({
//     apiKey: "",
//     language: "RU",
// })(App);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
