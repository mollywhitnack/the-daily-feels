import React, { PropTypes } from 'react';
import '../../styles/percentageCircle.scss';

const PercentageCircle = ({ percentage }) => {
  console.log('in percentageCircle');
  console.log('percentage:', typeof (percentage));
  return (
    <div className="container-fluid">
      <div className="circle text-center">
        <div className="percentage">{percentage}%</div>
      </div>
    </div>
  )
}

PercentageCircle.propTypes = {
  percentage: PropTypes.string.isRequired,
};

export default PercentageCircle;
