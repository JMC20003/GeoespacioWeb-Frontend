
import React from 'react';

const SizeSlider = ({ size, min, max, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={size}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="ml-2 text-sm text-gray-700">{size}</span>
    </div>
  );
};

export default SizeSlider;
