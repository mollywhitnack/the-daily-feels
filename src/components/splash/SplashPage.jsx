import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';
import * as articleActions from '../../actions/articleActions';
import '../../styles/splashPage.scss';


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
    this.props.actions.loadArticles(this.state.search)
      .catch(err => {
        toastr.error(err);
      });
  }

  updateSearchState(event) {
    event.preventDefault();
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
          <div className="splashSearchArea">

            <form className="form-inline" action="">
              <TextInput
                name="searchBy"
                onChange={this.updateSearchState}
              />
              <div className="form-group">
                <Link
                  to={`/articles/${this.state.search}`}
                  className="btn btn-primary splashButton"
                  onClick={this.onSubmit}
                >
                  Search For News
                </Link>
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
