import Face from './Face';
import React, { PropTypes } from 'react';

const FaceBoard = ({ faces }) => {
  const windowUrl = window.location.href.split('/');
  let searchTerm = windowUrl[4];

  const facesDisplay = faces.map(face =>
    <Face key={face.img} face={face} searchTerm={searchTerm} />
  );

  return (
    <div className="container-fluid">
      {facesDisplay}
    </div>
  );
};

FaceBoard.propTypes = {
  faces: PropTypes.array.isRequired,
};

export default FaceBoard;
