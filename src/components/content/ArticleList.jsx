import React, {PropTypes} from 'react';
import Article from './Article';

const ArticleList = ({articles, emotion}) => {

  console.log('articles.tone', articles);
  console.log('emotion', emotion);

  if(emotion){
    return(
      <div className="container-fluid">
        <div className="row">
          {articles.map(article =>{
            for(let i =0; i<article.tone.length; i++){
              if(article.tone[i].tone_id === emotion && article.tone[i].score > 0.5)
                  return <Article key={article.id} article={article}/>
            }
          })}
        </div>
      </div>
    )
  } 
  else{
    return (
      <div className="container-fluid">
        <div className="row">
          {articles.map(article =>
            <Article key={article.id} article={article}/>
          )}
        </div>
      </div>
    );
  }
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
