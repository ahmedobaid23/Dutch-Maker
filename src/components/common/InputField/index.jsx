import React from "react";
import { TextField } from "@mui/material";

const InputField = (props) => {
  return (
    <div>
      <p
        style={{ paddingBottom: "0.3rem", fontSize: "1rem", fontWeight: "500" }}
      >
        {props.label}
      </p>
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{
          width: "10rem",
          bgcolor: "white",
          borderRadius: "7px",
          "& fieldset": { border: "none" },
          height: "2.5rem",
          display: "flex",
          justifyContent: "center",
        }}
        type="number"
        name={props.name}
        onChange={props.handleValue}
        value={props.value}
      />
    </div>
  );
};

export default InputField;
