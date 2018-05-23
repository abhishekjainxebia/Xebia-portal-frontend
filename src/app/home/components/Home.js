import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import Navbar from "../../components/Navbar"

export default class Home extends Component {

    componentWillMount(){
        
    }

    componentDidMount(){
        this.props.fetchEmployees();
        this.props.fetchProjects();
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="homeButtons">
                    <div className="button-row row">
                        <div className="col-md-5"></div>
                        <div className="col-md-1 homeButton">
                            <NavLink to="/home/employee" className="roundedbutton" exact activeClassName="success" >
                                Employee
                            </NavLink>
                        </div>
                        
                    </div>
                    <br/><br/><br/>
                    <div className="button-row row">
                        <div className="col-md-5"></div>
                        <div className="col-md-1 col-md-offset-3 homeButton">
                            <NavLink to="/home/project" className="roundedbutton" exact activeClassName="success" >
                                Project
                            </NavLink>
                        </div>
                       
                    </div>
                    <br/><br/><br/>
                    <div className="button-row row">
                        <div className="col-md-5"></div>
                        <div className="col-md-1 col-md-offset-3 homeButton">
                            <NavLink to="/home/report" className="roundedbutton" exact activeClassName="success" >
                                Report
                            </NavLink>
                        </div>
                    </div> 
                </div>  
            </div>
        )
    }
}

