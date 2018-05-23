
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeList from "../components/Employee";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
  return {
    employeeList: state.employeeListStore.employeeList,
    projectList: state.projectListStore.projectList,
    status: state.employeeListStore.status,
    error: state.employeeListStore.error,
    employeeDetails: state.employeeDetailsStore.employeeDetails,
    employeeProjectList: state.employeeDetailsStore.employeeProjectList,
    employeePermanentAddress: state.employeeDetailsStore.employeePermanentAddress,
    employeeCurrentAddress: state.employeeDetailsStore.employeeCurrentAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: function () {
      let actionFn = actions.fetchEmployees();
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
      let actionFn = actions.updateEmployee(editedEmployeeDetails);
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
    },
    updatePermanentAddress: function (employeePermanentAddress) {
      let actionFn = actions.initEmployeePermanentAddress(employeePermanentAddress);
      dispatch(actionFn)
    },
    updateCurrentAddress: function (employeeCurrentAddress) {
      let actionFn = actions.initEmployeeCurrentAddress(employeeCurrentAddress);
      dispatch(actionFn)
    },
    saveUpdatedAddress:function(emp_id,updatedEmployeeAddress,callbackResult){
      let actionFn = actions.saveUpdatedAddress(emp_id,updatedEmployeeAddress,callbackResult);
      dispatch(actionFn)
    }
    
    
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(EmployeeList)