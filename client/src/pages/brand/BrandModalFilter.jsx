import { React, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../../redux/features/brand/brandSlice";
import { CustomContext } from "../../utils/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BrandModalFilter = () => {
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
            Все
          </MenuItem>
          {brands.brand
            ? brands.brand.map((brand) => (
                <MenuItem
                  sx={{ cursor: "pointer" }}
                  key={brand.id}
                  onClick={() => changeBrand(brand.id)}
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
  );
};

export default BrandModalFilter;
