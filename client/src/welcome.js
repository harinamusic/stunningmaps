import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        // <div>
        //     <div className="generalnavbar">
        //         <div className="topnav">
        //             <a className="active" href="#home">
        //                 Home
        //             </a>
        //             <a href="#news">News</a>
        //             <a href="#contact">Contact</a>
        //             <a href="#about">About</a>
        //         </div>
        //     </div>
        <div>
            <HashRouter>
                {/* //we need to wrap everything in the hashrouter in a div => we can have as many routes as we want 
                //links work because they are in HashRouter*/}
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
