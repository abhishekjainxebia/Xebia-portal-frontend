
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeAddress from "../components/EmployeeAddress";
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