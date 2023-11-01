import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { setNewResetPassword } from "../redux/features/auth/authSlice";
import { FormLabel } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { link } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (status) {
      navigate(LOGIN_ROUTE);
    }
  }, [status, navigate]);

  const handleClick = () => {
    try {
      dispatch(setNewResetPassword({ password, link }));
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Container>
        <h1 className=" d-flex justify-content-center mt-3 ">Сброс пароля</h1>
        <Form onSubmit={handleSubmit(handleClick)}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Новый пароль</Form.Label>
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

          <Button type="submit" variant="primary">
            Отправить
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ResetPassword;
