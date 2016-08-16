import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import FaceBoard from './FaceBoard';
import * as articleActions from '../../actions/articleActions';
import ArticleList from './ArticleList';
import LoadingDots from '../common/LoadingDots';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import Header from '../common/Header';

class ContentPage extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    console.log('emotion:', this.props.params.emotion);
    const {articles, faces, loading} = this.props;
      return (
        <div>
          { loading ? <CircularProgress size={2} /> :
          <div>
            <Header /> {/* might want to change to builtin MUI <AppBar title=whatever /> */}
            <FaceBoard faces={faces}/>
            <ArticleList articles={articles} emotion = {this.props.params.emotion}/>
          </div> }
        </div>
      );
   }
}

ContentPage.propTypes = {
  articles: PropTypes.array.isRequired,
  faces: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function getEmoPercent(articles) {
  let angerTotal = 0;
  let disgustTotal = 0;
  let fearTotal = 0;
  let joyTotal = 0;
  let sadnessTotal = 0;
  let percentages = articles.map(article => {
    let tones = article.tone;
    angerTotal += tones[0].score;
    disgustTotal += tones[1].score;
    fearTotal += tones[2].score;
    joyTotal += tones[3].score;
    sadnessTotal += tones[4].score;
  });
  return ({
    "angerTotal": ((angerTotal /= articles.length) * 100).toFixed(1),
    "disgustTotal": ((disgustTotal /= articles.length) * 100).toFixed(1),
    "fearTotal": ((fearTotal /= articles.length) * 100).toFixed(1),
    "joyTotal": ((joyTotal /= articles.length) * 100).toFixed(1),
    "sadnessTotal": ((sadnessTotal /= articles.length) * 100).toFixed(1),
  })
}

function mapStateToProps(state, ownProps) {
  // console.log('state.articles:', state.articles);
  let percentages = {
    "angerTotal": 0,
    "disgustTotal": 0,
    "fearTotal": 0,
    "joyTotal": 0,
    "sadnessTotal": 0,
  };
  if (state.articles.length) {
    state.articles.forEach(article => article.snippet = article.snippet.match(RegExp(".{"+20+"}\\S*")||[article.snippet])[0]);
    percentages = getEmoPercent(state.articles);
  }
  return {
    loading: state.ajaxCallsInProgress > 0,
    articles: state.articles, // state.articles; property courses determined by reducer (reducers/courseReducer.js in this case)
    faces: [
      {
        "img": "😠",
        "emotion": "anger",
        "percentage": percentages.angerTotal,
      },
      {
        "img": "😷",
        "emotion": "disgust",
        "percentage": percentages.disgustTotal,
      },
      {
        "img": "😨",
        "emotion": "fear",
        "percentage": percentages.fearTotal,
      },
      {
        "img": "😄",
        "emotion": "joy",
        "percentage": percentages.joyTotal,
      },
      {
        "img": "😭",
        "emotion": "sadness",
        "percentage": percentages.sadnessTotal,
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
