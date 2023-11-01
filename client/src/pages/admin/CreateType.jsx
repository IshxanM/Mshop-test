import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createType, getAllType } from "../../redux/features/type/typeSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import GetType from "./components/GetType";
const CreateType = () => {
  const { status } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [dispatch]);

  const addCreateType = () => {
    try {
      dispatch(createType({ name }));
      dispatch(getAllType());
      setName("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page__content">
      <h1 className="page__name">Создание типа</h1>
      <hr />
      <Form onSubmit={handleSubmit(addCreateType)}>
        <Form.Label htmlFor="inputPassword5">Название типа</Form.Label>
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
        <GetType />
      </div>
    </div>
  );
};

export default CreateType;
