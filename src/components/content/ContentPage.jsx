import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import AppBar from 'material-ui/AppBar';
import FaceBoard from './FaceBoard';
import * as articleActions from '../../actions/articleActions';
import ArticleList from './ArticleList';
import CircularProgress from 'material-ui/CircularProgress';
import Header from '../common/Header';

const ContentPage = ({ articles, faces, loading, params }) => {
  const loadingCircle = <CircularProgress size={2} />;
  const content = (
    <div>
      <Header /> {/* might want to change to builtin MUI <AppBar title=whatever /> */}
      <FaceBoard faces={faces} />
      <ArticleList articles={articles} emotion={params.emotion} />
    </div>
  );

  return (
    <div>
      {loading ? loadingCircle : content}
    </div>
  );
};

// function getEmoPercent(articles) {
//   let angerTotal = 0;
//   let disgustTotal = 0;
//   let fearTotal = 0;
//   let joyTotal = 0;
//   let sadnessTotal = 0;
//   articles.map(article => {
//     const tones = article.tone;
//     angerTotal += tones[0].score;
//     disgustTotal += tones[1].score;
//     fearTotal += tones[2].score;
//     joyTotal += tones[3].score;
//     sadnessTotal += tones[4].score;
//   });
//   return ({
//     angerTotal: ((angerTotal /= articles.length) * 100).toFixed(1),
//     disgustTotal: ((disgustTotal /= articles.length) * 100).toFixed(1),
//     fearTotal: ((fearTotal /= articles.length) * 100).toFixed(1),
//     joyTotal: ((joyTotal /= articles.length) * 100).toFixed(1),
//     sadnessTotal: ((sadnessTotal /= articles.length) * 100).toFixed(1),
//   });
// }

ContentPage.propTypes = {
  articles: PropTypes.array.isRequired,
  faces: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const percentages = {
    angerTotal: 0,
    disgustTotal: 0,
    fearTotal: 0,
    joyTotal: 0,
    sadnessTotal: 0,
  };

  if (state.articles.length) {
    state.articles.forEach(article => {
      article.snippet =
        article.snippet.match(RegExp(".{"+20+"}\\S*") || [article.snippet])[0];
    });
  }

  return {
    loading: state.ajaxCallsInProgress > 0,
    // state.articles; property courses determined by
    // reducer (reducers/courseReducer.js in this case)
    articles: state.articles,
    faces: [
      {
        img: '😠',
        emotion: 'anger',
        percentage: percentages.angerTotal,
      },
      {
        img: '😷',
        emotion: 'disgust',
        percentage: percentages.disgustTotal,
      },
      {
        img: '😨',
        emotion: 'fear',
        percentage: percentages.fearTotal,
      },
      {
        img: '😄',
        emotion: 'joy',
        percentage: percentages.joyTotal,
      },
      {
        img: '😭',
        emotion: 'sadness',
        percentage: percentages.sadnessTotal,
      },
    ],
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(articleActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
