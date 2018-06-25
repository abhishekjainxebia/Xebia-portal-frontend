
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeList from "../components/Employee";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
  return {
    employeeList: state.employeeStore.employeeList,
    projectList: state.projectStore.projectList,
    employeeDetails: state.employeeStore.employeeDetails,
    employeeProjectList: state.employeeStore.employeeProjectList,
    employeePermanentAddress: state.employeeStore.employeePermanentAddress,
    employeeCurrentAddress: state.employeeStore.employeeCurrentAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: function () {
      let actionFn = actions.fetchEmployees();
      dispatch(actionFn)
    },
    fetchProjects: function() {
      let actionFn=actions.fetchProjects();
      dispatch(actionFn)
    },
    getProjectList: function () {
      let actionFn = actions.fetchEmployees();
      dispatch(actionFn)
    },
    fetchEmployeeDetails: function (id) {
      let actionFn = actions.fetchEmployeeDetails(id);
      dispatch(actionFn)
    },
    updateEmployee: function (editedEmployeeDetails) {
      let actionFn = actions.initEmployeeDetails(editedEmployeeDetails);
      dispatch(actionFn)
    },
    saveUpdatedEmployee: function (employeeDetailsToSave, callbackResult) {
      let actionFn = actions.saveUpdatedEmployee(employeeDetailsToSave, callbackResult);
      dispatch(actionFn)
    },
    saveNewEmployee: function (employeeDetailsToSave, callbackFunc) {
      let actionFn = actions.saveNewEmployee(employeeDetailsToSave, callbackFunc);
      dispatch(actionFn)
    },
    getEmployeeProjects: function (id,callback) {
      let actionFn = actions.getEmployeeProjects(id,callback);
      dispatch(actionFn)
    },
    initiateEmployeeProjects: function (employeeProjectList) {
      let actionFn = actions.initiateEmployeeProjects(employeeProjectList);
      dispatch(actionFn)
    },
    getEmployeePermenentAddress: function (id) {
      let actionFn = actions.getEmployeePermenentAddress(id);
      dispatch(actionFn)
    },
    getEmployeeCurrentAddress: function (id) {
      let actionFn = actions.getEmployeeCurrentAddress(id);
      dispatch(actionFn)
    } 
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(EmployeeList)