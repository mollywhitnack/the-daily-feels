import $ from 'jquery';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
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
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  descriptionClickHandler(e) {
    e.stopPropagation();
    this.setState({ isDescriptionShowing: true});

    $(e.currentTarget).closest('.article').one('mouseleave', function (e) {
      this.onMouseLeaveHandler();
    }.bind(this));
  }

  articleClickHandler() {
    window.open(this.props.article.url);
  }

  onMouseLeaveHandler() {
    setTimeout(() => {
      this.setState({ isDescriptionShowing: false });
    },300);
  }

  render () {
    let numbersDescription = "Elit doloremque deserunt cumque voluptatem impedit quod voluptatem. Eaque magnam mollitia ad nihil quos. Earum ipsum sunt minus et nisi officiis. Pariatur debitis molestias laboriosam totam esse pariatur aperiam nesciunt."

    let dominantTone = {
      boxShadow: `3px 3px 7px 3px #999,
    inset 0px 0px 10px ${emotionColorKey[this.props.article.dominantTone]}`,
    }

    let backContent = this.state.isDescriptionShowing ?
      <div>
        {numbersDescription}
      </div>
      :
      <div>
        <ArticleDescriptionButton />
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

