import React, { useState } from 'react';
import Slider from "@mui/material/Slider";
import TimeDisplay from './TimeDisplay';
import ClockToggle from './ClockToggle';

const ClockSlider = () => {
  const [timeRange, setTimeRange] = useState([0, 12]);
  const [clockFormat, setClockFormat] = useState('12');

  const handleTimeRangeChange = (values) => {
    setTimeRange(values);
  };

  const handleClockFormatChange = (format) => {
    setClockFormat(format);
  };

  return (
    <div className="clock-slider">
      <Slider
        min={0}
        max={24}
        step={1}
        value={timeRange}
        onChange={handleTimeRangeChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="track" />
        )}
        renderThumb={({ props }) => (
          <div {...props} className="thumb" />
        )}
      >
        {/* {children} */}
      </Slider>
      <TimeDisplay timeRange={timeRange} clockFormat={clockFormat} />
      <ClockToggle onFormatChange={handleClockFormatChange} />
    </div>
  );
};

export default ClockSlider;