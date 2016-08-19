import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../styles/AllFaceButton.scss';

const AllFaceButton = () =>
  <div className="inline allEmotions faceAlign">
    <div className="emotionLabel">All</div>
    <div className="allFaces">
      <div className="smallFace emj" style={{top:12, left:-3, zIndex:2, }}>😄</div>
      <div className="smallFace emj" style={{top:45, left:-24, zIndex:1, }}>😠</div>
      <div className="smallFace emj" style={{top:48, left:18, zIndex:3, }}>😭</div>
    </div>
  </div>;

export default AllFaceButton;
