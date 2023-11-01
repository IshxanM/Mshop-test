import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDevice } from "../../../redux/features/device/deviceSlice";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import FormLabel from "@mui/material/FormLabel";
import CardMedia from "@mui/material/CardMedia";
import { toast } from "react-toastify";

const EditModalDevice = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [brandId, setBrandId] = useState();
  const [typeId, setTypeId] = useState();
  const [inStock, setInStock] = useState();
  const types = useSelector((state) => state.type.types);
  const brands = useSelector((state) => state.brand.brands);
  const [modalShow, setModalShow] = React.useState(false);

  const fetchPost = useCallback(async () => {
    setName(props.device.name);
    setPrice(props.device.price);
    setFile(props.device.img);
    setBrandId(props.device.brandId);
    setTypeId(props.device.typeId);
    setInStock(props.device.inStock);
  }, [
    props.device.name,
    props.device.price,
    props.device.img,
    props.device.brandId,
    props.device.typeId,
    props.device.inStock,
  ]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const chandeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const handleClickUpdate = () => {
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("id", props.device.id);
      formData.append("price", `${price}`);
      formData.append("img", file);
      formData.append("brandId", brandId);
      formData.append("inStock", inStock);

      formData.append("typeId", typeId);
      formData.append("info", JSON.stringify(info));
      dispatch(updateDevice(formData));
      setModalShow(false);

      setInfo([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-content-body">
      <Button onClick={() => setModalShow(true)}>
        <EditIcon sx={{ fontSize: 20 }} />
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-cont mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Редактирование: {props ? props.device.name : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleClickUpdate();
              e.preventDefault();
            }}
          >
            <Form.Select
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              aria-label="Выберите Тип"
              className="mt-3"
            >
              <option>Выберите тип</option>
              {types.types ? (
                types.types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              ) : (
                <h1>Загрузка...</h1>
              )}
            </Form.Select>
            <FormLabel>Выберите тип</FormLabel>

            <Form.Select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              aria-label="Выберите бренд"
              className="mt-3"
            >
              <option>Выберите бренд</option>
              {brands.brand ? (
                brands.brand.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))
              ) : (
                <h1>Загрузка...</h1>
              )}
            </Form.Select>
            <FormLabel>Выберите бренд</FormLabel>

            <Form.Control
              placeholder="Введите название устройства"
              className="mt-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
            <FormLabel>Введите название устройства</FormLabel>

            <Form.Control
              placeholder="Введите стоимость устройства"
              className="mt-3"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
            <FormLabel>Введите стоимость устройства</FormLabel>

            <Form.Control
              placeholder="Введите колличество в наличии"
              className="mt-3"
              type="number"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
            ></Form.Control>
            <FormLabel>Введите колличество в наличии</FormLabel>

            <Form.Control
              onChange={selectFile}
              className="mt-3"
              type="file"
            ></Form.Control>
            <FormLabel>Выберите фото</FormLabel>
            <CardMedia
              component="img"
              height="194"
              image={process.env.REACT_APP_API_URL + file}
              alt="Paella dish"
              className="mt-2 mb-2 "
            />
            <hr />
            <Col md={12} className="btn__type-body">
              {" "}
              <Button className="btn__type" onClick={addInfo} variant="info">
                Добавить новое свойство
              </Button>
            </Col>
            {info.map((i) => (
              <Row key={i.number} className="mt-2 mb-3">
                <Col md={12} mb={3}>
                  <Form.Control
                    value={i.title}
                    onChange={(e) => {
                      chandeInfo("title", e.target.value, i.number);
                    }}
                    placeholder="Введите название свойства"
                  />
                </Col>
                <Col md={12} mb={3} className="mt-3">
                  <Form.Control
                    as="textarea"
                    value={i.description}
                    placeholder="Введите описание "
                    onChange={(e) => {
                      chandeInfo("description", e.target.value, i.number);
                    }}
                  />
                </Col>
                <Col md={12} mb={3} className="d-flex justify-content-end mt-3">
                  <Button
                    onClick={() => {
                      removeInfo(i.number);
                    }}
                    variant="danger"
                    color="error"
                  >
                    {" "}
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="primary" className="mt-3">
                Добавить товар
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditModalDevice;
