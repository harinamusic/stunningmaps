import { Component } from "react";
//any time we use axios from now on - we want to import it from ./axios.js
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            //set error false to start with and only update it to truthy when something goes wrong
        };
        // this.handleChange = this.handleChange.bind(this); defines this => if i do not use an arrow function
    }

    //what we need to do:
    //1. render 4 input fields
    //2. capture the user input and store it somewhere
    //3. when user submits, send the data to the server
    //if something goes wrong => conditionally render an error message
    //if everything goes to perfection, redirect the user '/'

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
        // console.log("clicked the button runs");

        axios
            .post("/register", this.state)
            .then(({ data }) => {
                console.log("data", data);

                if (data.success === true) {
                    window.location.href = "/";
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
                <Link to="/login">Click me to go to login</Link>
                <h1>This is our registration component</h1>
                {/* //has to be truthy in order to see it */}
                {this.state.error && (
                    <p className="error">Oops!! something went wrong</p>
                )}
                {/* //name is how it gets added to req.body => so first Name would be accessed by req.body.first */}
                <input
                    type="text"
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="text"
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                />
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
                <button onClick={() => this.handleClick()}>register</button>
            </div>
        );
    }
}
