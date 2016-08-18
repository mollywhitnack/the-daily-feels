import React, { PropTypes } from 'react';
import Article from './Article';

const ArticleList = ({ articles, emotion }) => {
  if (emotion) {
    articles.sort( (a, b) =>  {
      a.tone.find(el => el.tone_id === emotion).score - b.tone.find(el => el.tone_id === emotion).score;
    });
  }



  const filteredArticles = articles.map(article => {


    let thresholdArr = [.4904, .284, .1616, .0143, .0737];
    
    for (let i = 0; i<article.tone.length; i++) {


      if (!emotion || article.tone[i].tone_id === emotion && article.tone[i].score > thresholdArr[i]) {
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
