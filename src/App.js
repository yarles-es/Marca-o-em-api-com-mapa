import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import LocationMarker from "./components/LocationMarker";
import { Button, InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [position, setPosition] = useState(null);
  const [newPositions, setNewPositions] = useState([]);
  const [inputLatLong, setInputLatLong] = useState("");
  const [inputStatus, setInputState] = useState({
    offline: false,
    online: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const inputChange = ({ target }) => {
    const { name, value } = target;
    console.log(target);
    if (name === "state") {
      setInputState({ [value]: target.checked });
    }
    if (name === "inputLatLong") setInputLatLong(value);
  };

  const applyButton = () => {
    if (!inputStatus.offline && !inputStatus.online && !inputLatLong)
      return alert("É nescessario que todos os dados estejam preenchidos");
    if (!inputStatus.offline && !inputStatus.online)
      return alert("é nescessario que escolha Offline ou Online");
    if (!inputLatLong) return alert("coordenadas não podem ficar vazias");
    const arrayLongLat = inputLatLong.split(",");
    if (
      arrayLongLat.length !== 2 ||
      Number.isNaN(Number(arrayLongLat[0])) ||
      Number.isNaN(Number(arrayLongLat[1]))
    ) {
      return alert("Coordenadas digitadas de maneira incorreta");
    }
    setNewPositions([
      ...newPositions,
      { ...inputStatus, geo: [...arrayLongLat] },
    ]);
    setInputLatLong("");
    setInputState({ offline: false, online: false });
  };

  return (
    <div className="map">
      <InputGroup className="mb-3 input-geo ">
        <Form.Control
          className="text-center"
          name="inputLatLong"
          onChange={inputChange}
          placeholder="Longitude - Latitude"
          aria-label="Longitude - Latitude"
          aria-describedby="basic-addon1"
          value={inputLatLong}
        />
      </InputGroup>
      <p><strong>Exemplo:</strong> -19.899103,-41.056704</p>
      <form>
        <div className="checkBox-On-Off">
          <Form.Check
            onChange={inputChange}
            name="state"
            type="radio"
            id="off"
            label={"Offline"}
            value="offline"
            checked={inputStatus.offline}
          />
          <Form.Check
            onChange={inputChange}
            name="state"
            type="radio"
            id="on"
            label={"Online"}
            value="online"
            checked={inputStatus.online}
          />
        </div>
      </form>
      <Button variant="primary" onClick={applyButton} className="buttonPoint">
        Criar ponto
      </Button>
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
