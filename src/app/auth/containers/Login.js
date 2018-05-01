import {connect} from "react-redux";
import Login from "../components/Login";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
    return {
       isAuthenticated:state.authState.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: function(authToken) {
         let actionFn=actions.loginSuccess();
         dispatch(actionFn)
       }
    }
 }
 
 export default connect(mapStateToProps, 
                    mapDispatchToProps) (Login)