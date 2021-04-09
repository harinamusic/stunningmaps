import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        //similar to the one in app.js
        const { data } = axios.get(`/user/${this.props.match.params.id}.json`);
        if (data.invalid == true) {
            //maybe render an error message instead of redirecting?
            //history.push is how to redirect in React Browser Router
            this.props.history.push("/");
        }
        this.setState(data);
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.first}
                    {this.state.last}
                </h1>
                <p>{this.state.bio}</p>
            </div>
        );
    }
}
