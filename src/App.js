import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Canvas from './components/Canvas';
import BrushOptions from './components/BrushOptions';
import './index.css';

function App() {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [brushColor, setBrushColor] = useState('#000000'); // Default brush color
  const [brushSize, setBrushSize] = useState(5); // Default brush size
  const [lines, setLines] = useState([]); // Store drawn lines

  // Function to clear the canvas
  const clearCanvas = () => {
    setLines([]);
  };

  const clearImage = () => {
    setImage(null); // Clear the image
    setLines([]); // Clear the drawing lines
  };

  // Function to download the coordinates
  const downloadCoordinates = () => {
    const element = document.createElement("a");
    const file = new Blob([lines.map(line => line.points.join(',')).join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "coordinates.txt";
    document.body.appendChild(element); // Required for FireFox
    element.click();
  };

  return (
    <div className="App">
      <div className="header-bar">SedimentSketch</div>
      {image ? (
        <>
          <div className="editor-container">
            <div className="canvas-container">
              <Canvas
                image={image}
                brushColor={brushColor}
                brushSize={brushSize}
                lines={lines}
                setLines={setLines}
              />
            </div>
            <div className="options-container">
              <BrushOptions
                brushColor={brushColor}
                setBrushColor={setBrushColor}
                brushSize={brushSize}
                setBrushSize={setBrushSize}
              />
              <button onClick={clearCanvas}>Clear Canvas</button>
            </div>
          </div>
          <div className="image-options">
            <button onClick={downloadCoordinates}>Download Coordinates</button>
            <button onClick={clearImage}>Upload New Image</button>
          </div>
        </>
      ) : (
        <FileUpload setImage={setImage} />
      )}
    </div>
  );
}
export default App;
