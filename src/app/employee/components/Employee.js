import React, { Component, PureComponent } from "react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import PropTypes from "prop-types";
import Moment from 'react-moment';
import moment from 'moment'
import { Checkbox } from 'material-ui';
import { NavLink } from 'react-router-dom';


export default class Employee extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            detail: true,
            create: false,
            disableEmpDetails: true,
            disablePerAdd: true,
            disableCurAdd: true,
            resultSection: false,
            searchResultSection: true,
            searchResult: [],
            employeeProjects: true,
            address: true,
            samePermAndCurAddress: false
        }
    }

    componentWillMount() {
        if (this.props.location.state != undefined) {
            const { emp_id } = this.props.location.state
            console.log("emp_id " + emp_id) // "bar"
            this.getEmployeeDetails(emp_id);
            this.setState({
                detail: false,
            })
        } else {
            this.setState({
                detail: true,
            })
        }


    }

    editEmployee() {
        this.setState({
            disableEmpDetails: false
        })
    }

    editPerAddress() {
        this.setState({
            disablePerAdd: false
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
            detail: false,
            create: false,
            disabled: true,
            employeeProjects: true,
            address:true
        })
        console.log(id);
        this.props.fetchEmployeeDetails(id);
    }

    getEmployeeAddress(id) {
        this.getEmployeeDetailsFromList(id)
        this.props.getEmployeePermenentAddress(id);
        this.props.getEmployeeCurrentAddress(id);
        this.setState({
            address: false,
            detail: true,
            employeeProjects:true,
            samePermAndCurAddress: false
        })
        this.setState({

        })

    }

    getEmployeeProjects(id) {
        const callback = (employeePorjectList) => {
            if (employeePorjectList.code == undefined) {
                let i, j;
                //for (i in employeePorjectList) {
                for (j in this.props.projectList) {
                    // console.log(employeePorjectList.project_id)
                    // console.log(this.props.projectList[j].id)
                    if (employeePorjectList.project_id == this.props.projectList[j].id) {
                        employeePorjectList.project_name = this.props.projectList[j].name;
                    }
                }
                console.log("name " + employeePorjectList.project_name)
                this.props.initiateEmployeeProjects(employeePorjectList)
                this.setState({
                    employeeProjects: false,
                    detail: true,
                    address:true
                })
                //}
            } else {
                alert(employeePorjectList.description)
                this.setState({
                    employeeProjects: true,
                    detail: true,
                })
            }
        }
        this.getEmployeeDetailsFromList(id)
        this.props.getEmployeeProjects(id, callback);
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

    saveUpdatedAddress(addressType) {
        const callbackResult = (data) => {
            if (data.code != 1008) {
                alert(data.description)
            } else {
                alert('Employee Address Successfully Updated')
                this.setState({
                    disabled: true,
                    create: false
                })
                this.props.fetchEmployees();
            }
        }
        if (addressType == 'permanent')
            this.props.saveUpdatedAddress(this.props.employeeDetails.emp_id, this.props.employeePermanentAddress, callbackResult);
        else if (addressType == 'current')
            this.props.saveUpdatedAddress(this.props.employeeDetails.emp_id, this.props.employeeCurrentAddress, callbackResult);
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

    changeValue = (e) => {
        const { value, name } = e.target;
        console.log(e.target.name + e.target.value)
        let employeeDetails = this.props.employeeDetails;
        employeeDetails = Object.assign({}, employeeDetails, { [name]: value })
        console.log("employeedetails " + employeeDetails.emp_id);
        this.props.updateEmployee(employeeDetails);
    }

    changeValuePermanentAddress = (e, e_name, e_value) => {
        let employeePermanentAddress = this.props.employeePermanentAddress;
        if (e == null) {
            console.log(e_name + " " + e_value)
            employeePermanentAddress = Object.assign({}, employeePermanentAddress, { [e_name]: e_value })
            console.log(employeePermanentAddress.country)
        } else {
            const { value, name } = e.target;
            console.log(e.target.name + e.target.value)
            employeePermanentAddress = Object.assign({}, employeePermanentAddress, { [name]: value })
        }
        this.props.updatePermanentAddress(employeePermanentAddress);
    }

    changeValueCurrentAddress = (e, e_name, e_value) => {
        let employeeCurrentAddress = this.props.employeeCurrentAddress;
        if (e == null) {
            console.log(e_name + " " + e_value)
            employeeCurrentAddress = Object.assign({}, employeeCurrentAddress, { [e_name]: e_value })
            console.log(employeeCurrentAddress.country)
        } else {
            const { value, name } = e.target;
            console.log(e.target.name + e.target.value)
            employeeCurrentAddress = Object.assign({}, employeeCurrentAddress, { [name]: value })
        }
        this.props.updateCurrentAddress(employeeCurrentAddress);
    }

    showEmployeeForm = () => {
        this.setState({
            detail: false,
            disabled: false,
            create: true
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
    }

    currentAddSamePermanentAdd(e) {
        this.setState({
            samePermAndCurAddress: !this.state.samePermAndCurAddress
        })
    }

    render() {
        let employeeList = this.props.employeeList || [];
        let projectList = this.props.projectList || [];
        let status = this.props.status;
        let error = this.props.error;
        let employee = this.props.employeeDetails;
        let employeeProjectList = this.props.employeeProjectList || [];
        let employeePermanentAddress = this.props.employeePermanentAddress || [];
        let employeeCurrentAddress = this.props.employeeCurrentAddress || [];

        var momentString = moment(employee.doj).format('YYYY-MM-DD');

        if (this.state.samePermAndCurAddress) {
            let employeeCurrentAddress = this.props.employeePermanentAddress;
            this.props.updateCurrentAddress(employeeCurrentAddress);
        }

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
                <div id="nav-section" class="row">
                    <div class="col-3" id="homeIconNav">
                    <NavLink to="/" className="homeIcon" exact  >
                        <h2> Xebia IT Architects</h2>
                    </NavLink>
                    </div>
                </div>
                <section id="workboard-section" class="row">
                    <div id="sidebar-section" class="col-sm-2">
                        <div class="create-new-employee">
                            <i class="fa fa-arrow-circle-up"></i>
                            <button onClick={() => { this.showEmployeeForm() }} class="pull-right btn btn-xebia">
                                Create Employee <i class="fa fa-edit"></i>
                            </button>
                        </div>
                        <div>Search</div>
                        <div class="search-section">
                            <div class="input-group mb-3">
                                <input type="text" name="searchbar" class="form-control" onChange={(e) => this.searchInList(e)} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="result-section" className={this.state.resultSection ? 'hidden' : ''}>
                            {
                                employeeList.map(employee => (
                                    <div class="employee">
                                        <div class="rs-disp-line">
                                            <span>Emp ID </span>:
                                                <span>
                                                <a class="btnLinks" onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.emp_id}</a>
                                            </span>
                                        </div>
                                        <div class="rs-disp-line">
                                            <span>Name </span>:
                                            <span>
                                                <a class="btnLinks" onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.name}</a>
                                                {/* <NavLink to={{ pathname: '/home/project', state: { proj_id: '1'} }} className="roundedbutton" exact activeClassName="success" >
                                                Employee
                                            </NavLink> */}
                                            </span>
                                            <span>
                                                {/* <a href="" data-src="project" data-opt="1">Mckinsey DOF</a>  */}
                                            </span>
                                        </div>
                                        <div class="criteria-section">
                                            <a href="#" onClick={() => { this.getEmployeeDetails(employee.emp_id) }} >Details</a> |
                                                <a href="#" onClick={() => { this.getEmployeeAddress(employee.emp_id) }} >Address</a> |
                                                <a href="#" onClick={() => { this.getEmployeeProjects(employee.emp_id) }} >Project</a> |
                                            {/* <a href="#">Team</a> | */}
                                            <a href="#">Skills</a>
                                        </div>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="search-result-section" className={this.state.searchResultSection ? 'hidden' : ''}>

                            {
                                this.state.searchResult.map(employee => (
                                    <div class="employee">
                                        <div class="rs-disp-line">
                                            <span>Emp ID </span>:
                                                <span>
                                                <a class="btnLinks" onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.emp_id}</a>
                                            </span>
                                        </div>
                                        <div class="rs-disp-line">
                                            <span>Name </span>:
                                            <span>
                                                <a class="btnLinks" onClick={() => { this.getEmployeeDetails(employee.emp_id) }}>{employee.name}</a>
                                                {/* <NavLink to={{ pathname: '/home/project', state: { proj_id: '1'} }} className="roundedbutton" exact activeClassName="success" >
                                                Employee
                                            </NavLink> */}
                                            </span>
                                            <span>
                                                {/* <a href="" data-src="project" data-opt="1">Mckinsey DOF</a>  */}
                                            </span>
                                        </div>
                                        <div class="criteria-section">
                                            <a href="" onClick={() => { this.getEmployeeDetails(employee.emp_id) }} >Details</a> |
                                                <a href="#" onClick={() => { this.getEmployeeAddress(employee.emp_id) }} >Address</a> |
                                                <a href="" onClick={() => { this.getEmployeeProjects(employee.emp_id) }} >Project</a> |
                                            {/* <a href="#">Team</a> | */}
                                            <a href="#">Skills</a>
                                        </div>
                                        <hr />
                                    </div>
                                ))

                            }
                        </div>
                    </div>
                    <div className='col-sm-9 work-section'>
                        <div id="view-section" className={this.state.detail ? 'hidden' : ''}>
                            <div class="component-view container">
                                <div class="component-head">
                                    <h2>Details
                                        <button onClick={() => { this.editEmployee() }} detail={this.state.create ? true : false} class="pull-right btn btn-xebia">
                                            EDIT <i class="fa fa-edit"></i>
                                        </button>
                                    </h2>
                                </div>
                                <hr />
                                <div class="component-body row">
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="emp_id" class="col-sm-4">Emp ID:</label>
                                            <input type="text" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} class="form-control col-sm-6" id="emp_id" value={employee.emp_id} placeholder="Enter Emp ID" name="emp_id" />
                                        </div>
                                    </div>
                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="name" class="col-sm-4">Name:</label>
                                            <input type="text" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} class="form-control col-sm-6" id="name" value={employee.name} placeholder="Enter name" name="name" />
                                        </div>
                                    </div>
                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="title" class="col-sm-4">Title:</label>
                                            <select class="form-control col-sm-6" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} value={employee.title} name="title">
                                                <option value="" selected>Select Title</option>
                                                <option value="Consultant">Consultant</option>
                                                <option value="Senior Consultant">Senior Consultant</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="status" class="col-sm-4">Status:</label>
                                            <select class="form-control col-sm-6" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} value={employee.status} id="status" name="status">
                                                <option value="" selected>Select Status</option>
                                                <option value="deployable">Deployable</option>
                                                <option value="soft_blocked">Soft Blocked</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="doj" class="col-sm-4">Date of Joining:</label>
                                            <input
                                                onChange={(e) => this.changeValue(e)}
                                                type="date"
                                                disabled={this.state.disableEmpDetails}
                                                value={moment(employee.doj).format('YYYY-MM-DD')}
                                                class="form-control col-sm-6" id="doj"
                                                name="doj" />
                                        </div>
                                    </div>
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="email" class="col-sm-4">Email:</label>
                                            <input type="email" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} value={employee.email} class="form-control col-sm-6" id="email" placeholder="Enter Email" name="email" />
                                        </div>
                                    </div>
                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="phone" class="col-sm-4">Phone:</label>
                                            <input type="phone" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} value={employee.phone} class="form-control col-sm-6" id="phone" placeholder="Enter Phone" name="phone" />
                                        </div>
                                    </div>
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="emp_type" class="col-sm-4">Emp Type:</label>
                                            <input type="text" onChange={(e) => this.changeValue(e)} disabled={this.state.disableEmpDetails} value={employee.emp_type} class="form-control col-sm-6" id="emp_type" placeholder="Enter Emp Type" name="emp_type" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="component-footer">
                                <button class="pull-right btn btn-xebia" onClick={this.state.create ? () => this.saveNewEmployee() : () => this.saveUpdatedEmployee()} >
                                    <i class="fa fa-save"></i> Save
                            </button>
                                <span class="pull-right btn btn-xebia" onClick={() => this.onCancel()} >
                                    <i class="fa fa-cut"></i> Cancel
                            </span>
                                {/* <span class="pull-right btn btn-xebia">
                                <i class="fa fa-ban"></i> Clear
                            </span> */}
                            </div>
                        </div>
                        <div id="employee-project-section" className={this.state.employeeProjects ? 'hidden' : ''}>
                            <div class="component-view container">
                                <div class="component-head">
                                    <h2>Project details of {employee.name}
                                        <i class="fa fa-arrow-circle-up"></i>
                                        {/* <button onClick={()=>{this.editEmployee()}} detail={this.state.create?true:false} class="pull-right btn btn-xebia">
                                            EDIT <i class="fa fa-edit"></i> 
                                        </button> */}
                                    </h2>
                                    <hr />
                                </div>
                                <div class="component-body row">
                                    {/* {   
                                    this.state.searchResult.map(employee => ( */}
                                    <div class="component-body col-sm-12">
                                        <div class="form-group row">
                                            <label for="proj_name" class="col-sm-2">Proj ID:</label>
                                            <input type="text" onChange={(e) => this.changeValue(e)} class="form-control col-sm-2" id="allocation" value={employeeProjectList.project_id} placeholder="Enter Allocation" name="allocation" />
                                        </div>
                                        <div class="form-group row">
                                            <label for="proj_name" class="col-sm-2">Project Name:</label>
                                            <input type="text" onChange={(e) => this.changeValue(e)} class="form-control col-sm-2" id="allocation" value={employeeProjectList.project_name} placeholder="Enter Allocation" name="allocation" />
                                        </div>
                                        <div class="form-group row">
                                            <label for="proj_name" class="col-sm-2">Allocation:</label>
                                            <input type="text" onChange={(e) => this.changeValue(e)} class="form-control col-sm-2" id="allocation" value={employeeProjectList.allocation} placeholder="Enter Allocation" name="allocation" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div id="employee-address-section" className={this.state.address ? 'hidden' : ''}>
                            <div class="component-view container permanent-address">
                                <div class="component-head">
                                    <h2>Permanent Address
                                    {/* <button type="button" id="toggle-perm-address">Simple collapsible</button> */}
                                        <i class="fa fa-arrow-circle-up"></i>
                                        <button onClick={() => this.setState({ disablePerAdd: false })} detail={this.state.create ? true : false} class="pull-right btn btn-xebia">
                                            EDIT <i class="fa fa-edit"></i>
                                        </button>
                                    </h2>
                                    <hr />
                                </div>
                                <div class="component-body row" id="permanent-address">
                                    <div class="component-body col-sm-12">
                                        <div class="form-group row">
                                            <label for="add_line_1" class="col-sm-2">Address Line 1:</label>
                                            <input type="text" onChange={(e) => this.changeValuePermanentAddress(e)} disabled={this.state.disablePerAdd} class="form-control col-sm-8" id="add_line1" value={employeePermanentAddress.add_line1} placeholder="Enter Address Line 1" name="add_line1" />
                                        </div>
                                    </div>
                                    <div class="component-body col-sm-12">
                                        <div class="form-group row">
                                            <label for="add_line_2" class="col-sm-2">Address Line 2:</label>
                                            <input type="text" onChange={(e) => this.changeValuePermanentAddress(e)} disabled={this.state.disablePerAdd} class="form-control col-sm-8" id="add_line2" value={employeePermanentAddress.add_line2} placeholder="Enter Address Line 2" name="add_line2" />
                                        </div>
                                    </div>
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="country" class="col-sm-4">Country:</label>
                                            <div class="form-control col-sm-6">
                                                <CountryDropdown
                                                    id="country"
                                                    value={employeePermanentAddress.country}
                                                    name="country"
                                                    disabled={this.state.disablePerAdd}
                                                    onChange={(e) => this.changeValuePermanentAddress(null, 'country', e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="state" class="col-sm-4">State:</label>
                                            <div class="form-control col-sm-6">
                                                <RegionDropdown
                                                    id="state"
                                                    name="state"
                                                    country={employeePermanentAddress.country}
                                                    value={employeePermanentAddress.state}
                                                    //disabled={this.state.disablePerAdd}
                                                    onChange={(e) => this.changeValuePermanentAddress(null, 'state', e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="PIN" class="col-sm-4">PIN:</label>
                                            <input type="text" onChange={(e) => this.changeValuePermanentAddress(e)} disabled={this.state.disablePerAdd} value={employeePermanentAddress.pincode} class="form-control col-sm-6" id="email" placeholder="Enter Email" name="email" />
                                        </div>
                                    </div>

                                </div>
                                <div class="component-footer">
                                    <button class="pull-right btn btn-xebia" onClick={this.state.create ? () => this.saveNewEmployee() : () => this.saveUpdatedAddress('permanent')} >
                                        <i class="fa fa-save"></i> Save
                                    </button>
                                    &nbsp;
                                    <span class="pull-right btn btn-xebia" onClick={() => this.onCancel()} >
                                        <i class="fa fa-cut"></i> Cancel
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div class="component-view container current-address">
                                <div class="component-head row">
                                    <div class="col-sm-4">
                                        <h2>Current Address &nbsp;
                                        <button onClick={() => this.setState({ disableCurAdd: false })} class="btn btn-xebia">
                                                EDIT <i class="fa fa-edit"></i>
                                            </button>
                                        </h2>
                                    </div>
                                </div>
                                <div>
                                    <label for="emp_id">Same as Permanent:</label>
                                    <Checkbox
                                        disabled={this.state.disableCurAdd}
                                        onChange={(e) => this.currentAddSamePermanentAdd(e)}
                                        checked={this.state.samePermAndCurAddress}
                                    // className="rememberMeCheckBox"
                                    // checked={this.state.rememberMeTick}
                                    />
                                    <hr />
                                </div>
                                <div class="component-body row" id="current-address">
                                    <div class="component-body col-sm-12">
                                        <div class="form-group row">
                                            <label for="add_line_1" class="col-sm-2">Address Line 1:</label>
                                            <input type="text" onChange={(e) => this.changeValueCurrentAddress(e)} disabled={this.state.disableCurAdd} class="form-control col-sm-8" id="add_line1" value={employeeCurrentAddress.add_line1} placeholder="Enter Address Line 1" name="add_line1" />
                                        </div>
                                    </div>
                                    <div class="component-body col-sm-12">
                                        <div class="form-group row">
                                            <label for="add_line_2" class="col-sm-2">Address Line 2:</label>
                                            <input type="text" onChange={(e) => this.changeValueCurrentAddress(e)} disabled={this.state.disableCurAdd} class="form-control col-sm-8" id="add_line2" value={employeeCurrentAddress.add_line2} placeholder="Enter Address Line 2" name="add_line2" />
                                        </div>
                                    </div>
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="country" class="col-sm-4">Country:</label>
                                            <div class="form-control col-sm-6">
                                                <CountryDropdown
                                                    id="country"
                                                    value={employeeCurrentAddress.country}
                                                    name="country"
                                                    disabled={this.state.disableCurAdd}
                                                    onChange={(e) => this.changeValueCurrentAddress(null, 'country', e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="component-body-right col-sm-6">
                                        <div class="form-group row">
                                            <label for="state" class="col-sm-4">State:</label>
                                            <div class="form-control col-sm-6">
                                                <RegionDropdown
                                                    id="state"
                                                    name="state"
                                                    country={employeeCurrentAddress.country}
                                                    value={employeeCurrentAddress.state}
                                                    //disabled={this.state.disablePerAdd}
                                                    onChange={(e) => this.changeValueCurrentAddress(null, 'state', e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="component-body-left col-sm-6">
                                        <div class="form-group row">
                                            <label for="PIN" class="col-sm-4">PIN:</label>
                                            <input type="text" onChange={(e) => this.changeValueCurrentAddress(e)} disabled={this.state.disableCurAdd} value={employeeCurrentAddress.pincode} class="form-control col-sm-6" id="pincode" placeholder="Enter Pin Code" name="pincode" />
                                        </div>
                                    </div>

                                </div>
                                <div class="component-footer">
                                    <button class="pull-right btn btn-xebia" onClick={this.state.create ? () => this.saveNewEmployee() : () => this.saveUpdatedAddress('current')} >
                                        <i class="fa fa-save"></i> Save
                                    </button>
                                    &nbsp;
                                    <span class="pull-right btn btn-xebia" onClick={() => this.onCancel()} >
                                        <i class="fa fa-cut"></i> Cancel
                                    </span>
                                </div>
                            </div>
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