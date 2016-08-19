import Face from './Face';
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
      <div><Link to={`/articles/${searchTerm}`} className="allEmotions btn btn-primary">All</Link></div>
    </div>
  );
};

FaceBoard.propTypes = {
  faces: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default FaceBoard;
