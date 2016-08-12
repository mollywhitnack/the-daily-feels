import React, {PropTypes} from 'react';
import {Link} from 'react-router';

//urls passed from facebar

const Face = ({face}) =>{
  return (
    <div>
      <h3>{face.emotion.split('')[0].toUpperCase() + face.emotion.slice(1, face.emotion.length)}</h3>
      <Link to ={`/face/${face.emotion}`}>
        <h3>{face.img}</h3>
      </Link>
    </div>
  );
};
// <img src = {face.img} />

Face.propTypes = {
  face: PropTypes.object.isRequired
};

export default Face;
