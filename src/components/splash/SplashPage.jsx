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
                  <i className="fa fa-2x fa-newspaper-o"></i>
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
