import React, { PropTypes } from 'react';
import Article from './Article';

const ArticleList = ({ articles, emotion }) => {
  if (emotion) {
    articles.sort((a, b) =>
      (b.tone.find(el => el.tone_id === emotion).std
        - a.tone.find(el => el.tone_id === emotion).std)
    );
  }

  const filteredArticles = articles.map(article => {
    const thresholdArr = [0.4904, 0.284, 0.1616, 0.0143, 0.0737];

    for (let i = 0; i<article.tone.length; i++) {
      if (!emotion || article.dominantTone === emotion )//&& article.tone[i].score > thresholdArr[i]) 
      {
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
