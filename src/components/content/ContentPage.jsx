import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import FaceBoard from './FaceBoard';
import * as articleActions from '../../actions/articleActions';
// import CourseList from './CourseList';

class ContentPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {articles, faces} = this.props;
    return (
      <div>
        <FaceBoard faces={faces}/>
        <p>Articles here...</p>
      </div>
    );
  }
}

ContentPage.propTypes = {
  articles: PropTypes.array.isRequired,
  faces: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    articles: [ { "link": "cnn.com", "snippet": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, totam." } ], // state.articles; property courses determined by reducer (reducers/courseReducer.js in this case)
    faces: [
      {
        "img": "😠",
        "emotion": "anger",
        "percentage": 84,
      },
      {
        "img": "😷",
        "emotion": "disgust",
        "percentage": 37,
      },
      {
        "img": "😨",
        "emotion": "fear",
        "percentage": 25,
      },
      {
        "img": "😄",
        "emotion": "joy",
        "percentage": 92,
      },
      {
        "img": "😭",
        "emotion": "sadness",
        "percentage": 4,
      }
    ]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(articleActions, dispatch) // wrapping all actions in call to bindActionCreators -- in dispatch
  };
}

// two function calls; connect returns a function and calls that function on container component CoursesPage
export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
