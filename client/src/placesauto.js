// import React from "react";
// import { Component } from "react";
// import { formatRelative } from "date-fns";
// import "@reach/combobox/styles.css";

// format(new Date(2014, 1, 11), "yyyy-MM-dd");
// // import PlacesAutocomplete, {
// //     geocodeByAddress,
// //     getLatLng,
// //     getInputProps,
// // } from "react-places-autocomplete";
// import PlacesAutocomplete from "react-places-autocomplete";
// import {
//     geocodeByAddress,
//     geocodeByPlaceId,
//     getLatLng,
// } from "react-places-autocomplete";

// export class LocationSearchInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSelect = this.handleSelect.bind(this);
//         this.state = { address: "" };
//     }

//     handleChange(address) {
//         this.setState({ address });
//     }
//     // const handleChange = (address) => {
//     //     this.setState({ address });
//     // };

//     handleSelect(address) {
//         geocodeByAddress(address)
//             .then((results) => getLatLng(results[0]))
//             .then((latLng) => console.log("Success", latLng))
//             .catch((error) => console.error("Error", error));
//     }

//     getInputProps() {}

//     render() {
//         return (
//             <PlacesAutocomplete
//                 value={this.state.address}
//                 onChange={(value) => this.setState({ value })}
//                 // onChange={this.handleChange}
//                 onSelect={this.handleSelect}
//             >
//                 {({
//                     getInputProps,
//                     suggestions,
//                     getSuggestionItemProps,
//                     loading,
//                 }) => (
//                     <div>
//                         <input
//                             placeholder="Search Places..."
//                             getInputProps={this.handleInput}
//                         />
//                         <div className="autocomplete-dropdown-container">
//                             {loading && <div>Loading...</div>}
//                             {suggestions.map((suggestion) => {
//                                 const className = suggestion.active
//                                     ? "suggestion-item--active"
//                                     : "suggestion-item";

//                                 return (
//                                     <div
//                                         {...getSuggestionItemProps(
//                                             suggestion,
//                                             {}
//                                         )}
//                                     >
//                                         <span>{suggestion.description}</span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//             </PlacesAutocomplete>
//         );
//     }
// }
