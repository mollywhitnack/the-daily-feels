import React, { PropTypes } from 'react';
import '../../styles/article.scss';

const ArticleDescriptionButton = ({ clickHandler }) =>
  <div onClick={clickHandler} className="descriptionButton">
    ?
  </div>;

ArticleDescriptionButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default ArticleDescriptionButton;

