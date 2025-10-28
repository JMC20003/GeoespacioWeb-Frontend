
import React from 'react';

const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 p-1 border border-gray-300 rounded-md cursor-pointer"
      />
      <span className="ml-2 text-sm text-gray-700">{color}</span>
    </div>
  );
};

export default ColorPicker;
