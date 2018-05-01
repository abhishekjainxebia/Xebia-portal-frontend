import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import moment from 'moment'
import {NavLink} from 'react-router-dom';

export default class Employee extends Component {
    constructor(props) {
        super(props);

        if (props.location.state != undefined) {
            const { emp_id } = props.location.state
            console.log("emp_id " + emp_id) // "bar"
            this.getEmployeeDetails(emp_id);
            this.state = {
                hidden: false,
                create:false,
                disabled: true,
                resultSection:false,
                searchResultSection:true,
                searchResult:[]
            }
        } else {
            this.state = {
                hidden: true,
                create:false,
                disabled: true,
                resultSection:false,
                searchResultSection:true,
                searchResult:[]
            }
        }
    }

    editEmployee(){
        this.setState({
            disabled:false
        })
    }

    getEmployeeDetails(id){
        this.setState({
            hidden:false,
            create:false,
            disabled:true
        })
        console.log(id);

        this.props.fetchEmployeeDetails(id);
        
    }

    
    saveNewEmployee() {

        const callbackResult = (saveEmpApiResult) => {
            if (saveEmpApiResult.code != 1008) {
                alert(saveEmpApiResult.description)
            } else {
                alert('successfully saved')
                this.setState({
                    disabled: true,
                    create: false
                })
            }
        }

        this.props.saveNewEmployee(this.props.employeeDetails, callbackResult);
    }
    saveUpdatedEmployee(){
        this.props.saveUpdatedEmployee(this.props.employeeDetails);
        alert("Employee Updated Successfully!")
        this.setState({
            disabled:true,
            create:false
        })
    }
    onCancel(){
        this.setState({
            disabled:true
        })
    }

    searchInList = (e) => {
        var i, x = [];
        for (i in this.props.employeeList) {

            if(this.props.employeeList[i].emp_id.toLowerCase().includes(e.target.value)){
                x.push(this.props.employeeList[i]);
            }

            if(this.props.employeeList[i].name.toLowerCase().includes(e.target.value)){
                x.push(this.props.employeeList[i]);
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

    changeValue = (e) => {
        const { value, name } = e.target;
        console.log(e.target.name + e.target.value)
        let employeeDetails = this.props.employeeDetails;
        employeeDetails = Object.assign({}, employeeDetails , {[name]: value}) 
        console.log("employeedetails "+employeeDetails.emp_id);
        this.props.updateEmployee(employeeDetails);
    }

    showEmployeeForm = () =>{
        this.setState({
            hidden:false,
            disabled:false,
            create:true
        })
        let employeeDetails={
            createdAt:'',
            doj:'',
            email:'',
            emp_id:'',
            emp_type:'',
            exit:'',
            id:null,
            manager:null,
            name:'',
            noSqlRefId:'',
            phone:'',
            role:null,
            skillset:null,
            status:'',
            title:'',
            updatedAt:''
        }
        this.props.updateEmployee(employeeDetails);
    }

    componentDidMount() {
        this.props.fetchEmployees();
    }

    render() {
        let employeeList = this.props.employeeList || [];
        let status = this.props.status;
        let error = this.props.error;
        let employee = this.props.employeeDetails;

        var momentString = moment(employee.doj).format('YYYY-MM-DD');

        console.log("date "+momentString);
        console.log(employeeList);

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

        if (employeeList==[]) {
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
                <section id="workboard-section" class="row">
                    <div id="sidebar-section" class="col-sm-2">
                        <div>
                            <i class="fa fa-arrow-circle-up"></i>
                                        <button onClick={()=>{this.showEmployeeForm()}}  class="pull-right btn btn-xebia">
                                            Create Employee <i class="fa fa-edit"></i> 
                                        </button>
                        </div>
                        <div>Search</div>
                        <div class="sidebar container row">
                            <div class="search-section">
                                <div class="input-group mb-3">
                                    <input type="text" name="searchbar" class="form-control" onChange={(e)=>this.searchInList(e)} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text" id="basic-addon2">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                                {/* <div class="criteria-section">
                                    <a href="#">Active(default)</a> |
                                    <a href="#">All</a> |
                                    <a href="#">InActive</a>
                                </div> */}
                            </div>
                            <hr/>
                            <div className="result-section" className={this.state.resultSection ? 'hidden' : ''}>
                            {
                                employeeList.map(employee => (
                                <div class="employee">
                                        <div class="rs-disp-line">
                                                <span>Emp ID </span>:
                                                <span>
                                                    <a class="btnLinks" onClick={() => {this.getEmployeeDetails(employee.emp_id)}}>{employee.emp_id}</a>
                                                </span>
                                        </div>
                                        <div class="rs-disp-line">
                                            <span>Name </span>:
                                            <span>
                                            <a class="btnLinks" onClick={() => {this.getEmployeeDetails(employee.emp_id)}}>{employee.name}</a>
                                            {/* <NavLink to={{ pathname: '/home/project', state: { proj_id: '1'} }} className="roundedbutton" exact activeClassName="success" >
                                                Employee
                                            </NavLink> */}
                                            </span>
                                            <span>
                                                {/* <a href="" data-src="project" data-opt="1">Mckinsey DOF</a>  */}
                                            </span>
                                        </div>
                                        <div class="criteria-section">
                                            <a href="#" onClick={() => {this.getEmployeeDetails(employee.emp_id)}} >Details</a> |
                                            <a href="#">Project</a> |
                                            {/* <a href="#">Team</a> | */}
                                            <a href="#">Skills</a>
                                        </div>
                                        <hr/>
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
                                                    <a class="btnLinks" onClick={() => {this.getEmployeeDetails(employee.emp_id)}}>{employee.emp_id}</a>
                                                </span>
                                        </div>
                                        <div class="rs-disp-line">
                                            <span>Name </span>:
                                            <span>
                                            <a class="btnLinks" onClick={() => {this.getEmployeeDetails(employee.emp_id)}}>{employee.name}</a>
                                            {/* <NavLink to={{ pathname: '/home/project', state: { proj_id: '1'} }} className="roundedbutton" exact activeClassName="success" >
                                                Employee
                                            </NavLink> */}
                                            </span>
                                            <span>
                                                {/* <a href="" data-src="project" data-opt="1">Mckinsey DOF</a>  */}
                                            </span>
                                        </div>
                                        <div class="criteria-section">
                                            <a href="" onClick={() => {this.getEmployeeDetails(employee.emp_id)}} >Details</a> |
                                            <a href="#">Project</a> |
                                            {/* <a href="#">Team</a> | */}
                                            <a href="#">Skills</a>
                                        </div>
                                        <hr/>
                                </div>
                                ))
                               
                            }
                            </div>

                        </div>
                    </div>
                    <div className='col-sm-9'>
                    <div id="view-section" className={this.state.hidden ? 'hidden' : ''}>
                        <div class="component-view container">
                            <div class="component-head">
                                <h2>Details 
                                    <i class="fa fa-arrow-circle-up"></i>
                                        <button onClick={()=>{this.editEmployee()}} hidden={this.state.create?true:false} class="pull-right btn btn-xebia">
                                            EDIT <i class="fa fa-edit"></i> 
                                        </button>
                                </h2>
                            </div>
                            <hr/>
                            <div class="component-body row">
                                <div class="component-body-left col-sm-6">
                                    <div class="form-group row">
                                        <label for="emp_id" class="col-sm-4">Emp ID:</label>
                                        <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} class="form-control col-sm-6" id="emp_id" value={employee.emp_id} placeholder="Enter Emp ID" name="emp_id"/>
                                    </div>
                                </div>
                                <div class="component-body-right col-sm-6">
                                    <div class="form-group row">
                                        <label for="name" class="col-sm-4">Name:</label>
                                        <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} class="form-control col-sm-6" id="name" value={employee.name} placeholder="Enter name" name="name"/>
                                    </div>
                                </div>
                                <div class="component-body-right col-sm-6">
                                    <div class="form-group row">
                                        <label for="title" class="col-sm-4">Title:</label>
                                        <select class="form-control col-sm-6" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} value={employee.title} name="title">
                                            <option value="" selected>Select Title</option>
                                            <option value="Consultant">Consultant</option>
                                            <option value="Senior Consultant">Senior Consultant</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="component-body-right col-sm-6">
                                    <div class="form-group row">
                                        <label for="status" class="col-sm-4">Status:</label>
                                        <select class="form-control col-sm-6" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} value={employee.status} id="status" name="status">
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
                                        onChange={(e)=>this.changeValue(e)}
                                        type="date" 
                                        disabled={this.state.disabled}
                                        value={moment(employee.doj).format('YYYY-MM-DD')} 
                                        class="form-control col-sm-6" id="doj"
                                        name="doj"/>
                                </div>
                            </div>
                            <div class="component-body-left col-sm-6">
                                <div class="form-group row">
                                    <label for="email" class="col-sm-4">Email:</label>
                                    <input type="email" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} value={employee.email} class="form-control col-sm-6" id="email" placeholder="Enter Email" name="email"/>
                                </div>
                            </div>
                            <div class="component-body-right col-sm-6">
                                <div class="form-group row">
                                    <label for="phone" class="col-sm-4">Phone:</label>
                                    <input type="phone" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} value={employee.phone} class="form-control col-sm-6" id="phone" placeholder="Enter Phone" name="phone"/>
                                </div>
                            </div>
                            <div class="component-body-left col-sm-6">
                                <div class="form-group row">
                                    <label for="emp_type" class="col-sm-4">Emp Type:</label>
                                    <input type="text" onChange={(e)=>this.changeValue(e)} disabled={this.state.disabled} value={employee.emp_type} class="form-control col-sm-6" id="emp_type" placeholder="Enter Emp Type" name="emp_type"/>
                                </div>
                            </div>
                            
                        </div>
                        </div>
                        <div class="component-footer">
                            <button class="pull-right btn btn-xebia" onClick={this.state.create?()=>this.saveNewEmployee():()=>this.saveUpdatedEmployee()} >
                                <i class="fa fa-save"></i> Save
                            </button>
                            <span class="pull-right btn btn-xebia" onClick={()=>this.onCancel()} >
                                <i class="fa fa-cut"></i> Cancel
                            </span>
                            {/* <span class="pull-right btn btn-xebia">
                                <i class="fa fa-ban"></i> Clear
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

Employee.defaultProps = {

}
Employee.propTypes = {

}