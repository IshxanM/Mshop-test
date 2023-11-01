import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "../../assets/css/creditCard.css";
import { useForm } from "react-hook-form";
const CreditCardUi = () => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");

  const {
    register,
    reset,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onBlur",
  });

  return (
    <div>
      <div className="rccs__card rccs__card--unknown">
        <Cards
          number={number}
          name={name}
          expiry={date}
          cvc={cvc}
          focused={focus}
        />
      </div>

      <br />

      <div className="row">
        <div className="col-sm-13">
          <label htmlFor="name">Card Number</label>
          <input
            type="text"
            className="form-control"
            value={number}
            name="number"
            required
            onFocus={(e) => SetFocus(e.target.name)}
            {...register("number", {
              required: true,
              minLength: 15,
              maxLength: 19,

              onChange: (e) => {
                SetNumber(e.target.value.replace(/\D/g, ""));
              },
            })}
          />
          {errors.number && errors.number.type === "required" && (
            <span className="error-msg">Заполните поле</span>
          )}
          {errors.number && errors.number.type === "minLength" && (
            <span className="error-msg">Заполните номер карты</span>
          )}
          {errors.number && errors.number.type === "maxLength" && (
            <span className="error-msg">Введите валидный номера карты</span>
          )}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-13">
          <label htmlFor="name">Card Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            name="name"
            required
            onFocus={(e) => SetFocus(e.target.name)}
            {...register("name", {
              required: true,
              minLength: 2,

              onChange: (e) => {
                SetName(e.target.value.replace(/[^a-z\s]+/gi, ""));
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <span className="error-msg">Заполните поле (только латиница) </span>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <span className="error-msg">Заполните имя (только латиница)</span>
          )}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="name">Expiration Date</label>
          <input
            type="text"
            name="expiry"
            className="form-control"
            value={date}
            maxLength="4"
            required
            onFocus={(e) => SetFocus(e.target.name)}
            {...register("date", {
              required: true,
              minLength: 4,
              maxLength: 4,

              onChange: (e) => {
                SetDate(e.target.value.replace(/\D/g, ""));
              },
            })}
          />
          {errors.date && errors.date.type === "required" && (
            <span className="error-msg">Заполните поле</span>
          )}
          {errors.date && errors.date.type === "minLength" && (
            <span className="error-msg">Заполните поле</span>
          )}
          {errors.date && errors.date.type === "maxLength" && (
            <span className="error-msg">Введите валидную дату</span>
          )}
        </div>
        <div className="col-sm-6">
          <label htmlFor="name">CVV</label>
          <input
            type="tel"
            name="cvc"
            className="card"
            value={cvc}
            maxLength="3"
            required
            onFocus={(e) => SetFocus(e.target.name)}
            {...register("cvc", {
              required: true,
              minLength: 3,
              maxLength: 3,

              onChange: (e) => {
                SetCvc(e.target.value.replace(/\D/g, ""));
              },
            })}
          />
          {errors.cvc && errors.cvc.type === "required" && (
            <span className="error-msg">Заполните поле</span>
          )}
          {errors.cvc && errors.cvc.type === "minLength" && (
            <span className="error-msg">Заполните поле</span>
          )}
          {errors.cvc && errors.cvc.type === "maxLength" && (
            <span className="error-msg"> Введите валидный cvc</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreditCardUi;
