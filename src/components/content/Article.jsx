import React, { PropTypes } from 'react';
import '../../styles/article.scss';

/*let dominantStyle = {

}*/

const Article = ({ article }) =>{
  let dominantTone = {
    color: 'black',
  }
  if (article.dominantTone === 'anger') {
    dominantTone = {
      color: 'red',
    }}
  if(article.dominantTone === 'disgust'){dominantTone = {
    color: 'green',
  }}
  if(article.dominantTone === 'fear'){dominantTone = {
    color: 'grey',
  }}
  if(article.dominantTone === 'joy'){dominantTone = {
    color: 'pink',
  }}
  if(article.dominantTone === 'sadness'){dominantTone = {
    color: 'blue',
  }}

  return (
    <div className="article">
      <a
        href={article.url} target="_blank"
        className="flip-container"
      >
        {/* ontouchstart="this.classList.toggle('hover');" */}
        <div className="flipper">
          <div className="front" >
            <div className="articleTitle" style={dominantTone}>{article.title}</div>
            <div className="articleSnippet">{`${article.snippet} ... `}</div>
          </div>
          <div className="back">

            <p className="articleEmotionRow anger"> Anger - {(article.tone[0].std.toFixed(1))}</p>
            <p className="articleEmotionRow disgust"> Disgust - {(article.tone[1].std.toFixed(1))}</p>
            <p className="articleEmotionRow fear"> Fear - {(article.tone[2].std.toFixed(1))}</p>
            <p className="articleEmotionRow joy"> Joy - {(article.tone[3].std.toFixed(1))}</p>
            <p className="articleEmotionRow sadness"> Sadness - {(article.tone[4].std.toFixed(1))}</p>

          </div>
        </div>
      </a>
    </div>
  )};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
