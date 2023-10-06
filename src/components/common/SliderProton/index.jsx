import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Slider } from "@mui/material";

const useStyles = makeStyles({
  root: {
    width: "22rem",
  },
  thumb: {
    color: "#000000",
  },
  rail: {
    color: "#000000",
  },
  track: {
    color: "rgb(51, 122, 183)",
  },
});

const SliderProton = ({ value, changeValue }) => {
  const marks = ["Now", "30m", "1h", "3h", "12h", "1d", "3d", "7d"];
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState("Now");

  const handleChangeValue = (event, value) => {
    setSliderValue(value);
  };
  return (
    <div className={classes.root}>
      <Slider
        value={sliderValue}
        onChange={handleChangeValue}
        valueLabelDisplay="on"
        steps={1}
        marks={marks}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
      />
    </div>
  );
};

export default SliderProton;
