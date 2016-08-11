import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';

const App = ({ children, loading }) =>
  <div className="container-fluid">
    <Header loading={loading} />
    {children}
  </div>;

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0,
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);

