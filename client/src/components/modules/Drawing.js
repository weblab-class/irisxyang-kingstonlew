import React from "react";

export const PIXEL_SIZE = 20;

const COLOR_MAP = { empty: "#fff" };

const Drawing = ({ picture }) => {
  return (
    <div className="flex flex-column border">
      {picture.map((row) => (
        <div className="flex flex-row">
          {row.map((backgroundColor) => (
            <div
              style={{
                backgroundColor: COLOR_MAP[backgroundColor] ?? backgroundColor,
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Drawing;
