import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import '../../styles/article.scss';


const Article = ({ article }) =>
  <div className="article">
    <a href={article.url} target="_blank" className="flip-container" ontouchstart="this.classList.toggle('hover');">
      <div className="flipper">
        <div className="front">
          <div className="articleTitle">{article.title}</div>
          <div className="articleSnippet">{`${article.snippet} ... `}</div>
        </div>
        <div className="back">
          <div className="percentages">
            <p className="anger"> anger: {(article.tone[0].score * 100).toFixed(1)}%</p>
            <p className="disgust"> disgust: {(article.tone[1].score * 100).toFixed(1)}%</p>
            <p className="fear"> fear: {(article.tone[2].score * 100).toFixed(1)}%</p>
            <p className="joy"> joy: {(article.tone[3].score * 100).toFixed(1)}%</p>
            <p className="sadness"> sadness: {(article.tone[4].score * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </a>
  </div>;

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
