import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../actions/articleActions';
import '../../styles/about.scss';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class AboutPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
     
    };
  }

  render() {
    return (
    <div className = "aboutBackground"> 
    <div className = "aboutcontainer"> 

    <div id="about-section" className="section" >   
       <div className="container">
          <h1 className = "hermanoAlto">About the Team</h1>
          <br></br>
          <h5>
            <ul>
              <p>We are four developers with a passion for news, media, linguistics, and data. </p>
              <br></br>
              <p>We built <i>The Daily Feels</i> to help people analyze what they read on a daily basis and learn about the prevalence of emotional language used in the media.</p>
            </ul>
            <br></br>
          </h5>
          
            <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 info">
              <div className="row text-center hermanoAlto">
                <div className="col-md-3 col-sm-3">
                  <h4>Matthew Broatch</h4>
                  <div className="Matt"></div>
                        <a href="https://github.com/mnbroatch" target="_blank" className="btn"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                        <a href="http://matthewbroatch.com/" className="btn" target="_blank"><i className="fa fa-2x fa-user" aria-hidden="true"></i></a>
                        <a href="https://twitter.com/mnbroatch" className="btn" target="_blank"><i className="fa fa-2x fa-twitter" aria-hidden="true"></i></a>                
                  </div>
                
                <div className="col-md-3 col-sm-3">
                  <h4>Molly Whitnack</h4>
                  <div className="Molly"></div>
                        <a href="https://github.com/mollywhitnack" target="_blank" className="btn"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                        <a href="http://www.mollywhitnack.me/" className="btn" target="_blank"><i className="fa fa-2x fa-user" aria-hidden="true"></i></a>
                        <a href="https://twitter.com/MollyWhitnack" className="btn" target="_blank"><i className="fa fa-2x fa-twitter" aria-hidden="true"></i></a>                
                  </div>

                <div className="col-md-3 col-sm-3">
                  <h4>Nikhil Ram</h4>
                  <div className="Nick"></div>
                        <a href="https://github.com/nram20" target="_blank" className="btn"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                        <a href="http://www.nikhilram.org/" className="btn" target="_blank"><i className="fa fa-2x fa-user" aria-hidden="true"></i></a>
                        <a href="https://twitter.com/nikhilram" className="btn" target="_blank"><i className="fa fa-2x fa-twitter" aria-hidden="true"></i></a>                
                  </div>

                <div className="col-md-3 col-sm-3">
                  <h4>Sonam Kindy</h4>
                  <div className="Sonam"></div>
                        <a href="https://github.com/sdkindy" target="_blank" className="btn"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                        <a href="http://sonamdkindy.com/" className="btn" target="_blank"><i className="fa fa-2x fa-user" aria-hidden="true"></i></a>
                        <a href="https://twitter.com/sonamdkindy" className="btn" target="_blank"><i className="fa fa-2x fa-twitter" aria-hidden="true"></i></a>                
                  </div>
              </div>

          </div>
       </div>
    </div>
  

   <div id="about-section" class="section" >
        <div className="container" >
            <div className="row main-low-margin">
                <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 info" >
                    <h1 className = "hermanoAlto" >How Does <i><b>The Daily Feels</b></i> Work?</h1>
                    <br></br>
                    <h5>
                      <ul>
                        <p><i>The Daily Feels</i> analyzes media coverage of any topic or search term you can think of. More specifically, it gives you a breakdown of the emotional tone of news articles written about a subject. </p>
                        <br></br>
                        <p>After you enter a topic (say, Olympic Games 2016 Rio), our app pulls current news articles from several different sources and analyzes the full text of each individual article. We show you each article's level of anger, disgust, fear, joy, and sadness. </p>
                        <br></br>
                        <p>We also show you the averages for the articles that correspond to your search term. Click on a Face to sort articles by the strength of their emotional tones. </p>
                      </ul>
                    </h5>
                </div>
            </div>
        </div>
    </div>
   
    <div id="about-section" className="section" >
        <div className="container" >
           <div className="row main-low-margin">
                <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 info" >
                    <h1 className = "hermanoAlto">What Do The Numbers Mean?</h1>
                    <br></br>
                    <h5>

                      <ul>
                        <p>The Percentages next to the Emotion Faces represent both the occurences and intensity of the given tone throughout the articles. A high percentage, say an average anger of 90%, signifies that articles written about the given topic have a very high likelihood of being perceived as angry. These articles have frequent occurences of angry tones and those occurences of anger tend to be more intense. </p>
                        <br></br>
                        <p>The Tone Scores for each article (displayed when you hover over an individual article) detail exactly how strong and frequent the article's emotions are relative to averages for that given emotion. The tone scores are calculated using global averages and standard deviations for each category to determine which tones are significantly stronger than others. For example, an anger score of 8.0 means that the article's tone contains significantly more anger than average articles tend to have, and thus is very likely to stand out to someone who reads a lot of news as angry relative to the norm. </p>
                        <br></br>
                        <p>The Color of Each Article reflects the dominant tone of that given article. When multiple strong tones are found in an article (ie many articles with a high degree of strong anger will also have a high degree of disgust and/or fear), we determine which tone is significantly stronger than the others. The tone that is the greatest standard deviations above the that emotion's mean is the one most likely to stand out to readers as the definitive tone of the article.</p>
                      </ul>

                    </h5>
                </div>
            </div>
        </div>
    </div>

    <div id="about-section" className="section" >
        <div className="container" > 
           <div className="row main-low-margin">
                <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 info" >
                    <h1 className = "hermanoAlto">How Was <i><b>The Daily Feels</b></i> Built?</h1>
                    <br></br>
                    <h5>
                      <ul>
                          <p> The Daily Feels was built using React.js with Redux, Webpack, Node.js, and ES6. </p>
                          <br></br>
                          <p> We're using the Bing News API, Cheerio for webscraping, as well as IBM Watson's Tone Analyzer.</p>
                          <br></br>
                          <p> Styling is done with SCSS and Bootstrap, and all of our code follows the AirBnB Style Guide. </p>
                      </ul>    
                    </h5>
                </div>
            </div>
        </div>
    </div>    

      <div className="space-bottom"></div>


    </div>
    
</div>

    );
  }
}




export default AboutPage;






 