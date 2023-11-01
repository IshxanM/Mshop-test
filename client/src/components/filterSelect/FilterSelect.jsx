import { React, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { CustomContext } from "../../utils/context";
import "./style.css";
const FilterSelect = () => {
  const { price, setPrice } = useContext(CustomContext);
  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="filter_select">
      <Form.Select
        value={price}
        onChange={handleChange}
        aria-label="Default select example"
      >
        <option value="asc">Дешевле</option>
        <option value="desc">Дороже</option>
        <option value="a-z">А-Я</option>
        <option value="z-a">Я-А</option>
        <option value="5-1">По рейтингу</option>

        <option value=" ">Сбросить</option>
      </Form.Select>
    </div>
  );
};

export default FilterSelect;
