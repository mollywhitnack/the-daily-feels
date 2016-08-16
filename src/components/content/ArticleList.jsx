import React, { PropTypes } from 'react';
import Article from './Article';

const ArticleList = ({ articles, emotion }) => {
  const filteredArticles = articles.map(article => {
    for (let i = 0; i < article.tone.length; i++) {
      if (!emotion || article.tone[i].tone_id === emotion && article.tone[i].score > 0.5) {
        return <Article key={article.id} article={article} />;
      }
    }
    return null;
  });

  return (
    <div className="container-fluid">
      <div className="row">
        {filteredArticles}
      </div>
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  emotion: PropTypes.string,
};

export default ArticleList;
