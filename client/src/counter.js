// src/counter.js

import { Component } from "react";

//class component
export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "kathy",
            count: 0,
        };
        //this is an alternative syntax for binding. you use either this Or the arrow function in render
        // this.handleClick = this.handleClick.bind(this);
    }
    // this is the equivalent to "mounter" in Vue.js
    componentDidMount() {
        console.log("counter mounted");
        //componentDidMount is a good place to fetch data from a server with axios
        this.setState({
            first: "cardamom",
        });
    }

    handleClick() {
        //console.log("click on buttom!");
        this.setState({
            count: this.state.count + 1,
        });
    }
    render() {
        console.log(this.props, "this.props");
        return (
            <div>
                <h1>The current count is:{this.state.count}</h1>
                <h3>{this.props.name}</h3>
                {/* //onClick is a click listener */}
                <button onClick={() => this.handleClick()}>click!</button>
                <p>Im the counter component!</p>
                <p>first in state is: {this.state.first}</p>
            </div>
        );
    }
}

//binding means using the arrpw function syntax - like on line 43

//here is a rpops look in a function component:
//function Counter(props){
//   props.name
//};
