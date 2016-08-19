import Face from './Face';
import AllFaceButton from './AllFaceButton';
import React, { PropTypes } from 'react';
import '../../styles/faceBoard.scss';

const FaceBoard = ({ faces, searchTerm }) => {
  const facesDisplay = faces.map(face =>
    <Face key={face.img} face={face} searchTerm={searchTerm} />
  );

  return (
    <div className="container-fluid faceBoard">
      {facesDisplay}
      <AllFaceButton searchTerm={searchTerm} />
    </div>
  );
};

FaceBoard.propTypes = {
  faces: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default FaceBoard;
