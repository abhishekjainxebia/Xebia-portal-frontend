
import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

export default class EmployeeProject extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            disableProjDetails: true,
            addNewProjectButtonDisable:false
        }
    }
    componentDidMount() {

    }

    employeeProjectChangeEvent(e,id){
        const { value, name } = e.target;
        console.log(e.target.name + e.target.value)
        let employeeProjectList = JSON.parse(JSON.stringify(this.props.employeeProjectList))
        var i=0;
        for (i in employeeProjectList) {
            if (employeeProjectList[i].id==id) {
                employeeProjectList[i]=Object.assign({},  employeeProjectList[i], { [name]: value })
            }
            else if(id==null && employeeProjectList[i].id==null){
                employeeProjectList[i]=Object.assign({},  employeeProjectList[i], { [name]: value })
            }
        }
        console.log(employeeProjectList);
        this.props.updateEmployeeProjectList(employeeProjectList)
    }

    deleteEmpProject=(id)=> {
        let employeeProjectList = JSON.parse(JSON.stringify(this.props.employeeProjectList))
        if (id!=null) {
            var i, x = [];
            for (i in employeeProjectList) {
                if (employeeProjectList[i].id==id) {
                    employeeProjectList[i]=Object.assign({},  employeeProjectList[i], { allocation: 0 })
                }
            }
            console.log(employeeProjectList)
            this.props.updateEmployeeProjectList(employeeProjectList)
        }
    }

    addNewEmployeeProject(){
        let employeeProjectList = JSON.parse(JSON.stringify(this.props.employeeProjectList))
        let newEmpProject = {
            allocation:null,
            createdAt:"",
            emp_id:1,
            end_date:"",
            id:null,
            project_id:1,
            project_name:"",
            rate:null,
            start_date:"",
            updatedAt:""
        }
        employeeProjectList.push(newEmpProject)
        this.props.updateEmployeeProjectList(employeeProjectList)
        this.setState({
            addNewProjectButtonDisable:true
        })

    }

    render() {
        let employee = this.props.employeeDetails;
        let employeeProjectList = this.props.employeeProjectList || [];
        let projectList = JSON.parse(JSON.stringify(this.props.projectList || []));
        let uniqueProjectList = JSON.parse(JSON.stringify(projectList));
        var i,j;
        for( i in employeeProjectList ){
            for (j in uniqueProjectList){
                if(employeeProjectList[i].project_id==uniqueProjectList[j].id){
                    uniqueProjectList.splice(j,1)
                }
            }
        }

        console.log(employeeProjectList)
        return (
            <div>
                <div className="component-view container">
                    <div className="component-head">
                        <h2>Project details of {employee.name}
                            <button
                                className="float-right btn btn-xebia"
                                onClick={() => this.logout()}>
                                Save
                            </button>
                            <button
                                className="float-right btn btn-xebia"
                                disabled={this.state.addNewProjectButtonDisable}
                                onClick={() => this.addNewEmployeeProject()}>
                                Add new
                            </button>
                            <button
                                className="float-right btn btn-xebia"
                                onClick={() => this.setState({ disableProjDetails:false,addNewEmployeeProject:false})}>
                                Edit
                            </button>
                        </h2>
                    </div>
                    <div className="component-body row">
                        {
                            employeeProjectList.map((employeeProject) => {
                                let finalProjectList = []
                                if(employeeProject.id==null){
                                    finalProjectList = uniqueProjectList;
                                }
                                else{
                                    finalProjectList = projectList;
                                }
                                return (
                                    <div className="component-body col-sm-12">
                                        <hr />
                                        <div className="form-group row">
                                            <label for="proj_name" className="col-sm-2">Project Name:</label>
                                            <select
                                                onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)}
                                                disabled={employeeProject.id==null?false:true}
                                                className="form-control col-sm-2"
                                                value={employeeProject.project_id}
                                                placeholder="Enter Project"
                                                name="project_id">
                                                {
                                                    finalProjectList.map(x=>(
                                                    <option value={x.id}>{x.name}</option>
                                                    ))
                                                }
                                                
                                            </select>
                                            <div className="col-sm-2">
                                                <span className="float-left">
                                                    <NavLink to={{ pathname: '/project', state: { proj_id: employeeProject.project_id } }} className="btn btn-xebia" exact >
                                                        View
                                                    </NavLink>
                                                </span>
                                            </div>

                                            <div className="col-sm-5">
                                                <button
                                                    className="float-right btn btn-xebia"
                                                    onClick={() => this.deleteEmpProject(employeeProject.id)}
                                                    disabled={employeeProject.id==null?true:false}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="allocation" className="col-sm-2">Allocation:</label>
                                            <input 
                                                type="text" 
                                                onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)} 
                                                disabled={employeeProject.id==null?false:this.state.disableProjDetails}
                                                className="form-control col-sm-2" 
                                                id="allocation" 
                                                value={employeeProject.allocation} 
                                                placeholder="Enter Allocation" 
                                                name="allocation" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}


EmployeeProject.defaultProps = {

}

EmployeeProject.propTypes = {

}