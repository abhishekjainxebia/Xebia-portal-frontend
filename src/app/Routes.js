// route configuration
import React from "react";

import {
            BrowserRouter as Router, 
            //HashRouter as Router,
            Route, 
            Redirect,
            Switch,
            } from "react-router-dom";

        
import {App} 
        from "./App";


import Home from "./components/Home";
import Login from "./containers/Login";
import AuthRoute from "./components/AuthRoute";
import Employee from "./containers/Employee";
import Project from "./containers/Project";
// import ProductList from "./cart/containers/ProductList";
// //default import, alias by default
// import ReduxHome from "./containers/ReduxHome";

 
// functional component
export default function Routes(props) {
    return (
        <Router>
            <App>
                <Switch>
                    <AuthRoute path="/" exact  component={Home} />
                    <AuthRoute path='/employee'  component={Employee} />
                    <AuthRoute path='/project' component={Project} />
                    {/* <Route path="/about" exact  component={About} /> */}
                    <Route path="/login" history={history} exact  component={Login} />
                </Switch>
            </App>
        </Router>
    )
}
