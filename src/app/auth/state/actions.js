import * as authApi from './service';
import * as ActionTypes from "./ActionTypes";
import {BrowserRouter} from 'react-router';

//thunk in es6
export function loginSuccess() {
  return function(dispatch) {
    dispatch({type: ActionTypes.LOGGED_IN})
  };
};

//thunk in es6
export const logout = () => {
  return (dispatch) => {
     storage.removeItem("token");
     dispatch({type: ActionTypes.LOGGED_OUT});

     //history.push("/");
  };
};
