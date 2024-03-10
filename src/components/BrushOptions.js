import React from 'react';

const BrushOptions = ({ brushColor, setBrushColor, brushSize, setBrushSize }) => {

  // Handler for brush color change
  const handleColorChange = (e) => {
    setBrushColor(e.target.value);
  };

  // Handler for brush size change (now using a slider)
  const handleSizeChange = (e) => {
    setBrushSize(e.target.value);
  };

  return (
    <div className="options-container" style={{color: 'white'}}> {/* Ensure text is white */}
      <div>
        <label htmlFor="brushColor">Brush Color: </label>
        <input
          id="brushColor"
          type="color"
          value={brushColor}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label htmlFor="brushSize">Brush Size: </label>
        <input
          id="brushSize"
          type="range" // Change to range
          min="1" // Minimum brush size
          max="10" // Maximum brush size
          value={brushSize}
          onChange={handleSizeChange}
        />
      </div>
    </div>
  );
};

export default BrushOptions;
