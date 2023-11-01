import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { login, checkIsAuth } from "../redux/features/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ModalResetPasswordUser from "../components/modal/ModalResetPasswordUser";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (status) {
      toast(status);
      if (isAuth) {
        navigate(HOME_ROUTE);
        window.location.reload();
      }
    }
  }, [status, isAuth, navigate]);

  const signIn = (e) => {
    try {
      dispatch(login({ email, password }));
      setPassword("");
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <h1 className=" d-flex justify-content-center mt-3">Вход</h1>
        <Form onSubmit={handleSubmit(signIn)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              isInvalid={!!errors.email}
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={password}
              isInvalid={!!errors.password}
              {...register("password", {
                required: "Заполните поле",
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
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            <Button type="submit" variant="primary">
              Войти
            </Button>
            <div className="modal-res-position">
              <ModalResetPasswordUser />
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
