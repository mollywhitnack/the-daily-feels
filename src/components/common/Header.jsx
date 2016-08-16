import React, {PropTypes} from 'react'; 
import {Link} from 'react-router';
import TextInput from './TextInput';
import * as articleActions from '../../actions/articleActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {browserHistory} from 'react-router';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
    };
    this.updateSearchState = this.updateSearchState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateSearchState(event){
    const field = event.target.name;
    let search = event.target.value;
    return this.setState({search: search});
  }

  onSubmit(event) {
    event.preventDefault();
    browserHistory.push(`/articles/${this.state.search}`);
  }

  render() {
    return (
      <div style={{float: "right"}}>
        <form className="form-inline" onSubmit={this.onSubmit}>
        <TextInput
          name = "searchBy"
          label = "Enter a Search Term"
          onChange = {this.updateSearchState}
          placeholder = "ie. Donald Trump"
          />
        <div className="form-group">
          <button className="btn btn-primary">
            Get Feels
          </button>
        </div>
      </form>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps){

  return {
    articles: state.articles,
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(articleActions, dispatch)
  };
}

export default connect(mapStateToProps ,mapDispatchToProps)(Header);
