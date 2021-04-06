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
    handleChange(e) {
        // console.log(e.target.value);
        this.setState(
            {
                //bracket notation used in an object => used when it's something dynamic like a variable
                [e.target.name]: e.target.value,
                // last: e.target.value,
                // email: e.target.value,
                // password: e.target.value,
            },
            () => console.log("this.state:", this.state)
        );
    }

    handleClick() {
        // e.preventDefault();
        console.log("clicked the button runs");

        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data", data);

                if (data.success === true) {
                    window.location.href = "/";
                } else {
                    this.setState({
                        error: true,
                        alert: "something went wrong!",
                    });
                }
                //TO DO
                //if everything went well, redirect user to "/"
                //if something went wrong => render an error message
                // if (everything went well){
                //     location.replace('/')
                // } else{
                //     conditionally render error message
                // }
            })
            .catch((err) => console.log("err in handleClick", err));
    }

    render() {
        return (
            <div id="login">
                <h1>Login here</h1>
                {/* //has to be truthy in order to see it */}
                {this.state.error && (
                    <p className="error">
                        Oops!! something went wrong, please try again!
                    </p>
                )}
                <input
                    required
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />

                <button onClick={() => this.handleClick()}>login</button>
                <Link to="/resetpassword">Click me to reset your password</Link>
                <Link to="/">Click me to go to register</Link>
            </div>
        );
    }
}
