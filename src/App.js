import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import LocationMarker from "./components/LocationMarker";
import "./App.css";

function App() {
  const [position, setPosition] = useState(null);
  const [newPositions, setNewPositions] = useState([]);
  const [inputLat, setInputLat] = useState("");
  const [inputLong, setInputLong] = useState("");
  const [linkgeo, setLinkgeo] = useState(null);
  const [inputStatus, setInputState] = useState({
    offline: false,
    online: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);
  const getNumbersGeo = (value) => {
    const regex = new RegExp(/(-?\d{1,2}\.\d+)[^\d-]+(-?\d{1,2}\.\d+)/);
    const latAndLong = regex.exec(value);
    if(latAndLong) {
      setNewPositions([
        ...newPositions,
        { ...inputStatus, geo: [latAndLong[1], latAndLong[2]] },
      ]);
    } else {
      alert('Não foi possivel decodificar o link');
    }
  }

  const inputChange = ({ target }) => {
    const { name, value } = target;
    if (name === "state") {
      setInputState({ [value]: target.checked });
    }
    if (name === "inputLat") setInputLat(value);
    if (name === "inputLong") setInputLong(value);
    if (name === "link") setLinkgeo(value);
  };

  const applyButton = () => {
    if (linkgeo) return getNumbersGeo(linkgeo);
    if (!inputStatus.offline && !inputStatus.online && (!inputLat || inputLong))
      return alert("É nescessario que todos os dados estejam preenchidos");
    if (!inputStatus.offline && !inputStatus.online)
      return alert("é nescessario que escolha Offline ou Online");
    if (!inputLat || !inputLong)
      return alert("coordenadas não podem ficar vazias");
    setNewPositions([
      ...newPositions,
      { ...inputStatus, geo: [inputLat, inputLong] },
    ]);
    setInputLat("");
    setInputLong("");
    setInputState({ offline: false, online: false });
  };

  return (
    <div className="map">
      <input
        type="text"
        placeholder="Latitude"
        name="inputLat"
        onChange={inputChange}
      />
      <input
        type="text"
        placeholder="Longitude"
        name="inputLong"
        onChange={inputChange}
      />
      <input
        type="text"
        placeholder="link inteiro da geocalização"
        name="link"
        onChange={inputChange}
      />
      <form>
        <label htmlFor="off">
          <input
            checked={inputStatus.offline}
            onChange={inputChange}
            type="radio"
            id="off"
            name="state"
            value="offline"
          />
          Offline
        </label>
        <label htmlFor="on">
          <input
            checked={inputStatus.online}
            onChange={inputChange}
            type="radio"
            id="on"
            name="state"
            value="online"
          />
          Online
        </label>
      </form>
      <button onClick={applyButton}>Criar Ponto</button>
      {position && (
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="map-square"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            Marker={Marker}
            Popup={Popup}
            newPositions={newPositions}
            icon={icon}
          />
        </MapContainer>
      )}
    </div>
  );
}

export default App;
