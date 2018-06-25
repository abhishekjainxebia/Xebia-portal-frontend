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
                    <div className="row">
                        <NavLink to="/employee" className="col-4 " exact>
                            <button className="btn-home">
                                Employee
                                </button>
                        </NavLink>
                        <NavLink to="/project" className="col-4 " exact>
                            <button className="btn-home">
                                Project
                                </button>
                        </NavLink>
                        <NavLink to="/report" className="col-4" exact>
                            <button className="btn-home">
                                Report
                                </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

