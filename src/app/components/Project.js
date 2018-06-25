
import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import Header from './Navbar'
import Moment from 'react-moment';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import ProjectTeam from '../containers/ProjectTeam';

export default class Project extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            projDetailsHidden: true,
            projTeamHidden:true,
            projDetailsDisabled: true,
            resultSection: false,
            createNewProject: false,
            searchResultSection: true,
            searchResult: []
        }
    }

    componentWillMount(){
        if (this.props.location.state != undefined) {
            const { proj_id } = this.props.location.state
            console.log("proj_id " + proj_id) // "bar"
            this.getProjectDetails(proj_id);
        }
    }

    getProjectDetails(id) {
        this.setState({
            projDetailsHidden: false,
            createNewProject: false,
            projDetailsDisabled: true,
            projTeamHidden:true
        })
        this.props.fetchProjectDetails(id);
    }

    getProjectTeam(id){
        const callback=(projEmpList)=>{
            let employeelist=this.props.employeeList;
            if (projEmpList.code == undefined) {
                let i, j;
                let projectTeam=[]
                for (i in projEmpList) {
                    if (projEmpList[i].project_id == id) {
                        for (j in employeelist) {
                            if(projEmpList[i].emp_id==employeelist[j].id){
                                projEmpList[i].empName=employeelist[j].name
                                projectTeam.push(projEmpList[i])
                            }
                        }
                    }
                }
                console.log(projectTeam)
                this.props.initProjEmpList(projectTeam)
            }
            else {
                alert(projEmpList.description)
                this.setState({
                    
                })
            }
        }
        this.props.getProjEmpList(callback);
        this.setState({
            projDetailsHidden: true,
            createNewProject: false,
            projDetailsDisabled: true,
            projTeamHidden:false
        })
    }
    searchInList = (e) => {
        var i, x = [];
        for (i in this.props.projectList) {
            if (this.props.projectList[i].name.toLowerCase().includes(e.target.value)) {
                x.push(this.props.projectList[i]);
            }
        }
        if (e.target.value != "") {
            this.setState({
                resultSection: true,
                searchResultSection: false,
                searchResult: x
            })
        } else {
            this.setState({
                resultSection: false,
                searchResultSection: true,
            })
        }
    }

    saveNewProject() {
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

    saveUpdatedProject() {
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
        this.props.saveUpdatedProject(this.props.projectDetails, callbackResult);
    }

    changeValue = (e) => {
        const { value, name } = e.target;
        let projectDetails = this.props.projectDetails;
        projectDetails = Object.assign({}, projectDetails, { [name]: value })
        console.log("projectdetails " + projectDetails.name);
        this.props.updateProject(projectDetails);
    }

    showProjectForm = () => {
        this.setState({
            projDetailsHidden: false,
            projDetailsDisabled: false,
            createNewProject: true
        })
        let projectDetails = {
            createdAt: '',
            account_id: '',
            id: null,
            location_id: null,
            manager: '',
            name: '',
            updatedAt: ''
        }
        this.props.updateProject(projectDetails);
    }

    componentDidMount() {
        this.props.fetchEmployees();
        this.props.fetchProjects();
    }

    render() {
        let projectList = this.props.projectList || [];
        let status = this.props.status;
        let error = this.props.error;
        let projectDetails = this.props.projectDetails;

        if (projectList == []) {
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
                <Header />
                <section id="workboard-section" className="row">
                    <div id="sidebar-section" className="col-sm-2">
                        <div>
                            <button
                                onClick={() => { this.showProjectForm() }}
                                className="btn btn-xebia-purpleback">
                                Create Project
                            </button>
                        </div>
                        <div>Search</div>
                        <div className="sidebar container row">
                            <div className="search-section">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        name="searchbar" 
                                        className="form-control" 
                                        onChange={(e) => this.searchInList(e)} 
                                        placeholder="Recipient's username" 
                                        aria-label="Recipient's username" 
                                        aria-describedby="basic-addon2" 
                                            />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="result-section" className={this.state.resultSection ? 'hidden' : ''}>
                                {
                                    projectList.map((project) => {
                                        let projManagerName="";
                                        var i =0;
                                        for (i in this.props.employeeList) {
                                            if (this.props.employeeList[i].emp_id.toLowerCase()==project.manager.toLowerCase()) {
                                                projManagerName=this.props.employeeList[i].name;
                                                break;
                                            }
                                        }
                                        return(
                                            <div className="employee">
                                                <div className="rs-disp-line">
                                                    <span>Project </span>:
                                                    <span>
                                                        <a className="btnLinks" 
                                                            onClick={() => { this.getProjectDetails(project.id) }}>{project.name}
                                                                </a>
                                                    </span>
                                                </div>
                                                <div className="rs-disp-line">
                                                    <span>Project Manager </span>:
                                                    <span>
                                                        <NavLink to={{ pathname: '/employee', state: { emp_id: project.manager } }} className="btnLinks" exact >
                                                            {projManagerName}
                                                        </NavLink>
                                                    </span>
                                                </div>
                                                <div className="criteria-section">
                                                    <a href="#" onClick={() => { this.getProjectDetails(project.id) }}>Details</a> |
                                                    <a href="#" onClick={() => { this.getProjectTeam(project.id) }}>Team</a>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="search-result-section" className={this.state.searchResultSection ? 'hidden' : ''}>
                                {
                                    this.state.searchResult.map(project => (
                                        <div className="employee">
                                            <div className="rs-disp-line">
                                                <span>Project </span>:
                                                <span>
                                                    <a className="btnLinks" 
                                                        onClick={() => { this.getProjectDetails(project.id) }}>{project.name}
                                                            </a>
                                                </span>
                                            </div>
                                            <div className="rs-disp-line">
                                                <span>Project Manager </span>:
                                                <span>
                                                    <NavLink to={{ pathname: '/employee', state: { emp_id: project.manager } }} className="btnLinks" exact >
                                                        {project.manager}
                                                    </NavLink>
                                                </span>
                                            </div>
                                            <div className="criteria-section">
                                                <a href="" onClick={() => { this.getProjectDetails(project.id) }}>Details</a> |
                                                <a href="" onClick={() => { this.getProjectTeam(project.id) }}>Team</a>
                                            </div>
                                            <hr />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-9 work-section">
                        <div id="view-section" className={this.state.projDetailsHidden ? 'hidden' : ''}>
                            <div className="component-view container">
                                <div className="component-head">
                                    <h2>Details
                                        <button 
                                            onClick={() => this.setState({ projDetailsDisabled: false })} 
                                            hidden={this.state.createNewProject ? true : false} 
                                            className="pull-right btn btn-xebia"
                                                >
                                            EDIT
                                        </button>
                                    </h2>
                                </div>
                                <hr />
                                <div className="component-body row">
                                    <div className="component-body-left col-sm-6">
                                        <div className="form-group row">
                                            <label for="account_id" className="col-sm-4">Account ID:</label>
                                            <input 
                                                type="text" 
                                                onChange={(e) => this.changeValue(e)} 
                                                disabled={this.state.projDetailsDisabled} 
                                                className="form-control col-sm-6" 
                                                id="account_id" 
                                                value={projectDetails.account_id} 
                                                placeholder="Enter Account ID" 
                                                name="account_id" 
                                                />
                                        </div>
                                    </div>
                                    <div className="component-body-left col-sm-6">
                                        <div className="form-group row">
                                            <label for="proj_name" className="col-sm-4">Project Name:</label>
                                            <input 
                                                type="text" 
                                                onChange={(e) => this.changeValue(e)} 
                                                disabled={this.state.projDetailsDisabled} 
                                                className="form-control col-sm-6" 
                                                id="name" 
                                                value={projectDetails.name} 
                                                placeholder="Enter Project Name" 
                                                name="name" 
                                                />
                                        </div>
                                    </div>
                                    <div className="component-body-right col-sm-6">
                                        <div className="form-group row">
                                            <label for="proj_mngr_id" className="col-sm-4">Project Manager ID:</label>
                                            <input 
                                                type="text" 
                                                onChange={(e) => this.changeValue(e)} 
                                                disabled={this.state.projDetailsDisabled} 
                                                className="form-control col-sm-6" 
                                                id="manager" 
                                                value={projectDetails.manager} 
                                                placeholder="Enter Project Manager ID" 
                                                name="manager" 
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="component-footer">
                                    <button 
                                        className="pull-right btn btn-xebia" 
                                        onClick={this.state.createNewProject ? () => this.saveNewProject() : () => this.saveUpdatedProject()} 
                                        >
                                        Save
                                    </button>
                                    <button 
                                        className="pull-right btn btn-xebia" 
                                        // onClick={this.state.create ? () => this.saveNewProject() : () => this.saveUpdatedProject()} 
                                        >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="project-team-section" className={this.state.projTeamHidden ? 'hidden' : ''}>
                            <ProjectTeam />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

Project.defaultProps = {

}
Project.propTypes = {

}