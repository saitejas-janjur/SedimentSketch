import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Line, Image } from 'react-konva';
import useImage from 'use-image';

const Canvas = ({ image, brushColor, brushSize, lines, setLines }) => {
  const [imageSrc] = useImage(image);
  const isDrawing = useRef(false);
  const stageRef = useRef();

  // Function to start drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool: 'pen', points: [pos.x, pos.y], color: brushColor, size: brushSize }]);
  };

  // Function to draw lines
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // Add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // Replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
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
    // Adjust canvas size to image size for better drawing experience
    const container = stage.container();
    container.style.width = '100%';
    container.style.height = '100%';
    stage.width(stage.container().offsetWidth);
    stage.height(stage.container().offsetHeight);
  }, [imageSrc]);

  return (
    <Stage
      width={window.innerWidth} // You might want to use a dynamic width and height based on the image size or container
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      ref={stageRef}
    >
      <Layer>
        <Image image={imageSrc} x = {70}/>
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
