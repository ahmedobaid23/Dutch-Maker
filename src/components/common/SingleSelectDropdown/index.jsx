import React from "react";
import { FormControl, Select, MenuItem, ListItemText } from "@mui/material";

const SingleSelectDropdown = (props) => {
  return (
    <FormControl sx={{ width: "22rem", marginBottom: "1rem" }}>
      <p
        style={{ paddingBottom: "0.3rem", fontSize: "18px", fontWeight: "500" }}
      >
        {props.label}
      </p>
      <Select
        sx={{ backgroundColor: "white", height: "2.5rem" }}
        id="demo-simple-select"
        value={props.value}
        name={props.name}
        onChange={props.handleValue}
        renderValue={(selected) => selected}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "200px", // Adjust the height as needed
              overflowY: "auto",
            },
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.label}
            sx={{ padding: "1rem", height: "1rem" }}
          >
            <ListItemText primary={option.label}></ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelectDropdown;
