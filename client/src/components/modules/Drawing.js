import React from "react";

export const PIXEL_SIZE = 20;

const Drawing = ({ picture }) => {
  return (
    <div className="flex flex-column border">
      {picture.map((row) => (
        <div className="flex flex-row">
          {row.map((backgroundColor) => (
            <div style={{ backgroundColor, width: PIXEL_SIZE, height: PIXEL_SIZE }}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Drawing;
