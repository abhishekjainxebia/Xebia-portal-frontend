
import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import moment from 'moment'
import {NavLink} from 'react-router-dom';

export default class Project extends Component {
    constructor(props) {
        super(props);

        if (props.location.state != undefined) {
            const { proj_id } = props.location.state
            console.log("proj_id " + proj_id) // "bar"
            this.getProjectDetails(proj_id);
            this.state = {
                hidden: false,
                disabled: true,
                resultSection:false,
                searchResultSection:true,
                searchResult:[]
            }
        } else {
            this.state = {
                hidden: true,
                disabled: true,
                resultSection:false,
                searchResultSection:true,
                searchResult:[]
            }
        }
    }

    getProjectDetails(id){
        this.setState({
            hidden:false,
            create:false,
            disabled:true
        })
        console.log(id);

        this.props.fetchProjectDetails(id);
    }

    editProject(){
        this.setState({
            disabled:false
        })
    }
    
    searchInList = (e) => {
        var i, x = [];
        for (i in this.props.projectList) {
            if(this.props.projectList[i].name.toLowerCase().includes(e.target.value)){
                x.push(this.props.projectList[i]);
            }
        }
        if (e.target.value != "") {
            this.setState({
                resultSection: true,
                searchResultSection: false,
                searchResult: x
            })
        }else{
            this.setState({
                resultSection: false,
                searchResultSection: true,
            })
        }
        
        console.log(x);
    }


    saveNewProject(){
        const callbackResult = (saveEmpApiResult) => {
            if (saveEmpApiResult.code != 1008) {
                alert(saveEmpApiResult.description)
            } else {
                alert('Project successfully saved')
                this.setState({
                    disabled: true,
                    create: false
                })
                this.props.fetchProjects();
            }
        }
        this.props.saveNewProject(this.props.projectDetails, callbackResult);
        
    }

    saveUpdatedProject(){

        const callbackResult = (data) => {
            if (data.code != 1008) {
                alert(data.description)
            } else {
                alert("Project updated successfully")
                this.setState({
                    disabled: true,
                    create: false
                })
                this.props.fetchProjects();
            }
        }
        this.props.saveUpdatedProject(this.props.projectDetails,callbackResult);
    }

    changeValue = (e) => {
        const { value, name } = e.target;

        let projectDetails = this.props.projectDetails;

        projectDetails = Object.assign({}, projectDetails , {[name]: value}) 

        console.log("projectdetails "+projectDetails.name);

        this.props.updateProject(projectDetails);
    }

    showProjectForm = () =>{
        this.setState({
            hidden:false,
            disabled:false,
            create:true
        })
        let projectDetails={
            createdAt:'',
            account_id:'',
            id:null,
            location_id:null,
            manager:'',
            name:'',
            updatedAt:''
        }
        this.props.updateProject(projectDetails);
    }

    componentDidMount() {
    }

    render() {
        let projectList = this.props.projectList || [];
        let status = this.props.status;
        let error = this.props.error;
        let projectDetails = this.props.projectDetails;

        console.log(projectList);
        if (status) {
            return (
                <div>
                <center>
                    <h2>Loading ... </h2>
                    <img src="/assets/loading.gif" />
                </center>
                </div>
            )
        }

        if (projectList==[]) {
            return (
                <div>
                <center>
                    <h2>Loading ... </h2>
                    <img src="/assets/loading.gif" />
                </center>
                </div>
            )
        }

        return (
            <div>
                 <div id="nav-section">
                    <NavLink to="/" className="homeIcon" exact  >
                        <h2> Xebia IT Architects</h2>
                    </NavLink>
                </div>
                <section id="workboard-section" className="row">
                    <div id="sidebar-section" className="col-sm-2">
                        <div>
                            <i className="fa fa-arrow-circle-up"></i>
                                        <button onClick={()=>{this.showProjectForm()}}  className="pull-right btn btn-xebia">
                                            Create New Project <i className="fa fa-edit"></i> 
                                        </button>
                        </div>
                        <div>Search</div>
                        <div className="sidebar container row">
                            <div className="search-section">
                                <div className="input-group mb-3">
                                <input type="text" name="searchbar" className="form-control" onChange={(e)=>this.searchInList(e)} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                                {/* <div className="criteria-section">
                                    <a href="#">Active(default)</a> |
                                    <a href="#">All</a> |
                                    <a href="#">InActive</a>
                                </div> */}
                            </div>
                            <hr/>
                            <div className="result-section" className={this.state.resultSection ? 'hidden' : ''}>
                            {
                                projectList.map(project => (
                                <div className="employee">
                                        <div className="rs-disp-line">
                                                <span>Project </span>:
                                                <span>
                                                    <a className="btnLinks" onClick={() => {this.getProjectDetails(project.id)}}>{project.name}</a>
                                                </span>
                                        </div>
                                        <div className="rs-disp-line">
                                            <span>Project Manager </span>:
                                            <span>
                                            <NavLink to={{ pathname: '/home/employee', state: { emp_id: project.manager} }} className="homeIcon" exact >
                                            {project.manager}
                                            </NavLink>
                                            </span>
                                            <span>
                                                {/* <a href="" data-src="project" data-opt="1">Mckinsey DOF</a>  */}
                                            </span>
                                        </div>
                                        <div className="criteria-section">
                                            <a href="#" onClick={() => {this.getProjectDetails(project.id)}}>Details</a> |
                                            <a href="#">Team</a> |
                                            {/* <a href="#">Skills</a> */}
                                        </div>
                                        <hr/>
                                </div>
                                ))
                            }
                            </div>

                            <div className="search-result-section" className={this.state.searchResultSection ? 'hidden' : ''}>
                            {
                                this.state.searchResult.map(project => (
                                <div className="employee">
                                        <div className="rs-disp-line">
                                                <span>Project </span>:
                                                <span>
                                                    <a className="btnLinks" onClick={() => {this.getProjectDetails(project.id)}}>{project.name}</a>
                                                </span>
                                        </div>
                                        <div className="rs-disp-line">
                                            <span>Project Manager </span>:
                                            <span>
                                            <NavLink to={{ pathname: '/home/employee', state: { emp_id: project.manager} }} className="homeIcon" exact >
                                            {project.manager}
                                            </NavLink>
                                            </span>
                                            <span>
                                                {/* <a href="" data-src="project" data-opt="1">Mckinsey DOF</a>  */}
                                            </span>
                                        </div>
                                        <div className="criteria-section">
                                            <a href="#">Details</a> |
                                            <a href="#">Team</a> |
                                            {/* <a href="#">Skills</a> */}
                                        </div>
                                        <hr/>
                                </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                    <div id="view-section" className={this.state.hidden ? 'hidden' : ''}>
                        <div className="component-view container">
                            <div className="component-head">
                                <h2>Details
                                    <i className="fa fa-arrow-circle-up"></i>
                                        <button onClick={()=>{this.editProject()}} hidden={this.state.create?true:false} className="pull-right btn btn-xebia">
                                            EDIT <i className="fa fa-edit"></i> 
                                        </button>
                                </h2>
                            </div>
                            <hr/>
                            <div className="component-body row">

                                <div className="component-body-left col-sm-6">
                                    <div className="form-group row">
                                        <label for="account_id" className="col-sm-4">Account ID:</label>
                                        <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} className="form-control col-sm-6" id="account_id" value={projectDetails.account_id} placeholder="Enter Account ID" name="account_id"/>
                                    </div>
                                </div>

                                <div className="component-body-left col-sm-6">
                                    <div className="form-group row">
                                        <label for="proj_name" className="col-sm-4">Project Name:</label>
                                        <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} className="form-control col-sm-6" id="name" value={projectDetails.name} placeholder="Enter Project Name" name="name"/>
                                    </div>
                                </div>
                                <div className="component-body-right col-sm-6">
                                    <div className="form-group row">
                                        <label for="proj_mngr_id" className="col-sm-4">Project Manager ID:</label>
                                        <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} className="form-control col-sm-6" id="manager" value={projectDetails.manager} placeholder="Enter Project Manager ID" name="manager"/>
                                    </div>
                                </div>

                                {/* <div className="component-body-right col-sm-6">
                                    <div className="form-group row">
                                        <label for="proj_mngr_name" className="col-sm-4">Project Manager Name:</label>
                                        <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} className="form-control col-sm-6" id="proj_mngr_name"  value={projectDetails.proj_mngr_name} name="proj_mngr_name" placeholder="Enter Project Manager ID"/>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="component-footer">
                            <button className="pull-right btn btn-xebia" onClick={this.state.create?()=>this.saveNewProject():()=>this.saveUpdatedProject()} >
                                <i className="fa fa-save"></i> Save
                            </button>
                            <span className="pull-right btn btn-xebia">
                                <i className="fa fa-cut"></i> Cancel
                            </span>
                            {/* <span className="pull-right btn btn-xebia">
                                <i className="fa fa-ban"></i> Clear
                            </span> */}
                        </div>
                    </div>
                    </div>
                    <br/>
                </section>
            </div>
        )
    }
}

Project.defaultProps = {

}
Project.propTypes = {

}