import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state:", this.state)
        );
    }

    // handleClick() {
    //     // e.preventDefault();
    //     console.log("clicked the button runs");

    //     axios
    //         .post("/login", this.state)
    //         .then(({ data }) => {
    //             console.log("data", data);

    //             if (data.success === true) {
    //                 window.location.href = "/";
    //             } else {
    //                 this.setState({
    //                     error: true,
    //                     alert: "something went wrong!",
    //                 });
    //             }

    //         })
    //         .catch((err) => console.log("err in handleClick", err));
    // }

    render() {
        return (
            <div className="reset">
                <h1>Reset your password!</h1>
                {this.state.step == 1 && (
                    <div className="reset">
                        <h2>
                            To reset your password please enter your email
                            adress
                        </h2>
                        <input required name="email" placeholder="email" />
                        <button className="resetbttn">Reset Password</button>
                    </div>
                )}
                {this.state.step == 2 && (
                    <div className="reset">
                        <h2>
                            Please enter the 5 digit code you received via email
                        </h2>
                        <input name="code" placeholder="code" />
                        <h2>Please enter your new password</h2>
                        <input name="password" placeholder="new password" />
                        <button className="resetbttn">Reset Password</button>
                    </div>
                )}
                {this.state.step == 3 && (
                    <div className="reset">
                        <h2>Success!</h2>

                        <Link to="/login">Click me to go to Login</Link>
                    </div>
                )}
            </div>
        );
    }
}
