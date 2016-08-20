import $ from 'jquery';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ArticleDescriptionButton from './ArticleDescriptionButton';
import ArticleEmotionsList from './ArticleEmotionsList';
import emotionColorKey from '../../emotionColorKey';
import '../../styles/article.scss';

class Article extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isDescriptionShowing: false,
    };

    this.descriptionClickHandler = this.descriptionClickHandler.bind(this);
    this.articleClickHandler = this.articleClickHandler.bind(this);
    this.readMoreClickHandler = this.readMoreClickHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  descriptionClickHandler(e) {
    e.stopPropagation();
    this.setState({ isDescriptionShowing: true});

    $(e.currentTarget).closest('.article').one('mouseleave', function (e) {
      this.onMouseLeaveHandler();
    }.bind(this));
  }

  onMouseLeaveHandler() {
    setTimeout(() => {
      this.setState({ isDescriptionShowing: false });
    },300);
  }

  readMoreClickHandler(e) {
    e.stopPropagation();
    window.location.assign('/about');
  }

  articleClickHandler() {
    window.open(this.props.article.url)
  }

  render () {
    let numbersDescription = 'These numbers represent how strong the listed emotions are relative to that emotion\'s average across many articles. An anger score of 8.0 means that the article contains significantly more anger than the average article and thus is likely to stand out as angry to someone who reads a lot of news. The percentages at the top represent the raw average emotion levels of all articles returned for the current search.'

    let dominantTone = {
      boxShadow: '3px 3px 7px 3px #999',
      border: `8px solid ${emotionColorKey[this.props.article.dominantTone]}`,
    }

    let backContent = this.state.isDescriptionShowing ?
      <div>
        {numbersDescription}
        <br />
        <div onClick={this.readMoreClickHandler} className="readMoreLink">Read More</div>
      </div>
      :
      <div>
        <ArticleDescriptionButton clickHandler={this.descriptionClickHandler} />
        <ArticleEmotionsList article={this.props.article} />
      </div>; 


    return (
      <div className="article">
        <div onClick={this.articleClickHandler} className="flip-container">
          <div className="flipper">
            <div className="front" style={dominantTone} >
              <div className="articleTitle">{this.props.article.title}</div>
              <div className="articleSnippet">{`${this.props.article.snippet} ... `}</div>
            </div>
            <div className="back" style = {dominantTone}>
              {backContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;

