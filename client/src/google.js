import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

// import { LocationSearchInput } from "./placesauto";
const options = {};
const libraries = ["places"];
const MapContainerStyle = {
    width: "900px",
    height: "900px",
};
const initialCenter = {
    lat: 51.492914695,
    lng: -0.1215161806,
};
const center = {
    lat: "",
    lng: "",
};

export function MapContainer(props) {
    const [markers, setMarkers] = useState([]);
    var [state, setState] = useState({
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false,
    });

    useEffect(() => {});
    function onMarkerClick(props, marker, e) {
        console.log(props);
        setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }

    return (
        <div className="mymap">
            <img
                className="icecream"
                src="/icecreamwaffels.jpeg"
                // alt={`${props.first} ${props.last}`}
            />
            <h2 id="icecreamemoji">
                Gelato
                <span role="img" aria-label="ice">
                    🍦
                </span>
            </h2>

            <Map
                defaultZoom={10}
                google={props.google}
                // onClick={this.onMapClicked}
                options={options}
                style={{ width: "900px", height: "900px" }}
                containerStyle={MapContainerStyle}
                //
                initialCenter={initialCenter}
                center={center}
                zoom={15}
                onClick={(event) => {
                    if (state.showingInfoWindow) {
                        setState({
                            showingInfoWindow: false,
                            activeMarker: null,
                        });
                    }
                    console.log(event);
                    setMarkers((current) => [
                        ...current,
                        {
                            // lat: event.latLng.lat(),
                            // lng: event.latLng.lng(),
                            // time: new Date(),
                        },
                    ]);
                }}
            >
                <Marker
                    onClick={onMarkerClick}
                    name={"Current location"}
                    position={initialCenter}
                    icon={{
                        url: "/colorcone.png",
                        scaledSize: new window.google.maps.Size(70, 70),
                        origin: new window.google.maps.Point(),
                    }}
                />
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "/colorcone.png",
                            scaledSize: new window.google.maps.Size(70, 70),
                            origin: new window.google.maps.Point(),
                        }}
                    />
                ))}
                <InfoWindow
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                >
                    <div>
                        <h1 color="black"></h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBJwyRf9DMyuZXmryChHUvwXk4SusI2I6U",
    language: "EN",
    libraries,
})(MapContainer);

// const [center, setCenter] = useState();
// const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
// });

// if (loadError) return "Error loading maps";
// if (!isLoaded) return "Loading maps";
