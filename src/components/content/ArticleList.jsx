import React, {PropTypes} from 'react';
import Article from './Article';

const ArticleList = ({articles}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {articles.map(article =>
          <Article key={article.id} article={article} />
        )}
      </div>
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
