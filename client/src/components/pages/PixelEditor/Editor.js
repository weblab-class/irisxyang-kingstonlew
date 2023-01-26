import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { post } from "../../../utilities";

import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import { DEFAULT_COLOR, COLOR_OPTIONS } from "./Colors";
import { EMPTY_PIXEL } from "./Pixel";
import { MenuItem, Select } from "@material-ui/core";
import { navigate } from "@reach/router";

const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 16;
const DEFAULT_PIXEL_SIZE = 32;

const clearGrid = (width, height) => {
  const g = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push({ color: EMPTY_PIXEL });
    }
    g.push(row);
  }
  return g;
};

const Editor = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  pixelSize = DEFAULT_PIXEL_SIZE,
}) => {
  const [grid, setGrid] = useState([]);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [colors, setColors] = useState([...COLOR_OPTIONS]);
  const [mode, setMode] = useState("pen");

  useEffect(() => {
    setGrid(clearGrid(width, height));
  }, [width, height, pixelSize]);

  const submitDrawing = () => {
    if (!window.confirm("Are you sure you want to finish your drawing for today?")) return;
    const picture = grid.map((row) => row.map(({ color }) => (color === "empty" ? "#fff" : color)));
    post("/api/post", { picture }).then((post) => {
      console.log({ post });
      navigate("/");
    });
  };

  return (
    <div className="flex flex-column pa3 ba b--moon-gray br2 items-center">
      <div className="flex flex-row justify-between mb3">
        <div className="flex flex-column mr3 items-center">
          <div key="toolbar" className="flex flex-row items-center mb3">
            <Select value={mode} onChange={(e) => setMode(e.target.value)}>
              <MenuItem value="pen">Pen</MenuItem>
              <MenuItem value="eraser">Eraser</MenuItem>
              <MenuItem value="bucket">Bucket</MenuItem>
            </Select>
            <Tooltip arrow title="Clear Canvas">
              <IconButton onClick={() => setGrid(clearGrid(width, height))}>
                <DeleteIcon className="dark-red" />
              </IconButton>
            </Tooltip>
          </div>
          <ColorPicker color={color} setColor={(c) => setColor(c)} colors={colors} />
        </div>
        <Canvas
          addColor={(c) => {
            if (!colors.includes(c)) setColors([...colors, c]);
          }}
          pixelSize={pixelSize}
          grid={grid}
          setGrid={(g) => setGrid(g)}
          color={color}
          mode={mode}
        />
      </div>
      <div>
        <Button variant="contained" onClick={submitDrawing}>
          Save Drawing
        </Button>
      </div>
    </div>
  );
};

export default Editor;
