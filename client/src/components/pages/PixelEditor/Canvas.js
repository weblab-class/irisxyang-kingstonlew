import React, { useState } from "react";
import Pixel, { EMPTY_PIXEL } from "./Pixel";

const paintGrid = (grid, newColor) =>
  grid.map((row) => row.map(({ color }) => ({ color: color === "empty" ? newColor : color })));

const Canvas = ({ grid, pixelSize, setGrid, color, addColor, mode }) => {
  const [drawingEnabled, setDrawingEnabled] = useState(false);

  const gridHtml = grid.map((row, y) => (
    <div key={`row${y}`} className="flex flex-row">
      {row.map((pixel, x) => (
        <Pixel
          pixel={pixel}
          position={{ x, y }}
          size={pixelSize}
          drawingEnabled={drawingEnabled && mode !== "bucket"}
          onTouch={(pixel) => {
            if (mode === "eraser") {
              pixel.color = EMPTY_PIXEL;
              return setGrid([...grid]);
            }
            pixel.color = color;
            addColor(color);
            setGrid([...grid]);
          }}
          key={`PixelNode@(${x},${y})`}
        />
      ))}
    </div>
  ));

  return (
    <div
      onClick={() => {
        if (mode === "bucket") setGrid(paintGrid(grid, color));
      }}
      onMouseDown={() => setDrawingEnabled(true)}
      onMouseUp={() => setDrawingEnabled(false)}
      onMouseLeave={() => setDrawingEnabled(false)}
      className="bg-near-black canvas-border"
      style={{ paddingTop: 1, paddingLeft: 1 }}
    >
      {gridHtml}
    </div>
  );
};

export default Canvas;
