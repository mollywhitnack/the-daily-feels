import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../styles/AllFaceButton.scss';

const AllFaceButton = () =>
  <div className="inline allEmotions">
    <div className="emotionLabel">All</div>
    <div className="allFaces">
      <div className="smallFace emj" style={{top:0, left:-1, zIndex:2, }}>😄</div>
      <div className="smallFace emj" style={{top:25, left:-18, zIndex:1, }}>😠</div>
      <div className="smallFace emj" style={{top:28, left:16, zIndex:3, }}>😭</div>
    </div>
  </div>;

export default AllFaceButton;
