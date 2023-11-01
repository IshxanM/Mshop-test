import { useState, React, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
// import { Context } from "../../index";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import { getAllType } from "../../redux/features/type/typeSlice";
import { getAllBrand } from "../../redux/features/brand/brandSlice";

import { useForm } from "react-hook-form";
import { createDevice } from "../../redux/features/device/deviceSlice";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { CustomContext } from "../../utils/context";
const CreateDevice = () => {
  const dispatch = useDispatch();
  const { getAllDevice } = useContext(CustomContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [brandId, setBrandId] = useState();
  const [typeId, setTypeId] = useState();
  const [inStock, setInStock] = useState();
  const types = useSelector((state) => state.type.types);
  const brands = useSelector((state) => state.brand.brands);
  const { status } = useSelector((state) => state.device);

  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllType());
  }, [dispatch]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const chandeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const addDevice = async (e) => {
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", `${price}`);
      formData.append("img", file);
      formData.append("brandId", brandId);
      formData.append("inStock", inStock);
      formData.append("typeId", typeId);
      formData.append("info", JSON.stringify(info));
      dispatch(createDevice(formData));
      // setFile();

      setPrice("");
      setName("");
      setInfo([]);
      setBrandId(0);
      setTypeId(0);
      setInStock("");

      reset(setFile());
      // reset();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch(getAllDevice());
    if (status) {
      toast(status);
    }
  }, [status]);

  return (
    <div className="page__content">
      <h1 className="page__name">Создание устройства</h1>
      <hr />
      <Form onSubmit={handleSubmit(addDevice)}>
        <Form.Select
          value={typeId}
          aria-label="Выберите тип устройства"
          {...register("typeId", {
            required: "Выберите тип устройства",
            onChange: (e) => {
              setTypeId(e.target.value);
            },
          })}
        >
          <option>Выберите тип</option>
          {types.types
            ? types.types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            : ""}
        </Form.Select>
        {errors.typeId ? (
          <span className="error-msg">{errors.typeId.message}</span>
        ) : (
          ""
        )}
        <Form.Select
          value={brandId}
          aria-label="Выберите бренд"
          {...register("brandId", {
            required: "Выберите бренд",
            onChange: (e) => {
              setBrandId(e.target.value);
            },
          })}
        >
          <option>Выберите бренд</option>
          {brands.brand
            ? brands.brand.map((brand) => (
                <option value={brand.id} key={brand.id}>
                  {brand.name}
                </option>
              ))
            : ""}
        </Form.Select>
        {errors.brandId ? (
          <span className="error-msg">{errors.brandId.message}</span>
        ) : (
          ""
        )}
        <Form.Control
          placeholder="Введите название устройства"
          className="mt-3"
          value={name}
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
        <Form.Control
          placeholder="Введите стоимость устройства"
          className="mt-3"
          type="number"
          value={price}
          isInvalid={!!errors.price}
          {...register("price", {
            required: "Заполните поле",
            onChange: (e) => {
              setPrice(e.target.value);
            },
          })}
        />
        {errors.price ? (
          <span className="error-msg">{errors.price.message}</span>
        ) : (
          ""
        )}
        <Form.Control
          placeholder="Введите колличество в наличии"
          className="mt-3"
          type="number"
          isInvalid={!!errors.inStock}
          value={inStock}
          {...register("inStock", {
            required: "Заполните поле",
            onChange: (e) => {
              setInStock(e.target.value);
            },
          })}
        />
        {errors.inStock ? (
          <span className="error-msg">{errors.inStock.message}</span>
        ) : (
          ""
        )}
        <Form.Control
          className="mt-3"
          type="file"
          {...register("selectFile", {
            required: "Выберите фото",
            onChange: (e) => {
              setFile(e.target.files[0]);
            },
          })}
        />
        {errors.selectFile ? (
          <span className="error-msg">{errors.selectFile.message}</span>
        ) : (
          ""
        )}
        <hr />
        <Col md={12} className="btn__type-body">
          {" "}
          <Button className="btn__type" onClick={addInfo} variant="info">
            Добавить новое свойство
          </Button>
        </Col>

        {info?.map((i) => (
          <Row key={i.number} className="mt-2 mb-3">
            <Col md={12} mb={3}>
              <Form.Control
                value={i.title}
                onChange={(e) => {
                  chandeInfo("title", e.target.value, i.number);
                }}
                placeholder="Введите название свойства"
                // {...register("title", {
                //   required: "Заполните поле",
                //   onChange: (e) => {
                //     chandeInfo("title", e.target.value, i.number);
                //   },
                // })}
              />
              {/* {errors.title ? (
                <span className="error-msg">{errors.title.message}</span>
              ) : (
                ""
              )} */}
            </Col>
            <Col md={12} mb={3} className="mt-3">
              <Form.Control
                as="textarea"
                value={i.description}
                onChange={(e) => {
                  chandeInfo("description", e.target.value, i.number);
                }}
                placeholder="Введите описание "
                // {...register("description", {
                //   required: "Заполните поле",
                //   onChange: (e) => {
                //     chandeInfo("description", e.target.value, i.number);
                //   },
                // })}
              />
              {/* {errors.description ? (
                <span className="error-msg">{errors.description.message}</span>
              ) : (
                ""
              )} */}
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
    </div>
  );
};

export default CreateDevice;
