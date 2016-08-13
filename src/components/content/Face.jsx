import React, {PropTypes} from 'react';
import {Link} from 'react-router';

//urls passed from facebar

const Face = ({face, searchTerm}) => {
  // replace search w/ search var from store
  return (
    <div className="inline">
      <h3>{face.emotion.split('')[0].toUpperCase() + face.emotion.slice(1, face.emotion.length)}</h3>
      <Link to ={`/articles/${searchTerm}/${face.emotion}`}>
        <h3>{face.img}</h3>
        <h5>{face.percentage ? face.percentage : '' }</h5>
      </Link>
    </div>
  );
};
// <img src = {face.img} />

Face.propTypes = {
  face: PropTypes.object.isRequired
};

export default Face;
