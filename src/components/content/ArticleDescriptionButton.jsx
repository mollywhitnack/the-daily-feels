import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../styles/article.scss';

const ArticleDescriptionButton = ({ clickHandler }) => {

  return (
    <div onClick={clickHandler} className="descriptionButton">
      ?
    </div>
  );
};

export default ArticleDescriptionButton;

