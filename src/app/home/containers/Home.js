
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Home from "../components/Home";
import * as employeeActions from "../../employee/state/actions"
import * as projectActions from "../../project/state/actions"

const mapStateToProps = (state) => {
    return {
         
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: function () {
            let actionFn = employeeActions.fetchEmployees();
            dispatch(actionFn)
          },
          fetchProjects: function() {
            let actionFn=projectActions.fetchProjects();
            dispatch(actionFn)
          },
    }
}

export default connect(mapStateToProps, 
                    mapDispatchToProps) (Home)