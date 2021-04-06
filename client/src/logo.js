import { Component } from "react";
//any time we use axios from now on - we want to import it from ./axios.js
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Logo extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            //set error false to start with and only update it to truthy when something goes wrong
        };
        // this.handleChange = this.handleChange.bind(this); defines this => if i do not use an arrow function
    }

    render() {
        return (
            <div id="logo">
                <header>
                    <h1>WONDER</h1>
                    <a id="logout" href="/logout">
                        Log out
                    </a>
                </header>
                <h2>
                    Your registration was successful! Thanks for checking in!
                </h2>
                <img id="wonderlogo" src="wonderlogo.jpeg" alt="wonder" />
            </div>
        );
    }
}
