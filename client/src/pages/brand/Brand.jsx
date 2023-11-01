import { useContext, React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../../redux/features/brand/brandSlice";
import { CustomContext } from "../../utils/context";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Brand = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);
  const { brandValue, changeBrand } = useContext(CustomContext);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);
  const [brand, setBrand] = useState("Все");

  const handleChange = (event) => {
    setBrand(event.target.value);
  };

  return (
    <div>
      <div className="brand">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            cursor: "pointer",
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          <li>
            <ul>
              <ListItem onClick={() => changeBrand("")}>
                <ListItemText primary={`Все`} />
              </ListItem>
              {brands.brand
                ? brands.brand.map((brand) => (
                    <ListItem
                      key={brand.id}
                      onClick={() => changeBrand(brand.id)}
                      selected={brand.id === brandValue}
                    >
                      <ListItemText primary={`${brand.name}`} />
                    </ListItem>
                  ))
                : ""}
            </ul>
          </li>
        </List>
      </div>
      <div className="brand2">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Бренды</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={brand}
            label="Бренды"
            onChange={handleChange}
          >
            <MenuItem onClick={() => changeBrand("")} value="Все">
              <em>Все</em>
            </MenuItem>
            {brands.brand
              ? brands.brand.map((brand) => (
                  <MenuItem
                    sx={{ cursor: "pointer" }}
                    key={brand.id}
                    onClick={() => changeBrand(brand.id)}
                    as="li"
                    value={brand.name}
                    selected={brand.id === brandValue}
                  >
                    {brand.name}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Brand;
