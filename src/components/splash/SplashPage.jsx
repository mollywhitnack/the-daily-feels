import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import * as articleActions from '../../actions/articleActions';
import '../../styles/splashPage.scss';
import { browserHistory } from 'react-router';

class SplashPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: '',
    };

    this.updateSearchState = this.updateSearchState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    browserHistory.push(`/articles/${this.state.search}`);
  }

  updateSearchState(event) {
    const search = event.target.value;
    return this.setState({ search });
  }

  render() {
    return (
      <div>
        <div className="splashBackground">
        </div>
        <div className="splashContent">
          <h1 className="splashTitle">The Daily Feels</h1>
          <span className="splashTagline">Emotion-Sensitive News Search Engine</span>
          <div className="splashSearchArea">

            <form className="form-inline" onSubmit={this.onSubmit}>
              <TextInput
                name="searchBy"
                onChange={this.updateSearchState}
              />
              <div className="form-group">
                <button className="splashButton">
                  <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyLjAwMSAzMi4wMDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyLjAwMSAzMi4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0ic2VhcmNoXzFfIj4KCQk8cGF0aCBkPSJNMjAsMGMtNi42MjcsMC0xMiw1LjM3My0xMiwxMmMwLDIuMDI2LDAuNTA3LDMuOTMzLDEuMzk1LDUuNjA4TDEuMDUyLDI1Ljk1bDAuMDA3LDAuMDA2ICAgIGMtMC42NTIsMC42NDEtMS4wNTgsMS41MjktMS4wNTgsMi41MTZjMCwxLjk0OSwxLjU4LDMuNTI5LDMuNTI5LDMuNTI5YzAuOTg1LDAsMS44NzQtMC40MDYsMi41MTUtMS4wNTlMNi4wNDMsMzAuOTRsOC4zNDEtOC4zNCAgICBDMTYuMDU5LDIzLjQ5MSwxNy45NjksMjQsMjAsMjRjNi42MjcsMCwxMi01LjM3MywxMi0xMlMyNi42MjgsMCwyMCwweiBNNC43OTYsMjkuNjkyYy0wLjMyMiwwLjMzNC0wLjc2OCwwLjU0My0xLjI2NiwwLjU0MyAgICBjLTAuOTc1LDAtMS43NjUtMC43ODktMS43NjUtMS43NjRjMC0wLjQ5OCwwLjIxLTAuOTQzLDAuNTQzLTEuMjY2bC0wLjAwOS0wLjAwOGw4LjA2Ni04LjA2NmMwLjcwNSwwLjk1MSwxLjU0NSwxLjc5MSwyLjQ5NCwyLjQ5OCAgICBMNC43OTYsMjkuNjkyeiBNMjAsMjIuMDAxYy01LjUyMiwwLTEwLTQuNDc5LTEwLTEwYzAtNS41MjIsNC40NzgtMTAsMTAtMTBjNS41MjEsMCwxMCw0LjQ3OCwxMCwxMCAgICBDMzAsMTcuNTIyLDI1LjUyMSwyMi4wMDEsMjAsMjIuMDAxeiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik0yMCw1Yy0zLjg2NywwLTcsMy4xMzQtNyw3YzAsMC4yNzYsMC4yMjQsMC41LDAuNSwwLjVzMC41LTAuMjI0LDAuNS0wLjVjMC0zLjMxMywyLjY4Ni02LDYtNiAgICBjMC4yNzUsMCwwLjUtMC4yMjQsMC41LTAuNVMyMC4yNzUsNSwyMCw1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SplashPage.propTypes = {
  articles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    articles: state.articles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(articleActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
