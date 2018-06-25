
import React, {Component} from "react";
import PropTypes from "prop-types";

export default class EmployeeSkill extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }
    
    render() {
        let employee = this.props.employeeDetails;
        return (
            <div>
                <div className="component-view container">
                    <div className="component-head">
                        <h2>Skills of {employee.name}
                            <button
                                className="float-right btn btn-xebia"
                                // onClick={() => this.logout()}
                                >
                                Save
                            </button>
                            <button
                                className="float-right btn btn-xebia"
                                // disabled={this.state.addNewProjectButtonDisable}
                                // onClick={() => this.addNewEmployeeProject()}
                                >
                                Add new
                            </button>
                            <button
                                className="float-right btn btn-xebia"
                                // onClick={() => this.setState({ disableProjDetails:false,addNewEmployeeProject:false})}
                                >
                                Edit
                            </button>
                        </h2>
                    </div>
                    <div className="component-body row">
                        {/* {
                            employeeProjectList.map((employeeProject) => {
                                let finalProjectList = []
                                if(employeeProject.id==null){
                                    finalProjectList = uniqueProjectList;
                                }
                                else{
                                    finalProjectList = projectList;
                                }
                                return ( */}
                                    <div className="component-body col-sm-12">
                                        <hr />
                                        <div className="form-group row">
                                            <label for="proj_name" className="col-sm-2">Skill Name:</label>
                                            <input
                                                // onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)}
                                                // disabled={employeeProject.id==null?false:true}
                                                className="form-control col-sm-2"
                                                // value={employeeProject.project_id}
                                                placeholder="Enter Skill"
                                                name="skill_id"/>
                                             
                                            <div className="col-sm-7">
                                                {/* <button
                                                    className="float-right btn btn-xebia"
                                                    onClick={() => this.deleteEmpProject(employeeProject.id)}
                                                    disabled={employeeProject.id==null?true:false}>
                                                    Delete
                                                </button> */}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="proj_name" className="col-sm-2">Skill Version:</label>
                                            <input
                                                // onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)}
                                                // disabled={employeeProject.id==null?false:true}
                                                className="form-control col-sm-2"
                                                // value={employeeProject.project_id}
                                                placeholder="Enter Skill version"
                                                name="skill_version"/>
                                        </div>
                                        <div className="form-group row">
                                            <label for="allocation" className="col-sm-2">Level:</label>
                                            <select 
                                                // onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)} 
                                                // disabled={employeeProject.id==null?false:this.state.disableProjDetails}
                                                className="form-control col-sm-2" 
                                                // id="allocation" 
                                                // value={employeeProject.allocation} 
                                                placeholder="Enter Level" 
                                                name="allocation" 
                                                >
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Expert</option>
                                            </select>
                                        </div>
                                    </div>
                                {/* )
                            })
                        } */}
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}


EmployeeSkill.defaultProps = {
    
}

EmployeeSkill.propTypes = {
    
}