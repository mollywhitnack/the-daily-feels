import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PercentageCircle from './PercentageCircle';
import '../../styles/face.scss';

const displayNone = {
  textDecoration: 'none',
}


const Face = ({ face, searchTerm }) =>
  // replace search w/ search var from store
  <div className="inline faceAlign" >
    <div className="emotionLabel">{face.emotion.split('')[0].toUpperCase()
      + face.emotion.slice(1, face.emotion.length)}</div>
    <Link to={`/articles/${searchTerm}/${face.emotion}`} style = {displayNone}>
      <div className="face emj">{face.img}</div>
      <PercentageCircle percentage={face.percentage.toString()} />
    </Link>
  </div>;

Face.propTypes = {
  face: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default Face;
