import React from "react";
import { SketchPicker as Picker } from "react-color";

const ColorPicker = ({ color, setColor, colors, setPen }) => {
  return (
    <Picker
      disableAlpha
      color={color}
      onChange={({ hex }) => {
        setColor(hex);
        setPen();
      }}
      presetColors={colors}
    />
  );
};

export default ColorPicker;
