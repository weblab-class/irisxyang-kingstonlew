import React from "react";
export const EMPTY_PIXEL = "empty";

const COLOR_MAP = { empty: "#f5f5f5" };

const Pixel = ({ pixel, size, position, onTouch, drawingEnabled }) => {
  const { x, y } = position;
  const { color } = pixel;
  return (
    <div
      aria-label={color}
      key={`${x},${y}`}
      style={{
        width: size,
        height: size,
        backgroundColor: COLOR_MAP[color] ?? color,
        marginRight: 1,
        marginBottom: 1,
      }}
      onMouseOver={() => {
        drawingEnabled && onTouch(pixel);
      }}
      onClick={() => {
        onTouch(pixel);
      }}
    ></div>
  );
};

export default Pixel;
