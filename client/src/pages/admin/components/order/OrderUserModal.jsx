import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const OrderUserModal = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="modal-content-body">
      <Button
        color="succes"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Посмотреть пользователя
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Информация о пользователе: {props.user.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.user ? (
            props.user.length === 0 ? (
              <p>Пользователя не существует</p>
            ) : (
              <table className="table_adaptive">
                <thead>
                  <tr>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Имя">{props.user.name}</td>
                    <td data-label="Телефон">{props.user.phone}</td>
                    <td data-label="Email">{props.user.email}</td>
                  </tr>
                </tbody>
              </table>
            )
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderUserModal;
