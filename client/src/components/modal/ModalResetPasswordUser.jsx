import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { resetPassword } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const ModalResetPasswordUser = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [email, setEmail] = useState("");

  const handleClick = () => {
    dispatch(resetPassword({ email }));
    setModalShow(false);
  };

  return (
    <div className="modal-content-body">
      <a onClick={() => setModalShow(true)}>Забыли пароль?</a>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Сброс пароля
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleClick)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                // value={email}
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
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="primary">
                Отправить
              </Button>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalResetPasswordUser;
