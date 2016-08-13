import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {Link } from 'react-router';
import * as articleActions from '../../actions/articleActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';


//const SplashPage = ({onChange, errors, onSave}) =>
class SplashPage extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      search: '',
    };

    this.updateSearchState = this.updateSearchState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }


  updateSearchState(event){
    event.preventDefault;
    const field = event.target.name;
    let search = event.target.value;
    return this.setState({search: search});
  }

  onSubmit(event){
    event.preventDefault;
    this.props.actions.loadArticles(this.state.search)
    .then(()=> console.log('store updated'))
    /*.catch(err =>{
      toastr.error(err);
    });*/
  }

  render(){
    return(
      <div className="jumbotron">
        <h1>The Daily Feels</h1>
        <p>something something</p>
        <TextInput
          name = "searchBy"
          label = "Search News"
          onChange = {this.updateSearchState} />

        <Link to = {'/articles/' + this.state.search} className = "btn btn-primary" onClick= {this.onSubmit}>Submit</Link>

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

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
