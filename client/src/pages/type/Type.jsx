import { React, useEffect, useState, useContext } from "react";
import { getAllType } from "../../redux/features/type/typeSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomContext } from "../../utils/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Type = () => {
  const dispatch = useDispatch();
  const { typeValue, changeType } = useContext(CustomContext);
  const types = useSelector((state) => state.type.types);
  const [type, setType] = useState("Все");

  useEffect(() => {
    dispatch(getAllType());
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Типы</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Типы"
          onChange={handleChange}
        >
          <MenuItem onClick={() => changeType("")} value="Все">
            Все
          </MenuItem>
          {types.types
            ? types.types.map((type) => (
                <MenuItem
                  sx={{ cursor: "pointer" }}
                  key={type.id}
                  onClick={() => changeType(type.id)}
                  value={type.name}
                >
                  {type.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
};

export default Type;
