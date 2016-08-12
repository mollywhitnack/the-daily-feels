import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {Link } from 'react-router'

//const SplashPage = ({onChange, errors, onSave}) =>
class SplashPage extends React.Component{
  constructor(props, context){
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

  render(){
    return(
      <div className="jumbotron">
      <h1>The Daily Feels</h1>
      <p>something something</p>
      <TextInput
        name = "searchBy"
        label = "Search News"
        onChange = {this.updateSearchState} />

      <Link to = {'/articles/' +this.state.search}
           className = "btn btn-primary"> Submit </Link>

      </div>
    );
  }
}

export default SplashPage;
