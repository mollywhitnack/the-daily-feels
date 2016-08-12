import React, {PropTypes} from 'react';

//urls passed from facebar

const Face = ({face}) =>{
  return (
    <Link to = `/face/${face.emotion}`>
      <h3>{face.emotion}</h3>
      <image src = {face.url} />
    </Link>
  );
};

Face.propTypes = {
  face: PropTypes.object.isRequired
};

export default Face;