
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import EmployeeList from "../components/Employee";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
    return {
        employeeList: state.employeeListStore.employeeList,
        status: state.employeeListStore.status,
        error: state.employeeListStore.error,
        employeeDetails: state.employeeDetailsStore.employeeDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: function() {
         let actionFn=actions.fetchEmployees();
         dispatch(actionFn)
       },
       fetchEmployeeDetails: function(id) {
        let actionFn=actions.fetchEmployeeDetails(id);
        dispatch(actionFn)
      },
      updateEmployee: function(editedEmployeeDetails) {
        let actionFn=actions.updateEmployee(editedEmployeeDetails);
        dispatch(actionFn)
      },
      saveUpdatedEmployee: function(employeeDetailsToSave) {
        let actionFn=actions.saveUpdatedEmployee(employeeDetailsToSave);
        dispatch(actionFn)
      },
      saveNewEmployee: function(employeeDetailsToSave,callbackFunc) {
        let actionFn=actions.saveNewEmployee(employeeDetailsToSave,callbackFunc);
        dispatch(actionFn)
      }
    }
 }

export default connect(mapStateToProps, 
                    mapDispatchToProps) (EmployeeList)