//start.js is responsible for turning on/activating React
//not every developer calls this file "start.js" => other names are index.js or app.js
//takes all our React code and appends it to the dom => so that user can see our code

// import HelloWorld from "./helloworld";
// import Registration from "./registration";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>your logo component should go here</p>;
}

ReactDOM.render(elem, document.querySelector("main"));
// you can render function or class component => but it only takes one component
// => so i need to render the other components through my "HelloWold" function component
