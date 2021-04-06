import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <header>
                <h1>
                    Welcome to
                    <br />
                    WONDER
                </h1>
                <h2>
                    Your creative Network - find a creative team to help you
                    realise your vision
                </h2>
                <img id="pagelogoleft" src="wonderlogo.jpeg" alt="wonder" />
                <img id="pagelogoright" src="wonderlogo.jpeg" alt="wonder" />
            </header>
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
