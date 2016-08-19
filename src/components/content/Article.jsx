import React, { PropTypes } from 'react';
import '../../styles/article.scss';

/*let dominantStyle = {

}*/

const Article = ({ article }) =>{
let dominantTone = {
  backgroundColor: 'white',
}
if (article.dominantTone === 'anger') {
  dominantTone = {
  //backgroundColor: 'red',
  boxShadow: 'inset 0 0 10px red'
}}
if(article.dominantTone === 'disgust'){dominantTone = {
  boxShadow: '3px 3px 7px 3px #999, inset 0px 0px 10px green',
}}
if(article.dominantTone === 'fear'){dominantTone = {
  boxShadow: '3px 3px 7px 3px #999, inset 0px 0px 10px #6600cc',

}}
if(article.dominantTone === 'joy'){dominantTone = {
    boxShadow: '3px 3px 7px 3px #999, inset 0px 0px 10px #ff00ff',
}}
if(article.dominantTone === 'sadness'){dominantTone = {
  boxShadow: '3px 3px 7px 3px #999, inset 0px 0px 10px #0099ff',
}}

return (
  <div className="article">
    <a
      href={article.url} target="_blank"
      className="flip-container"
    >
    {/* ontouchstart="this.classList.toggle('hover');" */}
      <div className="flipper">
        <div className="front" style = {dominantTone} >
          <div className="articleTitle"  >{article.title}</div>
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
