
import React, {PureComponent, Component} from "react";
import PropTypes from "prop-types";

export default class ProjectTeam extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }
    
    render() {
        console.log("projectt team")
        console.log(this.props.projectTeam)
        let projectTeam = this.props.projectTeam;
        return (
            <div> 
            <div className="component-view container">
                    <div className="component-head">
                        {/* <h2>Project details of {employee.name}
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
                        </h2> */}
                    </div>
                    <div className="component-body row">
                        {
                            projectTeam.map((teamMemeber) => {
                                return (
                                    <div className="component-body col-sm-12">
                                        <hr />
                                        <div className="form-group row">
                                            <label for="Memeber Name" className="col-sm-2">Memeber Name:</label>
                                            <input 
                                                type="text" 
                                                // onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)} 
                                                // disabled={employeeProject.id==null?false:this.state.disableProjDetails}
                                                className="form-control col-sm-2" 
                                                // id="allocation" 
                                                value={teamMemeber.empName} 
                                                placeholder="Enter Allocation" 
                                                name="allocation" />
                                            {/* <select
                                                // onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)}
                                                // disabled={employeeProject.id==null?false:true}
                                                className="form-control col-sm-2"
                                                // value={employeeProject.project_id}
                                                placeholder="Enter Project"
                                                name="project_id">
                                                {/* {
                                                    finalProjectList.map(x=>(
                                                    <option value={x.id}>{x.name}</option>
                                                    ))
                                                } */} 
                                                
                                            {/* </select> */}
                                            
                                            <div className="col-sm-7">
                                                <button
                                                    className="float-right btn btn-xebia"
                                                    // onClick={() => this.deleteEmpProject(employeeProject.id)}
                                                    // disabled={employeeProject.id==null?true:false}
                                                    >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {/* <div className="form-group row">
                                            <label for="allocation" className="col-sm-2">Allocation:</label>
                                            <input 
                                                type="text" 
                                                // onChange={(e) => this.employeeProjectChangeEvent(e,employeeProject.id)} 
                                                // disabled={employeeProject.id==null?false:this.state.disableProjDetails}
                                                // className="form-control col-sm-2" 
                                                // id="allocation" 
                                                // value={employeeProject.allocation} 
                                                placeholder="Enter Allocation" 
                                                name="allocation" />
                                        </div> */}
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


ProjectTeam.defaultProps = {
    
}

ProjectTeam.propTypes = {
    
}