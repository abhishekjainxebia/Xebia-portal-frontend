
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeAddress from "../components/EmployeeAddress";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
  return {
    employeeList: state.employeeStore.employeeList,
    projectList: state.projectStore.projectList,
    status: state.employeeStore.status,
    error: state.employeeStore.error,
    employeeDetails: state.employeeStore.employeeDetails,
    employeeProjectList: state.employeeStore.employeeProjectList,
    employeePermanentAddress: state.employeeStore.employeePermanentAddress,
    employeeCurrentAddress: state.employeeStore.employeeCurrentAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
  mapDispatchToProps)(EmployeeAddress)