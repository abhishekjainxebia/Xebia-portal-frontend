import React  from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from "prop-types";

const AuthRoute = ({ component, exact = false, path, isAuthenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}
  />
);

const { object, bool, string, func } = PropTypes;

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object
};

//Add the container

import {connect} from "react-redux";

const mapStateToProps = (state) => {
  console.log("Auth State", state.authState.isAuthenticated);
  
  return {
    isAuthenticated: state.authState.isAuthenticated
  }
}

export default connect(mapStateToProps)
               (AuthRoute);