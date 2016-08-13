import React, {PropTypes} from 'react';
import Face from './Face';

const FaceBoard = ({faces}) => {
  let windowUrl = window.location.href.split('/');
  let searchTerm = windowUrl[4];
  return (
    <div className='container-fluid'>
      {faces.map(face =>
        <Face key={face.img} face={face} searchTerm={searchTerm} />
      )}
    </div>
  )
}

export default FaceBoard;
