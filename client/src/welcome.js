import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <HashRouter>
                {/* //we need to wrap everything in the hashrouter in a div => we can have as many routes as we want 
                //links work because they are in HashRouter*/}
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
