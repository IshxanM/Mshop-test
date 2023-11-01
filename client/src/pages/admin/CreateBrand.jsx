import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  createBrand,
  getAllBrand,
} from "../../redux/features/brand/brandSlice";

import { toast } from "react-toastify";
import GetBrands from "./components/GetBrands";
import { useForm } from "react-hook-form";

const CreateBrand = () => {
  const { status } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(getAllBrand());
    if (status) {
      toast(status);
    }
  }, [status]);

  const addCreateBrand = () => {
    try {
      dispatch(createBrand({ name }));
      dispatch(getAllBrand());
      setName("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page__content">
      <h1 className="page__name">Создание бренда</h1>
      <hr />
      <Form onSubmit={handleSubmit(addCreateBrand)}>
        <Form.Label htmlFor="inputPassword5">Название бренда</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          isInvalid={!!errors.name}
          {...register("name", {
            required: "Заполните поле",
            onChange: (e) => {
              setName(e.target.value);
            },
          })}
        />
        {errors.name ? (
          <span className="error-msg">{errors.name.message}</span>
        ) : (
          ""
        )}
        <div className="btn__type">
          <Button type="submit" variant="primary">
            Добавить
          </Button>
        </div>
      </Form>
      <div className="getType__body">
        <GetBrands />
      </div>
    </div>
  );
};

export default CreateBrand;
