import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../../styles/styles.scss';

const Article = ({ article }) => {
  return (
    <Link to={article.url} target="_blank">
      <div className="col-xs-3 article">
        <div>
          {article.title}
        </div>
        <div>
          {`${article.snippet} ... `}
        </div>
      </div>
    </Link>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
