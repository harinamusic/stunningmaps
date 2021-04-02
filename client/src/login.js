import { Component } from "react";
//any time we use axios from now on - we want to import it from ./axios.js
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
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
            <div>
                <h1>login</h1>
                <Link to="/">Click me to go to register</Link>
                <button onClick={() => this.handleClick()}>register</button>
            </div>
        );
    }
}
