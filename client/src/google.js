import React, { Component } from "react";
import { useState, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";

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
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "",
        libraries,
    });
    console.log(isLoaded, loadError, "error");
    const [markers, setMarkers] = useState([]);
    var [state, setState] = useState({
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false,
    });

    // const onMapClick = React.useCallback(() => {}, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

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

            <GoogleMap
                // defaultZoom={10}
                // // onClick={this.onMapClicked}
                // options={options}
                // style={{ width: "900px", height: "900px" }}
                // containerStyle={MapContainerStyle}
                // //
                // initialCenter={initialCenter}
                // center={center}
                // zoom={15}
                onLoad={onMapLoad}
                // onClick={(event) => {
                //     if (state.showingInfoWindow) {
                //         setState({
                //             showingInfoWindow: false,
                //             activeMarker: null,
                //         });
                //     }
                //     console.log("my event", event);
                //     setMarkers((current) => [
                //         ...current,
                //         {
                //             // lat: event.latLng.lat(),
                //             // lng: event.latLng.lng(),
                //             // time: new Date(),
                //         },
                //     ]);
                // }}
            >
                <Marker
                    onClick={onMarkerClick}
                    name={"Current location"}
                    position={initialCenter}
                    // icon={{
                    //     url: "/colorcone.png",
                    //     scaledSize: new window.google.maps.Size(70, 70),
                    //     origin: new window.google.maps.Point(0, 0),
                    //     anchor: new window.google.maps.Point(15, 15),
                    // }}
                />
                {/* {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "/colorcone.png",
                            scaledSize: new window.google.maps.Size(70, 70),
                            origin: new window.google.maps.Point(),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                    />
                ))} */}
                <InfoWindow
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                >
                    <div>
                        <h1 color="black"></h1>
                    </div>
                </InfoWindow>
            </GoogleMap>
        </div>
    );
}

// export default GoogleApiWrapper({
//     apiKey: "AIzaSyBJwyRf9DMyuZXmryChHUvwXk4SusI2I6U",
//     language: "EN",
//     libraries,
// })(MapContainer);

// const [center, setCenter] = useState();
// const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
// });

// if (loadError) return "Error loading maps";
// if (!isLoaded) return "Loading maps";
