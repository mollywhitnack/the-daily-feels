import React, {PropTypes} from 'react';
import Face from './Face';

const faces = [
  {
    "img": "😠",
    "emotion": "anger",
    "percentage": 84,
  },
  {
    "img": "😷",
    "emotion": "disgust",
    "percentage": 37,
  },
  {
    "img": "😨",
    "emotion": "fear",
    "percentage": 25,
  },
  {
    "img": "😄",
    "emotion": "joy",
    "percentage": 92,
  },
  {
    "img": "😭",
    "emotion": "sadness",
    "percentage": 4,
  }
];

const FaceBoard = faces =>
<div className='container-fluid text-center'>
    {faces.map(face =>
      <Face key={face.img} face={face} />
    )}
</div>;

export default FaceBoard;

// <PercentageCircle key={face.img} face={face} />
