
import React, {Component} from "react";
import cookie from 'react-cookies'
import PropTypes from "prop-types";
import * as authApi from "../state/service";

const storage = window.sessionStorage;


export default class Login extends Component {
    constructor(props,context) {
        super(props,context);

        this.state={
            loginCredentials:{
                username:'',
                password:''
            }
        }
    }
    
    
    changeValue = (e) => {
        const { value, name } = e.target;
        this.state.loginCredentials = Object.assign({}, this.state.loginCredentials , {[name]: value}) 
    }

    login=(e,history)=>{
        console.log("login");
        e.preventDefault();
        const {username, password}=this.state.loginCredentials;
        let user = {username, password};
        authApi.login(user)
        .then((data) => {
            if(data.code == 1000){
                //const header = data.headers.entries()
                //console.log(header);
                this.props.loginSuccess();
                storage.setItem("authToken",data.authToken)
                cookie.save('authToken', data.authToken, { path: '/' })

                alert("Login success");
                this.props.history.push("/");
            }
        },
        (error) =>{
            alert("failed");
        }
        );  
        
        //
    }
    
    render() {
        return (
            <div>
                <div className="row loginPage">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="loginPanel">
                            <form onSubmit={this.login}>
                                <div className="form-group">
                                    <input className="form-control" name="username" type="text" required
                                        onChange={(e) => this.changeValue(e)} placeholder="Emp ID"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" name="password" type="password" required
                                        onChange={(e) => this.changeValue(e)} placeholder="Password"/>
                                </div>
                                <div className="">
                                    <center><input className="loginButton" type="submit" value="Sign In"/></center>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-4"></div>
                </div>
            </div>
        )
    }
} 


Login.defaultProps = {
    
}

Login.propTypes = {
    
}