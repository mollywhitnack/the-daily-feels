import React, { PropTypes } from 'react';

const PercentageCircle = ({ face }) =>
  <div className="container-fluid">
    <div className="circle text-center">
      <h4>{face.percentage}%</h4> </div>
  </div>;

PercentageCircle.propTypes = {
  face: PropTypes.object.isRequired,
};

