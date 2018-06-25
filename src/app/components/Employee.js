import React, { Component, PureComponent } from "react";
import Header from './Navbar'
import PropTypes from "prop-types";
import Moment from 'react-moment';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import EmployeeAddress from '../containers/EmployeeAddress';
import EmployeeProject from '../containers/EmployeeProject';
import EmployeeSkill from '../containers/EmployeeSkill';


export default class Employee extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            empDetailHidden: true,
            createNewEmployee: false,
            resultSectionHidden: false,
            searchResultSectionHidden: true,
            searchResult: [],
            empSkillHidden: true,
            empProjectHidden: true,
            empAddressHidden: true,
            disableEmpDetails: true,
            empType:[]
        }
    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            const { emp_id } = this.props.location.state
            console.log("emp_id " + emp_id) // "bar"
            this.getEmployeeDetails(emp_id);
        }
        this.setState({
            empType:new Array( "developer", "manager", "architect" )
        })
        //     this.setState({
        //         detail: false,
        //     })
        // } else {
        //     this.setState({
        //         detail: true,
        //     })
        // }

    }

    // populateDropDown(){
        
    //     this.setState({
    //         suggestion:empType,
    //         suggestionHidden:false
            
    //     })
        

    // }

    editEmployee() {
        this.setState({
            disableEmpDetails: false
        })
    }

    getEmployeeDetailsFromList(id) {
        console.log(id);
        var i, y = [];
        for (i in this.props.employeeList) {

            if (this.props.employeeList[i].emp_id.toLowerCase() == id.toLowerCase()) {
                this.props.updateEmployee(this.props.employeeList[i])
            }
        }
    }

    getEmployeeDetails(id) {
        this.setState({
            empDetailHidden: false,
            empAddressHidden:true,
            disableEmpDetails:true,
            empProjectHidden:true,
            createNewEmployee:false,
            empSkillHidden:true
        })
        console.log(id);
        this.props.fetchEmployeeDetails(id);
    }

    getEmployeeAddress(id) {
        this.getEmployeeDetailsFromList(id)
        this.props.getEmployeePermenentAddress(id);
        this.props.getEmployeeCurrentAddress(id);
        this.setState({
            empAddressHidden: false,
            empDetailHidden: true,
            empProjectHidden: true,
            empSkillHidden:true
        })
        this.setState({

        })

    }

    getEmployeeProjects(id) {
        const callback = (employeePorjectList) => {
            if (employeePorjectList.code == undefined) {
                let i, j;
                for (i in employeePorjectList) {
                    for (j in this.props.projectList) {
                        if (employeePorjectList[i].project_id == this.props.projectList[j].id) {
                            employeePorjectList[i].project_name = this.props.projectList[j].name;
                        }
                    }
                    console.log("name !!!!" + employeePorjectList[i].project_name)
                }
                this.props.initiateEmployeeProjects(employeePorjectList)
                this.setState({
                    empProjectHidden: false,
                    empDetailHidden: true,
                    empAddressHidden: true
                })
                //}
            } else {
                alert(employeePorjectList.description)
                this.setState({
                    employeeProjects: true,
                })
            }
        }
        this.getEmployeeDetailsFromList(id)
        this.props.getEmployeeProjects(id, callback);
        console.log(this.props.projectList)
        //this.props.getProjectList();
    }

    getEmployeeSkill(id){
        this.setState({
            empProjectHidden: true,
            empDetailHidden: true,
            empAddressHidden: true,
            empSkillHidden:false
        })
    }

    saveNewEmployee() {
        const callbackResult = (saveEmpApiResult) => {
            if (saveEmpApiResult.code != 1008) {
                alert(saveEmpApiResult.description)
            } else {
                alert('Employee successfully saved')
                this.setState({
                    disabled: true,
                    create: false
                })
                this.props.fetchEmployees();
            }
        }
        this.props.saveNewEmployee(this.props.employeeDetails, callbackResult);
    }

    saveUpdatedEmployee() {
        const callbackResult = (data) => {
            if (data.code != 1008) {
                alert(saveEmpApiResult.description)
            } else {
                alert('Employee Successfully Updated')
                this.setState({
                    disabled: true,
                    create: false
                })
                this.props.fetchEmployees();
            }
        }
        this.props.saveUpdatedEmployee(this.props.employeeDetails, callbackResult);
    }

    onCancel() {
        this.setState({
            disabled: true
        })
    }

    searchInList = (e) => {
        var i, x = [];
        for (i in this.props.employeeList) {

            if (this.props.employeeList[i].emp_id.toLowerCase().includes(e.target.value.toLowerCase())) {
                x.push(this.props.employeeList[i]);
            }

            if (this.props.employeeList[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
                x.push(this.props.employeeList[i]);
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

        console.log(x);
    }

    empDetailsChangeValue = (e) => {
        const { value, name } = e.target;
        console.log(e.target.name + e.target.value)
        let employeeDetails = this.props.employeeDetails;
        employeeDetails = Object.assign({}, employeeDetails, { [name]: value })
        console.log("employeedetails " + employeeDetails.emp_id);
        this.props.updateEmployee(employeeDetails);
    }

    showCreateEmployeeForm = () => {
        this.setState({
            empDetailHidden: false,
            disableEmpDetails: false,
            createNewEmployee: true,
            empProjectHidden: true,
            empAddressHidden:true,
            empSkillHidden:true

        })
        let employeeDetails = {
            createdAt: '',
            doj: '',
            email: '',
            emp_id: '',
            emp_type: '',
            exit: null,
            id: null,
            manager: null,
            name: '',
            noSqlRefId: '',
            phone: '',
            role: null,
            skillset: null,
            status: '',
            title: '',
            updatedAt: ''
        }
        this.props.updateEmployee(employeeDetails);
    }

    componentDidMount() {
        this.props.fetchEmployees();
        this.props.fetchProjects();
    }

   


    render() {
        let employeeList = this.props.employeeList || [];
        let projectList = this.props.projectList || [];
        let status = this.props.status;
        let error = this.props.error;
        let employee = this.props.employeeDetails;
        let employeeProjectList = this.props.employeeProjectList || [];
        var momentString = moment(employee.doj).format('YYYY-MM-DD');
        console.log(employeeProjectList)

        if (employeeList == []) {
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
                        <div className="create-new-employee">
                            <i className="fa fa-arrow-circle-up"></i>
                            <button 
                                onClick={() => { this.showCreateEmployeeForm() }} 
                                className="btn btn-xebia-purpleback">
                                Create Employee 
                            </button>
                        </div>
                        <div>Search</div>
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
                                employeeList.map(employee => (
                                    <div className="employee">
                                        <div className="rs-disp-line">
                                            <span>Emp ID </span>:
                                            <span>
                                                <a className="btnLinks"
                                                    onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.emp_id}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="rs-disp-line">
                                            <span>Name </span>:
                                            <span>
                                                <a className="btnLinks" 
                                                    onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.name}
                                                </a>
                                                
                                            </span>
                                        </div>
                                        <div className="criteria-section">
                                            <a href="#" onClick={() => { this.getEmployeeDetails(employee.emp_id) }} >Details</a> |
                                            <a href="#" onClick={() => { this.getEmployeeAddress(employee.emp_id) }} >Address</a> |
                                            <a href="#" onClick={() => { this.getEmployeeProjects(employee.emp_id) }} >Project</a> |
                                            <a href="#" onClick={() => { this.getEmployeeSkill(employee.emp_id) }} >Skills</a> |
                                        </div>
                                        <hr/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="search-result-section" className={this.state.searchResultSection ? 'hidden' : ''}>
                            {
                                this.state.searchResult.map(employee => (
                                    <div className="employee">
                                        <div className="rs-disp-line">
                                            <span>Emp ID </span>:
                                            <span>
                                                <a className="btnLinks" 
                                                    onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.emp_id}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="rs-disp-line">
                                            <span>Name </span>:
                                            <span>
                                                <a className="btnLinks" 
                                                    onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.name}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="criteria-section">
                                            <a href="" onClick={() => { this.getEmployeeDetails(employee.emp_id) }} >Details</a> |
                                            <a href="#" onClick={() => { this.getEmployeeAddress(employee.emp_id) }} >Address</a> |
                                            <a href="" onClick={() => { this.getEmployeeProjects(employee.emp_id) }} >Project</a> |
                                            <a href="#">Skills</a>
                                        </div>
                                        <hr/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='col-sm-9 work-section'>
                        <div id="view-section" className={this.state.empDetailHidden ? 'hidden' : ''}>
                            <div className="component-view container">
                                <div className="component-head">
                                    <h2>Details
                                        <button 
                                            onClick={() => { this.editEmployee() }} 
                                            hidden={this.state.createNewEmployee ? true : false} 
                                            className="pull-right btn btn-xebia">
                                            EDIT <i className="fa fa-edit"></i>
                                        </button>
                                    </h2>
                                </div>
                                <hr/>
                                <div className="component-body row">
                                    <div className="component-body-left col-sm-6">
                                        <div className="form-group row">
                                            <label for="emp_id" className="col-sm-4">Emp ID:</label>
                                            <input 
                                                type="text" 
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.createNewEmployee?false:true} 
                                                className="form-control col-sm-6" 
                                                id="emp_id" 
                                                value={employee.emp_id} 
                                                placeholder="Enter Emp ID" 
                                                name="emp_id" />
                                        </div>
                                    </div>
                                    <div className="component-body-right col-sm-6">
                                        <div className="form-group row">
                                            <label for="name" className="col-sm-4">Name:</label>
                                            <input 
                                                type="text" 
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.disableEmpDetails} 
                                                className="form-control col-sm-6" 
                                                id="name" 
                                                value={employee.name} 
                                                placeholder="Enter name" 
                                                name="name" />
                                        </div>
                                    </div>
                                    <div className="component-body-right col-sm-6">
                                        <div className="form-group row">
                                            <label for="title" className="col-sm-4">Title:</label>
                                            <select 
                                                className="form-control col-sm-6" 
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.disableEmpDetails} 
                                                value={employee.title} 
                                                name="title"
                                                >
                                                <option value="" selected>Select Title</option>
                                                <option value="Consultant">Consultant</option>
                                                <option value="Senior Consultant">Senior Consultant</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="component-body-right col-sm-6">
                                        <div className="form-group row">
                                            <label for="status" className="col-sm-4">Status:</label>
                                            <select 
                                                className="form-control col-sm-6" 
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.disableEmpDetails} 
                                                value={employee.status} 
                                                id="status" 
                                                name="status"
                                                >
                                                <option value="" selected>Select Status</option>
                                                <option value="deployable">Deployable</option>
                                                <option value="soft_blocked">Soft Blocked</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="component-body-right col-sm-6">
                                        <div className="form-group row">
                                            <label for="doj" className="col-sm-4">Date of Joining:</label>
                                            <input
                                                onChange={(e) => this.empDetailsChangeValue(e)}
                                                type="date"
                                                disabled={this.state.disableEmpDetails}
                                                value={moment(employee.doj).format('YYYY-MM-DD')}
                                                className="form-control col-sm-6" id="doj"
                                                name="doj" />
                                        </div>
                                    </div>
                                    <div className="component-body-left col-sm-6">
                                        <div className="form-group row">
                                            <label for="email" className="col-sm-4">Email:</label>
                                            <input 
                                                type="email" 
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.disableEmpDetails} 
                                                value={employee.email} 
                                                className="form-control col-sm-6" 
                                                id="email" 
                                                placeholder="Enter Email" 
                                                name="email" />
                                        </div>
                                    </div>
                                    <div className="component-body-right col-sm-6">
                                        <div className="form-group row">
                                            <label for="phone" className="col-sm-4">Phone:</label>
                                            <input 
                                                type="phone" 
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.disableEmpDetails} 
                                                value={employee.phone} 
                                                className="form-control col-sm-6" 
                                                id="phone" 
                                                placeholder="Enter Phone" 
                                                name="phone" />
                                        </div>
                                    </div>
                                    <div className="component-body-left col-sm-6">
                                        <div className="form-group row">
                                            <label for="emp_type" className="col-sm-4">Emp Type:</label>
                                            <input 
                                                type="text" 
                                                onFocusCapture={()=>this.populateDropDown()}
                                                onChange={(e) => this.empDetailsChangeValue(e)} 
                                                disabled={this.state.disableEmpDetails} 
                                                value={employee.emp_type} 
                                                className="form-control col-sm-6" 
                                                id="emp_type" 
                                                placeholder="Enter Emp Type" 
                                                name="emp_type" 
                                                list="data"
                                                />
                                                <datalist id="data">
                                                    {
                                                        this.state.empType.map((type) => {
                                                            return (
                                                                <option value={type} />
                                                            )
                                                        })
                                                    }
                                                </datalist> 
                                        </div>
                                    </div>
                                </div>
                                <div className="component-footer">
                                    <button 
                                        className="pull-right btn btn-xebia" 
                                        onClick={this.state.createNewEmployee ? () => this.saveNewEmployee() : () => this.saveUpdatedEmployee()} >
                                        <i className="fa fa-save"></i> Save
                                    </button>
                                    <button 
                                        className="pull-right btn btn-xebia" 
                                        onClick={() => this.onCancel()} >
                                        <i className="fa fa-save"></i> Cancel
                                    </button>
                                </div>
                            </div> 
                        </div>
                        <div id="employee-project-section" className={this.state.empProjectHidden ? 'hidden' : ''}>
                            <EmployeeProject />
                        </div>
                        <div id="employee-address-section" className={this.state.empAddressHidden ? 'hidden' : ''}>
                            <EmployeeAddress/>
                        </div>
                        <div id="employee-skill-section" className={this.state.empSkillHidden ? 'hidden' : ''}>
                            <EmployeeSkill/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

Employee.defaultProps = {

}
Employee.propTypes = {

}