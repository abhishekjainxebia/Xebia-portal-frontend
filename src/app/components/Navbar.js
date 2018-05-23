
import React, {Component} from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

const storage = window.sessionStorage;

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            logoutHidden:false
        }
    }
    componentWillMount(props) {
        if(this.props.logoutHidden==true){
            this.setState({
                logoutHidden:true
            })
        }
    }

    logout(){
        storage.removeItem("isAuthenticated")
        location.reload();
    }

    componentDidMount(){
    }
    render() {
        return (
            <div id="nav-section" className="row">
                    <div className="col-3" id="homeIconNav">
                            <NavLink to="/" className="homeIcon" exact>
                                Xebia IT Architects
                            </NavLink>
                    </div>
                    <div className={this.state.logoutHidden ? 'hidden' : 'col-9'}>
                        <button className="float-right btn btn-xebia-2" onClick={()=>this.logout()}>
                                    Logout
                        </button>
                    </div>
            </div>
        )
    }
} 


Navbar.defaultProps = {
    
}

Navbar.propTypes = {
    
}