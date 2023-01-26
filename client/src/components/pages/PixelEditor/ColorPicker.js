import React from "react";
import { SketchPicker as Picker } from "react-color";

const ColorPicker = ({ color, setColor, colors }) => {
  return (
    <Picker
      disableAlpha
      color={color}
      onChange={({ hex }) => {
        setColor(hex);
      }}
      presetColors={colors}
    />
  );
};

export default ColorPicker;
