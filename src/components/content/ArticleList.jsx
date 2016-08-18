import React, { PropTypes } from 'react';
import Article from './Article';

const ArticleList = ({ articles, emotion }) => {
  if (emotion) {
    articles.sort((a, b) =>
      a.tone.find(el => el.tone_id === emotion).score
      - b.tone.find(el => el.tone_id === emotion).score
    );
  }
  const filteredArticles = articles.map(article => {
    for (let i = 0; i < article.tone.length; i++) {
      if (!emotion || article.tone[i].tone_id === emotion && article.tone[i].score > 0.5) {
        return <Article key={article.id} article={article} />;
      }
    }
    return null;
  });

  return (
    <div>
      {filteredArticles}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  emotion: PropTypes.string,
};

export default ArticleList;
