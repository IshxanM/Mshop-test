import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { registration, checkIsAuth } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

const Register = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate(HOME_ROUTE);
      window.location.reload();
      if (status) {
        toast(status);
      }
    }
    if (status) {
      toast(status);
    }
  }, [status, isAuth, navigate]);
  const handleRegister = (e) => {
    try {
      dispatch(registration({ email, password, name, phone }));
      setEmail("");
      setPassword("");
      setPhone();
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <h1 className=" d-flex justify-content-center mt-3">Регистрация</h1>
        <Form onSubmit={handleSubmit(handleRegister)}>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              className="form-control"
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="form-control"
              value={email}
              isInvalid={!!errors.email}
              type="email"
              {...register("email", {
                required: "Заполните поле",
                onChange: (e) => {
                  setEmail(e.target.value);
                },
              })}
            />
            {errors.email ? (
              <span className="error-msg">{errors.email.message}</span>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Телефон</Form.Label>

            <InputMask
              className={`form-control ${errors.phone ? "is-invalid" : " "} `}
              value={phone}
              //isInvalid={!!errors.phone}
              type="tell"
              mask="+7 (999) 999 9999"
              name="phone"
              minLength={11}
              {...register("phone", {
                required: "Заполните поле",
                onChange: (e) => {
                  setPhone(e.target.value.replace(/[\(\)\+\s]/g, ""));
                },
              })}
            />
            {errors.phone ? (
              <span className="error-msg">{errors.phone.message}</span>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              value={password}
              isInvalid={!!errors.password}
              className="form-control"
              type="password"
              {...register("password", {
                required: "Заполните поле",
                minLength: 6,
                onChange: (e) => {
                  setPassword(e.target.value);
                },
              })}
            />
            {errors.password ? (
              <span className="error-msg">{errors.password.message}</span>
            ) : (
              ""
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="error-msg">Минимум 6 символов</span>
            )}
          </Form.Group>

          <Button type="submit" variant="primary">
            Отправить
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
