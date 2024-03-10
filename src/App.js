import React, { useState, useRef } from 'react';
import FileUpload from './components/FileUpload';
import Canvas from './components/Canvas';
import BrushOptions from './components/BrushOptions';
import './index.css';

function App() {
  const [image, setImage] = useState(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [lines, setLines] = useState([]);
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const clearCanvas = () => {
    setLines([]);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
      setLines([]); // Optionally clear lines here if you want a fresh canvas for the new image
    }
  };

  const uploadNewImage = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const downloadCoordinates = () => {
    const element = document.createElement("a");
    const file = new Blob([lines.map(line => line.points.join(',')).join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "coordinates.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      <div className="header-bar">SedimentSketch</div>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input
      />
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
              <button onClick={clearCanvas} style={{ backgroundColor: '#D0A443', color: 'white', border: '2px solid black', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', margin: '5px', borderRadius: '5px' }}>
                Clear Canvas
              </button>
            </div>
          </div>
          <div className="image-options">
          <button onClick={uploadNewImage} style={{ backgroundColor: '#8B4513', color: 'white', border: '2px solid black', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', margin: '5px', borderRadius: '5px' }}>
            Upload New Image
          </button>
          <button onClick={downloadCoordinates} style={{ backgroundColor: '#8B4513', color: 'white', border: '2px solid black', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', margin: '5px', borderRadius: '5px' }}>
            Download Coordinates
          </button>
          </div>
        </>
      ) : (
        <FileUpload setImage={setImage} />
      )}
    </div>
  );
}
export default App;
