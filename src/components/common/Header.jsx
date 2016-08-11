import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/authorActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Enter a Search Term'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this); 
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  

  handleClick() {
    // loadArticles(this.state.value);
    // just alerting for now, but the intention is to plug input value into API action
    alert(this.state.value);
  }


  render() {
    return (
      <div style={{float: "right"}}>
        <input placeholder='Enter a Topic' onChange={this.handleChange} />
        <button onClick={this.handleClick}>Get Feels</button>
      </div>
    );
  }
}
Header.propTypes = {

};
Header.defaultProps = {

};

export default Header;