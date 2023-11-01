import React, { useState, createRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import Button from "@mui/material/Button";

import { useEffect } from "react";
import { CustomContext } from "../../utils/context";
import { useContext } from "react";
import "./index.css";

const Ymaps = () => {
  const { inputValue, setInputValue } = useContext(CustomContext);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [addressCoord, setAddressCoord] = useState();

  const [savedYmaps, setSavedYmaps] = useState();
  const [isHideYandexInput, setIsHideYandexInput] = useState(false);
  const [open, setOpen] = useState(false);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    const crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const mapState = {
    center: [latitude, longitude],
    zoom: 13,
    controls: [],
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const inputRef = createRef();

  const handleOpen = () => {
    setOpen(true);
  };
  const onClickAddress = (e, ymaps) => {
    const name = e.get("item").value;
    setInputValue(name);
    ymaps.geocode(name).then((result) => {
      const coord = result.geoObjects.get(0).geometry.getCoordinates();
      setAddressCoord(coord);
    });
  };

  const onYmapsLoad = (ymaps) => {
    setSavedYmaps(ymaps);
    const suggestView = new ymaps.SuggestView(inputRef.current);
    suggestView.events.add("select", (e) => {
      return onClickAddress(e, ymaps);
    });
  };

  const onClickToMap = async (e) => {
    const coords = e.get("coords");
    setAddressCoord(coords);
    const result = await savedYmaps.geocode(coords);
    const firstGeoObject = result.geoObjects.get(0);
    setInputValue(firstGeoObject.getAddressLine());
    setIsHideYandexInput(true);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Указать адрес через карту
      </Button>

      <div
        className={
          isHideYandexInput
            ? "input__wrapper_hide-dropdown"
            : "input__wrapper_show-dropdown"
        }
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Адрес доставки"
          onFocus={() => setIsHideYandexInput(false)}
          className="mt-2 mb-2 p-2 address-inp "
          required
        />
      </div>

      <YMaps
        query={{
          load: "package.full",
          apikey: process.env.REACT_APP_API_YANDEX_KEY,
          suggest_apikey: "557cf3ec-8f52-4202-b1ce-670ac3a05c9d",
        }}
      >
        {open && (
          <Map
            state={
              addressCoord ? { ...mapState, center: addressCoord } : mapState
            }
            onLoad={onYmapsLoad}
            width="100%"
            onClick={onClickToMap}
          >
            {addressCoord && <Placemark geometry={addressCoord} />}
          </Map>
        )}
      </YMaps>
    </div>
  );
};

export default Ymaps;
