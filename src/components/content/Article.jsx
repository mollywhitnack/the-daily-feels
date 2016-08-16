import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Article = ({ article }) => {
  return (
    <Link to={article.url} target="_blank">

    <span className="flip-container" ontouchstart="this.classList.toggle('hover');">
      <div className="flipper">
        <div className="front">
          <div>{article.title}</div>
          <div>{`${article.snippet} ... `}</div>
        </div>
      <div className="back">
        <p> anger: {(article.tone[0].score*100).toFixed(1)}%</p>
        <p> disgust: {(article.tone[1].score*100).toFixed(1)}%</p>
        <p> fear: {(article.tone[2].score*100).toFixed(1)}%</p>
        <p> joy: {(article.tone[3].score*100).toFixed(1)}%</p>
        <p> sadness: {(article.tone[4].score*100).toFixed(1)}%</p>
      </div>
    </div>
    </span>
    </Link>  
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
