import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Face = ({ face, searchTerm }) =>
  // replace search w/ search var from store
  <div className="inline">
    <h3>{face.emotion.split('')[0].toUpperCase()
      + face.emotion.slice(1, face.emotion.length)}</h3>
    <Link to={`/articles/${searchTerm}/${face.emotion}`}>
      <h3>{face.img}</h3>
      <h5>{face.percentage ? face.percentage : ''}</h5>
    </Link>
  </div>;

Face.propTypes = {
  face: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default Face;
