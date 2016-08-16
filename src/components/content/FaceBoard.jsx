import Face from './Face';
import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const FaceBoard = ({ faces }) => {
  const windowUrl = window.location.href.split('/');
  let searchTerm = windowUrl[4];
  //  why not get searchTerm as a prop?

  const facesDisplay = faces.map(face =>
    <Face key={face.img} face={face} searchTerm={searchTerm} />
  );

  return (
    <div className="container-fluid">
      {facesDisplay}
      <Link to={`/articles/${searchTerm}`} className="btn btn-primary">All</Link>
    </div>
  );
};

FaceBoard.propTypes = {
  faces: PropTypes.array.isRequired,
};

export default FaceBoard;
