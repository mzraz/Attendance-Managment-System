import React from 'react';
import moment from 'moment';

const TimeDisplay = ({ timeRange, clockFormat }) => {
  const formattedTimeRange = timeRange.map((time) =>
    moment().hour(time).format(clockFormat === '12' ? 'h:mm A' : 'HH:mm')
  );

  return (
    <div className="time-display">
      <span>{formattedTimeRange[0]}</span>
      <span>-</span>
      <span>{formattedTimeRange[1]}</span>
    </div>
  );
};

export default TimeDisplay;