import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import DeviceInfo from "./DeviceInfo";
const OrderProductModal = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="modal-content-body">
      <Button
        color="succes"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Посмотреть товары
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
            Подробнее о заказе
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product ? (
            product.length === 0 ? (
              <p>Товаров нет</p>
            ) : (
              <table className="table_adaptive">
                <thead>
                  <tr>
                    <th>Колл-во</th>
                    <th>Сумма</th>
                    <th>Подробнее</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr key={item.id}>
                      <td data-label="Колл-во">{item.qty}</td>
                      <td data-label="Сумма">{item.price} руб.</td>
                      <td data-label="Подробнее">
                        <DeviceInfo device={item.device} />
                      </td>
                    </tr>
                  ))}
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

export default OrderProductModal;
