import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Navbar from "./Navbar"

export default class Home extends Component {

    componentWillMount() {

    }

    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="homeButtons">
                    <div className="button-row row">
                        <NavLink to="/employee" className="col-1 homeButton" exact>
                            <button >
                                Employee
                                </button>
                        </NavLink>
                        <NavLink to="/project" className="col-1 homeButton" exact>
                            <button >
                                Project
                                </button>
                        </NavLink>
                        <NavLink to="/report" className="col-1 homeButton" exact>
                            <button >
                                Report
                                </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

