import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './common/Navbar';

const App = ({ children }) =>
// const App = ({ children, loading }) =>
  <div className="container-fluid">
    <MuiThemeProvider>
      {children}
    </MuiThemeProvider>
  </div>;

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0,
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  // loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
