import React from "react";
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            error: false,
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

    resetUserPassword1(e) {
        e.preventDefault();
        axios
            .post("/resetpassword/start", this.state)
            .then(({ data }) => {
                console.log("data", data);

                if (data.success) {
                    this.setState({ step: 2 });
                } else {
                    this.setState({
                        error: data.message,
                    });
                }
            })
            .catch(function (err) {
                console.log("err in POST /resetpassword: ", err);
            });
    }
    // resetUserPassword2(e) {
    //     e.preventDefault();

    //     axios
    //         .post("/resetpassword/verify", this.state)
    //         .then(({ data }) => {
    //             console.log("data", data);

    //             if (data.success) {
    //                 this.setState({ step: 3 });
    //             } else {
    //                 this.setState({
    //                     error: data.message,
    //                 });
    //             }
    //         })
    //         .catch(function (err) {
    //             console.log("err in POST /resetpassword/verify: ", err);
    //         });
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
                        {this.state.error && (
                            <p className="error">
                                Oops!! something went wrong, please fill out all
                                the fields!
                            </p>
                        )}
                        <input
                            onChange={(e) => this.handleChange(e)}
                            required
                            name="email"
                            type="text"
                            placeholder="email"
                        />
                        <button
                            onClick={(e) => this.resetUserPassword1(e)}
                            type="submit"
                            className="resetbttn"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
                {this.state.step == 2 && (
                    <div className="reset">
                        <h2>
                            Please enter the 5 digit code you received via email
                        </h2>
                        {this.state.error && (
                            <p className="error">
                                Oops!! something went wrong, please fill out all
                                the fields!
                            </p>
                        )}
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="code"
                            type="text"
                            placeholder="code"
                        />
                        <h2>Please enter your new password</h2>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            type="password"
                            placeholder="new password"
                        />
                        <button
                            onClick={(e) => this.resetUserPassword2(e)}
                            type="submit"
                            className="resetbttn"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
                {this.state.step == 3 && (
                    <div className="reset">
                        <h2>Success!</h2>

                        <h2>
                            You can now <Link to="/login">Login</Link>
                        </h2>
                    </div>
                )}
            </div>
        );
    }
}
