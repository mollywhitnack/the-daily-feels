import React, {PropTypes} from 'react'; 
import {Link} from 'react-router';
import TextInput from './TextInput';
import * as articleActions from '../../actions/articleActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
    };
    this.updateSearchState = this.updateSearchState.bind(this);
  }

  updateSearchState(event){
    const field = event.target.name;
    let search = event.target.value;
    return this.setState({search: search});
  }

  render() {
    return (
      <div style={{float: "right"}}>
        <TextInput
          name = "searchBy"
          label = "Enter a Search Term"
          onChange = {this.updateSearchState}
          placeholder = "ie. Donald Trump"
          />

          <Link to = {'/articles/' +this.state.search}
             className = "btn btn-primary" onClick={this.onSubmit}> Get Feels </Link>

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
