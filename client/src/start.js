//start.js is responsible for turning on/activating React
//not every developer calls this file "start.js" => other names are index.js or app.js
//takes all our React code and appends it to the dom => so that user can see our code
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import Welcome from "./welcome";
import App from "./app";

import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));

// import ReactDOM from "react-dom";
// import { init } from "./socket";
// import Welcome from "./welcome";

// import App from "./app";

// let elem;

// if (location.pathname === "/welcome") {
//     //init(store);
//     // elem =(
//     //     <Provider store={store}>
//     //         <App/>
//     //     </Provider>
//     // )??????? something like this
//     elem = <Welcome />;
// } else {
//     elem = <App />;
// }

// ReactDOM.render(elem, document.querySelector("main"));
// // you can render function or class component => but it only takes one component
// // => so i need to render the other components through my "HelloWold" function component
