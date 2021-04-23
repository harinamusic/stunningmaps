import React, { Component } from "react";
import { useState, useEffect } from "react";
import secrets from "../../server/secrets";
import { BioEditor } from "./bio-editor";

import {
    GoogleMap,
    Marker,
    InfoWindow,
    useLoadScript,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
// import mapStyles from "./mapStyles";
// import { LocationSearchInput } from "./placesauto";
// const options = {};
const libraries = ["places"];
const MapContainerStyle = {
    width: "1499px",
    height: "950px",
};
const initialCenter = {
    lat: 51.492914695,
    lng: -0.1215161806,
};

export function MapContainer(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: secrets.API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    var [state, setState] = useState({
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false,
    });
    const onMapClick = React.useCallback((event) => {
        hideInfo();
        console.log("my event", event);
        setMarkers((current) => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    function hideInfo() {
        if (state.showingInfoWindow) {
            setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";
    return (
        <div className="mymap">
            {/* <img
                className="icecream"
                src="/icecreamwaffels.jpeg"
                // alt={`${props.first} ${props.last}`}
            /> */}
            <div className="searchbar">
                <h2 id="worldemoji">
                    MAP YOUR WORLD{" "}
                    <span role="img" aria-label="world">
                        🌍
                    </span>
                </h2>

                <Search panTo={panTo} />
                <Locate panTo={panTo} />
            </div>
            <GoogleMap
                // style={{ width: "900px", height: "900px" }}
                mapContainerStyle={MapContainerStyle}
                center={initialCenter}
                zoom={2.5}
                onLoad={onMapLoad}
                onClick={onMapClick}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "/colorcone.png",
                            scaledSize: new window.google.maps.Size(70, 70),
                            origin: new window.google.maps.Point(),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            {/* <h3>Share your experience!</h3> */}
                            {/* <textarea
                                v-model="title"
                                type="text"
                                name="title"
                                placeholder="Your Experience"
                            /> */}
                            <div className="biotext">
                                <BioEditor
                                // bio={this.props.bio}
                                // setBio={this.props.setBio}
                                />
                            </div>
                            <p>
                                Added{" "}
                                {formatRelative(selected.time, new Date())}
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
}

function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        console.log(position);
                    },
                    () => null
                );
            }}
        >
            <img id="yourplace" src="icecone.png" />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 51.492914695, lng: () => -0.1215161806 },
            radius: 200 * 1000,
        },
    });
    return (
        <div className="search">
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        console.log(lat, lng);
                        console.log(results[0]);
                        panTo({ lat, lng });
                    } catch (error) {
                        console.log(Error);
                    }
                    console.log(address);
                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    // disable={!ready}
                    placeholder="Enter an adress"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
