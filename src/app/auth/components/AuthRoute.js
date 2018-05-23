import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import PropTypes from "prop-types";

const storage = window.sessionStorage;

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
          }} />
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


const mapStateToProps = (state) => {
  console.log('!!!!', storage.getItem('isAuthenticated'))
  return {
    isAuthenticated:storage.getItem('isAuthenticated')
  }
}

export default connect(mapStateToProps)
  (AuthRoute);