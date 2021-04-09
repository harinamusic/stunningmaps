// import axios from "./axios";
import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            // showEditor: false,
        };
    }
    render() {
        return <h1>hi there i am your bio</h1>;
    }
}
