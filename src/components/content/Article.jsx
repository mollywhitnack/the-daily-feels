import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import styles from '../../styles/styles.css';

const Article = ({article}) => {
  //console.log('emotion in article: ', emotion);
  //console.log('article tone', article.tone);
    return (
      <Link to={article.url} target="_blank">
        <div className="col-xs-3 article">
          <div>
            {article.title}
          </div>
          <div>
            { `${article.snippet} ... ` }
          </div>
        </div>
      </Link>
    );
};

Article.propTypes = {
  article: PropTypes.object.isRequired
};

export default Article;
