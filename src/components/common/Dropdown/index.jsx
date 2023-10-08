import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@mui/material";

const Dropdown = (props) => {
  return (
    <FormControl sx={{ width: "20rem", marginBottom: "1.5rem" }}>
      <p
        style={{ paddingBottom: "0.3rem", fontSize: "18px", fontWeight: "500" }}
      >
        {props.label}
      </p>
      <Select
        sx={{ backgroundColor: "white", height: "2.5rem", borderRadius: "7px" }}
        multiple
        value={props.value}
        name={props.name}
        id="multi-select"
        className="dropdown"
        onChange={props.handleValue}
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem value="all" sx={{ padding: "0" }}>
          <ListItemIcon>
            <Checkbox checked={props.isAllSelected}></Checkbox>
          </ListItemIcon>
          <ListItemText primary="Select all"></ListItemText>
        </MenuItem>
        <hr />
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.label} sx={{ padding: "0" }}>
            <ListItemIcon>
              <Checkbox
                name="select-checkbox"
                checked={props.value.includes(option.label)}
              ></Checkbox>
            </ListItemIcon>
            <ListItemText primary={option.label}></ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
