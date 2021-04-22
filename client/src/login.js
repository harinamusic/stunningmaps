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
            <div>
                <div>
                    <div className="generalnavbar">
                        <div className="topnav">
                            <a href="/">Registration</a>
                            <a href="#/login">Login</a>
                        </div>
                    </div>
                </div>
                <div className="welcomepage">
                    <img
                        className="icecream"
                        src="/icecreamwaffels.jpeg"
                        // alt={`${props.first} ${props.last}`}
                    />
                    <div className="registernav">
                        <div id="register">
                            <h1>Login here</h1>
                            {/* //has to be truthy in order to see it */}
                            {this.state.error && (
                                <p className="error">
                                    Oops!! something went wrong, please fill out
                                    all the fields!
                                </p>
                            )}
                            {/* //name is how it gets added to req.body => so first Name would be accessed by req.body.first */}

                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={(e) => this.handleChange(e)}
                            />
                            <div className="container">
                                <div className="center">
                                    <button
                                        className="btn"
                                        onClick={() => this.handleClick()}
                                    >
                                        <svg
                                            width="180px"
                                            height="60px"
                                            viewBox="0 0 180 60"
                                            className="border"
                                        >
                                            <polyline
                                                points="179,1 179,59 1,59 1,1 179,1"
                                                className="bg-line"
                                            />
                                            <polyline
                                                points="179,1 179,59 1,59 1,1 179,1"
                                                className="hl-line"
                                            />
                                        </svg>
                                        <span>login</span>
                                    </button>
                                </div>
                            </div>
                            {/* //has to be truthy in order to see it */}

                            <Link className="resetlink" to="/resetpassword">
                                reset password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
