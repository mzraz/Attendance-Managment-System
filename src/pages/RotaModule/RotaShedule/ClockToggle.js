import React from 'react';

const ClockToggle = ({ onFormatChange }) => {
  const handleFormatChange = (event) => {
    onFormatChange(event.target.value);
  };

  return (
    <div className="clock-toggle">
      <label>
        <input
          type="radio"
          value="12"
          checked={12 === onFormatChange}
          onChange={handleFormatChange}
        />
        12 Hour
      </label>
      <label>
        <input
          type="radio"
          value="24"
          checked={24 === onFormatChange}
          onChange={handleFormatChange}
        />
        24 Hour
      </label>
    </div>
  );
};

export default ClockToggle;