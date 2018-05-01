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
import Statelist from "./states/containers/Statelist";
import StateView from "./states/containers/Stateview";
import StateEdit from "./states/containers/StateEdit";
import Statecreate from "./states/containers/Statecreate";
import Login from "./auth/containers/Login";
import AuthRoute from "./auth/components/AuthRoute";
import Employee from "./employee/containers/Employee";
import Project from "./project/containers/Project";
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
                    <AuthRoute path='/home/employee'  component={Employee} />
                    <AuthRoute path='/home/project' component={Project} />
                    {/* <Route path="/about" exact  component={About} /> */}
                    <Route path="/login" history={history} exact  component={Login} />
                    <Route path="/statelist" exact  component={Statelist} />
                    <Route path="/statelist/view/:id" exact  component={StateView} />
                    <Route path="/statelist/edit/:id" exact  component={StateEdit} />
                    <Route path="/statelist/create" exact component={Statecreate}/>
                </Switch>
            </App>
        </Router>
    )
}
