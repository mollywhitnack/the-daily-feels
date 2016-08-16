import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const App = ({ children }) =>
// const App = ({ children, loading }) =>
  <div className="container-fluid">
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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

