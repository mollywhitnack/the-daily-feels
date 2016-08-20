import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../styles/allFaceButton.scss';
import '../../styles/face.scss';

const AllFaceButton = ({ searchTerm, currentEmotion }) => {
  console.log('currentEmotion:', currentEmotion);
  return (
    <div className="allEmotions faceAlign">
      <div className="emotionLabel">All</div>
      <Link to={`/articles/${searchTerm}`}>
        <div className="allFaces">
          <div className="smallFace emj" id={currentEmotion ? "joyHover" : "joyActive"} style={{ top: 15, left: 17, zIndex: 2 }}>😄</div>
          <div className="smallFace emj" id={currentEmotion ? "angerHover" : "angerActive"} style={{ top: 48, left: -4, zIndex: 1 }}>😠</div>
          <div className="smallFace emj" id={currentEmotion ? "sadnessHover" : "sadnessActive"} style={{ top: 51, left: 38, zIndex: 3 }}>😭</div>
        </div>
      </Link>
    </div>
  )
}

AllFaceButton.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default AllFaceButton;
