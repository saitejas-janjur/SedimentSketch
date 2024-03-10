import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line, Image } from 'react-konva';
import useImage from 'use-image';


const Canvas = ({ image, brushColor, brushSize, lines, setLines }) => {
  const [imageSrc] = useImage(image);
  const isDrawing = useRef(false);
  const stageRef = useRef();
  const resizedDimensions = { width: 900, height: 350 };


  useEffect(() => {
    if (status === 'loaded') {
      // Assuming the image isn't scaled; adjust as necessary.
      setImgDimensions({ width: imageSrc.width, height: imageSrc.height });
    }
  }, [imageSrc, status]);

  const isWithinImageBounds = (x, y) => {
    const imgX = 70; // Image X offset (assuming the same offset as before)
    const imgY = 0; // Image Y offset, assuming it's 0 for simplicity
    // Check if within bounds using resized dimensions
    return x >= imgX && x <= imgX + resizedDimensions.width && y >= imgY && y <= imgY + resizedDimensions.height;
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if (isWithinImageBounds(pos.x, pos.y)) {
      isDrawing.current = true;
      setLines([...lines, { tool: 'pen', points: [pos.x, pos.y], color: brushColor, size: brushSize }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    if (isWithinImageBounds(pos.x, pos.y)) {
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    } else {
      isDrawing.current = false; // Stop drawing if moved outside bounds
    }
  };

  // Function to stop drawing
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    // Here, consider adjusting the stage size to better fit the resized image and any UI elements around it
    // This might be a fixed size or based on the viewport dimensions
    stage.width(resizedDimensions.width + 70); // Optionally adjust based on layout needs
    stage.height(resizedDimensions.height);
  }, [imageSrc]);

  return (
    <Stage
      width={window.innerWidth} // Consider adjusting this if you want a different layout
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      ref={stageRef}
    >
      <Layer>
        <Image image={imageSrc} x={70} width={resizedDimensions.width} height={resizedDimensions.height} />
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.color}
            strokeWidth={line.size}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
