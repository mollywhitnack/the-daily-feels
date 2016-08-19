import Face from './Face';
import AllFaceButton from './AllFaceButton';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../styles/faceBoard.scss';

const FaceBoard = ({ faces, searchTerm }) => {
  const facesDisplay = faces.map(face =>
    <Face key={face.img} face={face} searchTerm={searchTerm} />
  );

  return (
    <div className="container-fluid faceBoard">
      {facesDisplay}
      <AllFaceButton />
    </div>
  );
};

FaceBoard.propTypes = {
  faces: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default FaceBoard;

