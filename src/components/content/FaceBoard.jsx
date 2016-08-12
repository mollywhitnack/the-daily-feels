import React, {PropTypes} from 'react';
import Face from './Face';

const FaceBoard = ({faces}) =>
<div className='container-fluid'>
    {faces.map(face =>
      <Face key={face.img} face={face} />
    )}
</div>;

export default FaceBoard;

// <PercentageCircle key={face.img} face={face} />
