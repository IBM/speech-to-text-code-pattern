import React from 'react';
import PropTypes from 'prop-types';

export const KeywordTooltip = ({ confidence, startTime, endTime }) => (
  <div className="keyword-tooltip">
    <p>Confidence: {confidence}</p>
    <p>
      {startTime}s - {endTime}s
    </p>
  </div>
);

KeywordTooltip.propTypes = {
  confidence: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default KeywordTooltip;
