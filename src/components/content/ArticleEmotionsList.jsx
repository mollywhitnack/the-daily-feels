import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../styles/article.scss';

const ArticleEmotionsList = ({ article }) => {

  return (
    <div className="emotionList">
      <p className="articleEmotionRow anger">
        anger: {(article.tone[0].std.toFixed(1))}
      </p>
      <p className="articleEmotionRow disgust">
        disgust: {(article.tone[1].std.toFixed(1))}
      </p>
      <p className="articleEmotionRow fear">
        fear: {(article.tone[2].std.toFixed(1))}
      </p>
      <p className="articleEmotionRow joy">
        joy: {(article.tone[3].std.toFixed(1))}
      </p>
      <p className="articleEmotionRow sadness">
        sadness: {(article.tone[4].std.toFixed(1))}
      </p> 
    </div>
  );
};

export default ArticleEmotionsList;

